import {
  Button,
  Form,
  Input,
  Col,
  Row,
  Select,
  TimePicker,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import moment from "moment";
import { UpdateCourse } from "../../lib/modal/course";
import { updateCourse } from "../../lib/services/apiService";

const { Option } = Select;

const Heading = styled.h1`
  font-size: 150%;
  margin-left: 20px;
`;

interface CourseScheduleFormProps {
  courseId: number;
  scheduleId: number;
  onSuccess: () => void;
}

const initialValues = {
  chapters: [{ name: "", content: "" }],
  classTime: [{ weekday: "", time: "" }],
};
export default function CourseScheduleForm(props: CourseScheduleFormProps) {
  const [form] = Form.useForm();
  const onFinish = (values: UpdateCourse) => {
    const originClassTime = values.classTime;
    const classTime = originClassTime.map(
      (item) => `${item.weekday} ${moment(item.time).format("hh:mm:ss")}`
    );
    const params = {
      ...values,
      chapters: values.chapters.map((item, index) => ({
        ...item,
        order: index + 1,
      })),
      classTime: classTime,
      courseId: props.courseId,
      scheduleId: props.scheduleId,
    };
    updateCourse(params).then(() => message.success("Success"));
    props.onSuccess();
  };

  return (
    <Form
      size="large"
      form={form}
      name="schedule"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={initialValues}
    >
      <Row>
        <Col span={10}>
          <Heading>Chapters</Heading>
          <Form.List name="chapters">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                  <Row>
                    <Col span={8} offset={1}>
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        fieldKey={[fieldKey, "name"]}
                        rules={[
                          {
                            required: true,
                            message: `'classTime.${index}.name' is required`,
                          },
                        ]}
                      >
                        <Input placeholder="Chapter Name" />
                      </Form.Item>
                    </Col>

                    <Col span={12} offset={1}>
                      <Form.Item
                        {...restField}
                        name={[name, "content"]}
                        fieldKey={[fieldKey, "content"]}
                        rules={[
                          {
                            required: true,
                            message: `'classTime.${index}.content' is required`,
                          },
                        ]}
                      >
                        <Input placeholder="Chapter Content" />
                      </Form.Item>
                    </Col>

                    <Col span={1} offset={1}>
                      <MinusCircleOutlined
                        onClick={() => {
                          if (fields.length > 1) {
                            remove(name);
                          } else {
                            message.warning(
                              "You must set at least one chapter"
                            );
                          }
                        }}
                      />
                    </Col>
                  </Row>
                ))}
                <Col span={21} offset={1}>
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Chapter
                    </Button>
                  </Form.Item>
                </Col>
              </>
            )}
          </Form.List>
        </Col>

        <Col span={10} offset={2}>
          <Heading>Class Times</Heading>
          <Form.List name="classTime">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                  <Row>
                    <Col span={8} offset={1}>
                      <Form.Item
                        style={{ width: "100%" }}
                        {...restField}
                        name={[name, "weekday"]}
                        fieldKey={[fieldKey, "weekday"]}
                        rules={[
                          {
                            required: true,
                            message: `'classTime.${index}.weekday' is required`,
                          },
                        ]}
                      >
                        <Select>
                          <Option value="Sunday">Sunday</Option>
                          <Option value="Monday">Monday</Option>
                          <Option value="Tuesday">Tuesday</Option>
                          <Option value="Wednesday">Wednesday</Option>
                          <Option value="Thursday">Thursday</Option>
                          <Option value="Friday">Friday</Option>
                          <Option value="Saturday">Saturday</Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12} offset={1}>
                      <Form.Item
                        {...restField}
                        name={[name, "time"]}
                        fieldKey={[fieldKey, "time"]}
                        rules={[
                          {
                            required: true,
                            message: `'classTime.${index}.time' is required`,
                          },
                        ]}
                      >
                        <TimePicker style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>

                    <Col span={1} offset={1}>
                      <Form.Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            if (fields.length > 1) {
                              remove(name);
                            } else {
                              message.warning(
                                "You must set at least one class time"
                              );
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}

                <Col span={21} offset={1}>
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Class Time
                    </Button>
                  </Form.Item>
                </Col>
              </>
            )}
          </Form.List>
        </Col>
        <Form.Item>
          <Button
            style={{ marginLeft: "16px" }}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
}
