export interface StudentRequest {
  id: number;
}

export interface LoginRequest {
  role: string;
  password: string;
  email: string;
}

export interface GetListRequest {
  limit: number;
  page: number;
}

export interface DeleteRequest {
  id: number;
}

export interface AddUserRequest {
  name: string;
  email: string;
  type: number;
  country: string;
}

export interface EditRequest {
  name: string;
  email: string;
  type: number;
  country: string;
  id: number;
}

export interface SearchRequest {
  limit: number;
  page: number;
  query: string;
}

export interface AddCourse {
  cover: string;
  detail: string;
  duration: number;
  durationUnit: number;
  maxStudents: number;
  name: string;
  price: number;
  startTime: string;
  teacherId: string;
  type: [];
  uid: string;
}
