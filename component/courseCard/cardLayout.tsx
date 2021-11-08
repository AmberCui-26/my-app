import { Card, Row, Col, Divider } from "antd";
import { HeartFilled, UserOutlined } from "@ant-design/icons";
import { CoursesResponse } from "../../lib/modal/response";
import styled from "styled-components";
import { PropsWithChildren } from "react";
import Link from "next/link";

const StyledDivider = styled(Divider)`
  margin: 7px 0;
`;

export default function CourseCard(props: PropsWithChildren<CoursesResponse>) {
  console.log(props.teacherName);
  return (
    <Card cover={<img src={props.cover} />}>
      <Row>
        <h1>{props.name}</h1>
      </Row>
      <Row style={{ marginTop: "10px" }} justify="space-between">
        <Col>{props.startTime}</Col>
        <Col>
          <HeartFilled
            style={{ fontSize: 16, color: "red", marginRight: "5px" }}
          />
          <b>{props.star}</b>
        </Col>
      </Row>
      <StyledDivider />
      <Row justify="space-between">
        <Col>
          <span>Duration:</span>
        </Col>
        <Col>
          <b>{props.duration}</b>
        </Col>
      </Row>
      <StyledDivider />
      <Row justify="space-between">
        <Col>
          <span>Teacher:</span>
        </Col>
        <Col>
          <Link href={"/dashboard/manager"}>
            <a>{props.teacherName}</a>
          </Link>
        </Col>
      </Row>
      <StyledDivider />
      <Row justify="space-between">
        <Col>
          <UserOutlined
            style={{ fontSize: 16, color: "blue", marginRight: 5 }}
          />
          <span>Student Limit:</span>
        </Col>
        <Col>
          <b>{props.maxStudents}</b>
        </Col>
      </Row>
      {props.children}
    </Card>
  );
}
