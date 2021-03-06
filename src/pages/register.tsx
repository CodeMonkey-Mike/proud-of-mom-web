import React, { useEffect, useContext } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { Button } from 'src/atoms';
import { REGISTER } from '../graphql/mutation/user.mutattion';
import { withApollo } from 'src/helper/apollo';
import { Alert } from 'antd';
import { Loader } from 'src/components';
import { PROFILE } from 'src/contants';
import { useRouter } from 'next/router';
import { AuthContext } from 'src/contexts/auth/auth.context';

const Wrapper = styled.div`
  padding: 2rem 0;
  max-width: 300px;
  margin: auto;
`;

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

const Text = styled.p`
  margin-top: 10px;
  font-size: 14px;
`;

type RegisterType = {
  email: string;
  username: string;
  password: string;
};

const Register = () => {
  const { authDispatch } = useContext<any>(AuthContext);
  const [UseRegister, { loading, error, data }] = useMutation(REGISTER);
  const route = useRouter();
  const onRegister = async (values: RegisterType) => {
    UseRegister({
      variables: {
        ...values,
      },
    });
  };

  const initialValues = {
    email: '',
    username: '',
    password: '',
  };

  useEffect(() => {
    if (data && data.register && data.register.user) {
      authDispatch({ type: 'SIGNIN_SUCCESS' });
      route.push(PROFILE);
    }
  }, [data, route, authDispatch]);

  return (
    <Wrapper>
      {error && <Alert type="error" message={error.message} />}
      <Loader loading={loading} />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          onRegister(values);
        }}
        validationSchema={() => {
          return Yup.object().shape({
            email: Yup.string().required('Email is required!').email('Invalid email'),
            username: Yup.string().required('Username is Required!'),
            password: Yup.string().required('Password is Required!'),
          });
        }}
      >
        {({ values, errors, touched, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} method="post">
            <FieldWrapper>
              <FormLabel>Email</FormLabel>
              <div>
                <Field name="email" type="text" value={values.email} />
              </div>
              {errors.email && touched.email && <p>{errors.email}</p>}
            </FieldWrapper>
            <FieldWrapper>
              <FormLabel>Username</FormLabel>
              <div>
                <Field name="username" type="text" value={values.username} />
              </div>
              {errors.username && touched.username && <p>{errors.username}</p>}
            </FieldWrapper>
            <FieldWrapper>
              <FormLabel>Password</FormLabel>
              <div>
                <Field name="password" type="password" value={values.password} />
              </div>
              {errors.password && touched.password && <p>{errors.password}</p>}
            </FieldWrapper>
            <Button disabled={isSubmitting} size="small" variant="outlined">
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <Text>
        Already have an account? <Link href="/login">Login now.</Link>
      </Text>
    </Wrapper>
  );
};
export default withApollo(Register);
