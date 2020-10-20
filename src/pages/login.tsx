import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';
import Link from 'next/link';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { withApollo } from '../helper/apollo';
import { useState } from 'react';
import { LOGIN } from '../graphql/mutation/user.mutattion';
import { LOGGED_IN } from '../graphql/query/user.query';
import Button from 'src/atoms/Button';
import Loading from '../components/Loading/Loading';
import UserProfile from './profile';

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

const Login = () => {
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
  };

  return (
    <Wrapper>
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
        Don't have an account? <Link href="/">Register.</Link>
      </Text>
    </Wrapper>
  );
};
export default withApollo(Login);
