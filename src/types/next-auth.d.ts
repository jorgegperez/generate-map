interface IUser {
  id: string;
  email?: string | null;
  name?: string | null;
  password?: string | null;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
  }
}

export type { IUser };
