import AppLayout from '../../../../component/layout/layout';
import { Button, Input, Table, Space, Form, message, Popconfirm } from 'antd';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import ModalForm from '../../../../component/modal/modal';
import AddStudentForm from '../../../../component/addStudent/addStudentForm';
import { debounce } from 'lodash';
import { Student } from '../../../../lib/modal/student';
import { CourseInfo } from '../../../../lib/modal/course';
import {
  getStudents,
  deleteStudent,
  searchStudents,
  addStudent,
  editStudents,
} from '../../../../lib/services/apiService';
import { StudentType } from '../../../../lib/modal/type';
import Link from 'next/link';

// const { Content } = Layout;
const { Search } = Input;

export const StyledButton = styled(Button)`
  margin: 16px 16px;
`;

export const StyledSearch = styled(Search)`
  margin: 16px;
  width: 200px;
`;

export const StyledTable = styled(Table)`
  margin: 0 16px;
`;

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState<number>();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [editStudent, setEditStudent] = useState<Student>(null);
  const [value, setValue] = useState('');

  const onShowPageChange = (current: number) => {
    setPage(current);
  };

  const onShowSizeChange = (current: number, pageSize: number) => {
    setPageSize(pageSize);
    setPage(current);
  };

  const getStudentList = (pageSize: number, page: number) => {
    const params = { limit: pageSize, page: page };
    getStudents(params)
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

  useEffect(() => {
    getStudentList(pageSize, page);
  }, [pageSize, page]);

  const columns = [
    {
      title: 'No.',
      key: 'index',
      render: (_1, _2, index: number) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      render: (name, record) => {
        return (
          <Link href={'/dashboard/manager/student/' + record.id}>
            <a>{name}</a>
          </Link>
        );
      },
    },
    {
      title: 'Area',
      dataIndex: 'country',
      key: 'country',
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
      onFilter: (value, record: Student) => record.country.indexOf(value) === 0,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Selected Curriculum',
      dataIndex: 'courses',
      render: (courses: CourseInfo[]) =>
        courses.map((course, index: number) => {
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
      key: 'type',
      render: (type: StudentType) => {
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
      key: 'createTime',
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
      render: (text, record: Student) => (
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
              onDelete(record.id);
            }}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onDelete = async (id: number) => {
    const params = id;
    await deleteStudent(params)
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
      const params = { limit: pageSize, page: page, query: nextValue };
      searchStudents(params)
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

  // const refreshStudentList=()=>{
  //   setData(data.map((student,index)=>{
  //       if(student.id==editStudent.id){
  //         // return editStudent;
  //         return data.splice(index,1,editStudent);
  //       }else{
  //         return student;
  //       }
  //   }));
  // };
  // export const StyledContent = styled(Content)`
  //   margin: 20px -9px;
  //   background: #fff;
  // `;
  return (
    <AppLayout>
      <div
        style={{
          backgroundColor: '#fff',
          margin: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Form.Provider
          onFormFinish={async (name, { values }) => {
            setVisible(false);
            if (name === 'studentForm') {
              const params = {
                ...values,
              };
              await addStudent(params)
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
              await editStudents(params)
                .then(() => {
                  message.success('Success');
                })
                .catch((error) => {
                  console.log(error);
                });
            }
            // refreshStudentList();
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

          <StyledSearch
            placeholder="Search by name"
            onSearch={(value: string) => setValue(value)}
            onChange={onChange}
          />

          <ModalForm
            titleName={!!editStudent ? 'Edit Student' : 'Add Student'}
            visible={visible}
            onCancel={onCancel}
          >
            <AddStudentForm studentInfo={editStudent} />
          </ModalForm>
        </Form.Provider>
      </div>

      <StyledTable
        pagination={{
          total: total,
          onChange: onShowPageChange,
          onShowSizeChange: onShowSizeChange,
        }}
        columns={columns}
        dataSource={data}
      />
    </AppLayout>
  );
}
