// Common part
import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

export const MainMenu = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link href="/admin/home">Home</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        <Link href="/admin/user">Users & Roles</Link>
      </Menu.Item>
    </Menu>
  );
};
