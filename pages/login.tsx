import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Radio, Checkbox, Col, Row, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { AES } from 'crypto-js';
import { useRouter } from 'next/dist/client/router';
import { login } from '../lib/services/apiService';

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
  const onFinish = (values: {
    role: 'student' | 'teacher' | 'manager';
    email: string;
    password: string;
  }) => {
    const params = {
      ...values,
      password: AES.encrypt(values.password, 'cms').toString(),
    };
    login(params)
      .then((res) => {
        const token = res.data.data.token;
        localStorage.setItem('token', token);
        router.push('dashboard/manager');
      })
      .catch((error) => {
        message.error('Please check your password or email');
      });
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!!token) {
      router.push('/dashboard/manager');
    }
  }, []);

  // let routes = [
  //   {
  //     breadcrumb: '一级目录',
  //     path: '/a',
  //     component: 'yulu',
  //     items: [
  //       {
  //         breadcrumb: '二级目录',
  //         path: '/a/b',
  //         component: 'amy',
  //         items: [
  //           {
  //             breadcrumb: '三级目录1',
  //             path: '/a/b/c1',
  //             component: 'albert',
  //             exact: true,
  //           },
  //           {
  //             breadcrumb: '三级目录2',
  //             path: '/a/b/c2',
  //             component: 'amber',
  //             exact: true,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];
  // const flattenRoutes = (arr) =>
  //   arr.reduce(function (prev, item) {
  //     console.log('item', item);
  //     prev.push(item);
  //     console.log('prev', prev);
  //     return prev.concat(
  //       Array.isArray(item.items) ? flattenRoutes(item.items) : item
  //     );
  //   }, []);
  // console.log('result', flattenRoutes(routes));
  interface SideNav {
    title: string;
    path: string;
    subNav?: SideNav[];
  }

  const source: SideNav[] = [
    {
      title: 'Car',
      subNav: [
        {
          title: 'HONDA',
          path: 'honda',
          subNav: [
            {
              title: 'DONGFENG',
              path: 'dongfeng',
              subNav: [
                { title: 'NSPIRE', path: 'nspire' },
                { title: 'ENVIX', path: 'envix' },
                { title: 'CIVIC', path: 'civic' },
              ],
            },
            {
              title: 'GUANGQI',
              path: 'guangqi',
              subNav: [
                { title: 'AVANCIER', path: 'avancier' },
                { title: 'ACCORD', path: 'accord' },
              ],
            },
          ],
        },
        {
          title: 'TOYOTA',
          path: 'toyota',
          subNav: [
            { title: 'COROLLA', path: 'corolla' },
            { title: 'CAMRY', path: 'camry' },
            { title: 'PRADO', path: 'prado' },
            { title: 'ALPHARD', path: 'alphard' },
          ],
        },
      ],
      path: 'car',
    },
    {
      title: 'Area',
      path: 'area',
      subNav: [
        {
          title: 'NORTH',
          path: 'north',
          subNav: [
            { title: 'BEIJING', path: 'beijing' },
            { title: 'CHANGCHU', path: 'changchu' },
          ],
        },
        {
          title: 'SOUTH',
          path: 'south',
          subNav: [
            { title: 'SHANGHAI', path: 'shanghai' },
            { title: 'GUANGZHOU', path: 'guangzhou' },
          ],
        },
      ],
    },
    {
      title: 'Country',
      path: 'country',
      subNav: [
        {
          title: 'CHINA',
          path: 'china',
          subNav: [
            { title: 'MAINLAND', path: 'mainland' },
            { title: 'TAIWAN', path: 'taiwan' },
          ],
        },
        { title: 'American', path: 'american' },
      ],
    },
  ];
  let arr1 = [];
  const flattenSource = (arr) => {
    arr.reduce(function (prev: {}, item: {}) {
      if (prev) {
        arr1.push(prev);
      }
      arr1.push(item);
      console.log('arr1', arr1);
      // return arr1.concat()
    });
  };
  flattenSource(source);
  // function findTitle(name) {
  //   for (let i = 0; i < source.length; i++) {
  //     if (!source[i].subNav[0].subNav) {
  //       for (let j = 0; j < source[i].subNav.length; j++) {
  //         if (source[i].subNav[j].title == name) {
  //           return source[i].subNav[j];
  //         }
  //       }
  //     } else {
  //     }
  //   }
  // }
  // console.log(111, findTitle('TAIWAN'));

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

            <Form.Item name="remember" valuePropName="checked">
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
