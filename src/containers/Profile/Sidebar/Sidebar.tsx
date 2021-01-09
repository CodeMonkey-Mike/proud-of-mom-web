import React, { useContext } from 'react';
import Router from 'next/router';
import { AuthContext } from 'src/contexts/auth/auth.context';
import {
  SidebarWrapper,
  SidebarTop,
  SidebarBottom,
  SidebarMenu,
  LogoutButton,
} from './Sidebar.style';

const SidebarCategory: React.FC<{}> = () => {
  const { authDispatch } = useContext<any>(AuthContext);

  const sidebarBottomMenu = [
    {
      link: '/profile',
    },
  ];
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      authDispatch({ type: 'SIGN_OUT' });
      Router.push('/');
    }
  };
  return (
    <>
      <SidebarWrapper>
        <SidebarTop></SidebarTop>

        <SidebarBottom>
          {sidebarBottomMenu.map((item, index) => (
            <SidebarMenu href={item.link} key={index} label="Settings" />
          ))}
          <LogoutButton type="button" onClick={handleLogout}>
            <p id="navlinkLogout">Logout</p>
          </LogoutButton>
        </SidebarBottom>
      </SidebarWrapper>
    </>
  );
};

export default SidebarCategory;
