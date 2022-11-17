import { createRouter, createWebHashHistory } from "vue-router";
import Admin from "~/layouts/admin.vue";
import Index from "~/pages/index.vue";
import Login from "~/pages/login.vue";
import NotFound from "~/pages/404.vue";
import GoodsList from "~/pages/goods/list.vue";
import CategoryList from "~/pages/category/list.vue";
import CommentList from "~/pages/comment/list.vue";
import CouponList from "~/pages/coupon/list.vue";
import ImageList from "~/pages/image/list.vue";
import NoticeList from "~/pages/notice/list.vue";
import OrderList from "~/pages/order/list.vue";
import SettingBase from "~/pages/setting/base.vue";
import SetPayment from "~/pages/setting/payment.vue";
import SetShip from "~/pages/setting/ship.vue";
import UserList from "~/pages/user/list.vue";
import ManagerList from "~/pages/manager/list.vue";
import AccessList from "~/pages/access/list.vue";
import RoleList from "~/pages/role/list.vue";
import SkusList from "~/pages/skus/list.vue";
import LevelList from "~/pages/level/list.vue";
import Distribution from "~/pages/distribution/index.vue";
import DistributionSetting from "~/pages/distribution/setting.vue";

const routes = [
  {
    path: "/",
    name: "admin",
    component: Admin,
  },
  {
    path: "/login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];
const asyncRoutes = [
  {
    path: "/",
    name: "/",
    component: Index,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/goods/list",
    name: "/goods/list",
    component: GoodsList,
    meta: {
      title: "Goods List",
    },
  },
  {
    path: "/category/list",
    name: "/category/list",
    component: CategoryList,
    meta: {
      title: "Category List",
    },
  },
  {
    path: "/comment/list",
    name: "/comment/list",
    component: CommentList,
    meta: {
      title: "Comment List",
    },
  },
  {
    path: "/coupon/list",
    name: "/coupon/list",
    component: CouponList,
    meta: {
      title: "Coupon List",
    },
  },
  {
    path: "/image/list",
    name: "/image/list",
    component: ImageList,
    meta: {
      title: "Image List",
    },
  },
  {
    path: "/notice/list",
    name: "/notice/list",
    component: NoticeList,
    meta: {
      title: "Notice List",
    },
  },
  {
    path: "/order/list",
    name: "/order/list",
    component: OrderList,
    meta: {
      title: "Order List",
    },
  },
  {
    path: "/setting/base",
    name: "/setting/base",
    component: SettingBase,
    meta: {
      title: "Setting Base",
    },
  },
  {
    path: "/user/list",
    name: "/user/list",
    component: UserList,
    meta: {
      title: "User List",
    },
  },
  {
    path: "/manager/list",
    name: "/manager/list",
    component: ManagerList,
    meta: {
      title: "Manager List",
    },
  },
  {
    path: "/access/list",
    name: "/access/list",
    component: AccessList,
    meta: {
      title: "Access List",
    },
  },
  {
    path: "/role/list",
    name: "/role/list",
    component: RoleList,
    meta: {
      title: "Role List",
    },
  },
  {
    path: "/skus/list",
    name: "/skus/list",
    component: SkusList,
    meta: {
      title: "Skus List",
    },
  },
  {
    path: "/level/list",
    name: "/level/list",
    component: LevelList,
    meta: {
      title: "Level List",
    },
  },
  {
    path: "/setting/buy",
    name: "/setting/buy",
    component: SetPayment,
    meta: {
      title: "Set Payment",
    },
  },
  {
    path: "/setting/ship",
    name: "/setting/ship",
    component: SetShip,
    meta: {
      title: "Set Ship",
    },
  },
  {
    path: "/distribution/index",
    name: "/distribution/index",
    component: Distribution,
    meta: {
      title: "Distribution",
    },
  },
  {
    path: "/distribution/setting",
    name: "/distribution/setting",
    component: DistributionSetting,
    meta: {
      title: "Distribution Setting",
    },
  },
];
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function addRoutes(menus) {
  let hasNewRoutes = false;
  const findAndAddRoutesByMenus = (arr) => {
    arr.forEach((e) => {
      let item = asyncRoutes.find((o) => o.path === e.frontpath);
      if (item && !router.hasRoute(item.path)) {
        hasNewRoutes = true;
        router.addRoute("admin", item);
      }
      if (e.child && e.child.length > 0) {
        findAndAddRoutesByMenus(e.child);
      }
    });
  };
  findAndAddRoutesByMenus(menus);
  // console.log(router.getRoutes())
  return hasNewRoutes;
}
