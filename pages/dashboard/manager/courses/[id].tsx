import {
  Card,
  Row,
  Col,
  Badge,
  Steps,
  Collapse,
  Table,
  Tag,
  Divider,
} from "antd";
import React, { useEffect, useState } from "react";
import AppLayout from "../../../../component/layout/layout";
import { CourseResponse, Schedule } from "../../../../lib/modal/response";
import { getCourseById } from "../../../../lib/services/apiService";
import styled from "styled-components";
import { TagColor } from "../../../../lib/modal/config";
import CourseCard from "../../../../component/courseCard/cardLayout";
import {
  CourseStatusBadge,
  CourseStatusColor,
  CourseStatusText,
} from "../../../../lib/modal/course";

const { Panel } = Collapse;

export async function getServerSideProps(context) {
  const { id } = context.params;
  return {
    props: { id },
  };
}

export const Heading = styled.h1`
  margin: 20px 0;
  color: purple;
  font-size: 24px;
`;

const getChapterExtra = (source: Schedule, index: number) => {
  const activeIndex = source.chapters.findIndex(
    (item) => item.id === source.current
  );
  const status = index === activeIndex ? 1 : index < activeIndex ? 0 : 2;

  return (
    <Tag color={CourseStatusColor[status]}>{CourseStatusText[status]}</Tag>
  );
};

export default function CourseDetail(props: { id: number }) {
  const [data, setData] = useState<CourseResponse>();
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    const params = { id: props.id };
    getCourseById(params).then((res) => {
      const detail = res.data.data;
      console.log(detail);
      setData(detail);
      setCurrentIndex(
        detail.schedule.chapters.findIndex(
          (item) => item.id === detail.schedule.current
        )
      );
      setDataSource(detail.schedule.classTime);
    });
  }, []);

  const sales = [
    { label: "Price", value: data?.sales.price },
    { label: "Batches", value: data?.sales.batches },
    { label: "Students", value: data?.sales.studentAmount },
    { label: "Earnings", value: data?.sales.earnings },
  ];

  const columns = [
    {
      title: "Sunday",
      dataIndex: "Sunday",
      key: "Sunday",
      render: (_1, record) => {
        const day = record.split(" ")[0];
        const result = record.split(" ")[1];
        if (day === "Sunday") {
          return result;
        }
      },
    },
    {
      title: "Monday",
      dataIndex: "Monday",
      key: "Monday",
      render: (_1, record) => {
        const day = record.split(" ")[0];
        const result = record.split(" ")[1];
        if (day === "Monday") {
          return result;
        }
      },
    },
    {
      title: "Tuesday",
      dataIndex: "Tuesday",
      key: "Tuesday",
      render: (_1, record) => {
        const day = record.split(" ")[0];
        const result = record.split(" ")[1];
        if (day === "Tuesday") {
          return result;
        }
      },
    },
    {
      title: "Wednesday",
      dataIndex: "Wednesday",
      key: "Wednesday",
      render: (_1, record) => {
        const day = record.split(" ")[0];
        const result = record.split(" ")[1];
        if (day === "Wednesday") {
          return result;
        }
      },
    },
    {
      title: "Thursday",
      dataIndex: "Thursday",
      key: "Thursday",
      render: (_1, record) => {
        const day = record.split(" ")[0];
        const result = record.split(" ")[1];
        if (day === "Thursday") {
          return result;
        }
      },
    },
    {
      title: "Friday",
      dataIndex: "Friday",
      key: "Friday",
      render: (_1, record) => {
        const day = record.split(" ")[0];
        const result = record.split(" ")[1];
        if (day === "Friday") {
          return result;
        }
      },
    },
    {
      title: "Saturday",
      dataIndex: "Saturday",
      key: "Saturday",
      render: (_1, record) => {
        const day = record.split(" ")[0];
        const result = record.split(" ")[1];
        if (day === "Saturday") {
          return result;
        }
      },
    },
  ];

  return (
    <AppLayout>
      <Row>
        <Col span={9}>
          <CourseCard {...data} />
          <Divider />
          <Row>
            {sales.map((item, index) => (
              <Col span={6} key={index}>
                <b>{item.value}</b>
                <p>{item.label}</p>
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={14} offset={1}>
          <Card>
            <Heading>Course Detail</Heading>
            <b>Create Time</b>
            <p>{data?.createAt}</p>
            <b>Start Time</b>
            <p>{data?.startTime}</p>
            <Badge status={CourseStatusBadge[data?.status] as any}>
              <b>Status</b>
            </Badge>
            <Row>
              <Steps
                size="small"
                style={{ width: "auto" }}
                current={currentIndex}
              >
                {data?.schedule.chapters.map((item) => (
                  <Steps.Step title={item.name} key={item.id}></Steps.Step>
                ))}
              </Steps>
            </Row>
            <b>Course Code</b>
            <p>{data?.uid}</p>
            <b>Class Time</b>
            <Table
              pagination={false}
              size="small"
              columns={columns}
              dataSource={dataSource}
              bordered
            ></Table>
            <b>Category</b>
            <Row>
              {data?.type.map((current, index) => (
                <Tag color={TagColor[index]}>{current.name}</Tag>
              ))}
            </Row>
            <b>Description</b>
            <p>{data?.detail}</p>
            <b>Chapter</b>
            <Collapse defaultActiveKey={data?.schedule.current}>
              {data?.schedule.chapters.map((item, index) => (
                <Panel
                  header={item.name}
                  key={item.id}
                  extra={getChapterExtra(data.schedule, index)}
                >
                  <p>{item.content}</p>
                </Panel>
              ))}
            </Collapse>
          </Card>
        </Col>
      </Row>
    </AppLayout>
  );
}
