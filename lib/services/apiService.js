import axios from 'axios';

const baseURL = 'https://cms.chtoma.com/api';
// const token = localStorage.getItem('token');
// const authHeader = { Authorization: `Bearer ${token}` };
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  responseType: 'json',
});

export async function login(params) {
  return axiosInstance.post(baseURL + '/login', params);
}

export async function getStudents(params) {
  const token = localStorage.getItem('token');
  const authHeader = { Authorization: `Bearer ${token}` };
  return axiosInstance.get(baseURL + '/students', {
    params,
    headers: authHeader,
  });
}

export async function deleteStudent(params) {
  const token = localStorage.getItem('token');
  const authHeader = { Authorization: `Bearer ${token}` };
  return axiosInstance.delete(baseURL + `/students/${params}`, {
    headers: authHeader,
  });
}

export async function searchStudents(params) {
  const token = localStorage.getItem('token');
  const authHeader = { Authorization: `Bearer ${token}` };
  return axiosInstance.get(baseURL + '/students', {
    params,
    headers: authHeader,
  });
}

export async function addStudent(params) {
  const token = localStorage.getItem('token');
  const authHeader = { Authorization: `Bearer ${token}` };
  return axiosInstance.post(baseURL + '/students', params, {
    headers: authHeader,
  });
}

export async function editStudents(params) {
  const token = localStorage.getItem('token');
  const authHeader = { Authorization: `Bearer ${token}` };
  return axiosInstance.put(baseURL + '/students', params, {
    headers: authHeader,
  });
}
