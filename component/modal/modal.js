import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Modal, Button, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axios from 'axios';

export const StyledButton = styled(Button)`
  margin: 16px 16px;
`;

const { Option } = Select;

const useResetFormOnCloseModal = ({ form, visible }) => {
  const prevVisibleRef = useRef();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;
  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible]);
};

const ModalForm = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal
      title="Add Student"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form form={form} name="studentForm">
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
            <Select.Option value={1}>Tester</Select.Option>
            <Select.Option value={2}>Developer</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default function Demo() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Form.Provider
        onFormFinish={(name, { values }) => {
          if (name === 'studentForm') {
            setVisible(false);
            const url = 'https://cms.chtoma.com/api/students';
            const token = localStorage.getItem('token');
            const authHeader = { Authorization: `Bearer ${token}` };
            const params = {
              ...values,
            };
            console.log(params);
            axios
              .post(url, params, { headers: authHeader })
              .then((res) => {
                message.success('Success');
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }}
      >
        <StyledButton
          htmlType="button"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setVisible(true)}
        >
          Add User
        </StyledButton>

        <ModalForm visible={visible} onCancel={() => setVisible(false)} />
      </Form.Provider>
    </>
  );
}
