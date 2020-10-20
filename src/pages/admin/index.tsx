import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { withApollo } from '../../helper/apollo';
import { LOGIN } from '../../graphql/mutation/user.mutattion';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from 'src/atoms/Button';
import UserProfile from '../profile';
import { Box, Flex, Grid } from 'theme-ui';

const Wrapper = styled(Flex)`
  padding: 2rem;
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

const Loading = ({ text }: { text: string }) => {
  return <span>{text}</span>;
};

type LoginType = {
  usernameOrEmail: string;
  password: string;
  role_id?: number;
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [useLogin] = useMutation(LOGIN);
  const [data, setData] = useState<any>();

  const onLogin = async (values: LoginType) => {
    setLoading(true);
    const res = await useLogin({
      variables: {
        ...values,
      },
    });
    setData(res.data.login);
    setLoading(false);
  };
  if (loading) {
    return <Loading text="Loading..." />;
  }

  if (data && data.errors && data.errors.length > 0) {
    alert(`${data.errors[0].field} : ${data.errors[0].message}`);
  } else if (data && data.user) {
    return <UserProfile {...data.user} />;
  }

  const initialValues = {
    usernameOrEmail: '',
    password: '',
    role_id: '',
  };

  return (
    <Wrapper
      sx={{
        justifyContent: 'center',
      }}
    >
      <Grid
        sx={{
          width: ['90%', '70%', '25%'],
        }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            onLogin({
              ...values,
              role_id: 1,
            });
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
                <Box>
                  <Field name="usernameOrEmail" type="text" value={values.usernameOrEmail} />
                </Box>
                {errors.usernameOrEmail && touched.usernameOrEmail && (
                  <p>{errors.usernameOrEmail}</p>
                )}
              </FieldWrapper>
              <FieldWrapper>
                <FormLabel>Password</FormLabel>
                <Box>
                  <Field name="password" type="password" value={values.password} />
                </Box>
                {errors.password && touched.password && <p>{errors.password}</p>}
              </FieldWrapper>
              <Button disabled={isSubmitting} size="small" variant="outlined">
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Wrapper>
  );
};
export default withApollo(Login);
