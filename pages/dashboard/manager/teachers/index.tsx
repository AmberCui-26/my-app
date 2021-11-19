import AppLayout from "../../../../component/layout/layout";
import { Button, Input, Table, Space, Form, message, Popconfirm } from "antd";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import ModalForm from "../../../../component/modal/modal";
import AddTeacherForm from "../../../../component/addTeacher/addTeacherForm";
import { debounce } from "lodash";
import { Skills, Teacher } from "../../../../lib/modal/teacher";
import {
  getTeachers,
  deleteTeacher,
  searchTeachers,
  addTeacher,
  editTeachers,
} from "../../../../lib/services/apiService";
import Link from "next/link";
import { AddUserRequest, EditRequest } from "../../../../lib/modal/request";
import { SortOrder } from "antd/lib/table/interface";

const { Search } = Input;

export const StyledButton = styled(Button)`
  margin: 16px 16px;
`;

export const StyledSearch = styled(Search)`
  margin: 16px;
  width: 200px;
`;

export const StyledTable = styled(Table)`
  margin: 0px 16px;
`;

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState<number>();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [editTeacher, setEditTeacher] = useState<Teacher>(null);
  const [value, setValue] = useState("");

  const onShowPageChange = (current: number) => {
    setPage(current);
  };

  const onShowSizeChange = (current: number, pageSize: number) => {
    setPageSize(pageSize);
    setPage(current);
  };
  const getTeacherList = useCallback(
    (pageSize: number, page: number) => {
      const params = { limit: pageSize, page: page };
      getTeachers(params)
        .then((res) => {
          const info = res.data.data.teachers;
          const num = res.data.data.total;
          setTotal(num);
          setData(info);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [pageSize, page]
  );

  useEffect(() => {
    getTeacherList(pageSize, page);
  }, [getTeacherList]);

  const onDelete = (id: number) => {
    const params = { id };
    deleteTeacher(params)
      .then(() => {
        message.success("Success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = useCallback(
    debounce((event) => {
      const nextValue = event.target.value;
      const params = { limit: pageSize, page: page, query: nextValue };
      searchTeachers(params)
        .then((res) => {
          const info = res.data.data.teachers;
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
    setEditTeacher(null);
  };

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
      sorter: (a: { name: string }, b: { name: string }) => {
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
      sortDirections: ["descend", "ascend"] as SortOrder[],
      render: (name, record) => {
        return (
          <Link href={"/dashboard/manager/teachers/" + record.id}>
            <a>{name}</a>
          </Link>
        );
      },
    },
    {
      title: "Area",
      dataIndex: "country",
      key: "country",
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
      onFilter: (value, record: Teacher) => record.country.indexOf(value) === 0,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Skill",
      dataIndex: "skills",
      render: (skills: Skills[]) =>
        skills.map((skill, index: number) => {
          if (index < skills.length - 1) {
            return `${skill.name},`;
          } else {
            return `${skill.name}`;
          }
        }),
    },
    {
      title: "Course Amount",
      dataIndex: "courseAmount",
      key: "courseAmount",
      render: (amount: number) => `${amount}`,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => `${phone}`,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record: Teacher) => (
        <Space>
          <a
            onClick={() => {
              setEditTeacher(record);
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
  return (
    <AppLayout>
      <div
        style={{
          backgroundColor: "#fff",
          margin: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Form.Provider
            onFormFinish={(name, { values }) => {
              setVisible(false);
              if (name === "studentForm") {
                addTeacher(values as AddUserRequest)
                  .then(() => {
                    message.success("Success");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else if (name === "editStudentForm") {
                const params = {
                  ...values,
                  id: editTeacher.id,
                };
                editTeachers(params as EditRequest)
                  .then((res) => {
                    setEditTeacher(res.data.data);
                    message.success("Success");
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
                setEditTeacher(null);
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
              titleName={!!editTeacher ? "Edit Teacher" : "Add Teacher"}
              visible={visible}
              onCancel={onCancel}
            >
              <AddTeacherForm teacherInfo={editTeacher} />
            </ModalForm>
          </Form.Provider>
        </div>
        <Table
          pagination={{
            total: total,
            onChange: onShowPageChange,
            onShowSizeChange: onShowSizeChange,
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </AppLayout>
  );
}
