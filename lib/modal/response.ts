import { CourseDetail } from "../modal/course";

export interface StudentResponse<C = CourseDetail> {
  id: number;
  name: string;
  type: { id: number; name: string } | null;
  country: string;
  address: string;
  phone: number;
  createdAt: string;
  email: string;
  updatedAt: string;
  gender: number;
  education: string;
  age: number;
  interest: [];
  studentCourseIds: number[];
  avatar: string;
  memberStartAt: string;
  memberEndAt: string;
  description: string;
  courses: C[];
}

interface TypeDetail {
  id: number;
  name: string;
}
export interface CoursesResponse {
  cover: string;
  createAt: string;
  detail: string;
  duration: number;
  durationUnit: number;
  id: number;
  maxStudents: number;
  name: string;
  price: number;
  scheduleId: number;
  star: number;
  startTime: string;
  status: number;
  teacherId: number;
  teacherName: string;
  uid: string;
  updatedAt: string;
  type: TypeDetail[];
}
