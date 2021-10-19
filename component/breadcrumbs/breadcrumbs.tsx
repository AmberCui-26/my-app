import { Breadcrumb } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';

export const StyledBreadcrumb = styled(Breadcrumb)`
  margin: 16px 0px;
  padding: 0 30px;
`;
export default function Breadcrumbs() {
  const router = useRouter();
  const pathname = router.pathname; ///dashboard/manager/student/[id]
  const path = pathname.split('/').slice(1); // ['dashboard', 'manager', 'student', '[id]']
  const root = '/' + path.slice(0, 2).join('/'); ///dashboard/manager
  const root1 = '/' + path.slice(0, 3).join('/');
  const role = path[1]; //manager
  let firstBreadcrumbElement: string,
    secondBreadcrumbElement: string,
    thirdBreadcrumbElement: string;
  if (path[2]) {
    firstBreadcrumbElement = null;
    if (path[1] == 'manager') {
      firstBreadcrumbElement = `${path[2]}`;
      secondBreadcrumbElement = `${path[2]} List`;
      if (path[3]) {
        thirdBreadcrumbElement = 'Detail';
      }
    }
  }

  return (
    <StyledBreadcrumb>
      <Breadcrumb.Item>
        <Link href={root}>{`CMS ${role.toUpperCase()} SYSTEM`}</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{firstBreadcrumbElement}</Breadcrumb.Item>
      <Breadcrumb.Item href={root1}>{secondBreadcrumbElement}</Breadcrumb.Item>
      <Breadcrumb.Item>{thirdBreadcrumbElement}</Breadcrumb.Item>
    </StyledBreadcrumb>
  );
}
