<template>
  <div style="display: flex;text-align: center">
    <el-col :span="11">
	    <div class="remind-set-page">
        <h3 class="top-box">到店提醒配置</h3>
        <div class="all-box">
            <el-checkbox :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange">全选</el-checkbox>
        </div>
		<div class="type-list">
            <el-checkbox-group v-model="checkedType" @change="fnChangeType">
                <el-checkbox v-for="(tpye,key) in types" :label="tpye" :key="key">{{typeVal[key]}}</el-checkbox>
            </el-checkbox-group>
        </div>
		<div class="saveBtn">
            <el-button type="primary" class="save-btn" @click="fnRemindSet">保存</el-button>
        </div>
	</div>
    </el-col>
  </div>
</template>
<script src="@/assets/js/store/StoreRemind.js"></script>
<style  src="@/assets/css/store/StoreRemind.scss" lang="scss" scoped>
