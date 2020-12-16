import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Loader } from 'src/components';
import { LOGGED_IN } from 'src/graphql/query/user.query';

type AuthProps = {
  isAuthenticated: boolean;
};

export const AuthContext = React.createContext({} as AuthProps);

const AuthProvider = (props: any) => {
  const { loading, data } = useQuery(LOGGED_IN);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (data.user) setIsAuthenticated(true);
  }, [data]);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
      }}
    >
      <Loader loading={loading} />
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
