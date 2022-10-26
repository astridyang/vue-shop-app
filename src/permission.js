import {router, addRoutes} from "./router";
import {getToken} from "./composables/auth";
import {hideFullLoading, showFullLoading, toast} from "./composables/util";
import store from "./store";

let hasGetInfo = false
router.beforeEach(async (to, from, next) => {
    showFullLoading()
    const token = getToken();
    if (!token && to.path !== "/login") {
        toast("Please login first", "error")
        return next({path: "/login"})
    }
    if (token && to.path === "/login") {
        toast("Don't repeat login")
        return next({path: from.path ? from.path : "/"})
    }
    // if login, get userInfo
    let hasNewRoutes = false;
    if (token && !hasGetInfo) {
        const {menus} = await store.dispatch("getInfo")
        hasNewRoutes = addRoutes(menus);
        hasGetInfo = true
    }
    // set page title
    document.title = to.meta.title ? to.meta.title : "admin"
    // 动态路由主要通过两个函数实现。router.addRoute() 和 router.removeRoute()。
    // 它们只注册一个新的路由，也就是说，如果新增加的路由与当前位置相匹配，
    // 就需要你用 router.push() 或 router.replace() 来手动导航，才能显示该新路由。
    hasNewRoutes ? next(to.fullPath) : next()
})

router.afterEach((to, from, failure) => hideFullLoading())