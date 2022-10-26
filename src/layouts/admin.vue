<template>
	<el-container>
		<el-header>
			<f-header/>
		</el-header>
		<el-container>
			<el-aside :width="$store.state.asideWidth">
				<f-menu/>
			</el-aside>
			<el-main>
				<f-tag-list/>
				<router-view v-slot="{ Component}">
					<!--页面只能有一个顶级根节点-->
					<transition name="fade">
						<keep-alive :max="10">
							<component :is="Component"/>
						</keep-alive>
					</transition>
				</router-view>
			</el-main>
		</el-container>
	</el-container>
</template>
<script>
export default {
	name: "Admin"
}
</script>
<script setup>
import FHeader from "./componenets/FHeader.vue";
import FMenu from "./componenets/FMenu.vue";
import FTagList from "./componenets/FTagList.vue";
</script>

<style scoped>
.el-aside {
	transition: all .2s;
}

.fade-enter-from {
	opacity: 0;
}

.fade-enter-to {
	opacity: 1;
}

.fade-leave-from {
	opacity: 1;
}

.fade-leave-to {
	opacity: 0;
}

.fade-enter-active
.fade-leave-active {
	transition: all .3s;
}

.fade-enter-active {
	transition-delay: .3s;
}
</style>