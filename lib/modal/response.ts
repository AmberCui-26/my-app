import { CourseDetail } from '../modal/course';

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
