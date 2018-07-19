<template>
	<div class="remind-set-page">
        <h3 class="top-box">提醒配置</h3>
        <div class="all-box">
            <el-checkbox :indeterminate="isIndeterminate" 
            v-model="checkAll"
            @change="handleCheckAllChange">全选</el-checkbox>
        </div>
		<div class="type-list">
            <el-checkbox-group v-model="checkedType" @change="fnChangeType">
                <el-checkbox v-for="(tpye,key) in types" :label="tpye" :key="key">{{typeVal[key]}}</el-checkbox>
            </el-checkbox-group>
        </div>
		<div class="saveBtn">
            <el-button type="primary" class="save-btn" @click="fnRemindSet">保存</el-button>
        </div>
	</div>
</template>
<script>
  import storeRemindApi from '../../api/store'
  
  const typeOptions = ['新客', '熟客', '未购买', '已购买'];
  const typeId = ["1","2","3","4"]
  export default {
    data() {
      return {
        checkAll: false,
        checkedType: [],
        types: typeId,
        typeVal: typeOptions,
        isIndeterminate: true
      };
    },
    created:function(){
        this.fnRemindView();
    },
    methods: {
        //显示
        fnRemindView(){
            storeRemindApi.remindView().then((res) => {
                if(res.data.errno === 0){
                    console.log(res);
                    this.checkedType = res.data.data.remind_ids.split(",");
                    if(this.checkedType.length == this.types.length){
                        this.checkAll = true;
                        this.isIndeterminate = false;
                    }
                    
                }else{
                    this.$message.error(res.data.msg);
                }
            })

        },

        //设置
        fnRemindSet(){
            let list = {
                    'remind_ids' :  this.checkedType.toString(),
                }
            let qs = require('querystring')
            storeRemindApi.remindSet(qs.stringify(list)).then((res) => {
                if(res.data.errno === 0){
                    console.log(res)
                    this.$message({
                      message: '营业时间设置成功',
                      type: 'success',
                      duration:1500
                    });
                    this.fnRemindView();
                }else{
                    this.$message.error(res.data.msg);
                }
            })
        },

        handleCheckAllChange(val) {
            this.checkedType = val ? typeId : [];
            this.isIndeterminate = false;
            console.log(this.checkedType)
        },
        fnChangeType(value) {
            console.log(value)
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.types.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.types.length;
        }
    }
  };
</script>
<style lang="scss" scoped>
  .remind-set-page{
    margin:80px auto 0;
    padding:40px;
    width: 500px;
    border:1px solid #d2d2d2;
    .top-box{
        height: 60px;
    }
    .all-box{
        margin-bottom:20px;
    }
    .type-list{
        margin-bottom:100px;
    }
    .saveBtn{
        position:relative;
        width: 100%;
        height: 40px;
        .save-btn{
            position: absolute;
            bottom:0;
            right:0;
        }
    }
  }
</style>