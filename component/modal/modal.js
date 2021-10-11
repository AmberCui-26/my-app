import React, { useEffect, useRef } from 'react';
import { Form, Modal, Button } from 'antd';
// import {ModalProps} from 'antd/lib/modal';

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

export default function ModalForm(props) {
  const [form] = Form.useForm();
  // useResetFormOnCloseModal({
  //   form,
  //   visible,
  // });

  console.log(111, props.onCancel); //undefined

  return (
    <Modal
      // title="Add Student"
      title={!!props.editStudent ? 'Edit Student' : 'Add Student'}
      visible={props.visible}
      onOk={() => form.submit()}
      onCancel={props.onCancel}
      footer={[
        <Button key="cancel" onClick={props.onCancel}>
          Cancel
        </Button>,
        //   <Button key="add" onClick={props.onCancel}>
        //   Cancel
        // </Button>
      ]}
    >
      {props.children}
    </Modal>
  );
}
