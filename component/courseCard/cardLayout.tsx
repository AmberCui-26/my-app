import { Card, Row, Col, Divider } from "antd";
import { HeartFilled, UserOutlined } from "@ant-design/icons";
import { CoursesResponse } from "../../lib/modal/response";
import styled from "styled-components";
import { PropsWithChildren } from "react";

export default function CourseCard(props: PropsWithChildren<CoursesResponse>) {
  return (
    <Card cover={<img src={props.cover} style={{ height: 260 }} />}>
      <Row>
        <h1>{props.name}</h1>
      </Row>
      <Row gutter={[16, 24]} justify="space-between">
        <Col>{props.startTime}</Col>
        <Col>
          <HeartFilled style={{ fontSize: 16, color: "red" }} />
          <b>{props.star}</b>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]} justify="space-between">
        <Col>
          <span>Duration:</span>
        </Col>
        <Col>
          <b>{props.duration}</b>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]} justify="space-between">
        <Col>
          <span>Teacher:</span>
        </Col>
        <Col>
          <b>{props.teacherName}</b>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]} justify="space-between">
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
