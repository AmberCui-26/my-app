import { SideNav } from "../modal/route";
import { isEmpty } from "lodash";

interface ID {
  id?: string;
}

//是详情页返回true，否则返回false
const isDetail = (id: ID) => {
  return !isEmpty(id) ? true : false;
};

//不是详情页返回当前路径，是详情页返回【id】前的路径
const currentPath = (pathname: string, id: ID) => {
  return isDetail(id) ? pathname.slice(0, pathname.lastIndexOf("/")) : pathname;
};
//将keys和paths转成一维数组
function getKeyPathInfo(data: SideNav[]) {
  const keys = generateKeys(data).reduce((prev, next) => prev.concat(next));
  const paths = generatePaths(data).reduce((prev, next) => prev.concat(next));
  return { keys, paths };
}
//生成所有keys的二维数组
const generateKeys = (data: SideNav[], parent = ""): string[][] => {
  const keys = data.map((item) => {
    let key = item.label;
    if (parent) {
      key = [parent, key].join("/");
    }
    if (item.subNav) {
      return generateKeys(item.subNav, key).map((item) => item.join("/"));
    } else {
      return [key];
    }
  });
  return keys;
};
//生成所有路径的二维数组
const generatePaths = (data: SideNav[], parent = ""): string[][] => {
  const info = data.map((item) => {
    let path = item.path.join("");
    if (parent) {
      path = [parent, path].join("/");
    }
    if (item.subNav) {
      return generatePaths(item.subNav, path).map((item) => item.join("/"));
    } else {
      return [path].map((item) => `/dashboard/manager/${item}`);
    }
  });
  return info;
};

//找出当前路径的index
const isPathEqual = (target: string) => (current: string) => {
  current = current.endsWith("/") ? current.slice(0, -1) : current;
  return current === target;
};

export function getActiveKey(data: SideNav[], pathname: string, id: ID) {
  const currentRoute = currentPath(pathname, id);
  const { keys, paths } = getKeyPathInfo(data);
  const isEqual = isPathEqual(currentRoute);
  const index = paths.findIndex(isEqual);
  return keys[index] || "";
}

export function generateBreadCrumbs(data: SideNav[], pathname: string, id: ID) {
  const isDetailPage = isDetail(id);
  const currentRoute = currentPath(pathname, id);
  const { keys, paths } = getKeyPathInfo(data);
  const isEqual = isPathEqual(currentRoute);
  const index = paths.findIndex(isEqual);
  if (index === -1) {
    return {};
  } else {
    let key = keys[index].split("/");
    key = isDetailPage ? key.concat(["Detail"]) : key;
    let path = paths[index];
    path = path.endsWith("/") ? path.slice(0, -1) : path;
    return { key, path };
  }
}
