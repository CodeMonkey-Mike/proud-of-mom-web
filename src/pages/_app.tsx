import React from 'react';
import App, { AppContext, AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from 'src/theme';
import Layout from 'src/components/Layout/Layout';
import { GlobalStyle } from 'src/styled/global.style';
import 'antd/dist/antd.css';
import { AuthProvider } from 'src/contexts/auth/auth.provider';

export default function NextApp({ Component, pageProps, router }: AppProps) {
  if (router.pathname.includes('admin')) {
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
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
