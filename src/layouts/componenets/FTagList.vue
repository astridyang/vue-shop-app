<template>
	<div class="f-tag-list" :style="{left:$store.state.asideWidth}">
		<el-tabs
				v-model="activeTab"
				type="card"
				class="demo-tabs"
				@tab-remove="removeTab"
				@tab-change="changeTab"
				style="min-width: 100px"
		>
			<el-tab-pane
					v-for="item in tabList"
					:closable="item.path!=='/'"
					:key="item.path"
					:label="item.title"
					:name="item.path"
			>
			</el-tab-pane>
		</el-tabs>
		<span class="tag-btn">
			<el-dropdown @command="handleClose">
		    <span class="el-dropdown-link">
		      <el-icon>
		        <arrow-down/>
		      </el-icon>
		    </span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="CloseOther">CloseOther</el-dropdown-item>
						<el-dropdown-item command="CloseAll">CloseAll</el-dropdown-item>
					</el-dropdown-menu>
				</template>
		</el-dropdown>
		</span>
	</div>
	<div style="height: 44px;"></div>
</template>
<script>
export default {
	name: "TagList"
}
</script>
<script setup>
import {useTagList} from "~/composables/useTagList";

const {activeTab, tabList, changeTab, removeTab, handleClose} = useTagList()
</script>

<style scoped>
.f-tag-list {
	@apply fixed bg-gray-100 flex items-center px-2;
	/*// TODO*/
	top: 64px;
	right: 0;
	height: 44px;
	z-index: 100;
}

.tag-btn {
	@apply flex items-center justify-center bg-white rounded ml-auto px-2;
	height: 32px;
}

:deep(.el-tabs__header) {
	@apply mb-0;
	border: 0;
	height: 32px;
}

:deep(.el-tabs__nav) {
	border: 0 !important;
}

:deep(.el-tabs__item) {
	border: 0 !important;
	height: 32px;
	line-height: 32px;
	@apply bg-white mx-1 rounded;
}

:deep(.el-tabs__nav-prev), :deep(.el-tabs__nav-next) {
	height: 32px;
	line-height: 32px;
}

:deep(.is-disabled) {
	cursor: not-allowed;
}
</style>