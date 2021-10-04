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
import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Router } from 'next/dist/client/router';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;
const token = localStorage.getItem('token');
const authHeader = { Authorization: `Bearer ${token}` };

export const StyledLayoutHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function AppLayout(props) {
  const [collapsed, setCollapse] = useState(false);
  const logOut = () => {
    const url = 'https://cms.chtoma.com/api/logout';
    axios({
      method: 'post',
      url: url,
      data: {},
      headers: authHeader,
    })
      .then(() => {
        localStorage.removeItem('userInfo');
        Router.push('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(isCollapsed) => setCollapse(isCollapsed)}
        width={200}
        className="site-layout-background"
      >
        <Menu theme="dark" mode="inline">
          <Menu.Item>
            <span style={{ color: '#fff', cursor: 'pointer' }}>CMS</span>
          </Menu.Item>

          <Menu.Item key="sub1" icon={<DashboardOutlined />}>
            Overview
          </Menu.Item>

          <SubMenu key="sub2" icon={<SolutionOutlined />} title="Student">
            <Menu.Item key="1" icon={<TeamOutlined />}>
              Student List
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub3" icon={<DeploymentUnitOutlined />} title="Teacher">
            <Menu.Item key="2" icon={<TeamOutlined />}>
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
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>

          <Avatar icon={<UserOutlined />} onClick={logOut}></Avatar>
        </StyledLayoutHeader>
        <Content>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
