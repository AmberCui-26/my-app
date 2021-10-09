import AppLayout from '../../../component/layout/layout';
import {
  Breadcrumb,
  Layout,
  Button,
  Input,
  Table,
  Space,
  Form,
  message,
} from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ModalForm from '../../../component/modal/modal';

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
  const [total, setTotal] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const onShowPageChange = (current) => {
    setPage(current);
  };
  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
    setPage(current);
  };
  const getStudentList = () => {
    const url =
      'https://cms.chtoma.com/api/students?limit=' + pageSize + '&page=' + page;
    const token = localStorage.getItem('token');
    const authHeader = { Authorization: `Bearer ${token}` };
    axios
      .get(url, { headers: authHeader })
      .then((res) => {
        const info = res.data.data.students;
        const num = res.data.data.total;
        setTotal(num);
        setData(info);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onDelete = () => {
    console.log(1);
  };
  const dataSource = data;
  useEffect(() => {
    getStudentList();
  }, [pageSize, page, total]);
  const columns = [
    {
      title: 'No.',
      key: 'index',
      render: (_1, _2, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
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
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Area',
      dataIndex: 'country',
      filters: [
        {
          text: 'China',
          value: 'China',
        },
        {
          text: 'New Zealand',
          value: 'New Zealand',
        },
        {
          text: 'Canada',
          value: 'Canada',
        },
        {
          text: 'Australia',
          value: 'Australia',
        },
      ],
      onFilter: (value, record) => record.country.indexOf(value) === 0,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Selected Curriculum',
      dataIndex: 'courses',
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
      title: 'Student Type',
      dataIndex: 'type',
      render: (type) => {
        if (type) {
          return type['name'];
        } else {
          return ' ';
        }
      },
      filters: [
        {
          text: 'developer',
          value: 'developer',
        },
        {
          text: 'tester',
          value: 'tester',
        },
      ],
      onFilter: (value, record) => {
        if (record.type) {
          return record.type.name.indexOf(value) === 0;
        }
      },
    },
    {
      title: 'Join Time',
      dataIndex: 'createdAt',
      render: (createdAt) => {
        const date = new Date();
        const year = date.getFullYear();
        const createdYear = createdAt.substring(0, 4);
        const gap = year - createdYear;
        return gap + ' years ago';
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space>
          <a>Edit</a>
          <a onClick={onDelete}>Delete</a>
        </Space>
      ),
    },
  ];
  const [visible, setVisible] = useState(false);
  return (
    <AppLayout>
      <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
      <Breadcrumb.Item>Student</Breadcrumb.Item>
      <Breadcrumb.Item>Student list</Breadcrumb.Item>
      <StyledContent>
        <>
          <Form.Provider
            onFormFinish={(name, { values }) => {
              if (name === 'studentForm') {
                setVisible(false);
                const url = 'https://cms.chtoma.com/api/students';
                const token = localStorage.getItem('token');
                const authHeader = { Authorization: `Bearer ${token}` };
                const params = {
                  ...values,
                };
                console.log(params);
                axios
                  .post(url, params, { headers: authHeader })
                  .then(() => {
                    message.success('Success');
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            }}
          >
            <StyledButton
              htmlType="button"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setVisible(true)}
            >
              Add User
            </StyledButton>

            <ModalForm visible={visible} onCancel={() => setVisible(false)} />
          </Form.Provider>
        </>
        <StyledSearch placeholder="Search by name" onSearch={onSearch} />
        <StyledTable
          pagination={{
            total: total,
            onChange: onShowPageChange,
            onShowSizeChange: onShowSizeChange,
          }}
          columns={columns}
          dataSource={dataSource}
        />
      </StyledContent>
    </AppLayout>
  );
}
