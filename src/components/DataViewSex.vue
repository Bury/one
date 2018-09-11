<template>
	<div class="ageWrap">
		<vue-highcharts :options="options" ref="sexCharts"></vue-highcharts>
	</div>
</template>

<script>
	import VueHighcharts from 'vue2-highcharts';
	
	var t;
	export default {
		name: 'data-view-sex',
		components: {
			VueHighcharts,
		},
		data() {
			return {
				radios: 'line',
				t:'',
				options: {
					chart: {
						type: 'pie',
						width:350,
						height: 165,
						backgroundColor: 'rgba(0,0,0,0)',
						spacing : [20,0,20,0]
					},
					title: {
						text:'',
						floating: true,
					},
					credits: {
						text: '',
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.y}</b><br/>占比:{point.percentage:.1f}%'
					},
					colors:[
					   'rgba(255,196,0,0.3)',
					   'rgba(149,199,255,0.3)'
					],
					plotOptions: {
						 pie: {
                            innerSize: '60%',
                            borderColor:'rgba(255,255,255,1)',
                            dataLabels:{
                           	color:"#95C7FF",
                           	formatter:function(){                           		
                           		return  this.point.name + ' ' + Math.round(this.percentage) + '%'
                           	}					
                           }
                        },
                        
					},
					series: [],
				}
			}
		},
		created() {

		},
		mounted() {
			let val = [{
							name:'男',
							y:8000
					   },{
							name:'女',
							y:6000
						}];
			this.getChart(val);
		},
		destroyed(){
			clearInterval(t)
		},
		methods: {
			cutChart(val) {
				this.$data.radios = val;
			},
			post(){
				let testData = [{
							name:'男',
							y:6000
						},
						{
							name:'女',
							y:6000
						}];
						
			    let flag = Math.random() * 10;
			    let sexCharts = this.$refs.sexCharts;
				setTimeout(()=>{
					 
					 testData[0].y =  parseInt(Math.random() * 10000);
					 testData[1].y =  parseInt(Math.random() * 10000);
					 sexCharts.getChart().series[0].setData(testData)
					
							
				},1000)
			},
			getChart(val) {
				let sexCharts = this.$refs.sexCharts;
				sexCharts.delegateMethod('showLoading', 'Loading...');
				sexCharts.removeSeries();
				setTimeout(() => {
					sexCharts.hideLoading();
					sexCharts.addSeries({
						name: "人数",
						data: val
					})
				},0)
				
//			    t = setInterval(()=>{					
//					this.post();
//				},4000)
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>