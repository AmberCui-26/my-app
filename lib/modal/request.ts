export interface StudentRequest {
  id: number;
}

export interface LoginRequest {
  role: string;
  password: string;
  email: string;
}

export interface GetStudentListRequest {
  limit: number;
  page: number;
}

export interface DeleteStudentRequest {
  id: number;
}

export interface AddStudentRequest {
  name: string;
  email: string;
  type: number;
  country: string;
}

export interface EditStudentRequest {
  name: string;
  email: string;
  type: number;
  country: string;
  id: number;
}

export interface SearchStudentRequest {
  limit: number;
  page: number;
  query: string;
}
