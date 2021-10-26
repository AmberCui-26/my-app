import { Layout, Menu, Avatar } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PropsWithChildren, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import { useRouter } from 'next/dist/client/router';
import { routes, SideNav } from '../../lib/modal/route';
import { Role } from '../../lib/modal/role';
import Link from 'next/link';

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

function generateMenus(data: SideNav[]): JSX.Element[] {
  const router = useRouter();
  return data.map((item) => {
    if (item.subNav) {
      return (
        <Menu.SubMenu key={item.label} icon={item.icon} title={item.label}>
          {generateMenus(item.subNav)}
        </Menu.SubMenu>
      );
    } else {
      console.log(item.label);
      return (
        <Menu.Item
          key={item.label}
          icon={item.icon}
          // onClick={() => router.push(`manager/${item.path}`)}
        >
          <Link href={['/dashboard', 'manager', item.path].join('/')}>
            {/* <Link href={`dashboard/manager/${item.path}`}> */}
            {item.label}
          </Link>
        </Menu.Item>
      );
    }
  });
}

export default function AppLayout(props: PropsWithChildren<any>) {
  const router = useRouter();
  const pathname = router.pathname.split('/').slice(1);
  const name = pathname.slice(-1);
  //const role = localStorage.getItem('role');
  const sideName = routes.get('manager');
  const [collapsed, setCollapse] = useState(false);
  const getLabel = () => {
    for (let i in sideName) {
      if (sideName[i].subNav) {
        for (let j in sideName[i].subNav) {
          if (sideName[i].subNav[j].path[0] === name[0]) {
            const a: string[] = [];
            a[0] = sideName[i].subNav[j].label;
            console.log('a', a);
            return a;
          }
        }
      }
    }
  };

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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={getLabel()}>
          <Menu.Item key="sub1">
            <StyledText>CMS</StyledText>
          </Menu.Item>
          {generateMenus(sideName)}
          {/* <Menu.Item
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
          </Menu.Item> */}
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
