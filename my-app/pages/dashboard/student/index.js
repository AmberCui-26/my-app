import AppLayout from "../../../component/layout/layout";
import { Breadcrumb, Layout, Button, Input, Table, Space } from "antd";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../../../component/modal/modal";

const onSearch = (value) => console.log(value);
const { Content } = Layout;
const { Search } = Input;

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
`;

export default function Dashboard() {
  const [data, setData] = useState();
  // const [pagination, setPagination]=useState(10);
  const getStudentList = () => {
    const url = "https://cms.chtoma.com/api/students?page=1&limit=308";
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
  useEffect(() => {
    getStudentList();
  }, []);
  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      // render: () => ++i,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      },
      sortDirections: ["descend", "ascend"],
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
      onFilter: (value, record) => record.country.indexOf(value) === 0,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Selected Curriculum",
      dataIndex: "courses",
      render: (courses) =>
        courses.map((course, index) => {
          if (index < courses.length - 1) {
            return `${course.name},`;
          } else {
            return `${course.name}`;
          }
        }),
    },
    {
      title: "Student Type",
      dataIndex: "type",
      render: (type) => {
        if (type) {
          return type["name"];
        } else {
          return " ";
        }
      },
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
      onFilter: (value, record) => {
        if (record.type) {
          return record.type.name.indexOf(value) === 0;
        }
      },
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
  return (
    <AppLayout>
      <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
      <Breadcrumb.Item>Student</Breadcrumb.Item>
      <Breadcrumb.Item>Student list</Breadcrumb.Item>
      <StyledContent>
        <Modal />
        <StyledSearch placeholder="Search by name" onSearch={onSearch} />
        <StyledTable
          // pagination={pagination}
          columns={columns}
          dataSource={dataSource}
        />
      </StyledContent>
    </AppLayout>
  );
}
