<template>
	<el-row class=" min-h-screen bg-indigo-500">
		<el-col :lg="18" :md="12" class="flex-centered">
			<div>
				<div class=" font-bold text-5xl text-light-50 mb-4">Welcome</div>
				<div class="text-gray-200 text-sm">Project <i>Vue3 + vite e-shop development</i> presentation site.</div>
			</div>
		</el-col>
		<el-col :lg="6" :md="12" class="bg-light-50 flex-centered flex-col">
			<h2 class="font-bold text-3xl text-gray-800">Welcome back</h2>
			<div class="flex-centered my-5 text-gray-300 space-x-2">
				<span class="line"></span><span>User account login</span><span class="line"></span>
			</div>
			<el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
				<el-form-item prop="username">
					<el-input v-model="form.username" placeholder="input your username">
						<template #prefix>
							<el-icon>
								<User/>
							</el-icon>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="form.password" placeholder="input your password" type="password" show-password>
						<template #prefix>
							<el-icon>
								<Lock/>
							</el-icon>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button :loading="loading" round class="w-[250px]" color="#626aef" type="primary" @click="onSubmit">Login
					</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
export default {
	name: "login",
};
</script>
<script setup>
import {reactive, ref, onMounted, onBeforeMount} from "vue";
import {useRouter} from "vue-router";
import {useStore} from 'vuex'
import {toast} from "~/composables/util";

const router = useRouter();
const store = useStore();
const form = reactive({
	username: "admin",
	password: "admin",
});
const rules = {
	username: [
		{
			required: true,
			message: "username can't be empty",
			trigger: "blur",
		},
	],
	password: [
		{
			required: true,
			message: "password can't be empty",
			trigger: "blur",
		},
	],
};
const formRef = ref(null);
const loading = ref(false);
const onSubmit = () => {
	formRef.value.validate((valid) => {
		if (!valid) {
			return false;
		}
		loading.value = true;

		store.dispatch("login", form).then(() => {
			toast("Login success");
			router.push("/");
		}).finally(() => {
			loading.value = false;
		});

	});
};

// add keyboard listener
function onKeyUp(e) {
	if (e.key === 'Enter') {
		onSubmit();
	}
}

onMounted(() => {
	document.addEventListener("keyup", onKeyUp)
})
onBeforeMount(() => {
	document.removeEventListener("keyup", onKeyUp)
})
</script>

<style scoped>
.line {
	@apply h-[1px] w-16 bg-gray-200;
}

.flex-centered {
	@apply flex items-center justify-center;
}
</style>