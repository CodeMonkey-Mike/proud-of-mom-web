import React from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { theme } from 'src/theme';
import Layout from 'src/components/Layout/Layout';
import { GlobalStyle } from 'src/styled/global.style';
import { AuthProvider } from 'src/contexts/auth/auth.provider';
import PrivateRoute from './admin/routes';
import { client } from 'src/helper/apollo';
import 'antd/dist/antd.css';

export default function NextApp({ Component, pageProps, router }: AppProps) {
  if (router.pathname.includes('admin')) {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            {router.pathname.includes('login') ? (
              <Component {...pageProps} />
            ) : (
              <PrivateRoute>
                <Component {...pageProps} />
              </PrivateRoute>
            )}
          </AuthProvider>
          <GlobalStyle />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
        <GlobalStyle />
      </ThemeProvider>
    </ApolloProvider>
  );
}
