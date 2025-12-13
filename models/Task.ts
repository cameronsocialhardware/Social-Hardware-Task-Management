import mongoose, { Schema, Document, Model } from "mongoose";

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  IN_REVIEW = "in_review",
  DONE = "done",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export interface ITask extends Document {
  title: string;
  desc?: string;
  note?: string;
  startDate: Date;
  assignDate: Date;
  expectedDeliveryDate: Date;
  actualDeliveryDate?: Date;
  assignee: mongoose.Types.ObjectId;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    assignDate: {
      type: Date,
      required: [true, "Assign date is required"],
    },
    expectedDeliveryDate: {
      type: Date,
      required: [true, "Expected delivery date is required"],
    },
    actualDeliveryDate: {
      type: Date,
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Assignee is required"],
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.TODO,
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.MEDIUM,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure the database connection is established before creating the model
let Task: Model<ITask>;

try {
  Task = mongoose.model<ITask>("Task");
} catch {
  Task = mongoose.model<ITask>("Task", TaskSchema);
}

export default Task;

