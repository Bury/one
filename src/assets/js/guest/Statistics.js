import storeApi from '@/api/store';
import statisticsApi from '@/api/statistics';
import storeRole from '@/api/store_role';
import * as utils from '@/utils/index';
import GuestChart from '@/views/guest/GuestChart';
import NewOldChart from '@/views/guest/NewOldChart';
import AgeChart from '@/views/guest/AgeChart';
import SexChart from '@/views/guest/SexChart';
import columnNewChart from '@/views/guest/columnNewChart';
import columnAgeChart from '@/views/guest/columnAgeChart';
import columnSexChart from '@/views/guest/columnSexChart';
export default {
	name: 'dashboard',
	components: {
		GuestChart: GuestChart,
		NewOldChart: NewOldChart,
		AgeChart: AgeChart,
		SexChart: SexChart,
		columnNewChart: columnNewChart,
		columnAgeChart: columnAgeChart,
		columnSexChart: columnSexChart,
	},
	data() {
		return {
			pattern: '1',
			selectType: '全部-汇总',
			changeFlag: true,
			sumOrDiff: '0',
			goStoreSum: [{
				passenger_flow: 0
			}],
			isAll: true,
			datadialog: {
				dataDialogVisible: false,
				summationType: '1',
				dataTypeShow: true,
				formLabelWidth: '100px',
				radioShow: true,
				allOrSetShow: false,
				canDel: true,
			},
			defaultAttr: {
				label: 'name',
				value: 'id',
				children: 'children',
			},
			organizes: [],
			storeGroup: [{
				organizeId: [],
				stores: [],
				showText: '请选择门店组织',
				storeId: '',
			}],
			copyPattern: '1',
			copyGroup: [{
				organizeId: [],
				stores: [],
				showText: '请选择门店组织',
				storeId: '',
			}],
			chartShowType: 0,
			timeType: 'day',
			day: '',
			week: '',
			month: '',
			year: '',
			times_start: '',
			times_end: '',
			customShow: true,
			ctrlTimeType: [true, false, false, false, false],
			statisticsType: "1",
			newOldData: [],
			vipData: [],
			ageData: [],
			sexData: [],
			deviceData: [],
			guestParameters: {
				begin_time: '',
				end_time: '',
				store_id: [],
				merchant_organize_id: [],
			},
			tableData: [],
			pagination: {
				currentPage: 1,
				totalCount: 0,
			},
			listParameters: {
				page: 1,
				page_size: 10,
				begin_time: '',
				end_time: '',
				store_id: [],
				merchant_organize_id: [],
				sort: '',
			},
			loading: false,
			pickerOptionsSet: {
				firstDayOfWeek: 1,
				disabledDate: function(time) {
					return time.getTime() > Date.now() - 8.64e6;
				}
			},

		}
	},
	watch: {
		changeFlag: function() {
			if(this.$data.statisticsType === "1") {
				this.customerList();
			}
		}
	},
	created: function() {
		let unit = localStorage.getItem("unit") || '';
		if(unit === 'd') {
			this.$data.ctrlTimeType = [false, false, false, false, false];
			this.$data.ctrlTimeType[0] = true;
			this.$data.timeType = 'day';
		} else if(unit === 'w') {
			this.$data.ctrlTimeType = [false, false, false, false, false];
			this.$data.ctrlTimeType[1] = true;
			this.$data.timeType = 'week';
		} else if(unit === 'm') {
			this.$data.ctrlTimeType = [false, false, false, false, false];
			this.$data.ctrlTimeType[2] = true;
			this.$data.timeType = 'month';
		} else if(unit === 'y') {
			this.$data.ctrlTimeType = [false, false, false, false, false];
			this.$data.ctrlTimeType[3] = true;
			this.$data.timeType = 'year';
		};
		this.setData();
		this.customerList();
		this.getOrganizes();
		this.statisticsNew();
	},
	mounted: function() {},
	methods: {
		//时间转为秒
		getS(value) {
			var formatTimeS = new Date(value).getTime() / 1000;
			return formatTimeS
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

		//根据门店组织获取门店
		getStoreId(x) {
			this.$data.storeGroup[x].stores = [];
			this.$data.storeGroup[x].storeId = "";
			let g = this.$data.storeGroup[x].organizeId;
			let data = {
				merchant_organize_id: g[g.length - 1]
			};
			storeApi.organizeStoreResult(data).then((res) => {
				if(res.data.errno === 0) {
					if(res.data.data != null && res.data.data.length > 0) {
						this.$data.storeGroup[x].stores = res.data.data;
					} else {
						this.$data.storeGroup[x].showText = "此地区暂无门店";
					}
				} else {
					this.$message(res.statusText)
				}
			})
		},

		//切换求和和比对清空数据
		clearGroup(val) {
			if(val == 1) {
				this.$data.storeGroup = [{
					organizeId: [],
					stores: [],
					showText: '请选择门店组织',
					storeId: '',
				}];
			} else if(val == 2) {
				this.$data.storeGroup = [{
					organizeId: [],
					stores: [],
					showText: '请选择门店组织',
					storeId: '',
				}, {
					organizeId: [],
					stores: [],
					showText: '请选择门店组织',
					storeId: '',
				}];
			}

		},

		//模式选择操作
		patternSelect(type) {
			this.$data.datadialog.dataDialogVisible = true; //打开弹框
			if(type == 1) {
				this.$data.datadialog.radioShow = true;
				//				this.$data.datadialog.dataTypeShow = true;
				this.$data.datadialog.canDel = true;
				this.allOrSet();
				this.clearGroup(1);
			} else if(type == 2) {
				this.$data.datadialog.radioShow = false;
				//				this.$data.datadialog.dataTypeShow = false;
				this.$data.datadialog.allOrSetShow = true;
				this.$data.datadialog.canDel = true;
				this.clearGroup(2);
			}
		},

		closeDialog(done) {
			this.$data.pattern = this.$data.copyPattern;
			this.$data.storeGroup = this.$data.copyGroup;
			if(this.$data.pattern === '1') {
				this.$data.datadialog.radioShow = true;

			} else if(this.$data.pattern === '2') {
				this.$data.datadialog.radioShow = false;
			}
			done();
		},
		//取消求和比对弹出框的操作
		cancelDialog() {
			this.$data.pattern = this.$data.copyPattern;
			this.$data.storeGroup = this.$data.copyGroup;
			if(this.$data.pattern === '1') {
				this.$data.datadialog.radioShow = true;

			} else if(this.$data.pattern === '2') {
				this.$data.datadialog.radioShow = false;
			};
			this.$data.datadialog.dataDialogVisible = false;
		},

		//求和的全部或者自定义的操作
		allOrSet() {
			this.$data.datadialog.summationType == "1" ?
				this.$data.datadialog.allOrSetShow = false :
				this.$data.datadialog.allOrSetShow = true;
		},
		//提交前的一些验证操作
		beforeSubmit() {
			let flag = false;
			if(this.$data.pattern === '2') {
				//对比时一些操作
				this.$data.isAll = false;
				for(let i = 0; i < this.$data.storeGroup.length; i++) {
					if(this.$data.storeGroup[i].organizeId.length === 0) {
						flag = true;
						this.$message(`请选择第${i + 1}个门店组织`)
						break;
					}
				}

			} else {
				//求和时一些操作

				if(this.$data.datadialog.summationType == "1") {
					this.$data.isAll = true;
					flag = false;
				} else {
					this.$data.isAll = false;
					for(var i = 0; i < this.$data.storeGroup.length; i++) {
						if(this.$data.storeGroup[i].organizeId.length === 0) {
							flag = true;
							this.$message(`请选择第${i + 1}个门店组织`);
							break;
						}
					}
				}

			}

			return flag;
		},

		//按钮打开求和和对比dialog框
		editSumDiff() {
			if(this.$data.pattern === '1') {
				this.allOrSet();
			} else if(this.$data.pattern === '2') {
				this.$data.datadialog.allOrSetShow = true;
			};
			this.$data.datadialog.dataDialogVisible = true;
		},

		//选择后的提交
		setSubmit() {
			if(this.beforeSubmit() === true) {
				return false;
			};
			this.$data.copyPattern = this.$data.pattern.slice(0, 1) //复制模式选择的值，如果没有提交就返回原来的选择数据
			this.$data.copyGroup = this.$data.storeGroup.slice(0, this.$data.storeGroup.length); //复制一个选择的门店数组，如果没有提交就返回原来的选择数据
			if(this.$data.pattern === '2') {
				this.$data.sumOrDiff = "1";
				this.$data.selectType = '自定义-对比';
			} else {
				this.$data.sumOrDiff = "0";
				this.$data.selectType = this.$data.datadialog.summationType === '1' ? '全部-汇总' : '自定义-汇总'
			}
			//每次验证前都要清空
			this.$data.guestParameters.store_id.length = [];
			this.$data.guestParameters.merchant_organize_id = [];
			let _this = this;
			if(this.$data.isAll === false) {
				this.$data.storeGroup.forEach(function(val, index) {
					if(val.storeId !== '') {
						_this.$data.guestParameters.store_id.push(val.storeId);
					} else {
						_this.$data.guestParameters.merchant_organize_id.push(val.organizeId[val.organizeId.length - 1]);

					}

				});
			};

			this.$data.datadialog.dataDialogVisible = false;
			this.$data.changeFlag = !this.$data.changeFlag;
			this.statisticsNew();
		},

		//增加门店操作
		addStoreData() {
			let child = {
				organizeId: [],
				stores: [],
				showText: '请选择门店组织',
				storeId: '',
			};
			this.$data.storeGroup.push(child);
			this.$data.datadialog.canDel = false;
		},

		//删除门店操作
		delStore(index) {
			this.$data.storeGroup.splice(index, 1);
			if(this.$data.pattern === '1') {
				this.$data.storeGroup.length === 1 ? this.$data.datadialog.canDel = true : this.$data.datadialog.canDel = false;
			} else {
				this.$data.storeGroup.length === 2 ? this.$data.datadialog.canDel = true : this.$data.datadialog.canDel = false;
			}
		},

		//客流趋势成交率等切换
		customerClass(val) {
			if(val === "1") {
				this.customerList();
			}
			this.$data.statisticsType = val;
			this.$data.changeFlag = !this.$data.changeFlag;
		},

		changeSort(val) {
			this.$data.listParameters.sort = val.order === "ascending" ? val.prop : "-" + val.prop;
			this.customerList();
		},

		//客流列表Table表格展示
		customerList() {
			this.$data.loading = true;
			this.$data.listParameters.begin_time = this.$data.guestParameters.begin_time;
			this.$data.listParameters.end_time = this.$data.guestParameters.end_time;
			this.$data.listParameters.store_id = this.$data.guestParameters.store_id;
			this.$data.listParameters.merchant_organize_id = this.$data.guestParameters.merchant_organize_id;
			statisticsApi.customerList(this.$data.listParameters).then((res) => {
				if(res.data.errno === 0) {
					this.$data.tableData = res.data.data.list
					this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
					this.$data.pagination.totalCount = res.data.data.pagination.pageCount;
				} else {
					this.$message(res.data.msg);
				}
				this.$data.loading = false;
			});
		},

		//格式化客流列表数据展示
		formatterVal(row, column, cellValue, index) {
			let val = Math.round(cellValue * 10000) / 100 + '%';
			return val;
		},
		//分页
		currentPage(currentPage) {
			this.$data.listParameters.page = currentPage;
			this.customerList();
		},

		//搜索
		onSubmit() {
			if(this.$data.ctrlTimeType[0]) {
				if(this.$data.day == null) {
					return false
				}
				this.$data.guestParameters.begin_time = this.getS(this.$data.day);
				this.$data.guestParameters.end_time = this.getS(this.$data.day) + 86399;
				this.$data.changeFlag = !this.$data.changeFlag;
				this.statisticsNew();

			} else if(this.$data.ctrlTimeType[1]) {
				if(this.$data.week == null) {
					return false
				}
				this.$data.guestParameters.begin_time = this.getS(this.$data.week) - 86400;
				this.$data.guestParameters.end_time = this.getS(this.$data.week) + 518399;
				this.$data.changeFlag = !this.$data.changeFlag;
				this.statisticsNew();

			} else if(this.$data.ctrlTimeType[2]) {
				if(this.$data.month == null) {
					return false
				}
				let nexty, nextm;
				let t = new Date(this.$data.month);
				let m = t.getMonth() + 1;
				let y = t.getFullYear();
				m === 12 ? (nexty = y + 1, nextm = 1) : (nexty = y, nextm = m + 1)
				this.$data.guestParameters.begin_time = t.getTime() / 1000;
				this.$data.guestParameters.end_time = this.getS(`${nexty}/${nextm}/01 00:00:00`) - 1;
				this.$data.changeFlag = !this.$data.changeFlag;
				this.statisticsNew();

			} else if(this.$data.ctrlTimeType[3]) {
				if(this.$data.year == null) {
					return false;
				}
				let yearDate = new Date(this.$data.year);
				let y = yearDate.getFullYear();
				this.$data.guestParameters.begin_time = this.getS(`${y}/01/01 00:00:00`);
				this.$data.guestParameters.end_time = this.getS(`${y}/12/31 23:59:59`);
				this.$data.changeFlag = !this.$data.changeFlag;
				this.statisticsNew();

			} else if(this.$data.ctrlTimeType[4]) {
				let startTime = this.getS(this.$data.times_start);
				let endTime = this.getS(this.$data.times_end) + 86399;
				if(startTime > endTime) {
					// this.$data.noTimeHide = true;
					this.$confirm('您选择的结束时间应该大于开始时间', '日期选择警告', {
						confirmButtonText: '知道了',
						showCancelButton: false,
						type: 'warning'
					});
				} else if(startTime < endTime) {
					this.$data.noTimeHide = false;
					this.$data.guestParameters.begin_time = this.getS(this.$data.times_start);
					this.$data.guestParameters.end_time = this.getS(this.$data.times_end) + 86399;
					this.$data.changeFlag = !this.$data.changeFlag;
				    this.statisticsNew();
				    this.$data.customShow = true;
				}
				
			}

		},

		changeTimeType(tab, event) {
			var nowIdx = tab.index;
			this.$data.ctrlTimeType = [false, false, false, false, false];
			this.$data.ctrlTimeType[nowIdx] = true;
			if(nowIdx == 4) {
				this.$data.customShow = false;
			} else {
				this.$data.customShow = true;
				this.setData();
				this.$data.changeFlag = !this.$data.changeFlag;
				this.statisticsNew();
			}

		},

		//绑定默认时间
		modelDate(t) {
			let d = new Date(t * 1000);
			return d;
		},

		getBeginEndTime(val) {
			let t = new Date();
			let y = t.getFullYear();
			let m = t.getMonth() + 1;
			let d = t.getDate();
			let weekd = t.getDay();

			switch(val) {
				case "day":
					this.$data.guestParameters.begin_time = this.getS(`${y}/${m}/${d} 00:00:00`);
					this.$data.guestParameters.end_time = this.getS(`${y}/${m}/${d} 23:59:59`);
					this.$data.day = this.modelDate(this.$data.guestParameters.begin_time)
					break;
				case "week":
					if(weekd === 0) {
						weekd = 7
					}
					this.$data.guestParameters.begin_time = this.getS(`${y}/${m}/${d} 00:00:00`) - 86400 * (weekd - 1);
					this.$data.guestParameters.end_time = this.getS(`${y}/${m}/${d} 23:59:59`) + 86400 * (7 - weekd);
					this.$data.week = this.modelDate(this.$data.guestParameters.begin_time);
					break;
				case "month":
					let nexty, nextm;
					m === 12 ? (nexty = y + 1, nextm = 1) : (nexty = y, nextm = m + 1)
					this.$data.guestParameters.begin_time = this.getS(`${y}/${m}/01 00:00:00`);
					this.$data.guestParameters.end_time = this.getS(`${nexty}/${nextm}/01 00:00:00`) - 1;
					this.$data.month = this.modelDate(this.$data.guestParameters.begin_time);
					break;
				case "year":
					this.$data.guestParameters.begin_time = this.getS(`${y}/01/01 00:00:00`);
					this.$data.guestParameters.end_time = this.getS(`${y}/12/31 23:59:59`);
					this.$data.year = this.modelDate(this.$data.guestParameters.begin_time);
					break;
			}
		},

		setData() {
			if(this.$data.ctrlTimeType[0]) {
				//日
				this.getBeginEndTime("day")
				return false;
			}
			if(this.$data.ctrlTimeType[1]) {
				//周
				this.getBeginEndTime("week")
				return false;
			}
			if(this.$data.ctrlTimeType[2]) {
				//月
				this.getBeginEndTime("month")
				return false;
			}
			if(this.$data.ctrlTimeType[3]) {
				//年
				this.getBeginEndTime("year")
				return false;
			}

		},

		//表格的操作
		indexRank(index) {
			return(this.$data.pagination.currentPage - 1) * 10 + index + 1;
		},

		//到店人数
		statisticsNew() {
			let list = {
				is_combine: this.$data.sumOrDiff === '0' ? '1' : '0',
				time_start: this.$data.guestParameters.begin_time,
				time_end: this.$data.guestParameters.end_time,
				store_id: this.$data.guestParameters.store_id,
				merchant_organize_id: this.$data.guestParameters.merchant_organize_id
			};

			statisticsApi.statisticsNew(list).then((res) => {
				console.log(res)
				if(res.data.errno === 0) {
					this.$data.goStoreSum = [];
					this.$data.goStoreSum = res.data.data;
				}
			})
		}

	}
}