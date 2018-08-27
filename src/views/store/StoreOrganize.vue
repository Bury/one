<template>
	<div class="store-set-page">
		<!--<div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="addSuper">创建顶级</el-button>
		</div>-->

		<div class="store-tree-box">
			<el-tree :data="treeData" node-key="id" default-expand-all :expand-on-click-node="false" :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
				        <span>
                  <el-button type="text" size="mini" @click="addAndEdit(node,data,'add')">创建</el-button>
                  <el-button type="text" size="mini" @click="addAndEdit(node,data,'edit')">编辑</el-button>
                  <el-button type="text" size="mini"  @click="remove(node,data)">删除</el-button>
                </span>
				</span>
			</el-tree>
		</div>

		<el-dialog :title="titleName" :visible.sync="addAndEditDialog" width="30%">
			<el-form :model="editVlaue" status-icon :rules="rules" ref="editForm" label-width="100px" @submit.native.prevent>
				<el-form-item label="名称：" prop="name">
					<el-input type="text" v-model="editVlaue.name" auto-complete="off" class="edit-input" placeholder="请输入名称"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
                 <el-button @click="addAndEditDialog = false">取 消</el-button>
                 <el-button type="primary" @click="onsubmit
">确 定</el-button>
           </span>
		</el-dialog>

	</div>
</template>
<script src="@/assets/js/store/StoreOrganize.js"></script>
<style lang="scss" src="@/assets/css/store/StoreOrganize.scss">