import React, { useContext } from 'react';
import { ADMIN_HOME_PAGE, ADMIN_LOGIN_PAGE } from 'src/contants/navigation';
import AuthProvider, { AuthContext } from 'src/contexts/Admin/Auth';
import { useRouter } from 'next/router';

const PrivateRoute = ({ path }: any) => {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  console.log(isAuthenticated);
  if (typeof window !== 'undefined') {
    isAuthenticated ? router.replace(path) : router.replace(ADMIN_LOGIN_PAGE);
  }
};

const Routes = () => {
  return (
    <AuthProvider>
      <>{PrivateRoute(ADMIN_HOME_PAGE)}</>
    </AuthProvider>
  );
};

export default Routes;
