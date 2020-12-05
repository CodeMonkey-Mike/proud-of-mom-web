import React from 'react';
import { NavLink } from 'src/components';
import Logo from 'src/components/Logo/Logo';
import { LOGIN } from 'src/contants/navigation';
import { MainMenu } from './Menu.style';

const MENU_ITEMS = [
  {
    link: LOGIN,
    label: 'login',
  },
];

type MenuProps = {
  logo: string;
};

export const Menu: React.FC<MenuProps> = ({ logo }) => {
  return (
    <MainMenu>
      <Logo imageUrl={logo} alt={'Logo'} />
      {MENU_ITEMS.map((nav, idx) => {
        return (
          <NavLink
            key={idx}
            className="menu-item"
            href={nav.link}
            label={nav.label}
            iconClass="menu-icon"
          />
        );
      })}
    </MainMenu>
  );
};
