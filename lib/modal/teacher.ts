export interface Skills {
  name: string;
  level: number;
}
export interface Teacher {
  courseAmount: number;
  phone: string;
  profileId: number;
  id: number;
  email: string;
  name: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  skills: Skills[];
}
