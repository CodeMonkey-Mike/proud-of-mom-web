import { useContext } from 'react';
import { ADMIN_LOGIN_PAGE } from 'src/contants/navigation';
import { AuthContext } from 'src/contexts/auth/auth.context';
import { useRouter } from 'next/router';
import { Loader } from 'src/components';

const PrivateRoute = ({ children }: any) => {
  const { authState } = useContext<any>(AuthContext);
  const router = useRouter();
  if (typeof window !== 'undefined') {
    authState && !authState.isAuthenticated && router.push(ADMIN_LOGIN_PAGE);
  }
  if (authState && authState.isAuthenticated) {
    return children;
  } else {
    return <Loader loading={true} />;
  }
};

export default PrivateRoute;
