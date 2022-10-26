<template>
	<div class="f-menu" :style="{width:$store.state.asideWidth}">
		<el-menu
				class="border-0"
				:collapse="isCollapse"
				:collapse-transition="false"
				:default-active="defaultActive"
				@select="handleSelect"
		>
			<template v-for="menu in menus" :key="menu.id">
				<el-sub-menu v-if="menu.child && menu.child.length>0" :index="menu.name">
					<template #title>
						<el-icon>
							<component :is="menu.icon"/>
						</el-icon>
						<span>{{ menu.name }}</span>
					</template>
					<el-menu-item v-for="(item,idx) in menu.child" :key="item.id" :index="item.frontpath">
						<el-icon>
							<component :is="item.icon"/>
						</el-icon>
						<span>{{ item.name }}</span>
					</el-menu-item>
				</el-sub-menu>

				<el-menu-item v-else :index="menu.frontpath">
					<el-icon>
						<component :is="menu.icon"/>
					</el-icon>
					<span>{{ menu.name }}</span>
				</el-menu-item>
			</template>

		</el-menu>
	</div>
</template>
<script>
export default {
	name: "FMenu"
}
</script>
<script setup>
import {computed, ref} from "vue";
import {useStore} from 'vuex'
import {useRouter, useRoute, onBeforeRouteUpdate} from "vue-router";
const router = useRouter();
const store = useStore()
const route = useRoute();
const isCollapse = computed(() => !(store.state.asideWidth === '250px'))
const defaultActive = ref(route.path)

onBeforeRouteUpdate((to,from)=>{
	defaultActive.value = to.path
})

const handleSelect = (e) => {
	router.push(e)
}

const menus = computed(()=>store.state.menus)


</script>

<style scoped>
.f-menu {
	transition: all 0.2s;
	top: 64px;
	left: 0;
	bottom: 0;
	overflow-y: auto;
	overflow-x: hidden;
	@apply shadow-md fixed bg-light-50;
}
.f-menu::-webkit-scrollbar{
	width: 0;
}
</style>