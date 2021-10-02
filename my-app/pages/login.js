import Link from 'next/link';
import React, { useState } from 'react';
import { Form, Input, Button, Radio, Checkbox, Col, Row, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { AES } from 'crypto-js';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';

export const Heading = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: 220%;
  letter-spacing: -2px;
  font-stretch: extra-condensed !important;
  margin-top: 10%;
`;

export const StyledButton = styled(Button)`
  width: 100%;
`;

export default function LoginPage() {
  const [form] = Form.useForm();
  const [roles, setRole] = useState('student');
  const router = useRouter();
  const onFinish = (values) => {
    const url = 'https://cms.chtoma.com/api/login';
    const params = {
      ...values,
      password: AES.encrypt(values.password, 'cms').toString(),
    };
    axios({
      method: 'post',
      url: url,
      data: params,
    })
      .then((res) => {
        console.log(res);
        const { userInfo } = res;
        localStorage.setItem('userInfo', userInfo);
        router.push('dashboard');
      })
      .catch((error) => {
        message.error('Please check your password or email');
      });
  };

  return (
    <div style={{ height: '100%' }}>
      <Heading>COURSE MANAGEMENT ASSISTANT</Heading>
      <Row justify="center">
        <Col md={8} sm={24}>
          <Form
            role={roles}
            form={form}
            initialValues={{
              role: roles,
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item name="role">
              <Radio.Group value={roles}>
                <Radio.Button value="student">Student</Radio.Button>
                <Radio.Button value="teacher">Teacher</Radio.Button>
                <Radio.Button value="manager">Manager</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="email"
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
              <Input
                type="email"
                placeholder="Please input email"
                prefix={<UserOutlined />}
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
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item name="remember">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <StyledButton type="primary" htmlType="submit">
                Sign in
              </StyledButton>
            </Form.Item>

            <Form.Item>
              No account?{' '}
              <Link href="/signup">
                <a style={{ color: 'blue' }}>Sign up</a>
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
