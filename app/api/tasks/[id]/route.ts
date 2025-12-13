import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";
import { TaskStatus, TaskPriority } from "@/models/Task";

// PUT: Update task
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const taskId = params.id;
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const isAdmin = session.user?.role === "admin";

    await connectDB();

    const updateData: any = {};
    
    // Regular users can only update the note field
    if (!isAdmin) {
      if (body.note !== undefined) {
        updateData.note = body.note;
      } else {
        return NextResponse.json(
          { error: "You can only update the note field" },
          { status: 403 }
        );
      }
    } else {
      // Admin can update all fields
      if (body.title) updateData.title = body.title;
      if (body.desc) updateData.desc = body.desc;
      if (body.note !== undefined) updateData.note = body.note;
      if (body.startDate) updateData.startDate = new Date(body.startDate);
      if (body.assignDate) updateData.assignDate = new Date(body.assignDate);
      if (body.expectedDeliveryDate) updateData.expectedDeliveryDate = new Date(body.expectedDeliveryDate);
      if (body.actualDeliveryDate) updateData.actualDeliveryDate = new Date(body.actualDeliveryDate);
      if (body.assignee) updateData.assignee = body.assignee;
      if (body.status) updateData.status = body.status;
      if (body.priority) updateData.priority = body.priority;

      // If status is changed to "done", set actualDeliveryDate if not already set
      if (body.status === TaskStatus.DONE && !updateData.actualDeliveryDate) {
        updateData.actualDeliveryDate = new Date();
      }
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      updateData,
      { new: true, runValidators: true }
    ).populate("assignee", "name email");

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Delete task (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const taskId = params.id;
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = session.user?.role === "admin";
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Only admins can delete tasks" },
        { status: 403 }
      );
    }

    await connectDB();

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

