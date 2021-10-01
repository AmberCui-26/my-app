import { Layout, Menu, Avatar } from "antd";
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
import Link from "next/link";
import { useState } from "react";

const { SubMenu } = Menu;
const { Header, Sider } = Layout;

export default function FirstPost() {
  const [collapsed, setCollapse] = useState(false);
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <div
            style={{ marginLeft: "15%" }}
            // onClick={() => setCollapse(!collapsed)}
          >
            <MenuFoldOutlined />
            {/* {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} */}
          </div>

          <div style={{ marginLeft: "80%" }}>
            <Link href="/login">
              <Avatar icon={<UserOutlined />}></Avatar>
            </Link>
          </div>
        </Menu>
      </Header>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          // collapsed={collapsed}
          // onCollapse={(isCollapsed) => setCollapse(isCollapsed)}
          width={200}
          className="site-layout-background"
        >
          <Menu theme="dark" mode="inline">
            <Menu.Item key="sub1" icon={<DashboardOutlined />}>
              Overview
            </Menu.Item>

            <SubMenu key="sub2" icon={<SolutionOutlined />} title="Student">
              <Menu.Item key="1" icon={<TeamOutlined />}>
                Student List
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub3"
              icon={<DeploymentUnitOutlined />}
              title="Teacher"
            >
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
      </Layout>
    </Layout>
  );
}
