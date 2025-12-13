import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";
import { TaskStatus, TaskPriority } from "@/models/Task";

// GET: List all tasks
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    const tasks = await Task.find()
      .populate("assignee", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json(tasks);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create a new task (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = session.user?.role === "admin";
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Only admins can create tasks" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      title,
      desc,
      note,
      startDate,
      assignDate,
      expectedDeliveryDate,
      assignee,
      status,
      priority,
    } = body;

    if (!title || !startDate || !assignDate || !expectedDeliveryDate || !assignee) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const newTask = await Task.create({
      title,
      desc: desc || "",
      note: note || "",
      startDate: new Date(startDate),
      assignDate: new Date(assignDate),
      expectedDeliveryDate: new Date(expectedDeliveryDate),
      assignee,
      status: status || TaskStatus.TODO,
      priority: priority || TaskPriority.MEDIUM,
    });

    const populatedTask = await Task.findById(newTask._id).populate("assignee", "name email");

    return NextResponse.json(populatedTask, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

