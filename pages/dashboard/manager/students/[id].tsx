import { Card, Row, Col, Tabs, Avatar, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import AppLayout from "../../../../component/layout/layout";
import { StudentResponse } from "../../../../lib/modal/response";
import { getStudentById } from "../../../../lib/services/apiService";
import styled from "styled-components";
import { TagColor } from "../../../../lib/modal/config";

const { TabPane } = Tabs;

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

export default function StudentDetail(props: { id: number }) {
  const [data, setData] = useState<StudentResponse>();
  const columns = [
    {
      title: "No.",
      key: "index",
      render: (_1, _2, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: { id: number; name: string }[]) =>
        type.map((current) => current.name),
    },
    {
      title: "Join Time",
      dataIndex: "createdAt",
      key: "time",
    },
  ];
  useEffect(() => {
    getStudentById(props.id).then((res) => {
      const detail = res.data.data;
      setData(detail);
    });
  }, []);
  const info = [
    { label: "Name", value: data?.name },
    { label: "Age", value: data?.age },
    { label: "Email", value: data?.email },
    { label: "Phone", value: data?.phone },
  ];
  const about = [
    { label: "Education:", value: data?.education },
    { label: "Area:", value: data?.country },
    { label: "Gender:", value: data?.gender == 1 ? "Male" : "Female" },
    {
      label: "Member Period:",
      value: `${data?.memberStartAt} - ${data?.memberEndAt}`,
    },
    { label: "Type:", value: data?.type.name },
    { label: "Create Time:", value: data?.createdAt },
    { label: "Update Time:", value: data?.updatedAt },
  ];
  const dataSource = data?.courses;
  return (
    <AppLayout>
      <Row>
        <Col span={9}>
          <Card>
            <div style={{ textAlign: "center" }}>
              <Avatar
                src={data?.avatar}
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              />
            </div>
            <Row gutter={[6, 16]}>
              {info.map((current) => (
                <Col
                  span={12}
                  key={current.label}
                  style={{ textAlign: "center" }}
                >
                  <b>{current.label}</b>
                  <p>{current.value}</p>
                </Col>
              ))}
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: "center" }}>
                <b>Address</b>
                <p>{data?.address}</p>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={14} offset={1}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab="About" key="1">
                <Heading>Information</Heading>
                <Row gutter={[6, 16]}>
                  {about.map((current) => (
                    <Col
                      span={24}
                      key={current.label}
                      style={{ textAlign: "left" }}
                    >
                      <b
                        style={{
                          minWidth: 160,
                          display: "inline-block",
                        }}
                      >
                        {current.label}
                      </b>
                      <span>{current.value}</span>
                    </Col>
                  ))}
                </Row>
                <Heading>Interesting</Heading>
                {data?.interest.map((current, index) => (
                  <Tag color={TagColor[index]}>{current}</Tag>
                ))}
                <Heading>Description</Heading>
                <span>{data?.description}</span>
              </TabPane>
              <TabPane tab="Courses" key="2">
                <Table columns={columns} dataSource={dataSource} />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </AppLayout>
  );
}
