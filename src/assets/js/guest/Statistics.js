import storeApi from '@/api/store'
import statisticsApi from '@/api/statistics'

import GuestChart from '@/views/guest/GuestChart'
//import NewOldChart from './NewOldChart'
//import VipChart from './VipChart'
//import AgeChart from './AgeChart'
//import SexChart from './SexChart'
//import DeviceChart from './DeviceChart'

export default {
	name: 'dashboard',
	components: {
		GuestChart,
		/*
		NewOldChart,
		VipChart,
		AgeChart,
		SexChart,
		DeviceChart
		*/
	},
	data() {
		return {
			datadialog: {
				dataDialogVisible: false,
				summationType: '1',
				dataTypeShow: true,
				formLabelWidth: '100px',
				storeTotal: 1,
				radioShow: true,
				allOrSetShow: true,
			},			
			chartShowType: 0,			
			allStores: [],
			timeType: 'day',
			day: '',
			week: '',
			month: '',
			year: '',
			userDefined: '',
			ctrlTimeType: [true, false, false, false, false],
			guestData: {},
			isAll:"1",
			newOldData: [],
			vipData: [],
			ageData: [],
			sexData: [],
			deviceData: [],
			guestParameters: {
				begin_time: '',
				end_time: '',
				store_id: [],
				merchant_organize_id:[],
			},
			tableData:[],
			

		}
	},
	created: function() {
		this.setData();
	},
	mounted: function() {
		//this.gocolumnChart();
	},
	methods: {
		//时间转为秒
		getS(value) {
			var formatTimeS = new Date(value).getTime() / 1000;
			return formatTimeS
		},
		
		gocolumnChart() {
			/*
			chart.series[0].update({
			        type: 'column'
			})
			*/
			//let guestCharts = this.$refs.guestCharts;
		},	
		
		//客流趋势成交率等切换
		customerClass(val){
			console.log(val)
		},
		//客流列表
		customerList(){
			let listData = {
				begin_time:'',
				end_time:'',
				store_id:'',
				merchant_organize_id:'',
			}
			statisticsApi.customerList(listData).then((res) => {
				if(res.data.errno === 0) {
					this.$data.tableData = res.data.data.list
				} else {

				}
			})
		},		

		//客流统计折线图求和
		getCustomer(parameters) {
			let qs = require('querystring');
			statisticsApi.getCustomerSum(qs.stringify(parameters)).then((res) => {
				if(res.data.errno === 0) {
					this.$data.guestData = res.data.data;
				}
			})
		},		
		
		//特征
		getFeature(parameters, types) {
			let list = {
				begin_time: parameters.begin_time,
				end_time: parameters.end_time,
				store_id: parameters.store_id,
				feature: types
			}
			let qs = require('querystring');
			statisticsApi.getFeature(qs.stringify(list)).then((res) => {
				if(res.data.errno === 0) {
					let thisData = res.data.data;
					if(thisData == null || thisData == '') {
						return false;
					}
					if(types == 'face') {
						let newData = [];
						for(var i = 0; i < thisData.face.length; i++) {
							newData.push([thisData.face[i], thisData.sum[i]])
						}
						this.$data.newOldData = newData;
					}
					if(types == 'vip') {
						let newData = [];
						for(var i = 0; i < thisData.vip.length; i++) {
							newData.push([thisData.vip[i], thisData.sum[i]])
						}
						this.$data.vipData = newData;
					}
					if(types == 'age') {
						let newData = [];
						for(var i = 0; i < thisData.age.length; i++) {
							newData.push([thisData.age[i], thisData.sum[i]])
						}
						this.$data.ageData = newData;
					}
					if(types == 'gender') {
						let newData = [];
						for(var i = 0; i < thisData.gender.length; i++) {
							newData.push([thisData.gender[i], thisData.sum[i]])
						}
						this.$data.sexData = newData;
					}
					if(types == 'camera') {
						let newData = [];
						for(var i = 0; i < thisData.camera.length; i++) {
							newData.push([thisData.camera[i], thisData.sum[i]])
						}
						this.$data.deviceData = newData;
					}

				} else {

				}
			})

		},

		//搜索
		onSubmit() {
			this.setData();
		},

		changeTimeType(tab, event) {
			var nowIdx = tab.index;
			this.$data.ctrlTimeType = [false, false, false, false, false];
			this.$data.ctrlTimeType[nowIdx] = true;
			
			this.setData();
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
					break;
				case "week":
					if(weekd === 0) {
						weekd = 7
					}
					this.$data.guestParameters.begin_time = this.getS(`${y}/${m}/${d} 00:00:00`) - 86400 * (weekd - 1);
					this.$data.guestParameters.end_time = this.getS(`${y}/${m}/${d} 23:59:59`) + 86400 * (7 - weekd);
					break;
				case "month":
					let nexty, nextm;
					m === 12 ? (nexty = y + 1, nextm = 1) : (nexty = y, nextm = m + 1)
					this.$data.guestParameters.begin_time = this.getS(`${y}/${m}/01 00:00:00`);
					this.$data.guestParameters.end_time = this.getS(`${nexty}/${nextm}/01 00:00:00`) - 1;
					break;
				case "year":
					this.$data.guestParameters.begin_time = this.getS(`${y}/01/01 00:00:00`);
					this.$data.guestParameters.end_time = this.getS(`${y}/12/31 23:59:59`);
					break;
				case "select":
					this.$data.guestParameters.begin_time = utils.getDateTime(this.userDefined[0]);
					this.$data.guestParameters.end_time = utils.getDateTime(this.userDefined[1]);
					break;
			}
		},

		setData() {
			if(this.$data.ctrlTimeType[0]) {
				//日
				this.getBeginEndTime("day")
				this.requestData();
				return false;
			}
			if(this.$data.ctrlTimeType[1]) {
				//周
				this.getBeginEndTime("week")
				this.requestData();
				return false;
			}
			if(this.$data.ctrlTimeType[2]) {
				//月
				this.getBeginEndTime("month")
				this.requestData();
				return false;
			}
			if(this.$data.ctrlTimeType[3]) {
				//年            
				this.getBeginEndTime("year")
				this.requestData();
				return false;
			}
			if(this.$data.ctrlTimeType[4]) {
				//自定义
				this.getBeginEndTime("select")
				this.requestData();
				return false;
			}

		},
		requestData() {
			//this.getCustomer(this.$data.guestParameters);
//			this.getFeature(this.$data.guestParameters, 'face');
//			this.getFeature(this.$data.guestParameters, 'vip');
//			this.getFeature(this.$data.guestParameters, 'age');
//			this.getFeature(this.$data.guestParameters, 'gender');
//			this.getFeature(this.$data.guestParameters, 'camera');
		},

		selectData() {
			this.$data.datadialog.dataDialogVisible = true;
		},

		dataSelect(type) {
			if(type == 1) {
				this.$data.datadialog.radioShow = true;
				this.$data.datadialog.dataTypeShow = true;
			} else {
				this.$data.datadialog.radioShow = false;
				this.$data.datadialog.dataTypeShow = false;
			}

		},

		cancelDialog() {
			this.$data.datadialog.storeTotal = 1;
			this.$data.datadialog.dataDialogVisible = false;
		},
		addStoreData() {
			this.$data.datadialog.storeTotal++;
		},
		allOrSet() {
			this.$data.datadialog.summationType == "1" ? this.$data.datadialog.allOrSetShow = true : this.$data.datadialog.allOrSetShow = false;

		},
		indexRank(index) {
			return index + 1;
		}

	}
}