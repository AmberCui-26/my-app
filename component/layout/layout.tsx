import { Layout, Menu, Avatar } from 'antd';
import {
  TeamOutlined,
  DashboardOutlined,
  MessageOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileAddOutlined,
  DeploymentUnitOutlined,
  ProjectOutlined,
  ReadOutlined,
  SolutionOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PropsWithChildren, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import { useRouter } from 'next/dist/client/router';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

export const StyledLayoutHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledText = styled.h3`
  color: #fff;
  text-align: center;
  margin-top: 10px;
  width: 100%;
`;

export default function AppLayout(props: PropsWithChildren<any>) {
  const router = useRouter();
  const [collapsed, setCollapse] = useState(false);
  const logOut = () => {
    const url = 'https://cms.chtoma.com/api/logout';
    const token = localStorage.getItem('token');
    const authHeader = { Authorization: `Bearer ${token}` };
    axios
      .post(url, {}, { headers: authHeader })
      .then(() => {
        localStorage.clear();
        router.push('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        // style={{ overflow: 'auto', height: '100vh', position: 'fixed' }}
        collapsible
        collapsed={collapsed}
        onCollapse={(isCollapsed) => setCollapse(isCollapsed)}
        width={200}
        className="site-layout-background"
      >
        <Menu theme="dark" mode="inline">
          <Menu.Item key="sub1">
            <StyledText>CMS</StyledText>
          </Menu.Item>

          <Menu.Item
            onClick={() => router.push('/dashboard/manager')}
            key="sub2"
            icon={<DashboardOutlined />}
          >
            Overview
          </Menu.Item>

          <SubMenu key="sub3" icon={<SolutionOutlined />} title="Student">
            <Menu.Item
              onClick={() => router.push('manager/student')}
              key="1"
              icon={<TeamOutlined />}
            >
              Student List
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub4" icon={<DeploymentUnitOutlined />} title="Teacher">
            <Menu.Item
              key="2"
              icon={<TeamOutlined />}
              onClick={() => router.push('teacher')}
            >
              Teacher List
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub5" icon={<ReadOutlined />} title="Course">
            <Menu.Item key="3" icon={<ProjectOutlined />}>
              All Courses
            </Menu.Item>
            <Menu.Item key="4" icon={<FileAddOutlined />}>
              Add Course
            </Menu.Item>
            <Menu.Item key="5" icon={<EditOutlined />}>
              Edit Course
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="6" icon={<MessageOutlined />}>
            Message
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <StyledLayoutHeader className="header">
          <div onClick={() => setCollapse(!collapsed)}>
            {collapsed ? (
              <MenuUnfoldOutlined style={{ color: '#fff', fontSize: '18px' }} />
            ) : (
              <MenuFoldOutlined style={{ color: '#fff', fontSize: '18px' }} />
            )}
          </div>
          <div onClick={logOut}>
            <Avatar icon={<UserOutlined />}></Avatar>
          </div>
        </StyledLayoutHeader>
        <Breadcrumbs />
        <Content>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
