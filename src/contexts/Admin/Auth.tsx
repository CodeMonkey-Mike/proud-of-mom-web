import { useQuery } from '@apollo/client';
import React, { useMemo, useState } from 'react';
import Loading from 'src/components/Loading/Loading';
import { LOGGED_IN } from 'src/graphql/query/user.query';

type AuthProps = {
  isAuthenticated: boolean;
};

export const AuthContext = React.createContext({} as AuthProps);

const AuthProvider = (props: any) => {
  const { loading, data } = useQuery(LOGGED_IN);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  if (loading) {
    return <Loading text="Loading..." />;
  }
  useMemo(() => {
    if (data) setIsAuthenticated(true);
  }, [data]);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
