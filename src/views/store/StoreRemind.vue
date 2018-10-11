<template>
	<div style="display: flex;text-align: center;min-height: 600px;">
		<el-col :span="11">
			<div class="remind-set-page">
				<h3 class="top-box">来客提醒配置</h3>
				<div class="all-box">
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="margin-left: 60px;">全选</el-checkbox>
				</div>
				<div class="type-list">
					<el-checkbox-group v-model="checkedType" @change="fnChangeType" style="margin-left: 92px;">
						<el-checkbox v-for="(type,key) in types" :label="type" :key="key">{{typeVal[key]}}</el-checkbox>
					</el-checkbox-group>
				</div>
				<div class="saveBtn">
					<el-button plain class="save-btn" @click="fnRemindSet" onclick="clickTotal('406','来客提醒设置',1)">保存</el-button>
				</div>
			</div>
		</el-col>
	</div>
</template>
<script src="@/assets/js/store/StoreRemind.js"></script>
<style src="@/assets/css/store/StoreRemind.scss" lang="scss" scoped>