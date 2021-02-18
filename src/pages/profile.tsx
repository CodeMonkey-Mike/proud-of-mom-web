import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Flex } from 'theme-ui';
import { useRouter } from 'next/router';
import { Button, P, H1, Grid, Box } from 'src/atoms';
import { withApollo } from 'src/helper/apollo';
import { LOGOUT } from '../graphql/mutation/user.mutattion';
import { Alert } from 'antd';
import { UPLOAD } from 'src/graphql/mutation/media.mutation';
import { Avatar, Loader, Field, SelectField } from 'src/components';
import { LOGGED_IN } from 'src/graphql/query/user.query';
import _get from 'lodash/get';
import { AuthContext } from 'src/contexts/auth/auth.context';
import { Images } from 'src/assets';
import { PageWrapper, SidebarSection, ContentBox } from 'src/containers';
import { Formik, Form, useFormik } from 'formik';
import { useProfile } from 'src/hooks';
import { useCountry } from 'src/hooks/country';

const Wrapper = styled.div`
  padding: 2rem;
  button {
    width: 150px;
    margin-top: 10px;
  }
`;

const Profile = () => {
  const initialValues: any = {
    address1: '',
    address2: '',
    country: '',
    state_province: '',
    postal_code: '',
    gender: 'male',
  };
  const { values, setValues } = useFormik(initialValues);
  const { authDispatch } = useContext<any>(AuthContext);
  const { loading, error, data, refetch } = useQuery(LOGGED_IN);
  const [UseLogout] = useMutation(LOGOUT);
  const [Upload, { loading: uploadSubmitting }] = useMutation(UPLOAD);
  const router = useRouter();
  const picUrl = useMemo(() => _get(data, 'me.info.picture'), [data]);
  const { onUpdate, profileLoading } = useProfile();
  const { countries, refetchCountry } = useCountry();
  const userId = useMemo(() => data && data.me && data.me.id, [data]);
  const onLogout = () => {
    UseLogout().then((res) => {
      authDispatch({ type: 'SIGN_OUT' });
      res.data.logout && router.replace('/login');
    });
  };

  const onChange = useCallback(
    async ({
      target: {
        validity,
        files: [file],
      },
    }) => {
      if (validity.valid && data.me) {
        const {
          data: { upload },
        } = await Upload({ variables: { file, email: data.me.email } });
        upload && refetch();
      }
    },
    [refetch, data, Upload]
  );

  const onUpload = useCallback(() => {
    const fileInput = document.querySelector('input[name="profilePicture"]') as HTMLInputElement;
    fileInput && fileInput.click();
  }, []);

  const avatar = useMemo(() => picUrl || Images.defaultAvatar, [picUrl]);

  useEffect(() => {
    refetch();
    refetchCountry();
  }, [refetch, refetchCountry]);

  useEffect(() => {
    if (data && data.me) {
      setValues({
        address1: data.me.info.address1,
        address2: data.me.info.address2,
        country: data.me.info.country,
        state_province: data.me.info.state_province,
        postal_code: data.me.info.postal_code,
        gender: data.me.info.gender,
      });
    }
  }, [data, setValues]);
  return (
    <Wrapper>
      {error && <Alert message={error} type="error" />}
      <Loader loading={loading || uploadSubmitting || profileLoading} />

      {values && data && data.me && (
        <PageWrapper>
          <SidebarSection>
            <Box>
              <form>
                <input hidden type="file" name="profilePicture" onChange={(e) => onChange(e)} />
                <Flex
                  sx={{
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box bg="primary">
                    <Avatar onClick={onUpload} dataTestId="avartar" src={avatar} />
                    <P
                      sx={{
                        fontSize: 4,
                        fontWeight: 'bold',
                      }}
                    >
                      Hello! {data.me.username}
                    </P>
                    <P>Your email: {data.me.email}</P>
                    <Button size="small" variant="outlined" onClick={() => onLogout()}>
                      Logout
                    </Button>
                  </Box>
                </Flex>
              </form>
            </Box>
          </SidebarSection>
          <ContentBox>
            <H1 margin=" 0 0 20px 0">Personal Information</H1>
            <Formik
              initialValues={values}
              onSubmit={(values) =>
                onUpdate({
                  ...values,
                  user_id: userId,
                })
              }
            >
              {({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue }) => {
                return (
                  <Form onSubmit={handleSubmit} method="post">
                    <Field
                      label="Address 1"
                      name="address1"
                      value={values.address1}
                      errors={errors}
                      touched={touched}
                    />
                    <Field
                      label="Address 2"
                      name="address2"
                      value={values.address2}
                      errors={errors}
                      touched={touched}
                    />
                    <Grid gap={2} columns={[2]}>
                      <SelectField
                        label="Country"
                        name="country"
                        style={{ width: '100%' }}
                        size={'large'}
                        errors={errors}
                        touched={touched}
                        options={countries}
                        value={values.country}
                        onChange={(v) => setFieldValue('country', v)}
                      />
                      <Field
                        label="State / Province"
                        name="state_province"
                        value={values.state_province}
                        errors={errors}
                        touched={touched}
                      />
                    </Grid>

                    <Grid gap={2} columns={[2]}>
                      <Field
                        label="Postal Code"
                        name="postal_code"
                        value={values.postal_code}
                        errors={errors}
                        touched={touched}
                      />
                      <SelectField
                        label="Gender"
                        name="gender"
                        style={{ width: '50%' }}
                        size={'large'}
                        options={[
                          {
                            value: 'male',
                            label: 'Male',
                          },
                          {
                            value: 'female',
                            label: 'Female',
                          },
                        ]}
                        value={values.gender}
                        errors={errors}
                        touched={touched}
                        onChange={(v) => setFieldValue('gender', v)}
                      />
                    </Grid>

                    <Button disabled={isSubmitting} size="small" variant="outlined">
                      Update
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </ContentBox>
        </PageWrapper>
      )}
    </Wrapper>
  );
};

export default withApollo(Profile);
