import { Layout, Menu, Avatar, Breadcrumb } from "antd";
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
} from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";

const { SubMenu } = Menu;
const { Header, Sider } = Layout;

export const StyledLayoutHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledBreadcrumb = styled(Breadcrumb)`
  margin: 16px 0;
  padding: 0 30px;
`;

export const StyledText = styled.h3`
  color: #fff;
  text-align: center;
  margin: 0 12px;
`;

export default function AppLayout(props) {
  const router = useRouter();
  const [collapsed, setCollapse] = useState(false);
  const logOut = () => {
    const url = "https://cms.chtoma.com/api/logout";
    const token = localStorage.getItem("token");
    console.log(token);
    const authHeader = { Authorization: `Bearer ${token}` };
    axios
      .post(url, {}, { headers: authHeader })
      .then(() => {
        localStorage.clear();
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(isCollapsed) => setCollapse(isCollapsed)}
        width={200}
        className="site-layout-background"
      >
        <Menu theme="dark" mode="inline">
          <Menu.Item>
            <StyledText>CMS</StyledText>
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
          <div aria-hidden="false" onClick={() => setCollapse(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>

          <Avatar icon={<UserOutlined />} onClick={logOut}></Avatar>
        </StyledLayoutHeader>
        <StyledBreadcrumb>{props.children}</StyledBreadcrumb>
      </Layout>
    </Layout>
  );
}
