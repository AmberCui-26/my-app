import Link from "next/link";
import Head from "next/head";
import Layout from "../component/layout";
import React, { useState } from "react";
import { Form, Input, Button, Radio, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import styled from "styled-components";

export const Heading = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: 2.3em;
  letter-spacing: -2px;
  font-stretch: extra-condensed !important;
`;

export const StyledButton = styled(Button)`
  width: 28rem;
`;

export default function LoginPage() {
  const [formLayout, setFormLayout] = useState("Student");

  return (
    <Layout>
      <Head>
        <title>React Web</title>
      </Head>
      <Heading>COURSE MANAGEMENT ASSISTANT</Heading>
      <Form
        layout={formLayout}
        initialValues={{
          layout: formLayout,
          remember: true,
        }}
      >
        <Form.Item name="layout">
          <Radio.Group value={formLayout}>
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
          <Input
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
          <Input.Password
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
      </Form>
    </Layout>
  );
}
