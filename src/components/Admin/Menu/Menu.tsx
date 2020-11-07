// Common part
import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, KeyOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import SubMenu from 'antd/lib/menu/SubMenu';

export const MainMenu = ({ pageId }: { pageId: number }) => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultOpenKeys={['user']}
      defaultSelectedKeys={[pageId.toString()]}
    >
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link href="/admin/home">Home</Link>
      </Menu.Item>
      <SubMenu key="user" icon={<UserOutlined />} title="Users & Roles">
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link href="/admin/user">Users</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<KeyOutlined />}>
          <Link href="/admin/role">Role</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};
