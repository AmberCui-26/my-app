import AppLayout from '../../../../component/layout/layout';
import {
  Breadcrumb,
  Layout,
  Button,
  Input,
  Table,
  Space,
  Form,
  message,
  Popconfirm,
} from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import ModalForm from '../../../../component/modal/modal';
import AddStudentForm from '../../../../component/addStudent/addStudentForm';
import { debounce } from 'lodash';
import {Student} from '../../../../lib/modal/student';

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
  const [visible, setVisible] = useState(false);
  const [editStudent, setEditStudent] = useState<Student>(null);
  const [value, setValue] = useState('');

  const onShowPageChange = (current) => {
    setPage(current);
  };

  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
    setPage(current);
  };

  const getStudentList = () => {
    const url = 'https://cms.chtoma.com/api/students?';
    const token = localStorage.getItem('token');
    const authHeader = { Authorization: `Bearer ${token}` };
    axios
      .get(url, {
        params: { limit: pageSize, page: page },
        headers: authHeader,
      })
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

  const dataSource = data;

  useEffect(() => {
    getStudentList();
  }, [page, pageSize]);

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
      render: (text, record) => (
        <Space>
          <a
            onClick={() => {
              setEditStudent(record);
              setVisible(true);
            }}
          >
            Edit
          </a>

          <Popconfirm
            title="Are you sure to delete？"
            okText="Confirm"
            cancelText="Cancel"
            onConfirm={() => {
              deleteStudent(record.id);
            }}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  console.log(222, editStudent);
  const deleteStudent = (id) => {
    const token = localStorage.getItem('token');
    const authHeader = { Authorization: `Bearer ${token}` };
    axios({
      method: 'delete',
      url: `https://cms.chtoma.com/api/students/${id}`,
      headers: authHeader,
    })
      .then(() => {
        message.success('Success');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = useCallback(
    debounce((event) => {
      const nextValue = event.target.value;
      const url = 'https://cms.chtoma.com/api/students?';
      const token = localStorage.getItem('token');
      const authHeader = { Authorization: `Bearer ${token}` };
      axios
        .get(url, {
          params: { limit: pageSize, page: page, query: nextValue },
          headers: authHeader,
        })
        .then((res) => {
          const info = res.data.data.students;
          const num = res.data.data.total;
          setTotal(num);
          setData(info);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000),
    [value]
  );
  const onCancel = () => {
    setVisible(false);
    setEditStudent(null);
  };

  return (
    <AppLayout>
      <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
      <Breadcrumb.Item>Student</Breadcrumb.Item>
      <Breadcrumb.Item>Student list</Breadcrumb.Item>
      <StyledContent>
        <>
          <Form.Provider
            onFormFinish={(name, { values }) => {
              setVisible(false);
              setEditStudent(null);
              const url = 'https://cms.chtoma.com/api/students';
              const token = localStorage.getItem('token');
              const authHeader = { Authorization: `Bearer ${token}` };
              if (name === 'studentForm') {
                const params = {
                  ...values,
                };
                axios
                  .post(url, params, { headers: authHeader })
                  .then(() => {
                    message.success('Success');
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else if (name === 'editStudentForm') {
                const params = {
                  ...values,
                  id: editStudent.id,
                };
                axios
                  .put(url, params, { headers: authHeader })
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
              onClick={() => {
                setVisible(true);
                setEditStudent(null);
              }}
            >
              Add User
            </StyledButton>

            <ModalForm
              titleName={!!editStudent ? 'Edit Student' : 'Add Student'}
              visible={visible}
              onCancel={onCancel}
            >
              <AddStudentForm student={editStudent} />
            </ModalForm>
          </Form.Provider>
        </>
        <StyledSearch
          placeholder="Search by name"
          onSearch={(value) => setValue(value)}
          onChange={onChange}
        />
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
