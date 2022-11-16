<template>
  <el-row :gutter="20" class="mb-5">
    <template v-if="loading">
				<el-col :span="6" :offset="0" v-for="i in 4" :key="i">
					<el-skeleton style="width: 100%" animated loading>
						<template #template>
							<el-card shadow="hover" class="border-0">
								<template #header>
									<div class="flex justify-between">
										<el-skeleton-item variant="text" style="width: 50%" />
										<el-skeleton-item variant="text" style="width: 10%" />
									</div>
								</template>
							</el-card>
						</template>
					</el-skeleton>
				</el-col>
			</template>
    <el-col :span="6" :offset="0" v-for="(item, index) in list">
      <el-card shadow="never" :body-style="{ padding: '20px' }">
        <div class="flex items-center">
          <el-icon :size="20" :class="item.color" class="text-white w-[40px] h-[40px] rounded-full">
            <User v-if="index === 0" />
            <PriceTag v-if="index === 1" />
            <ShoppingCart v-if="index === 2" />
            <Timer v-if="index === 3" />
          </el-icon>
          <div class="ml-2">
            <p>{{ item.value }}</p>
            <small class="text-gray-500 text-xs">{{ item.label }}</small>
          </div>
        </div>
      </el-card>

    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'DistributionPanel'
}
</script>
<script setup>
import { ref } from 'vue';
import { getAgentStatistics } from '~/api/distribution';
const list = ref([])
const loading = ref(false)
loading.value = true
getAgentStatistics().then(res => {
  list.value = res.panels
}).finally(() => {
  loading.value = false
})
</script>

<style scoped lang='scss'>

</style>