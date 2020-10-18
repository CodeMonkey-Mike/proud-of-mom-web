import React from 'react';
import HeaderWrapper from './Header.style';

type Props = {
  className?: string;
  pathname?: string;
};

const Header: React.FC<Props> = ({ className }) => {
  return <HeaderWrapper className={className}></HeaderWrapper>;
};

export default Header;
