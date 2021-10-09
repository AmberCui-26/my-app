import React, { useEffect, useRef } from 'react';
import { Form, Input, Modal, Select, Row, Col } from 'antd';

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

export default function ModalForm({ visible, onCancel }) {
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
      <Row justify="end">
        <Col span="24">
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            form={form}
            name="studentForm"
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
          </Form>
        </Col>
      </Row>
    </Modal>
  );
}
