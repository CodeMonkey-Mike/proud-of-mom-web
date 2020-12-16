import React from 'react';
import Head from 'next/head';
import { Box } from 'theme-ui';

const Index = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Box sx={{ padding: 100, textAlign: 'center' }}>Welcome to Proud of Mom site!</Box>
    </>
  );
};

export default Index;
