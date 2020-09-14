import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { withApollo } from '../helper/apollo';
import { useState } from 'react';
import { LOGIN } from '../graphql/mutation/user.mutattion';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import Link from "next/link";
import Button from 'src/atoms/Button';
import { ProfileSuccessful } from "./register";

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

const Loading = ({text}: {text:string}) => {
  return (
  <span>{text}</span>
  )
};

const Text = styled.p`
  margin-top:10px;
  font-size: 14px;
`;

type LoginType = {
  usernameOrEmail: string,
  password: string
}

const Login = () => {
  const [loading, setLoading] = useState(false); 
  const [useLogin] = useMutation(LOGIN);
  const [data,setData] = useState<any>();
  
  const onLogin = async (values:LoginType) => {
    setLoading(true);
    const res = await useLogin({
      variables: {
        ...values
      }
    })
    setData(res.data.login);
    setLoading(false);
  } 
  if (loading) {
    return <Loading text='Loading...'/>;
  }

  if( data && data.errors && data.errors.length > 0) {
    alert(`${data.errors[0].field} : ${data.errors[0].message}`);
  } else if(data && data.user) {
    return (
      <ProfileSuccessful {...data.user}/>
    )
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
        validationSchema={
          () => {
            return Yup.object().shape({
              usernameOrEmail: Yup.string().required('Username is Required!'),
              password: Yup.string().required('Password is Required!'),
            });
          }
        }
      >
      {({values, errors, touched, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} method="post">
            <FieldWrapper>
              <FormLabel>Username / Email</FormLabel>
              <div>
                <Field
                  name='usernameOrEmail' 
                  type='text'
                  value={values.usernameOrEmail}
                />
              </div>
              {errors.usernameOrEmail && touched.usernameOrEmail && (
                <p>{errors.usernameOrEmail}</p>
              )}
            </FieldWrapper>
            <FieldWrapper>
              <FormLabel>Password</FormLabel>
              <div>
                <Field
                  name='password' 
                  type='password'
                  value={values.password}
                />
              </div>
              {errors.password && touched.password && (
                <p>{errors.password}</p>
              )}
            </FieldWrapper>
            <Button disabled={isSubmitting} size='small' variant='outlined' >Login</Button>
        </Form>
        )}
      </Formik> 
      <Text>Don't have an account? <Link href='/'>Register.</Link></Text> 
    </Wrapper>
  );
};
export default withApollo(Login);
