<template>
	<div class="store-set-page">
		<div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="addSuper">创建顶级</el-button>
		</div>

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

		<el-dialog title="创建/编辑" :visible.sync="addAndEditDialog" width="30%">
			<el-form :model="editVlaue" status-icon :rules="rules" ref="editForm" label-width="100px" @submit.native.prevent>
				<el-form-item label="名称：" prop="name">
					<el-input type="text" v-model="editVlaue.name" auto-complete="off" class="edit-input" placeholder="请输入名称"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
                 <el-button @click="addAndEditDialog = false">取 消</el-button>
                 <el-button type="primary" @click="onsubmit">确 定</el-button>
           </span>
		</el-dialog>

	</div>
</template>
<script>
	import storeRoleApi from '../../api/store_role'

	export default {
		name: 'store-organize',
		data() {
			return {
				treeData: [],
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				addAndEditDialog: false,
				editVlaue: {
					name: ''
				},
				parentId: '',
				presentId: '',
				addOrEdit: 'add',
				rules: {
					name: [{
							required: true,
							message: '输入名称'
						},
						{
							min: 2,
							max: 8,
							message: '长度在 2 到 8 个字符',
							trigger: 'blur'
						}
					]
				},
			}
		},
		created: function() {
			this.getTreeData()
		},
		methods: {
			getTreeData() {
				storeRoleApi.organizeTree().then((res) => {
					if(res.data.errno == 0) {
						this.$data.treeData = res.data.data
					} else {
						this.$message(res.data.msg)
					}
				})
			},

			remove(node, data) {
				
				this.$confirm(`是否删除${data.name}地区?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let qs = require('querystring');
					storeRoleApi.organizeDele(qs.stringify({id:data.id})).then((res) => {
					if(res.data.errno === 0) {
						this.$message({type: 'success',message: '删除成功!'});
						this.getTreeData()
					 } else {
						this.$message(res.data.msg)
					 }
				    })
					
					
				})
			},

			addAndEdit(node, data, info) {				
				this.$data.addAndEditDialog = true;
				this.$data.presentId = node.key;
				if(info === "add") {
					this.$data.addOrEdit = 'add';
					this.$data.editVlaue.name = "";
				} else if(info === "edit") {
					this.$data.addOrEdit = 'edit';
					this.$data.editVlaue.name = node.label;
				}

				if(node.parent.label != undefined) {
					this.$data.parentId = node.parent.key;
				} else {
					this.$data.parentId = "";
				}

			},
			onsubmit() {
				let qs = require('querystring');
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						if(this.$data.addOrEdit === "add") {
							let list = {
								name: this.$data.editVlaue.name,
								parent_id: this.$data.presentId
							};
							this.addPost(qs.stringify(list))
						} else if(this.$data.addOrEdit === "edit") {
							let list = {
								id: this.$data.presentId,
								name: this.$data.editVlaue.name,
								parent_id: this.$data.parentId
							};
							this.editPost(qs.stringify(list))
						}else{
							let list = {
								name: this.$data.editVlaue.name,
								parent_id: this.$data.presentId
							};
							this.addPost(qs.stringify(list))
						}

					} else {
                        return false;
					}
				})
			},
			editPost(data) {
				storeRoleApi.organizeEdit(data).then((res) => {
					if(res.data.errno === 0) {
						this.$data.addAndEditDialog = false;
						this.getTreeData()
					} else {
						this.$message(res.data.msg)
					}
				})
			},
			addPost(data) {
				storeRoleApi.organizeAdds(data).then((res) => {
					if(res.data.errno === 0) {
						this.$data.addAndEditDialog = false;
						this.getTreeData()
					} else {
						this.$message(res.data.msg)
					}
				})
			},
			addSuper(){
				this.$data.addAndEditDialog = true;
				this.$data.presentId = "";
				this.$data.editVlaue.name = "";
				this.$data.addOrEdit = 'addSuper';
				
			}

		}
	}
</script>
<style lang="scss">
	.store-set-page {
		.top-box {
			position: relative;
			margin-bottom: 20px;
			height: 36px;
			border-bottom: 1px solid #d2d2d2;
			.add-btn {
				position: absolute;
				top: 0;
				right: 20px;
			}
		}
		.edit-input {
			width: 300px;
		}
	}
	
	.el-tree-node__content {
		span {
			margin: 0;
		}
	}
	
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>