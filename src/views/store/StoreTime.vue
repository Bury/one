<template>
	<div style="display: flex;text-align: center;min-height: 600px;">
		<el-col :span="12">
			<div class="open-time-set-page">
				<h3 class="top-box">营业时间设置</h3>
				<div class="time-box">
					<el-time-select placeholder="开始时间" v-model="startTime" :picker-options="{
		      start: '00:00',
		      step: '00:15',
		      end: '23:59',
		      maxTime: endTime}">
					</el-time-select>
					<span style="padding:0 10px;">至</span>
					<el-time-select placeholder="结束时间" v-model="endTime" :picker-options="{
			      start: '00:00',
			      step: '00:15',
			      end: '23:59',
			      minTime: startTime}">
					</el-time-select>
				</div>
				<div class="saveBtn">
					<el-button plain class="save-btn" @click="fnTimeSet" onclick="clickTotal('405','营业时间设置',1)">保存</el-button>
				</div>
			</div>
		</el-col>
	</div>
</template>
<script src="@/assets/js/store/StoreTime.js"></script>
<style lang="scss" scoped src="@/assets/css/store/StoreTime.scss">