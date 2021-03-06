import React from 'react';
import { Modal, Button } from 'antd';

export default function ModalForm(props) {
  return (
    <Modal
      destroyOnClose={true}
      title={props.titleName}
      visible={props.visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="cancel" onClick={props.onCancel}>
          Cancel
        </Button>,
      ]}
    >
      {props.children}
    </Modal>
  );
}
