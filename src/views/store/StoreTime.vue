<template>
	<div class="open-time-set-page">
		<h3 class="top-box">营业时间设置</h3>
		<div class="time-box">
			<el-time-select placeholder="开始时间" v-model="startTime"
		    :picker-options="{
		      start: '00:00',
		      step: '00:15',
		      end: '23:59',
		      maxTime: endTime}">
	  		</el-time-select>
	  		<span style="padding:0 10px;">至</span> 
			<el-time-select placeholder="结束时间" v-model="endTime"
			    :picker-options="{
			      start: '00:00',
			      step: '00:15',
			      end: '23:59',
			      minTime: startTime}">
			</el-time-select>
		</div>
		<div class="saveBtn">
			<el-button type="primary" class="save-btn" @click="fnSetTime">保存</el-button>
		</div>
	</div>
</template>

<script>
  import storeApi from '../../api/store'

  export default {
  	name:'open-time-set',
    data() {
      return {
        startTime: '',
        endTime: ''
      };
    },
    created:function(){
    	this.fnGetTime();
    },
    methods:{
    	//显示时间
    	fnGetTime(){
    		storeApi.getTime().then((res) => {
    			if(res.data.errno === 0){
					console.log(res.data.data);
					this.$data.startTime = res.data.data.start_time;
					this.$data.endTime = res.data.data.end_time;
    			}else{
					this.$message.error(res.data.msg);
    			}
    		})
    	},
    	//设置
    	fnSetTime(){
    		var startTime = this.$data.startTime;
    		var endTime = this.$data.endTime;
    		if(startTime == ''){
    			this.$message({
		          message: '请选择开始时间',
		          type: 'warning',
		          duration:1000
		        });
    			return false;
    		}
    		if(endTime == ''){
    			this.$message({
		          message: '请选择结束时间',
		          type: 'warning',
		          duration:1000
		        });
    			return false;
    		}
			let list = {
	        	'start_time' : startTime,
	        	'end_time'   : endTime
	    	}
		    let qs = require('querystring')
    		storeApi.setTime(qs.stringify(list)).then((res) => {
    			if(res.data.errno === 0){
					console.log(res)
					this.$message({
			          message: '营业时间设置成功',
			          type: 'success',
			          duration:1500
			        });

    			}else{
					this.$message.error(res.data.msg);
    			}
    		})
    	},
    }
  }
</script>
<style lang="scss" scoped>
	.open-time-set-page{
		margin:80px auto 0;
		padding:40px;
		width: 500px;
		border:1px solid #d2d2d2;
		.top-box{
			height: 60px;
		}
		.time-box{
			margin:0 auto 100px;;
		}
		.saveBtn{
			position:relative;
			width: 100%;
			height: 40px;
			.save-btn{
				position: absolute;
				bottom:0;
				right:20px;
			}
		}
	}
</style>