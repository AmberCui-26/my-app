import { Breadcrumb } from "antd";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { generateBreadCrumbs } from "../../lib/modal/side-nav";
import { userRole } from "../../lib/modal/role";
import { routes } from "../../lib/modal/route";

export const StyledBreadcrumb = styled(Breadcrumb)`
  margin: 16px 200px;
  padding: 0 30px;
`;
export default function Breadcrumbs() {
  const router = useRouter();
  const pathname = router.pathname; ///dashboard/manager/student/[id]
  const currentPath = pathname.split("/").slice(1); // ['dashboard', 'manager', 'student', '[id]']
  const root = "/" + currentPath.slice(0, 2).join("/"); ///dashboard/manager
  const query = router.query;
  const role = userRole();
  const sideNav = routes.get(role);
  const { key, path } = generateBreadCrumbs(sideNav, pathname, query);
  const detailIndex = key.indexOf("Detail");

  return (
    <StyledBreadcrumb>
      <Breadcrumb.Item>
        <Link href={root}>{`CMS ${role.toUpperCase()} SYSTEM`}</Link>
      </Breadcrumb.Item>
      {key.map((item, index) => {
        if (detailIndex === -1) {
          return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>;
        } else {
          return (
            <Breadcrumb.Item>
              {index === detailIndex - 1 ? (
                <Link href={path}>{item}</Link>
              ) : (
                item
              )}
            </Breadcrumb.Item>
          );
        }
      })}
    </StyledBreadcrumb>
  );
}
