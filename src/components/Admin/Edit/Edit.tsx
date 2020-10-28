// Common part
import React, { useMemo, useRef } from 'react';
import { Modal, Button, Alert } from 'antd';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box } from 'theme-ui';
import { UserInformationTypes } from 'src/types';

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
  editUser?: boolean;
  apiFallBackError?: { field: string; message: string } | null;
  setEditUser: () => void;
  editInfoUser: (values: UserInformationTypes) => void;
  userInfo: UserInformationTypes;
};

export const Edit = ({
  userInfo,
  editUser,
  setEditUser,
  editInfoUser,
  apiFallBackError,
}: AddType) => {
  const formRef = useRef(null);
  useMemo(() => {
    if (apiFallBackError) {
      formRef.current && (formRef.current as any).resetForm();
    }
    if (editUser) {
      formRef.current &&
        (formRef.current as any).setValues({
          username: userInfo.username ? userInfo.username : '',
          email: userInfo.email ? userInfo.email : '',
        });
    }
  }, [apiFallBackError, formRef, editUser, userInfo]);

  return (
    <Modal
      title="Edit User"
      visible={editUser}
      onCancel={() => {
        setEditUser();
      }}
      footer={null}
    >
      <Formik
        initialValues={userInfo}
        innerRef={formRef}
        onSubmit={(values) => {
          if (userInfo.id)
            editInfoUser({
              id: userInfo.id,
              ...values,
            });
        }}
        validationSchema={() => {
          return Yup.object().shape({
            email: Yup.string().required('Email is required!').email('Invalid email'),
            username: Yup.string().required('Username is Required!'),
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

            <Button onClick={() => handleSubmit()} type="primary" block size="large">
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
