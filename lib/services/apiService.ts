import axios from "axios";
import {
  AddUserRequest,
  DeleteRequest,
  EditRequest,
  GetListRequest,
  LoginRequest,
  SearchRequest,
} from "../modal/request";

const baseURL = "https://cms.chtoma.com/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  responseType: "json",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (!config.url.includes("login")) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: "Bearer " + token,
      },
    };
  }
  return config;
});

export async function login(params: LoginRequest) {
  return axiosInstance.post(baseURL + "/login", params);
}

export async function getStudents(params: GetListRequest) {
  return axiosInstance.get(baseURL + "/students", { params });
}

export async function getTeachers(params: GetListRequest) {
  return axiosInstance.get(baseURL + "/teachers", { params });
}

export async function deleteStudent(params: DeleteRequest) {
  return axiosInstance.delete(baseURL + `/students/${params}`);
}

export async function deleteTeacher(params: DeleteRequest) {
  return axiosInstance.delete(baseURL + `/teachers/${params}`);
}

export async function searchStudents(params: SearchRequest) {
  return axiosInstance.get(baseURL + "/students", { params });
}

export async function searchTeachers(params: SearchRequest) {
  return axiosInstance.get(baseURL + "/teachers", { params });
}

export async function addStudent(params: AddUserRequest) {
  return axiosInstance.post(baseURL + "/students", params);
}

export async function addTeacher(params: AddUserRequest) {
  return axiosInstance.post(baseURL + "/teachers", params);
}

export async function editStudents(params: EditRequest) {
  return axiosInstance.put(baseURL + "/students", params);
}

export async function editTeachers(params: EditRequest) {
  return axiosInstance.put(baseURL + "/teachers", params);
}

export async function getStudentById(params) {
  return axiosInstance.get(baseURL + "/students/" + params);
}

export async function getTeacherById(params) {
  return axiosInstance.get(baseURL + "/teachers/" + params);
}

export async function getCourseInfo(params) {
  return axiosInstance.get(baseURL + "/courses", { params });
}

export async function getCourseById(params) {
  return axiosInstance.get(baseURL + "/courses/detail", { params });
}
