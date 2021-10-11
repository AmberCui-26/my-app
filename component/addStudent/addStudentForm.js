import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import styled from 'styled-components';

const ModalFormSubmit = styled(Form.Item)`
  position: absolute;
  bottom: 0;
  right: 8em;
  margin-bottom: 10px;
`;

const { Option } = Select;

export default function StudentForm(props) {
  const [form] = Form.useForm();
  const students = props.student;
  console.log(333, students);

  return (
    <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      form={form}
      name={!!students ? 'editStudentForm' : 'studentForm'}
      initialValues={{
        name: students?.name,
        email: students?.email,
        country: students?.country,
        type: students?.type.id,
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
        <Input placeholder="student name" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: 'email',
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
        name="type"
        label="Student Type"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select>
          <Option value={1}>Tester</Option>
          <Option value={2}>Developer</Option>
        </Select>
      </Form.Item>

      <ModalFormSubmit shouldUpdate={true}>
        {() => (
          <Button type="primary" htmlType="submit">
            {!!students ? 'Update' : 'Add'}
          </Button>
        )}
      </ModalFormSubmit>
    </Form>
  );
}
