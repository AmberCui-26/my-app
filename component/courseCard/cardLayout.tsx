import { Card, Row, Col, Button } from "antd";
import { HeartFilled, UserOutlined } from "@ant-design/icons";
import { CoursesResponse } from "../../lib/modal/response";
import styled from "styled-components";
import { PropsWithChildren } from "react";

const StyledRow = styled(Row)`
  position: relative;
  :after {
    content: "";
    position: absolute;
    bottom: 0;
    background: #f0f0f0;
    width: 100%;
    height: 1px;
  }
`;

export default function CourseCard(props: PropsWithChildren<CoursesResponse>) {
  return (
    <Card cover={<img src={props.cover} style={{ height: 260 }} />}>
      <Row>
        <h1>{props.name}</h1>
      </Row>
      <StyledRow gutter={[16, 24]} justify="space-between">
        <Col>{props.startTime}</Col>
        <Col>
          <HeartFilled style={{ fontSize: 16, color: "red" }} />
          <b>{props.star}</b>
        </Col>
      </StyledRow>

      <StyledRow gutter={[16, 16]} justify="space-between">
        <Col>
          <span>Duration:</span>
        </Col>
        <Col>
          <b>{props.duration}</b>
        </Col>
      </StyledRow>
      <StyledRow gutter={[16, 16]} justify="space-between">
        <Col>
          <span>Teacher:</span>
        </Col>
        <Col>
          <b>{props.teacherName}</b>
        </Col>
      </StyledRow>
      <StyledRow gutter={[16, 16]} justify="space-between">
        <Col>
          <UserOutlined
            style={{ fontSize: 16, color: "blue", marginRight: 5 }}
          />
          <span>Student Limit:</span>
        </Col>
        <Col>
          <b>{props.maxStudents}</b>
        </Col>
      </StyledRow>
      <Row gutter={[16, 16]}>
        <Button type="primary">Read More</Button>
      </Row>
    </Card>
  );
}
