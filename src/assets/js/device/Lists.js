import deviceApi from '@/api/device'
import deviceVersionApi from '@/api/device_version'
import remindApi from '@/api/remind'
import storeApi from '@/api/store'
import getCity from '@/api/getCity'
import storeRole from '@/api/store_role'
export default {
	name: 'device',
	data() {
		return {
			tableData: [],
			organizes: [],
			organizeCode: [],
			dorganizeCode: [],
			allStores: [],
			dallStores: [],
			defaultAttr: {
				label: 'name',
				value: 'id',
				children: 'children',
			},
			pagination: {
				currentPage: 1,
				totalCount: 0,
			},
			allVersions: [],
			createdTimes: ['', ''],
			startTimes: ['', ''],
			requestParameters: {
				page: 1,
				page_size: 20,
				device_id: '',
				version: '',
				merchant_organize_id:'',
				belong_sid: '',
                locate: '',
				name: '',				
				// created_at_begin: '',
				// cteated_at_end: '',
				// start_at_begin: '',
				// start_at_end: '',
				is_allocate: 1
			},
			distributionFormVisible: false,
			distributionForm: {
				device_id: '',
				belong_sid: ''
			},
			operationRules: {},
			editFormVisible: false,
			editForm: {
				device_id: '',
				store_name: '',
				locate: '',
				locate_desc: ''
			},
			editRules: {
				locate_desc: [{
						required: true,
						message: '请输入安装位置',
						trigger: 'blur'
					},
					{
						min: 2,
						max: 8,
						message: '长度在 2 到 8 个字符',
						trigger: 'blur'
					}
				]
			},
			nodatatext: "请选择门店架构",
			dnodatatext: '请选择门店架构',
		}
	},
	created: function() {
		this.lists();
		this.getDeviceVersionListsResults();
		this.getOrganizes();
	},
	methods: {
		lists() {
			// this.$data.requestParameters.created_at_begin = this.$data.createdTimes[0];
			// this.$data.requestParameters.cteated_at_end = this.$data.createdTimes[1];
			// this.$data.requestParameters.start_at_begin = this.$data.startTimes[0];
			// this.$data.requestParameters.start_at_end = this.$data.startTimes[1];

			let qs = require('querystring');
			deviceApi.lists(this.$data.requestParameters).then((res) => {
				if(res.data.errno === 0) {
					this.$data.tableData = res.data.data.list;
					this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
					this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
				} else {
					this.$message(res.data.msg)
				}

			})
		},
		getDeviceVersionListsResults() {
			deviceVersionApi.listsResults().then((res) => {
				if(res.data.errno === 0) {
					this.$data.allVersions = res.data.data;
				} else {
					this.$message(res.data.msg)
				}

			})
		},
		handleCurrentChange(currentPage) {
			this.$data.requestParameters.page = currentPage;
			this.lists();
		},
		onSubmit() {
			if(this.organizeCode.length > 0){
				this.$data.requestParameters.merchant_organize_id = this.organizeCode[this.organizeCode.length - 1];
			}else{
				this.$data.requestParameters.merchant_organize_id = "";
			}
			this.lists();
		},
		resetSearch() {
			let isAllocate;
			if(this.$data.requestParameters.is_allocate === 1) {
				isAllocate = 1;
			} else {
				isAllocate = 0;
			}
			this.$data.requestParameters = {
				page: 1,
				page_size: 10,
				device_id: '',
				version: '',
				merchant_organize_id:'',
				belong_sid: '',
				name: '',
				created_at_begin: '',
				cteated_at_end: '',
				start_at_begin: '',
				start_at_end: '',
				is_allocate: isAllocate
			}
			this.$data.organizeCode = [];
		},
		fnDistribution(row) {
			this.$data.dorganizeCode = [];
			this.$data.distributionForm = {
				device_id: '',
				belong_sid: ''
			};
			this.$data.distributionForm.device_id = row.device_id;
			this.$data.distributionForm.belong_sid = '';
			this.$data.distributionFormVisible = true;
		},

		//取消分配
		cancelDeploy(val) {
			this.$confirm(`是否取消分配?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let data = {
					device_id: val.device_id,
					belong_sid: val.store_id
				}
				let qs = require('querystring');
				deviceApi.cancelDeploy(qs.stringify(data)).then((res) => {
					if(res.data.errno === 0) {
						this.$message('取消成功');
						this.lists();
					} else {
						this.$message(res.data.msg)
					}

				})

			})

		},
		distributionCancel() {
			this.$data.distributionFormVisible = false;
		},
		distributionSubmit() {
			if(this.$data.distributionForm.belong_sid == "") {
				this.$message("请选择门店")
				return false;
			};
			let qs = require('querystring');
			deviceApi.distribution(qs.stringify(this.$data.distributionForm)).then((res) => {
				if(res.data.errno === 0) {
					this.$message('分配成功');
					this.$data.dorganizeCode = [];
					this.lists();
					this.$data.distributionFormVisible = false;
				} else {
					this.$message(res.data.msg)
				}

			})
		},
		fnEdit(row) {
			this.$data.editForm = {
					device_id: row.device_id,
					store_name: row.store.name,
					locate: row.locate == '' ? 'other' : row.locate,
					locate_desc: row.locate_desc
				},
				this.$data.editFormVisible = true;
		},
		editCancel() {
			this.$data.editForm = {
				device_id: '',
				store_name: '',
				locate: '',
				locate_desc: ''
			}
			this.$data.editFormVisible = false;
		},
		editSubmit(formName) {

			this.$refs[formName].validate((valid) => {

				if(valid) {
					let list = {
						'id': this.$data.editForm.device_id,
						'locate': this.$data.editForm.locate,
						'locate_desc': this.$data.editForm.locate_desc
					}
					let qs = require('querystring');
					deviceApi.edit(qs.stringify(list)).then((res) => {
						if(res.data.errno === 0) {

							this.$message({
								type: 'success',
								message: '操作成功'
							});
							this.lists();
							this.editCancel();
						} else {

						}

					})
				}
			});
		},
		handleClick(dom) {
			switch(dom.name) {
				case "first":
					this.$data.requestParameters.is_allocate = 1;
					this.lists();
					break;
				case "second":
					this.$data.requestParameters.is_allocate = 0;
					this.lists();
					break;
			}
		},
		getOrganizes() {
			storeRole.organizeTree().then((res) => {
				if(res.data.errno == 0) {
					this.$data.organizes = res.data.data
				} else {
					this.$message(res.data.msg)
				}
			})
		},
		getStore() {
			this.$data.requestParameters.belong_sid = "";
			let organ = this.$data.organizeCode[this.$data.organizeCode.length - 1]
			let data = {
				merchant_organize_id: organ
			};
			storeApi.organizeStoreResult(data).then((res) => {
				if(res.data.errno === 0) {
					if(res.data.data != null && res.data.data.length > 0) {
						this.$data.allStores = res.data.data;
					} else {
            this.$data.dallStores = [];
						this.$data.nodatatext = "此地区暂无门店";
						this.$data.distributionForm.belong_sid = "";
					}
				} else {
					this.$message(res.statusText)
				}
			})
		},
		dialogStore() {
			let organ = this.$data.dorganizeCode[this.$data.dorganizeCode.length - 1]
			let data = {
				merchant_organize_id: organ
			};
			storeApi.organizeStoreResult(data).then((res) => {
				if(res.data.errno === 0) {
					if(res.data.data != null && res.data.data.length > 0) {
						this.$data.dallStores = res.data.data;
					} else {
            this.$data.dallStores = [];
						this.$data.dnodatatext = "此地区暂无门店";
						this.$data.distributionForm.belong_sid = "";
					}
				} else {
					this.$message(res.statusText)
				}
			})

		}
	}
}
