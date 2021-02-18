import React from 'react';
import { NavLink } from 'src/components';
import { HOME_PAGE, LOGIN, PROFILE } from 'src/contants/navigation';
import { AuthContext } from 'src/contexts/auth/auth.context';
import { MainMenu } from './Menu.style';

export const Menu = () => {
  const { authState } = React.useContext<any>(AuthContext);
  console.log(authState);
  return (
    <MainMenu>
      <NavLink className="menu-item" href={HOME_PAGE} label={'Home'} iconClass="menu-icon" />
      {!authState.isAuthenticated ? (
        <NavLink className="menu-item" href={LOGIN} label={'Login'} iconClass="menu-icon" />
      ) : (
        <NavLink className="menu-item" href={PROFILE} label={'Profile'} iconClass="menu-icon" />
      )}
    </MainMenu>
  );
};
