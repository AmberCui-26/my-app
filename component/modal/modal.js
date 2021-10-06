import React, { useState } from "react";
import { Modal, Button, Form, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

export const StyledButton = styled(Button)`
  margin: 16px 16px;
`;

export default function App() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const onReset = () => {
    setVisible(false);
    form.resetFields();
  };
  const onSubmit = () => {
    setVisible(false);
  };
  return (
    <>
      <StyledButton
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setVisible(true)}
      >
        Add
      </StyledButton>

      <Modal
        title="Add Student"
        centered
        visible={visible}
        onCancel={onReset}
        footer={[
          <Button key="submit" type="primary" onClick={onSubmit}>
            Add
          </Button>,
          <Button onClick={onReset}>Cancel</Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            name="Name"
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
            name="Email"
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
            name="Area"
            label="Area"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select>
              <Option value="china">China</Option>
              <Option value="new zealand">New Zealand</Option>
              <Option value="canada">Canada</Option>
              <Option value="australia">Australia</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="Student Type"
            label="Student Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select>
              <Option value="tester">Tester</Option>
              <Option value="developer">Developer</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
