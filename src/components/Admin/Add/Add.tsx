// Common part
import React, { useMemo, useRef } from 'react';
import { Modal, Button, Alert } from 'antd';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box } from 'theme-ui';
import { RegisterType } from 'src/pages/admin/user';

const FieldWrapper = styled.div`
  padding: 0;
  margin-bottom: 10px;
  input {
    width: 100%;
    padding: 5px;
  }
`;

const FormLabel = styled.p`
  padding: 0;
  margin-bottom: 10px;
`;

type AddType = {
  addUser?: boolean;
  apiFallBackError?: { field: string; message: string } | null;
  setAddUser: () => void;
  addNewUser: (values: RegisterType) => void;
};

const initialValues = {
  email: '',
  username: '',
  password: '',
};

const Add = ({ addUser, setAddUser, addNewUser, apiFallBackError }: AddType) => {
  const formRef = useRef(null);
  useMemo(() => {
    if (apiFallBackError) {
      formRef.current && (formRef.current as any).resetForm();
    }
  }, [apiFallBackError, formRef]);
  return (
    <Modal
      title="Add New User"
      visible={addUser}
      onCancel={() => {
        setAddUser();
      }}
      footer={null}
    >
      <Formik
        initialValues={initialValues}
        innerRef={formRef}
        onSubmit={(values) => {
          addNewUser(values);
        }}
        validationSchema={() => {
          return Yup.object().shape({
            email: Yup.string().required('Email is required!').email('Invalid email'),
            username: Yup.string().required('Username is Required!'),
            password: Yup.string().required('Password is Required!'),
          });
        }}
      >
        {({ values, errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit} method="post">
            <Box marginBottom={1}>
              {apiFallBackError && <Alert message={apiFallBackError.message} type="error" />}
            </Box>
            <FieldWrapper>
              <FormLabel>Email</FormLabel>
              <Box marginBottom={1}>
                <Field name="email" type="text" value={values.email} />
              </Box>
              {errors.email && touched.email && <Alert message={errors.email} type="error" />}
            </FieldWrapper>
            <FieldWrapper>
              <FormLabel>Username</FormLabel>
              <Box marginBottom={1}>
                <Field name="username" type="text" value={values.username} />
              </Box>
              {errors.username && touched.username && (
                <Alert message={errors.username} type="error" />
              )}
            </FieldWrapper>
            <FieldWrapper>
              <FormLabel>Password</FormLabel>
              <Box marginBottom={1}>
                <Field name="password" type="password" value={values.password} />
              </Box>
              {errors.password && touched.password && (
                <Alert message={errors.password} type="error" />
              )}
            </FieldWrapper>

            <Button onClick={() => handleSubmit()} type="primary" block size="large">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default Add;
