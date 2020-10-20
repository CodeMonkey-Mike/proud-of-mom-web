import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';
import { withApollo } from '../../helper/apollo';
import { LOGIN } from '../../graphql/mutation/user.mutattion';
import { LOGGED_IN } from '../../graphql/query/user.query';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from 'src/atoms/Button';
import UserProfile from '../profile';
import { Box, Flex, Grid } from 'theme-ui';
import Loading from '../../components/Loading/Loading';

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

type LoginType = {
  usernameOrEmail: string;
  password: string;
  role_id?: number;
};

const Admin = () => {
  const [useLogin] = useMutation(LOGIN);
  const [loader, setLoader] = useState(false);
  const { loading, error, data } = useQuery(LOGGED_IN);
  const [userData, setUserData] = useState<any>();

  const onLogin = async (values: LoginType) => {
    setLoader(true);
    const res = await useLogin({
      variables: {
        ...values,
      },
    });
    setUserData(res.data.login);
    setLoader(false);
  };
  if (loader || loading) {
    return <Loading text="Loading..." />;
  }
  if (error) return `Error! ${error.message}`;
  if (userData && userData.errors && userData.errors.length > 0) {
    alert(`${userData.errors[0].field} : ${userData.errors[0].message}`);
  } else if (data && data.me) {
    return <UserProfile {...data.me} />;
  } else if (userData && userData.user) {
    return <UserProfile {...userData.user} />;
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
export default withApollo(Admin);
