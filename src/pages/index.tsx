import React from 'react';
import Head from 'next/head';
import { withApollo } from 'src/helper/apollo';

const Index: React.FC = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
    </>
  );
};

export default withApollo(Index);
