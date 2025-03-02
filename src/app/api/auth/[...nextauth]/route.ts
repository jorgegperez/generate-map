import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import type { IUser } from "@/types/next-auth";
import { createGoogleUser } from "@/app/actions/createUser";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await User.findOne({ email: credentials?.email });

          if (!user) return null;

          const isPasswordValid = await bcrypt.compare(
            credentials?.password || "",
            user.password
          );

          if (!isPasswordValid) return null;

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: IUser }) {
      if (user) {
        token.id = user.id;
        token.email = user.email || "";
        token.name = user.name || "";
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const result = await createGoogleUser({
          email: user.email!,
          name: user.name!,
        });

        return result.success;
      }
      return true;
    },
  },
  secret: process.env.JWT_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
