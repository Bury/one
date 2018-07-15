<template>
	<div class="device-list-page">
		<div class="top-box">
			<div class="btn-wrap">
				<el-button :type="isShow==true ? 'primary' : ''" size="small" @click="isShow=true">按设备</el-button>
				<el-button :type="isShow==false ? 'primary' : ''" size="small" @click="isShow=false">按门店</el-button>
			</div>
		</div>
		<lists v-if="isShow"></lists>
		<StoreDeviceSumLists v-if="!isShow"></StoreDeviceSumLists>
	</div>
</template>
<script>
	import Lists from './Lists'
	import StoreDeviceSumLists from './StoreDeviceSumLists'
	export default{
		name:"device-list",
		components: {
		    Lists,
		    StoreDeviceSumLists
		},
		data(){
			return{
				isShow:true
			}
		},
	}
</script>
<style lang="scss" scoped>
	.device-list-page{
		.top-box{
			position:relative;
			margin-bottom:20px;
			height: 36px;
			border-bottom:1px solid #d2d2d2;
			.btn-wrap{
				position: absolute;
				bottom:-1px;
				right:20px;
			}
		}
	}
</style>