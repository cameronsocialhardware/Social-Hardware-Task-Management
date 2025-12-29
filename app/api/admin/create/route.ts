import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User, { UserRole } from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    const adminEmail = "cameron@socialhardware.in";
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { error: "ADMIN_PASSWORD environment variable is not set" },
        { status: 500 }
      );
    }

    await connectDB();

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      return NextResponse.json(
        { message: "Admin user already exists" },
        { status: 200 }
      );
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await User.create({
      email: adminEmail,
      password: hashedPassword,
      name: "Ganesh",
      role: UserRole.ADMIN,
    });

    return NextResponse.json(
      {
        message: "Admin user created successfully",
        user: {
          id: admin._id,
          email: admin.email,
          role: admin.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

