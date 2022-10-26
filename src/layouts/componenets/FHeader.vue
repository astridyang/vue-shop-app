<template>
	<div class="f-header">
		<span class="logo">
			<el-icon class="mr-1"><Star/></el-icon>
			shop
		</span>
		<el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
			<Fold v-if="$store.state.asideWidth==='250px'"/>
			<Expand v-else />
		</el-icon>
		<el-tooltip content="Refresh" placement="bottom" effect="light">
			<el-icon class="icon-btn" @click="handleRefresh">
				<Refresh/>
			</el-icon>
		</el-tooltip>
		<div class="ml-auto flex items-center">
			<el-tooltip content="Fullscreen" placement="bottom" effect="light">
				<el-icon class="icon-btn" @click="toggle">
					<FullScreen v-if="!isFullscreen"/>
					<Aim v-else/>
				</el-icon>
			</el-tooltip>
			<el-dropdown class="dropdown" @command="handleCommand">
		    <span class="flex items-center text-light-50">
			    <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar"/>
		      {{ $store.state.user.username }}
		      <el-icon class="el-icon--right">
		        <arrow-down/>
		      </el-icon>
		    </span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="updatePsw">Update psw</el-dropdown-item>
						<el-dropdown-item command="logout">Logout</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>

	<form-drawer ref="formDrawerRef" title="Update Password" destroyOnClose @submit="onSubmit">
		<el-form ref="formRef" :rules="rules" :model="form" size="small" label-width="100px">
			<el-form-item prop="oldpassword" label="oldPassword">
				<el-input v-model="form.oldpassword" placeholder="input old password" type="password" show-password>
				</el-input>
			</el-form-item>
			<el-form-item prop="password" label="password">
				<el-input v-model="form.password" placeholder="input new password" type="password" show-password>
				</el-input>
			</el-form-item>
			<el-form-item prop="repassword" label="repassword">
				<el-input v-model="form.repassword" placeholder="repeat new password" type="password" show-password>
				</el-input>
			</el-form-item>
		</el-form>
	</form-drawer>
</template>
<script>
export default {
	name: "Header"
}
</script>
<script setup>
import FormDrawer from "~/components/FormDrawer.vue";
import {useFullscreen} from '@vueuse/core'
import {useRePassword} from "~/composables/useManager";
import {useLogout} from "~/composables/useManager";
const {isFullscreen, toggle} = useFullscreen()
const {
	form,
	formRef,
	formDrawerRef,
	showRePasswordForm,
	rules,
	onSubmit
} = useRePassword();


const {
	handleLogout
} = useLogout();


const handleCommand = (c) => {
	switch (c) {
		case "updatePsw":
			showRePasswordForm()
			break;
		case "logout":
			handleLogout();
			break;
	}
}
const handleRefresh = () => location.reload()

</script>

<style scoped>
.f-header {
	@apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
	height: 64px;
	z-index: 200;
}

.logo {
	width: 250px;
	@apply flex justify-center items-center font-thin text-xl;
}

.icon-btn {
	width: 42px;
	height: 64px;
	cursor: pointer;
	@apply flex justify-center items-center;
}

.icon-btn:hover {
	@apply bg-indigo-600;
}

.f-header .dropdown {
	@apply mx-5;
}
</style>