"use server";

import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";

type CreateUserResponse = {
  success: boolean;
  message: string;
  user?: {
    email: string;
    name: string;
  };
};

export async function createUser(
  formData: FormData
): Promise<CreateUserResponse> {
  try {
    await connectDB();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    if (!email || !password || !name) {
      return {
        success: false,
        message: "Todos los campos son requeridos",
      };
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        success: false,
        message: "El usuario ya existe",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
      name,
    });

    return {
      success: true,
      message: "Usuario creado exitosamente",
      user: { email, name },
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "Error al crear usuario",
    };
  }
}

export async function createGoogleUser(userData: {
  email: string;
  name: string;
}): Promise<CreateUserResponse> {
  try {
    await connectDB();

    const { email, name } = userData;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      const newUser = new User({
        email,
        name,
      });
      await newUser.save();
    }

    return {
      success: true,
      message: "Usuario creado exitosamente",
      user: { email, name },
    };
  } catch (error) {
    console.error("Google user creation error:", error);
    return {
      success: false,
      message: "Error al crear usuario",
    };
  }
}
