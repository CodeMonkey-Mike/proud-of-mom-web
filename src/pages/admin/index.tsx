import React from 'react';
import Routes from './routes';
import { withApollo } from 'src/helper/apollo';

const Admin = () => {
  return <Routes />;
};
export default withApollo(Admin);
