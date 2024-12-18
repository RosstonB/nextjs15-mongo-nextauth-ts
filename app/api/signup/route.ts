import { NextResponse } from "next/server";
import { createUser } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const result = await createUser(name, email, password);
    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
