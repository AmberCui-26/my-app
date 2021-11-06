import { Card, Row, Col, Badge, Steps, Collapse, Table, Tag } from "antd";
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

const H3 = styled.h3`
  margin: 1em 0;
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
          <CourseCard {...data}>
            <Row>
              {sales.map((item, index) => (
                <Col
                  span={6}
                  style={{
                    marginTop: "12px",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "1px solid #f0f0f0",
                    borderLeft: "none",
                    borderBottom: "none",
                    // width:{calc('100%+48px')},
                  }}
                  key={index}
                >
                  <b style={{ color: "purple", fontSize: "24px" }}>
                    {item.value}
                  </b>
                  <p style={{ marginBottom: "0" }}>{item.label}</p>
                </Col>
              ))}
            </Row>
          </CourseCard>
        </Col>
        <Col span={14} offset={1}>
          <Card>
            <Heading>Course Detail</Heading>

            <H3>Create Time</H3>
            <p>{data?.createAt}</p>

            <H3>Start Time</H3>
            <p>{data?.startTime}</p>

            <Badge
              status={CourseStatusBadge[data?.status] as any}
              offset={[5, 24]}
              dot={true}
            >
              <H3>Status</H3>
            </Badge>
            <Row
              style={{
                overflowX: "scroll",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <Steps
                size="small"
                style={{
                  width: "auto",
                }}
                current={currentIndex}
              >
                {data?.schedule.chapters.map((item) => (
                  <Steps.Step title={item.name} key={item.id}></Steps.Step>
                ))}
              </Steps>
            </Row>

            <H3>Course Code</H3>
            <p>{data?.uid}</p>

            <H3>Class Time</H3>
            <Table
              pagination={false}
              size="small"
              columns={columns}
              dataSource={dataSource}
              bordered
            ></Table>

            <H3>Category</H3>
            <Row>
              {data?.type.map((current, index) => (
                <Tag color={TagColor[index]}>{current.name}</Tag>
              ))}
            </Row>

            <H3>Description</H3>
            <p>{data?.detail}</p>
            <H3>Chapter</H3>
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
