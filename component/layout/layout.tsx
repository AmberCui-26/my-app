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
import { Role } from "../../lib/modal/role";
import Link from "next/link";

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
      return (
        <Menu.Item
          key={item.label}
          icon={item.icon}
          // onClick={() => router.push(`manager/${item.path}`)}
        >
          <Link href={["/dashboard", "manager", item.path].join("/")}>
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
  const pathname = router.pathname.split("/").slice(1);
  const name = pathname.slice(2);
  //  function role():Role{
  //    const currentRole=localStorage.getItem("role");
  //    return currentRole;
  //  }
  const sideName = routes.get("manager");
  const [collapsed, setCollapse] = useState(false);
  const getLabel = () => {
    const selectedKey: string[] = [];
    const openKey: string[] = [];
    if (pathname.length === 2) {
      selectedKey[0] = null;
      openKey[0] = null;
      return { selectedKey, openKey };
    }
    for (let i in sideName) {
      if (sideName[i].subNav) {
        for (let j in sideName[i].subNav) {
          if (sideName[i].subNav[j].path[0] === name[0]) {
            selectedKey[0] = sideName[i].subNav[j].label;
            openKey[0] = sideName[i].label;
            return { selectedKey, openKey };
          }
        }
      }
    }
  };

  const result = getLabel();

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
        // style={{ overflow: 'auto', height: '100vh', position: 'fixed' }}
        collapsible
        collapsed={collapsed}
        onCollapse={(isCollapsed) => setCollapse(isCollapsed)}
        width={200}
        className="site-layout-background"
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={result.openKey}
          defaultSelectedKeys={result.selectedKey}
        >
          <Menu.Item key="sub1">
            <StyledText>CMS</StyledText>
          </Menu.Item>
          {generateMenus(sideName)}
        </Menu>
      </Sider>
      <Layout>
        <StyledLayoutHeader className="header">
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
        </StyledLayoutHeader>
        <Breadcrumbs />
        <Content>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
