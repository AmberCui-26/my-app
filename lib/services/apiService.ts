import axios from 'axios';
import {
  AddStudentRequest,
  DeleteStudentRequest,
  EditStudentRequest,
  GetStudentListRequest,
  LoginRequest,
  SearchStudentRequest,
} from '../modal/request';

const baseURL = 'https://cms.chtoma.com/api';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  responseType: 'json',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (!config.url.includes('login')) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: 'Bearer ' + token,
      },
    };
  }
  return config;
});

export async function login(params: LoginRequest) {
  return axiosInstance.post(baseURL + '/login', params);
}

export async function getStudents(params: GetStudentListRequest) {
  return axiosInstance.get(baseURL + '/students', { params });
}

export async function deleteStudent(params: DeleteStudentRequest) {
  return axiosInstance.delete(baseURL + `/students/${params}`);
}

export async function searchStudents(params: SearchStudentRequest) {
  return axiosInstance.get(baseURL + '/students', { params });
}

export async function addStudent(params: AddStudentRequest) {
  return axiosInstance.post(baseURL + '/students', params);
}

export async function editStudents(params: EditStudentRequest) {
  return axiosInstance.put(baseURL + '/students', params);
}

export async function getStudentById(params) {
  return axiosInstance.get(baseURL + '/students/' + params);
}
