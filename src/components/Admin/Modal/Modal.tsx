import React from 'react';
import { Form, Modal, Input, Button, Checkbox } from 'antd';

export interface FieldRule {
  required: boolean;
  message: string;
}

export interface Field {
  type: string;
  label: string;
  name: string;
  required?: FieldRule[];
  checkBoxOptions?: [{ label: string; value: string | number }];
  checkBoxDefaultValue?: [value: string | number];
}

export interface FormModalProps {
  initValues?: any;
  title?: string;
  fields: Field[];
  onCheckBoxChange?: () => void;
  visible: boolean;
  onCancel: () => void;
}

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 19, span: 5 },
};

export const FormModal = ({ initValues, fields, onCheckBoxChange, ...props }: FormModalProps) => {
  const renderInputs = () => {
    return fields.map((field) => {
      return (
        <>
          {field.type === 'text' ? (
            <Form.Item label={field.label} name={field.name} rules={field.required}>
              <Input />
            </Form.Item>
          ) : (
            <Checkbox.Group
              options={field.checkBoxOptions}
              defaultValue={field.checkBoxDefaultValue}
              onChange={onCheckBoxChange}
            />
          )}
        </>
      );
    });
  };
  return (
    <Modal {...props} footer={false}>
      <Form initialValues={initValues || undefined} {...layout}>
        {renderInputs()}
        <Form.Item {...tailLayout}>
          <Button type="primary" size="middle" style={{ width: 100 }} htmlType="submit">
            OK
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
