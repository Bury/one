<!-- 首页 -->
<template>
    <div class="statistics-page">
        <div class="top-box">
            <el-form :inline="true" class="demo-form-inline" size="mini">
              <el-form-item label="门店选择：" v-if="allStores && allStores.length>0">
                <el-select v-model="guestParameters.store_id" placeholder="门店选择">
                  <el-option v-for="(item, idx) in allStores" :label="allStores[idx].name" :value="allStores[idx].id" :key="idx"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间选择：">
                    <el-date-picker
                      v-if="ctrlTimeType[0]"
                      v-model="day"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                    <el-date-picker
                      v-if="ctrlTimeType[1]"
                      v-model="week"
                      type="week"
                      format="yyyy 第 WW 周"
                      placeholder="选择周">
                    </el-date-picker>
                    <el-date-picker
                      v-if="ctrlTimeType[2]"
                      v-model="month"
                      type="month"
                      placeholder="选择月">
                    </el-date-picker>
                    <el-date-picker
                      v-if="ctrlTimeType[3]"
                      v-model="year"
                      type="year"
                      placeholder="选择年">
                    </el-date-picker>
                    <el-date-picker
                      v-model="userDefined"
                      v-if="ctrlTimeType[4]"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
              </el-form-item>
              
              <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
            <el-tabs v-model="timeType" type="card" @tab-click="changeTimeType">
                <el-tab-pane label="日统计" name="day"></el-tab-pane>
                <el-tab-pane label="周统计" name="week"></el-tab-pane>
                <el-tab-pane label="月统计" name="month"></el-tab-pane>
                <el-tab-pane label="年统计" name="year"></el-tab-pane>
                <el-tab-pane label="自定义统计" name="userDefined"></el-tab-pane>
            </el-tabs>
        </div>
        
        <ul class="charts-type">
            <li class="charts-wrap">
                <div style="padding:10px 0 20px;text-align:center;">
                    <el-button :type="type == 'line' ? 'primary' : ''" plain size="small" @click="changeTpye('line')">折线图</el-button>
                    <el-button :type="type == 'column' ? 'primary' : ''" plain size="small" @click="changeTpye('column')">柱状图</el-button>
                    <!-- <el-button type="" plain size="small">饼形图</el-button> -->
                </div>
                <guest-chart :guestData="guestData" :type="type"></guest-chart>
               
            </li>
            <li class="charts-wrap">
                <new-old-chart :newOldData="newOldData"></new-old-chart>
            </li>
            <li class="charts-wrap">
                <vip-chart :vipData="vipData"></vip-chart>
            </li>
            <li class="charts-wrap">
                <age-chart :ageData="ageData"></age-chart>
            </li>
            <li class="charts-wrap">
                <sex-chart :sexData="sexData"></sex-chart>
            </li>
            <li class="charts-wrap">
                <device-chart :deviceData="deviceData"></device-chart>
            </li>

        </ul>

    </div>
</template>

<script>
import remindApi from '../../api/remind'
import storeApi from '../../api/Store'
import statisticsApi from '../../api/statistics'
import GuestChart from './GuestChart'
import NewOldChart from './NewOldChart'
import VipChart from './VipChart'
import AgeChart from './AgeChart'
import SexChart from './SexChart'
import DeviceChart from './DeviceChart'
export default {
  name: 'dashboard',
  components: {
        GuestChart,
        NewOldChart,
        VipChart,
        AgeChart,
        SexChart,
        DeviceChart
  },
  data () {
    return {
        allStores:[],
        timeType: 'day',
        day:'',
        week:'',
        month:'',
        year:'',
        userDefined:'',
        ctrlTimeType:[true,false,false,false,false],
        type:'line',
        guestData:{},
        newOldData:[],
        vipData:[],
        ageData:[],
        sexData:[],
        deviceData:[],
        guestParameters:{
            begin_time:'',
            end_time:'',
            store_id:''
        },
       

    }
  },
  created:function(){
    this.getStores();
    this.setData();

  },
  methods: {
    //门店
    getStores(){
        storeApi.listsResults().then((res) => {
            if(res.data.errno === 0){
                console.log(res)
                this.$data.allStores = res.data.data;
            }else{

            }
            
        })
    },

    //时间转为秒
    getS(value){
        var formatTimeS = new Date(value).getTime()/1000;
        return formatTimeS
    },

    //客流量
    getCustomer(parameters){
        let qs = require('querystring');
        statisticsApi.getCustomer(qs.stringify(parameters)).then((res) => {
            console.log(res)
            if(res.data.errno === 0){
                console.log(res)
                this.$data.guestData = res.data.data;
            }else{

            }
        })
    },
    //特征
    getFeature(parameters, types){
        let list = {
            begin_time: parameters.begin_time,
            end_time: parameters.end_time,
            store_id: parameters.store_id,
            feature: types
        }
        let qs = require('querystring');
        statisticsApi.getFeature(qs.stringify(list)).then((res) => {
            if(res.data.errno === 0){
                console.log(res)
                let thisData = res.data.data;
                if(types == 'face'){
                    let newData = [];
                    for(var i=0; i<thisData.face.length; i++){
                        newData.push([thisData.face[i],thisData.sum[i]])
                    }
                    this.$data.newOldData = newData;
                }
                if(types == 'vip'){
                    let newData = [];
                    for(var i=0; i<thisData.vip.length; i++){
                        newData.push([thisData.vip[i],thisData.sum[i]])
                    }
                    this.$data.vipData = newData;
                }
                if(types == 'age'){
                    let newData = [];
                    for(var i=0; i<thisData.age.length; i++){
                        newData.push([thisData.age[i],thisData.sum[i]])
                    }
                    this.$data.ageData = newData;
                }
                if(types == 'gender'){
                    let newData = [];
                    for(var i=0; i<thisData.gender.length; i++){
                        newData.push([thisData.gender[i],thisData.sum[i]])
                    }
                    this.$data.sexData = newData;
                }if(types == 'camera'){
                    let newData = [];
                    for(var i=0; i<thisData.camera.length; i++){
                        newData.push([thisData.camera[i],thisData.sum[i]])
                    }
                    this.$data.deviceData = newData;
                }

            }else{

            }
        })
    
    },

    changeTpye(value){
        console.log(value)
        this.$data.type = value;
        this.setData();
    },


    //搜索
    onSubmit(){
        this.setData();
    },


    changeTimeType(tab, event){
        console.log(tab.index)
        var nowIdx = tab.index;
        this.$data.ctrlTimeType = [false,false,false,false,false];
        this.$data.ctrlTimeType[nowIdx] = true;
        this.$data.guestParameters = {
            begin_time:'',
            end_time:'',
            store_id:''
        }
        this.setData();
    },

    setData(){
        if(this.$data.ctrlTimeType[0]){
            //日
            this.$data.guestParameters.begin_time = this.getS('2018-07-09 00:00:00');
            this.$data.guestParameters.end_time =  this.getS('2018-07-09 23:59:59');
            this.requestData();
            return false;
        }
        if(this.$data.ctrlTimeType[1]){
            //周
            this.$data.guestParameters.begin_time = this.getS('2018-07-09 00:00:00');
            this.$data.guestParameters.end_time =  this.getS('2018-07-15 23:59:59');
            this.requestData();
            return false;
        }
        if(this.$data.ctrlTimeType[2]){
            //月
            this.$data.guestParameters.begin_time = this.getS('2018-07-01 00:00:00');
            this.$data.guestParameters.end_time =  this.getS('2018-07-31 23:59:59');
            this.requestData();
            return false;
        }
        if(this.$data.ctrlTimeType[3]){
            //年
            
            this.$data.guestParameters.begin_time = this.getS('2018-01-01 00:00:00');
            this.$data.guestParameters.end_time =  this.getS('2018-12-31 23:59:59');
            this.requestData();
            return false;
        }
        if(this.$data.ctrlTimeType[4]){
            //自定义
            this.$data.guestParameters.begin_time = this.getS('2018-07-09 00:00:00');
            this.$data.guestParameters.end_time =  this.getS('2018-07-15 23:59:59');
            this.requestData();
            return false;
        }

    },
    requestData(){
        this.getCustomer(this.$data.guestParameters);
        this.getFeature(this.$data.guestParameters, 'face');
        this.getFeature(this.$data.guestParameters, 'vip');
        this.getFeature(this.$data.guestParameters, 'age');
        this.getFeature(this.$data.guestParameters, 'gender');
        this.getFeature(this.$data.guestParameters, 'camera');
    }
    
  }
}
</script>

<style lang="scss" scoped>
.statistics-page{
    padding-top:120px;
    .top-box{
        position: fixed;
        padding-top:90px;
        top:0;
        z-index:9;
        width:100%;
        background:#fff;
    }
    .charts-type{
        margin:0 auto;
        padding:5px;
        width: 98%;
        overflow:hidden;
        .charts-wrap{
            float:left;
            margin: 15px 0;
            width: 49%;
            height: 520px;
        }
        .charts-wrap:nth-child(2n){
            float:right;
        }
    }
}
    
</style>