export interface CourseInfo {
  id: number;
  courseId: number;
  name: string;
}

export interface CourseDetail {
  courseDate: string;
  courseId: number;
  createdAt: string;
  id: number;
  name: string;
  studentId: number;
  type: { id: number; name: string };
  length: number;
  updatedAt: string;
}

export enum CourseStatusText {
  "finished",
  "processing",
  "pending",
}

export enum CourseStatusBadge {
  "warning",
  "success",
  "default",
}

export enum CourseStatusColor {
  "default",
  "green",
  "orange",
}
