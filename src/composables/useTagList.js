import {ref} from 'vue'
import {useRoute, onBeforeRouteUpdate, useRouter} from "vue-router";
import {useCookies} from "@vueuse/integrations/useCookies";

export const useTagList = () => {
    const router = useRouter()
    const cookie = useCookies()
    const route = useRoute()
    const activeTab = ref(route.path)
    const tabList = ref([
        {
            title: 'Home',
            path: '/',
        }
    ])
    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path
        addTab({
            title: to.meta.title,
            path: to.path
        })
    })
    const addTab = tab => {
        let noExist = tabList.value.findIndex(t => t.path === tab.path) === -1;
        if (noExist) {
            tabList.value.push(tab)
            cookie.set("tabList", tabList.value)
        }
    }
    const changeTab = (t) => {
        activeTab.value = t
        router.push(t)
    }
    const initTabList = () => {
        const list = cookie.get("tabList")
        if (list) {
            tabList.value = list
        }
    }
    initTabList()
    const removeTab = (targetName) => {
        let tabs = tabList.value
        let tab = activeTab.value
        if (tab === targetName) {
            tabs.forEach((item, index) => {
                if (item.path === targetName) {
                    let nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        tab = nextTab.path;
                    }
                }
            })
        }
        activeTab.value = tab;
        tabList.value = tabList.value.filter(t => t.path !== targetName)
        cookie.set("tabList", tabList.value);
    }
    const handleClose = (c) => {
        if (c === 'CloseAll') {
            activeTab.value = "/"
            tabList.value = [
                {
                    title: 'Home',
                    path: '/',
                }
            ]
        } else if (c === 'CloseOther') {
            tabList.value = tabList.value.filter(t => t.path === '/' || t.path === activeTab.value)
        }
        cookie.set("tabList", tabList.value)
    }
    return {
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose,
    }
}