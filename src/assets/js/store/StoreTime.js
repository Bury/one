import storeTimeApi from '@/api/store'

	export default {
		name: 'open-time-set',
		data() {
			return {
				startTime: '',
				endTime: ''
			};
		},
		created: function() {
			this.timeView();
		},
		methods: {
			//显示时间
			timeView() {
				storeTimeApi.timeView().then((res) => {
					if(res.data.errno === 0) {
						this.$data.startTime = res.data.data.start_time;
						this.$data.endTime = res.data.data.end_time;
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},
			//设置
			fnTimeSet() {
				var startTime = this.$data.startTime;
				var endTime = this.$data.endTime;
				if(startTime == '') {
					this.$message({
						message: '请选择开始时间',
						type: 'warning',
						duration: 1000
					});
					return false;
				}
				if(endTime == '') {
					this.$message({
						message: '请选择结束时间',
						type: 'warning',
						duration: 1000
					});
					return false;
				}
				let list = {
					'start_time': startTime,
					'end_time': endTime
				}
				let qs = require('querystring')
				storeTimeApi.timeSet(qs.stringify(list)).then((res) => {
					if(res.data.errno === 0) {
						this.$message({
							message: '营业时间设置成功',
							type: 'success',
							duration: 1500
						});

					} else {
						this.$message.error(res.data.msg);
					}
				})
			},
		}
	}