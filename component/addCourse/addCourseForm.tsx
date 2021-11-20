import {
  Button,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Select,
  DatePicker,
  Upload,
  message,
} from "antd";
import { useEffect, useState } from "react";
import {
  addCourse,
  getCourseCode,
  getCoursesType,
  searchTeacher,
} from "../../lib/services/apiService";
import { CourseType } from "../../lib/modal/course";
import moment from "moment";
import ImgCrop from "antd-img-crop";
import { InboxOutlined } from "@ant-design/icons";
import { AddCourse } from "../../lib/modal/response";
import styled from "styled-components";

const UploadItem = styled(Form.Item)`
  .ant-upload.ant-upload-select.ant-upload-select-picture-card {
    height: 290px;
    width: 357px;
  }
`;

const { Option } = Select;

interface AddCourseFormProps {
  onSuccess?: (course: AddCourse) => void;
}
export default function AddCourseForm(props: AddCourseFormProps) {
  const [form] = Form.useForm();
  const [courseType, setCourseType] = useState<CourseType[]>([]);
  const [teachers, setTeachers] = useState([]);
  const [fileList, setFileList] = useState([]);

  const onSearch = (value) => {
    const params = { query: value };
    searchTeacher(params)
      .then((res) => {
        const data = res.data.data.teachers;
        if (!!data) {
          setTeachers(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onFinish = (values: any) => {
    const data = moment(values.startTime).format("YYYY-MM-DD");
    console.log("Received values of form: ", { ...values, startTime: data });
    const params = { ...values, startTime: data };
    addCourse(params)
      .then((res) => {
        message.success("Success");
        props.onSuccess(res.data.data);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  useEffect(() => {
    getCoursesType().then((res) => {
      const data = res.data.data;
      setCourseType(data);
    });
    getCourseCode().then((res) => {
      form.setFieldsValue({ uid: res.data.data });
    });
  }, []);

  return (
    <Form
      labelCol={{ offset: 1 }}
      wrapperCol={{ offset: 1 }}
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        durationUnit: 2,
      }}
    >
      <Row>
        <Col span={8}>
          <Form.Item
            label="Course Name"
            name="name"
            rules={[{ required: true, message: "Please input course name" }]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col span={16}>
          <Row>
            <Col span={8}>
              <Form.Item
                label="Teacher"
                name="teacherId"
                rules={[{ required: true }]}
              >
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select teacher"
                  onSearch={(value: string) => onSearch(value)}
                  filterOption={false}
                >
                  {teachers.map((teacher) => (
                    <Option value={teacher.id}>{teacher.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Type" name="type" rules={[{ required: true }]}>
                <Select mode="multiple" style={{ width: "100%" }}>
                  {courseType.map((type) => (
                    <Option value={type.id}>{type.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Course Code" name="uid">
                <Input disabled type="text" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <Form.Item name="startTime" label="Start Date">
            <DatePicker
              style={{ width: "100%" }}
              disabledDate={(current) =>
                current && current < moment().endOf("day")
              }
            />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Price is required" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              // @ts-ignore
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            label="Student Limit"
            name="maxStudents"
            rules={[{ required: true, message: "maxStudents is required" }]}
          >
            <InputNumber min={1} max={10} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Duration">
            <Input.Group compact>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Duration must be greater than 0!",
                  },
                ]}
                noStyle
                name="duration"
              >
                <InputNumber min={1} style={{ width: "80%" }} />
              </Form.Item>

              <Form.Item
                noStyle
                name="durationUnit"
                rules={[{ required: true }]}
              >
                <Select defaultValue={2} style={{ width: "20%" }}>
                  <Option value={1}>Year</Option>
                  <Option value={2}>Month</Option>
                  <Option value={3}>Day</Option>
                  <Option value={4}>Week</Option>
                  <Option value={5}>Hour</Option>
                </Select>
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>

        <Col span={16}>
          <Row>
            <Col span={12}>
              <Form.Item
                name="detail"
                label="Description"
                rules={[
                  { required: true },
                  {
                    min: 3,
                    max: 1000,
                    message:
                      "Description length must between 100 - 1000 characters.",
                  },
                ]}
              >
                <Input.TextArea rows={6} style={{ height: "290px" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <UploadItem name="cover" label="Cover">
                <ImgCrop rotate>
                  <Upload
                    className="2"
                    style={{ height: "290px" }}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 1 && (
                      <div>
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined
                            style={{ fontSize: "3em", color: "#288aeb" }}
                          />
                        </p>
                        <p
                          className="ant-upload-text"
                          style={{ fontSize: "1.7em", color: "gray" }}
                        >
                          Click or drag file to this area to upload
                        </p>
                      </div>
                    )}
                  </Upload>
                </ImgCrop>
              </UploadItem>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Button style={{ marginLeft: "12px" }} type="primary" htmlType="submit">
          Create Course
        </Button>
      </Row>
    </Form>
  );
}
