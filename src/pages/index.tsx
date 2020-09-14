import React from 'react'; 
import Head from 'next/head';
import Register from './register';
import { withApollo } from 'src/helper/apollo';

const Index: React.FC = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Register />
    </>
  );
};

export default withApollo(Index);
