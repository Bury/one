import storeRoleApi from '@/api/store_role'

	export default {
		name: 'store-organize',
		data() {
			return {
				treeData: [],
				titleName:'创建',
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
		watch:{
			addAndEditDialog:function(){
				setTimeout(() => {
					this.$refs.editForm.clearValidate();
				},0)
			}
		},
		created: function() {
			this.getTreeData();
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
					this.$data.titleName = "创建";
				} else if(info === "edit") {
					this.$data.addOrEdit = 'edit';
					this.$data.editVlaue.name = node.label;
					this.$data.titleName = "编辑";
				}
				
				node.parent.label != undefined ? this.$data.parentId = node.parent.key : this.$data.parentId = "" ;
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

		}
	}