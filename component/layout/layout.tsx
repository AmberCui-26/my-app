import { Layout, Menu, Avatar } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { PropsWithChildren, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import { useRouter } from "next/dist/client/router";
import { routes, SideNav } from "../../lib/modal/route";
import { userRole } from "../../lib/modal/role";
import Link from "next/link";
import { getActiveKey } from "../../lib/modal/side-nav";

const { Header, Sider, Content } = Layout;

const StyledLayoutHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0;
`;

const Logo = styled.div`
  height: 64px;
  display: inline-flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #fff;
  letter-space: 5px;
  text-shadow: 5px 1px 5px;
  transform: rotateX(45deg);
  font-family: monospace;
`;

const StyledContent = styled(Content)`
  margin: 16px;
  background-color: #fff;
  padding: 16px;
  min-height: auto;
`;

const generateMenus = (data: SideNav[], parent = ""): JSX.Element[] => {
  return data.map((item) => {
    const role = userRole();
    if (item.subNav) {
      return (
        <Menu.SubMenu key={item.label} icon={item.icon} title={item.label}>
          {generateMenus(item.subNav, item.path.join("/"))}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.label} icon={item.icon}>
          <Link href={["/dashboard", role, parent, ...item.path].join("/")}>
            {item.label}
          </Link>
        </Menu.Item>
      );
    }
  });
};

export default function AppLayout(props: PropsWithChildren<any>) {
  const router = useRouter();
  const role = userRole();
  const sideName = routes.get(role);
  const key = getActiveKey(sideName, router.pathname, router.query);
  const defaultSelectedKeys = [key.split("/").pop()];
  const defaultOpenKeys = key.split("/").slice(0, -1);
  const [collapsed, setCollapse] = useState(false);
  const logOut = () => {
    const url = "https://cms.chtoma.com/api/logout";
    const token = localStorage.getItem("token");
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
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={(isCollapsed) => setCollapse(isCollapsed)}
      >
        <Logo>
          <span style={{ color: "#fff", cursor: "pointer" }}>CMS</span>
        </Logo>
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={defaultOpenKeys}
          defaultSelectedKeys={defaultSelectedKeys}
        >
          {generateMenus(sideName)}
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: 200 }}>
        <Header
          style={{ display: "flex", justifyContent: "space-between" }}
          className="header"
        >
          <div onClick={() => setCollapse(!collapsed)}>
            {collapsed ? (
              <MenuUnfoldOutlined style={{ color: "#fff", fontSize: "18px" }} />
            ) : (
              <MenuFoldOutlined style={{ color: "#fff", fontSize: "18px" }} />
            )}
          </div>
          <div onClick={logOut}>
            <Avatar icon={<UserOutlined />}></Avatar>
          </div>
        </Header>
        <Breadcrumbs />
        <Content style={{ width: "100%", position: "relative" }}>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}
