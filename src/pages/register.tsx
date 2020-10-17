import { useState } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Button from 'src/atoms/Button';
import { REGISTER } from '../graphql/mutation/user.mutattion';
import { UserProfile } from './profile/user';

const Wrapper = styled.div`
  padding: 5rem;
`;

const FieldWrapper = styled.div`
  padding: 0;
  margin-bottom: 10px;
`;

const FormLabel = styled.p`
  padding: 0;
  margin-bottom: 10px;
`;
const Text = styled.p`
  margin-top: 10px;
  font-size: 14px;
`;

const Loading = ({ text }: { text: string }) => {
  return <span>{text}</span>;
};

type RegisterType = {
  email: string;
  username: string;
  password: string;
};

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [useRegister] = useMutation(REGISTER);
  const [data, setData] = useState<any>();

  const onRegister = async (values: RegisterType) => {
    setLoading(true);
    const res = await useRegister({
      variables: {
        ...values,
      },
    });
    setData(res.data.register);
    setLoading(false);
  };
  if (loading) {
    return <Loading text="Loading..." />;
  }

  const initialValues = {
    email: '',
    username: '',
    password: '',
  };

  if (data && data.errors && data.errors.length > 0) {
    alert(`${data.errors[0].field} : ${data.errors[0].message}`);
  } else if (data && data.user) {
    return <UserProfile {...data.user} />;
  }

  return (
    <Wrapper>
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
export default Register;
