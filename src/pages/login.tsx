import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import Link from 'next/link';
import { Alert } from 'antd';
import * as Yup from 'yup';
import { Loader } from 'src/components';
import { Formik, Form, Field } from 'formik';
import { withApollo } from '../helper/apollo';
import { LOGIN } from '../graphql/mutation/user.mutattion';
import Button from 'src/atoms/Button';
import { useRouter } from 'next/router';
import { PROFILE } from 'src/contants';
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

type LoginType = {
  usernameOrEmail: string;
  password: string;
};

const initialValues = {
  usernameOrEmail: '',
  password: '',
};

const Login = () => {
  const route = useRouter();
  const { authDispatch } = React.useContext<any>(AuthContext);
  const [UseLogin, { data, loading, error }] = useMutation(LOGIN);

  const onLogin = (values: LoginType) => {
    UseLogin({
      variables: {
        ...values,
      },
    });
  };

  useEffect(() => {
    if (data && data.login && data.login.user) {
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
          onLogin(values);
        }}
        validationSchema={() => {
          return Yup.object().shape({
            usernameOrEmail: Yup.string().required('Username is Required!'),
            password: Yup.string().required('Password is Required!'),
          });
        }}
      >
        {({ values, errors, touched, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} method="post">
            <FieldWrapper>
              <FormLabel>Username / Email</FormLabel>
              <div>
                <Field name="usernameOrEmail" type="text" value={values.usernameOrEmail} />
              </div>
              {errors.usernameOrEmail && touched.usernameOrEmail && <p>{errors.usernameOrEmail}</p>}
            </FieldWrapper>
            <FieldWrapper>
              <FormLabel>Password</FormLabel>
              <div>
                <Field name="password" type="password" value={values.password} />
              </div>
              {errors.password && touched.password && <p>{errors.password}</p>}
            </FieldWrapper>
            <Button disabled={isSubmitting} size="small" variant="outlined">
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Text>
        Don't have an account? <Link href="/register">Register.</Link>
      </Text>
    </Wrapper>
  );
};
export default withApollo(Login);
