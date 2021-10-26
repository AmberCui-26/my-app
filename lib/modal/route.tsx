import {
  TeamOutlined,
  DashboardOutlined,
  MessageOutlined,
  FileAddOutlined,
  DeploymentUnitOutlined,
  ProjectOutlined,
  ReadOutlined,
  SolutionOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Role } from './role';

export interface SideNav {
  icon?: JSX.Element;
  label: string;
  path: string[];
  subNav?: SideNav[];
  hide?: boolean;
}

const overview: SideNav = {
  path: [],
  label: 'Overview',
  icon: <DashboardOutlined />,
};

const students: SideNav = {
  path: [''],
  label: 'Student',
  icon: <SolutionOutlined />,
  subNav: [
    { path: ['student'], label: 'Student List', icon: <TeamOutlined /> },
  ],
};

const teachers: SideNav = {
  path: [''],
  label: 'Teacher',
  icon: <DeploymentUnitOutlined />,
  subNav: [
    { path: ['teacher'], label: 'Teacher List', icon: <TeamOutlined /> },
  ],
};

const courses: SideNav = {
  path: [''],
  label: 'Course',
  icon: <ReadOutlined />,
  subNav: [
    { path: ['course'], label: 'All Courses', icon: <ProjectOutlined /> },
    { path: ['add-course'], label: 'Add Course', icon: <FileAddOutlined /> },
    { path: ['edit-course'], label: 'Edit Course', icon: <EditOutlined /> },
  ],
};

const messages: SideNav = {
  path: ['message'],
  label: 'Message',
  icon: <MessageOutlined />,
};

export enum Roles {
  manager = 'manager',
  teacher = 'teacher',
  student = 'student',
}

export const routes: Map<Role, SideNav[]> = new Map([
  [Roles.manager, [overview, students, teachers, courses, messages]],
]);
