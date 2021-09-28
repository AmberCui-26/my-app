import Link from "next/link";
import React, { useState } from "react";
import { Form, Input, Button, Radio, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import styled from "styled-components";

export const Heading = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  letter-spacing: -2px;
  font-stretch: extra-condensed !important;
  margin-top: 6rem;
`;

export const StyledForm = styled(Form)`
  margin-left: 28rem;
`;

export const StyledInput = styled(Input)`
  width: 28rem;
`;

export const StyledPassword = styled(Input.Password)`
  width: 28rem;
`;

export const StyledButton = styled(Button)`
  width: 28rem;
`;

export default function LoginPage() {
  const [role, setRole] = useState("Student");

  return (
    <div>
      <Heading>COURSE MANAGEMENT ASSISTANT</Heading>

      <StyledForm
        layout={role}
        initialValues={{
          layout: role,
          remember: true,
        }}
      >
        <Form.Item name="layout">
          <Radio.Group value={role}>
            <Radio.Button value="Student">Student</Radio.Button>
            <Radio.Button value="Teacher">Teacher</Radio.Button>
            <Radio.Button value="Manager">Manager</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="email"
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
          <StyledInput
            placeholder="Please input email"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '"password" is required',
            },
            {
              min: 4,
              message: '"password" must be between 4 and 16 characters',
            },
            {
              max: 16,
              message: '"password" must be between 4 and 16 characters',
            },
          ]}
        >
          <StyledPassword
            placeholder="Please input password"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <StyledButton type="primary">
            <Link href="/dashboard">
              <a>Sign in</a>
            </Link>
          </StyledButton>
        </Form.Item>

        <Form.Item>
          No account?{" "}
          <Link href="/signup">
            <a>Sign up</a>
          </Link>
        </Form.Item>
      </StyledForm>
    </div>
  );
}
