import {StudentType} from '../modal/type';
import {CourseInfo} from '../modal/course';

export interface Student<C=CourseInfo>{
    id:number;
    email:string;
    name:string;
    country:string;
    createdAt:string;
    updatedAt:string;
    courses:C[];
    type:StudentType|null;
}