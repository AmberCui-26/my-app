import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function FirstPost() {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">nav 1</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} height={100} className="site-layout-background">
          <Menu
            theme="dark"
            mode="inline"
            // style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="sub1" icon={<UserOutlined />}>
              Overview
            </Menu.Item>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Student">
              <Menu.Item key="5">Student List</Menu.Item>
            </SubMenu>

            <SubMenu key="sub3" icon={<NotificationOutlined />} title="Teacher">
              <Menu.Item key="6">Teacher List</Menu.Item>
            </SubMenu>

            <SubMenu key="sub4" icon={<NotificationOutlined />} title="Course">
              <Menu.Item key="7">All Courses</Menu.Item>
              <Menu.Item key="8">Add Course</Menu.Item>
              <Menu.Item key="9">Edit Course</Menu.Item>
            </SubMenu>
            <Menu.Item key="10">Message</Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    </Layout>
  );
}
