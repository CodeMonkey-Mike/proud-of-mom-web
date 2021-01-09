import React from 'react';
import Header from '../Header/Header';
import { LayoutWrapper } from './Layout.style';

type LayoutProps = {
  className?: string;
  token?: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({ className, children }) => {
  return (
    <LayoutWrapper className={`layoutWrapper ${className}`}>
      <Header />
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
