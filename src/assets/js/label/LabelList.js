	import labelApi from '@/api/label'
	export default {
		name: 'label-list',
		data() {
			return {
				tableData: [],
				pagination: {
					currentPage: 1,
					totalCount: 0,
				},
				dialogTitle: "",
				dialogFormVisible: false,
				ruleForm: {
					name: '',
				},
				currentId: '',
				rules: {
					name: [{
							required: true,
							message: '请输入标签类名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 4,
							message: '长度在 2 到 4 个字符',
							trigger: 'blur'
						}
					]
				},
				requestParameters: {
					page: 1,
					page_size: 20
				}

			}
		},
		created: function() {
			this.labelList();
		},
		methods: {
			// 列表
			labelList() {
				let qs = require('querystring');
				labelApi.labelList(qs.stringify(this.$data.requestParameters)).then((res) => {
					if(res.data.errno === 0) {
						this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
						this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
					} else {

					}
				})
			},
			handleCurrentChange(currentPage) {
				this.$data.requestParameters.page = currentPage;
				this.labelList();
			},
			fnGoPage(row) {
				this.$router.push({
					name: 'LabelDetail',
					query: {
						LabelId: row.id
					}
				});
			},

//			cancel() {
//				this.$data.dialogFormVisible = false;
//				this.$data.ruleForm.name = '';
//				this.$data.currentId = '';
//			},
//			submitForm(formName) {
//				this.$refs[formName].validate((valid) => {
//					if(valid) {
//						if(this.$data.currentId !== '') {
//							let list = {
//								'id': this.$data.currentId,
//								'name': this.$data.ruleForm.name
//							}
//							let qs = require('querystring')
//							labelApi.editLabel(qs.stringify(list)).then((res) => {
//								if(res.data.errno === 0) {
//									this.labelList();
//								} else {
//									this.$message.error(res.data.msg)
//								}
//							})
//						} else {
//							let list = {
//								'name': this.$data.ruleForm.name
//							}
//							let qs = require('querystring')
//							labelApi.addLabel(qs.stringify(list)).then((res) => {
//								if(res.data.errno === 0) {
//									this.labelList();
//								} else {
//									this.$message.error(res.data.msg)
//								}
//							})
//						}
//						this.$data.ruleForm.name = '';
//						this.$data.currentId = '';
//						this.$data.dialogFormVisible = false;
//					}
//				});
//			}
		}
	}