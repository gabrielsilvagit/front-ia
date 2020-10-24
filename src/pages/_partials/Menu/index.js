import React, { useState, useEffect } from 'react';
import { Menu as AntMenu } from 'antd';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import UserInfo from '~/pages/_partials/UserInfo';
import Button from '~/components/Button';
import { signOutRequest } from '~/store/modules/auth/actions';
import Profile from '~/pages/Profile';

import { MenuGlobalStyle, Nav } from './styles';
import { MdKeyboardArrowDown } from 'react-icons/md';

export default function Menu() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showProfile, setShowProfile] = useState(false);

  const { permissions: permissionList, roles: roleList } = useSelector(state => state.user);
  const userName = useSelector(state => (state.user.profile ? state.user.profile.name : null));

  const checkAuth = (permission, role) => {
    let auth = false;
    if (roleList && !roleList.includes('@admin/all')) {
      if (role) {
        auth = roleList && roleList.includes(role);
      } else if (permission) {
        auth = permissionList && permissionList.includes(permission);
      } else {
        return false;
      }
    } else {
      return true;
    }
    return auth;
  };

  function handleSignOut() {
    dispatch(signOutRequest());
  }

  function handleProfile() {
    setShowProfile(true);
  }

  const MenuItem = ({ permission = null, role = null, children, ...props }) => {
    return checkAuth(permission, role) ? <AntMenu.Item {...props}>{children}</AntMenu.Item> : null;
  };

  const SubMenu = ({ permission = null, role = null, children, ...props }) => {
    return checkAuth(permission, role) && <AntMenu.SubMenu {...props}>{children}</AntMenu.SubMenu>;
  };

  const renderSubMenuTitle = label => {
    return (
      <>
        <span>{label}</span>
        <MdKeyboardArrowDown size={13} className="ant-menu-submenu-caret" />
      </>
    );
  };

  const renderMenu = item => {
    const { type } = item;
    if (type === 'divider') {
      return <AntMenu.Divider key={item.key} />;
    } else if (type === 'sub') {
      return (
        <SubMenu key={item.key} permission={item.permission} title={renderSubMenuTitle(item.label)}>
          {item.children.map(subItem => renderMenu(subItem))}
        </SubMenu>
      );
    } else {
      return (
        <MenuItem key={item.key} permission={item.permission}>
          {//TODO: Converter o Link com click para Button
          item.click ? (
            <Button onClick={item.click}>
              {item.icon && item.icon}
              {item.label}
            </Button>
          ) : (
            <Link to={item.url}>
              {item.icon && item.icon}
              {item.label}
            </Link>
          )}
        </MenuItem>
      );
    }
  };

  const menuItems = [
    {
      type: 'item',
      key: 'dash',
      permission: '@system/default',
      label: t('menus:dash'),
      url: '/',
    },
    {
      type: 'item',
      key: 'contacts',
      permission: '@contacts/list',
      label: t('menus:contacts'),
      url: '/contacts',
    },
    {
      type: 'item',
      key: 'customers',
      permission: '@customers/list',
      label: t('menus:customers'),
      url: '/customers',
    },
    {
      type: 'sub',
      key: 'prod',
      permission: '@products/list',
      label: t('menus:products'),
      children: [
        {
          type: 'item',
          key: 'prod.all',
          permission: '@products/list',
          label: t('menus:prod_all'),
          url: '/products',
        },
        {
          type: 'divider',
          key: 'prod_div_1',
        },
        {
          type: 'item',
          key: 'prod.categories',
          permission: '@categories/list',
          label: t('menus:prod_categories'),
          url: '/categories',
        },
        {
          type: 'item',
          key: 'prod.subcategories',
          permission: '@sub-categories/list',
          label: t('menus:prod_subcategories'),
          url: '/subcategories',
        },
      ],
    },
    {
      type: 'item',
      key: 'contracts',
      permission: '@contracts/list',
      label: t('menus:contracts'),
      url: '/contracts',
    },
    {
      type: 'sub',
      key: 'inventory.prod',
      permission: '@inventoryProducts/list',
      label: t('menus:inventory_prods'),
      children: [
        {
          type: 'item',
          key: 'inventory.prod.all',
          permission: '@products/list',
          label: t('menus:inventory_prod_all'),
          url: '/inventoryProducts',
        },
        {
          type: 'divider',
          key: 'prod_div_1',
        },
        {
          type: 'item',
          key: 'inventory.prod.categories',
          permission: '@categories/list',
          label: t('menus:inventory_prod_categories'),
          url: '/inventoryCategories',
        },
        {
          type: 'item',
          key: 'inventory.prod.subcategories',
          permission: '@inventory-sub-categories/list',
          label: t('menus:inventory_prod_sub_categories'),
          url: '/inventorySubCategories',
        },
      ],
    },
    {
      type: 'sub',
      key: 'settings',
      permission: '@users/list',
      label: t('menus:settings'),
      children: [
        {
          type: 'item',
          key: 'set.users',
          permission: '@users/list',
          label: t('menus:set_users'),
          url: '/users',
        },
        {
          type: 'divider',
          key: 'set_div_1',
        },
        {
          type: 'item',
          key: 'set.roles',
          permission: '@user_groups/list',
          label: t('menus:set_roles'),
          url: '/roles',
        },
      ],
    },
  ];

  const userMenuItems = [
    {
      type: 'sub',
      key: 'user',
      permission: '@system/default',
      label: userName,
      children: [
        {
          type: 'item',
          key: 'profile',
          permission: '@system/default',
          label: t('menus:user_profile'),
          icon: <AiOutlineUser />,
          click: handleProfile,
        },
        {
          type: 'item',
          key: 'logout',
          permission: '@system/default',
          label: t('menus:user_logout'),
          icon: <AiOutlineLogout />,
          click: handleSignOut,
        },
      ],
    },
  ];

  return (
    <>
      <MenuGlobalStyle />
      <Nav>
        <AntMenu mode="horizontal" defaultSelectedKeys={['cadastros']}>
          {menuItems.map(item => renderMenu(item))}
        </AntMenu>
      </Nav>
      <UserInfo>
        <AntMenu mode="horizontal">{userMenuItems.map(item => renderMenu(item))}</AntMenu>
        <Profile visible={showProfile} onClose={() => setShowProfile(false)} />
      </UserInfo>
    </>
  );
}
