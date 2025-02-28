import { User } from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "El usuario ya existe" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
      name,
    });

    return NextResponse.json(
      { message: "Usuario creado exitosamente", user: { email, name } },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al crear usuario" },
      { status: 500 }
    );
  }
}
