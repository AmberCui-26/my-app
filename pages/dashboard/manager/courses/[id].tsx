import { Card, Row, Col, Badge, Steps, Collapse, Table, Tag } from "antd";
import React, { Children, useEffect, useState } from "react";
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

const StyledCol = styled(Col)`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  border-left: none;
  border-bottom: none;
  :last-child {
    border-right: none;
  }
`;

const StepsRow = styled(Row)`
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  .ant-steps-item-title {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 6em;
  }
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
  const [data, setData] = useState<CourseResponse>(null);
  const [currentIndex, setCurrentIndex] = useState<number>();

  useEffect(() => {
    const params = { id: props.id };
    getCourseById(params).then((res) => {
      const detail = res.data.data;
      setData(detail);
      setCurrentIndex(
        detail.schedule.chapters.findIndex(
          (item) => item.id === detail.schedule.current
        )
      );
    });
  }, []);

  const sales = [
    { label: "Price", value: data?.sales.price },
    { label: "Batches", value: data?.sales.batches },
    { label: "Students", value: data?.sales.studentAmount },
    { label: "Earnings", value: data?.sales.earnings },
  ];

  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const columns = week.map((title: string, index) => {
    const target: string =
      data?.schedule.classTime.find((item) =>
        item.toLocaleLowerCase().includes(title.toLocaleLowerCase())
      ) || "";
    const time = target.split(" ")[1];
    return { title, key: index, render: () => time };
  });
  const dataSource = new Array(1).fill({ id: 0 });

  return (
    <AppLayout>
      <Row>
        <Col span={9}>
          <CourseCard {...data}>
            <Row
              style={{
                width: "calc(100% + 48px)",
                marginLeft: "-24PX",
                marginBottom: "-24px",
              }}
            >
              {sales.map((item, index) => (
                <StyledCol span={6} key={index}>
                  <b style={{ color: "purple", fontSize: "24px" }}>
                    {item.value}
                  </b>
                  <p style={{ marginBottom: "0" }}>{item.label}</p>
                </StyledCol>
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
            <StepsRow>
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
            </StepsRow>

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
