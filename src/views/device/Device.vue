<template>
	<div class="device-list-page">
		<div class="top-box">
			<div class="btn-wrap">
				<el-button :type="isShow==true ? 'primary' : ''" size="small" @click="selectPath('Lists')">按设备</el-button>
				<el-button :type="isShow==false ? 'primary' : ''" size="small" @click="selectPath('StoreDeviceSumLists')">按门店</el-button>
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
	export default{
		name:"device-list",
		data(){
			return{
				isShow:true
			}
		},
		created(){
			this.$route.name === "Lists" ? this.$data.isShow = true : this.$data.isShow = false;
		
			 
		},
		methods:{
			selectPath(val){
				this.$router.push({name:val})
				val === "Lists" ? this.$data.isShow = true : this.$data.isShow = false;				
			}
		}
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