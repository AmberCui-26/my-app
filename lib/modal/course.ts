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

export interface CourseType {
  name: string;
  id: number;
}

export interface UpdateCourse {
  chapters: [{ name: string; content: string }];
  classTime: [{ weekday: string; time: Date }];
}
