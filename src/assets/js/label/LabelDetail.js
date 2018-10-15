import labelApi from '@/api/label'
	export default {
		name: 'label-detail',
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
					sort: '',
          selected:'',
				},
				saveTag: [],
				currentId: '',
				rules: {
					sort: [{
							required: true,
							message: '请输入排序名',
							trigger: 'blur'
						},
						{
							validator: (rule, value, callback) => {
								if(value.match(/^\+?[1-9]\d*$/)) {
									callback();
								} else {
									callback("只能输入大于0的整数");
								}
							},
							trigger: 'blur'
						}
					]
				},
				requestParameters: {
					parent_id: '',
					page: 1,
					page_size: 20
				}

			}
		},
		watch: {
			dialogFormVisible: function() {
				setTimeout(() => {
					this.$refs.ruleForm.clearValidate();
				});
			}
		},
		created: function() {
			this.labeChildlList();
		},
		methods: {
			// 列表
			labeChildlList() {
				this.$data.requestParameters.parent_id = this.$route.query.LabelId;
				let qs = require('querystring')
				labelApi.tagList(qs.stringify(this.$data.requestParameters)).then((res) => {
					if(res.data.errno === 0) {
						let list = [];
						for(let i = 0; i < res.data.data.list.length; i++) {
							list.push({
								id: res.data.data.list[i].id,
								status: res.data.data.list[i].selected
							})
						};
						this.$data.saveTag = list;
						this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
						this.$data.pagination.totalCount = res.data.data.pagination.totalCount;

					} else {

					}
				})
			},
			handleCurrentChange(currentPage) {
				this.$data.requestParameters.page = currentPage;
				this.labeChildlList();
			},
			selectBox(val, d) {
				let v = val === true ? 1 : 0;
				for(let j = 0; j < this.$data.saveTag.length; j++) {
					(this.$data.saveTag[j].id === d) && (this.$data.saveTag[j].status = v);
				}
			},
			saveSelectTag() {

				let list = {
					parent_id:this.$data.requestParameters.parent_id,
					tag_ids: JSON.stringify(this.$data.saveTag)
				};
				let qs = require('querystring');
				labelApi.tagEdit(qs.stringify(list)).then((res) => {
					if(res.data.errno === 0) {
						this.$message({
							message: '保存成功！',
							type: 'success'
						});
					} else {
                       this.$message.error(res.data.msg)
					}
				})
			},

			fnEdit(row) {
				this.$data.dialogTitle = '编辑';
				this.$data.currentId = row.id;
				this.$data.ruleForm.sort = '';
				this.$data.ruleForm.selected = row.selected;
				this.$data.dialogFormVisible = true;
			},
			fnGoback() {
				this.$router.push('/LabelList');
			},

			cancel() {
				this.$data.dialogFormVisible = false;
				this.$data.ruleForm.sort = '';
				this.$data.currentId = '';
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
					  if(this.$data.ruleForm.selected == 1){
              let list = {
                'tag_id': this.$data.currentId,
                'sort': this.$data.ruleForm.sort
              }
              let qs = require('querystring');
              labelApi.tagSort(qs.stringify(list)).then((res) => {
                if(res.data.errno === 0) {
                  this.labeChildlList();
                  this.$message.success('排序成功！')
                }else {
                  this.$message(res.data.msg)
                }
              })
            }else if(this.$data.ruleForm.selected == 0){
					    this.$message.info('该标签未保存，不允许排序')
            }
            this.$data.dialogFormVisible = false;
					}
				});
			},

		}
	}