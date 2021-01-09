import React from 'react';
import App, { AppContext, AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from 'src/theme';
import Layout from 'src/components/Layout/Layout';
import { GlobalStyle } from 'src/styled/global.style';
import { AuthProvider } from 'src/contexts/auth/auth.provider';
import PrivateRoute from './admin/routes';
import 'antd/dist/antd.css';

export default function NextApp({ Component, pageProps, router }: AppProps) {
  if (router.pathname.includes('admin')) {
    return (
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
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
}

NextApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { query } = appContext.ctx;
  return { ...appProps, query };
};
