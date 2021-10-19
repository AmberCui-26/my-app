import axios from 'axios';
// import { AppWrapper } from '../../context/AppContext';

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

export async function login(params) {
  return axiosInstance.post(baseURL + '/login', params);
}

export async function getStudents(params) {
  return axiosInstance.get(baseURL + '/students', {params});
}

export async function deleteStudent(params) {
  return axiosInstance.delete(baseURL + `/students/${params}`);
}

export async function searchStudents(params) {
  return axiosInstance.get(baseURL + '/students', {params});
}

export async function addStudent(params) {
  return axiosInstance.post(baseURL + '/students', params);
}

export async function editStudents(params) {
  return axiosInstance.put(baseURL + '/students', params);
}

export async function getStudentById(params) {
  return axiosInstance.get(baseURL+'/students/'+params);
}
