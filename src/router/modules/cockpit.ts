import { RouteRecordRaw } from 'vue-router';
import { Layout, ParentLayout } from '@/router/constant';
import { ProfileOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/cockpit-manage',
    name: 'cockpit-manage',
    redirect: '/cockpit-manage/list',
    component: Layout,
    meta: {
      title: '大屏管理',
      icon: renderIcon(ProfileOutlined),
      sort: 1,
    },
    children: [
      {
        path: 'list',
        name: 'cockpit-manage_list',
        meta: {
          title: '大屏管理',
        },
        component: () => import('@/views/cockpit-manage/index.vue'),
      },
    ],
  },
  {
    path: '/designer',
    name: 'designer',
    redirect: '/designer/edit',
    component: ParentLayout,
    meta: {
      title: '大屏设计器',
      icon: renderIcon(ProfileOutlined),
      sort: 1,
      hidden: true,
    },
    children: [
      {
        path: 'edit',
        name: '大屏设计器',
        meta: {
          title: '大屏设计器',
        },
        component: () => import('@/views/designer/index.vue'),
      },
    ],
  },
  {
    path: '/preview',
    name: 'preview',
    redirect: '/preview/view',
    component: ParentLayout,
    meta: {
      title: '大屏展示',
      icon: renderIcon(ProfileOutlined),
      sort: 1,
      hidden: true,
    },
    children: [
      {
        path: 'view',
        name: '大屏展示',
        meta: {
          title: '大屏展示',
        },
        component: () => import('@/views/preview/index.vue'),
      },
    ],
  }

];

export default routes;
