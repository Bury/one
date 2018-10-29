    import statisticsApi from '@/api/statistics';
	import DataViewLine from '@/components/DataViewLine';
	import DataViewSex from '@/components/DataViewSex';
	import DataViewAge from '@/components/DataViewAge';

	var t, c;

	export default {
		name: 'data-view',
		components: {
			DataViewLine,
			DataViewSex,
			DataViewAge
		},
		data() {
			return {
				k:0,
				timeArr:['day','week','month','year'],
				isSelect: 'day',
				showTime: '',
				rateFont:'昨日',
				guestParameters: {
					begin_time: '',
					end_time: ''
				},
				briefingData: {
					keliu: {
						new_ct: '',
						new_rate: '',
						total_ct: '',
						tatal_rate: ''
					},
					order: {
						order_ct: '',
						sales_volume: '',
						turnover_rate: '',
					},
					device: {
						online: '',
						offline: ''
					},
					yearly: {
						total_ct: '',
						total_rate: ''
					},
					tag_list: [],
					flow_list: [],
					old_list: []
				},
				sexData: [],
				ageData: [],
				lineFlag: true,
				timeingFlag: true
			}
		},
		created() {
			this.getBeginEndTime('day');
			this.rightTopTime();
			this.getRank();
			this.getRatio();
		},
		mounted() {
			//右上角时间的定时器
			t = setInterval(() => {
				this.rightTopTime();
			}, 1000);
           
			c =  setInterval(() => {
				(this.$data.k === 4) && (this.$data.k = 0);
				this.selectTime(this.$data.timeArr[this.$data.k]);
			},30000)
		},
		destroyed() {
			//组件销毁后清空定时器			
			clearInterval(t);
			clearInterval(c);
		},
		methods: {
			rightTopTime() {
				let rightTopTime = new Date();
				this.$data.showTime = rightTopTime.getTime() / 1000;
			},
			selectTime(val) {
				this.$data.isSelect = val;
				this.getBeginEndTime(val);
				this.$data.lineFlag = !this.$data.lineFlag; //折线图的数据改变操作
				this.getRatio(); //性别年龄饼状图的数据操作
				this.getRank(); //简报数据总览的数据操作
				
				switch (val){
					case 'day':
					this.$data.k = 1;
					this.$data.rateFont = '昨日';
						break;
					case 'week':
					this.$data.k = 2;
					this.$data.rateFont = '上周';
						break;
					case 'month':
					this.$data.k = 3;
					this.$data.rateFont = '上月';
						break;
					case 'year':
					this.$data.k = 0;
					this.$data.rateFont = '上年';
						break;	
					default:
						break;
				}
			},
			//时间转为秒
			getS(value) {
				var formatTimeS = new Date(value).getTime() / 1000;
				return formatTimeS;
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
						};
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
				}
			},

			//简报数据总览
			getRank() {
				let list = {
					type: this.$data.isSelect
				};
				statisticsApi.briefingData(list).then((res) => {
					if(res.data.errno === 0) {
						this.$data.briefingData = res.data.data;
					} else {
						this.$message(res.data.msg)
					}
				})
			},

			//性别年龄比例请求
			getRatio() {
				let list = {
					type: this.$data.isSelect,
					ratio_data: '1,2'
				};
				statisticsApi.briefingRatio(list).then((res) => {
					if(res.data.errno === 0) {
						let thisData = res.data.data;
						let age = [],
							sex = [];
						if(thisData.age !== null) {
							for(let i = 0; i < thisData.age.age.length; i++) {
								age.push({
									name: thisData.age.age[i],
									y: thisData.age.sum[i]
								})
							};
							this.$data.sexData = sex;
						}else{
							this.$data.sexData = [];
						}
						if(thisData.gender !== null) {
							for(let j = 0; j < thisData.gender.gender.length; j++) {
								sex.push({
									name: thisData.gender.gender[j],
									y: thisData.gender.sum[j]
								})
							};
							this.$data.ageData = age;
						}else{
							this.$data.ageData = [];
						}
						this.$data.timeingFlag = !this.$data.timeingFlag;
					}
				})

			},
			//关闭全屏首页
			closeViewBox() {
				this.$router.push({
					name: 'Statistics'
				})
			},
			enterFlag(){
				clearInterval(c);
			},
			outFlag(){
			 c =  setInterval(() => {
			 (this.$data.k === 4) && (this.$data.k = 0);
				this.selectTime(this.$data.timeArr[this.$data.k]);
			 },30000)
			}
		}
	}