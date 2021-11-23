import AppLayout from "../../../../component/layout/layout";
import { Form, Input, Tabs, Select, Col } from "antd";
import { useCallback, useState, useEffect } from "react";
import { debounce } from "lodash";
import AddCourseForm from "../../../../component/addCourse/addCourseForm";
import CourseScheduleForm from "../../../../component/addCourse/courseScheduleForm";
import { searchCourses } from "../../../../lib/services/apiService";

const { Option } = Select;
const { TabPane } = Tabs;

export default function AddCourses() {
  const [selectItem, setSelectItem] = useState("uid");
  const [course, setCourse] = useState();
  const [searchCourse, setSearchCourse] = useState([]);
  const [userId, setUserId] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
  }, []);

  const onSearch = useCallback(
    debounce((value) => {
      const params = { [selectItem]: value, userId: userId };
      searchCourses(params).then((res) => {
        const data = res.data.data.courses;
        if (!!data) {
          setSearchCourse(data);
        }
      });
    }, 1000),
    [selectItem]
  );
  return (
    <AppLayout>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          searchItem: "uid",
        }}
      >
        <Form.Item name="search" style={{ marginLeft: "12px" }}>
          <Input.Group compact>
            <Form.Item name="searchItem">
              <Select
                defaultValue="uid"
                onChange={(value) => setSelectItem(value)}
              >
                <Option value="uid">Code</Option>
                <Option value="name">Name</Option>
                <Option value="type">Category</Option>
              </Select>
            </Form.Item>

            <Col span={5}>
              <Form.Item name="searchContent">
                <Select
                  style={{ width: "200%" }}
                  showSearch
                  placeholder={`Search course by ${selectItem}`}
                  onSearch={(value: string) => onSearch(value)}
                  filterOption={false}
                  onSelect={(id) => {
                    const course = searchCourse.find((item) => item.id === id);
                    setCourse(course);
                    console.log(course);
                  }}
                >
                  {searchCourse.map(({ id, name, teacherName, uid }) => (
                    <Option key={id} value={id}>
                      {name} - {teacherName} - {uid}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Input.Group>
        </Form.Item>

        <Form.Item style={{ marginTop: "-24px" }}>
          <Tabs
            size="large"
            defaultActiveKey="1"
            type="card"
            style={{ marginLeft: "12px" }}
          >
            <TabPane
              tab="Course Detail"
              key="1"
              style={{ marginLeft: "-12px" }}
            >
              <AddCourseForm course={course} />
            </TabPane>
            <TabPane
              tab="Course Schedule"
              key="2"
              style={{ marginLeft: "-12px" }}
            >
              <CourseScheduleForm />
            </TabPane>
          </Tabs>
        </Form.Item>
      </Form>
    </AppLayout>
  );
}
