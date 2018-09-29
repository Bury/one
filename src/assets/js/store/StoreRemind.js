import storeRemindApi from '@/api/store'

const typeId = ["1","3","4"];

  export default {
    data() {
      return {
        checkAll: false,
        checkedType: [],
        types: typeId,
        typeVal: ['新客未购','熟客未购', '熟客已购'],
        isIndeterminate: true,
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
                    res.data.data.remind_ids != "" ?
                    this.$data.checkedType = res.data.data.remind_ids.split(",") :
                    this.$data.checkedType = [];
                    if(this.$data.checkedType.length == this.$data.types.length){
                        this.$data.checkAll = true;
                        this.$data.isIndeterminate = false;
                    }

                }else{
                    this.$message.error(res.data.msg);
                }
            })

        },

        //设置
        fnRemindSet(){
            let list = {
                'remind_ids' :  this.$data.checkedType.join(),
            }
            let qs = require('querystring')
            storeRemindApi.remindSet(qs.stringify(list)).then((res) => {
                if(res.data.errno === 0){
                    this.$message({
                      message: '到店提醒设置成功',
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
            this.$data.checkedType = val ? typeId : [];
            this.$data.isIndeterminate = false;
        },
        fnChangeType(value) {
            let checkedCount = value.length;
            this.$data.checkAll = checkedCount === this.$data.types.length;
            this.$data.isIndeterminate = checkedCount > 0 && checkedCount < this.$data.types.length;
        }
    }
  };
