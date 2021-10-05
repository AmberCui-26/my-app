import AppLayout from "../../../component/layout/layout";
import { Breadcrumb, Layout, Button, Input, Table, Space } from "antd";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";

const { Content, Header } = Layout;
const { Search } = Input;
const onSearch = (value) => console.log(value);
const columns = [
  {
    title: "No.",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Area",
    dataIndex: "country",
    filters: [
      {
        text: "China",
        value: "China",
      },
      {
        text: "New Zealand",
        value: "New Zealand",
      },
      {
        text: "Canada",
        value: "Canada",
      },
      {
        text: "Australia",
        value: "Australia",
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Selected Curriculum",
    dataIndex: "courses",
    render: (courses) => {
      var arr = Object.keys(courses);
      const names = [];
      for (var i = 0; i < arr.length; i++) {
        names[i] += courses[i].name + ",";
      }
      // console.log(names);
      return names;
    },
  },
  {
    title: "Student Type",
    dataIndex: "type",
    filters: [
      {
        text: "developer",
        value: "developer",
      },
      {
        text: "tester",
        value: "tester",
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    render: (type) => type["name"],
  },
  {
    title: "Join Time",
    dataIndex: "createdAt",
    render: (createdAt) => {
      const date = new Date();
      const year = date.getFullYear();
      const createdYear = createdAt.substring(0, 4);
      const gap = year - createdYear;
      return gap + " years ago";
    },
  },
  {
    title: "Action",
    key: "operation",
    render: () => (
      <Space>
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export const StyledButton = styled(Button)`
  margin: 16px 16px;
`;

export const StyledSearch = styled(Search)`
  margin: 16px;
  margin-left: 629px;
  width: 200px;
`;

export const StyledContent = styled(Content)`
  margin: 20px -9px;
  background: #fff;
`;

export const StyledTable = styled(Table)`
  margin: 0 16px;
  // max-width: 500px;
`;

export default function Dashboard() {
  const [data, setData] = useState();
  const getStudentList = () => {
    const url = "https://cms.chtoma.com/api/students?page=1&limit=10";
    const token = localStorage.getItem("token");
    const authHeader = { Authorization: `Bearer ${token}` };
    axios
      .get(url, { headers: authHeader })
      .then((res) => {
        const info = res.data.data.students;
        setData(info);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const dataSource = data;
  console.log(dataSource);
  return (
    <AppLayout>
      <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
      <Breadcrumb.Item>Student</Breadcrumb.Item>
      <Breadcrumb.Item>Student list</Breadcrumb.Item>
      <StyledContent>
        <StyledButton
          onClick={getStudentList}
          type="primary"
          icon={<PlusOutlined />}
        >
          Add
        </StyledButton>
        <StyledSearch placeholder="Search by name" onSearch={onSearch} />
        <StyledTable
          // style={{ maxWidth: "500px" }}
          columns={columns}
          dataSource={dataSource}
        />
      </StyledContent>
    </AppLayout>
  );
}
