<template>
	<div class="device-list-page">
		<div class="top-box">
			<div class="btn-wrap">
				<el-tabs  v-model="selectType"  type="card" @tab-click="selectPath">
					<el-tab-pane label="按设备" name="Lists"></el-tab-pane>
					<el-tab-pane label="按门店" name="StoreDeviceSumLists"></el-tab-pane>
				</el-tabs>
				<!--<button class="yy-button yy-btn-mini" :class="[isShow==true ? 'yy-btn-checked' : '']" @click="selectPath('Lists')">按设备</button>
				<button class="yy-button yy-btn-mini" :class="[isShow==false ? 'yy-btn-checked' : '']" @click="selectPath('StoreDeviceSumLists')">按门店</button>-->
			</div>
		</div>
		<router-view></router-view>
		<!--<lists v-if="isShow"></lists>
		<StoreDeviceSumLists v-if="!isShow"></StoreDeviceSumLists>-->
	</div>
</template>
<script>
	//	import Lists from './Lists'
	//	import StoreDeviceSumLists from './StoreDeviceSumLists'
	export default {
		name: "device-list",
		data() {
			return {
				isShow: true,
				selectType:'Lists'
			}
		},
		created() {
			this.$route.name === "Lists" ? this.$data.isShow = true : this.$data.isShow = false;

		},
		methods: {
			selectPath(val) {
				this.$router.push({
					name: val.name
				})
				val.name === "Lists" ? this.$data.isShow = true : this.$data.isShow = false;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.device-list-page {
		.top-box {
			position: relative;
			margin-bottom: 20px;
			height: 41px;
			/*.btn-wrap {
				position: absolute;
				bottom: -1px;
				right: 0px;
			}*/
		}
	}
</style>