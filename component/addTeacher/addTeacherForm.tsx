import React from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Slider,
} from "antd";
import styled from "styled-components";
import { Teacher } from "../../lib/modal/teacher";

const ModalFormSubmit = styled(Form.Item)`
  position: absolute;
  bottom: 0;
  right: 8em;
  margin-bottom: 10px;
`;

const { Option } = Select;

interface TeacherFormProps {
  teacherInfo?: Teacher;
}

export default function StudentForm(props: TeacherFormProps): JSX.Element {
  const [form] = Form.useForm();
  const { teacherInfo } = props;

  return (
    <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      form={form}
      name={!!teacherInfo ? "editTeacherForm" : "teacherForm"}
      initialValues={{
        name: teacherInfo?.name,
        email: teacherInfo?.email,
        country: teacherInfo?.country,
        phone: teacherInfo?.phone,
      }}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="teacher name" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: "email",
            message: '"email" is not a valid email',
          },
          {
            required: true,
            message: '"email" is required',
          },
        ]}
      >
        <Input placeholder="email" />
      </Form.Item>

      <Form.Item
        name="country"
        label="Area"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select>
          <Option value="China">China</Option>
          <Option value="New zealand">New Zealand</Option>
          <Option value="Canada">Canada</Option>
          <Option value="Australia">Australia</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Group compact>
          <Select defaultValue="Option1">
            <Option value="Option1">+86</Option>
            <Option value="Option2">+87</Option>
          </Select>
          <Input style={{ width: "50%" }} placeholder="mobile phone" />
        </Input.Group>
      </Form.Item>

      <Form.Item label="Skills" style={{ fontWeight: "bold" }} />

      <Form.Item
        name="skills"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Row>
          <Input style={{ width: "30%" }} />
          <Slider step={20} defaultValue={20} style={{ width: "60%" }}></Slider>
        </Row>
      </Form.Item>

      <ModalFormSubmit shouldUpdate={true}>
        <Button type="primary" htmlType="submit">
          {!!teacherInfo ? "Update" : "Add"}
        </Button>
      </ModalFormSubmit>
    </Form>
  );
}
