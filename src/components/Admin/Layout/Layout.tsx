import React from 'react';
import LayoutWrapper from './Layout.style';

type Props = {
  children: React.ReactChild;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};
