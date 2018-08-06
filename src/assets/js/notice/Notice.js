import noticeApi from '@/api/notice'
import {quillEditor} from 'vue-quill-editor'
export default{
  name:'role-set',
  data(){
    return {
      content:"",
      routerId:'',
      tableData: [],
      pagination:{
        currentPage:1,
        totalCount:0,
      },
      ruleForm:{
        id:'',
        title:'',
        content:'',
      },
      editorOption:{},
    }
  },
  components:{
    quillEditor
  },
  computed:{
    editor(){
      return this.$refs.myTextEditor.quill
    }
  },
  mounted(){

  },
  created:function(){
    this.getMsg();
  },
  methods: {
    getMsg(){
      // 取到路由带过来的参数
      this.$data.routerId= this.$route.params.id;
      let list = {
        message_id:this.$data.routerId,
        message_from:2,
      }
      let qs = require('querystring');
      noticeApi.detail(qs.stringify(list)).then((res) => {
        if(res.data.errno === 1000002){
          this.$data.ruleForm.title = '';
          this.$data.ruleForm.content = '';
        }else{
          this.$data.ruleForm = res.data.data;
        }

      })

    },
    fnCancel(row){
      let list = {
        id:'',
        title:row.title,
        content:row.content,
      }
      let qs = require('querystring')
      noticeApi.draft(qs.stringify(list)).then((res) => {
        if(res.data.errno === 0){
          this.$message({
            message: '保存至草稿箱',
            type: 'success',
          });
          this.$data.ruleForm.title = '';
          this.$data.ruleForm.content = '';
        }else{
          this.$message.error(res.data.msg);
        }

      })
    },
    submitForm(formName){
      if(this.$data.currentId !== ''){
        let list = {
          'id': this.$data.ruleForm.id,
          'title':this.$data.ruleForm.title,
          'content':this.$data.ruleForm.content,
        }
        let qs = require('querystring')
        noticeApi.send(qs.stringify(list)).then((res) => {
          if(res.data.errno === 0){
            this.$message({
              message: '发送成功',
              type: 'success',
            });
            this.$data.ruleForm.title = '';
            this.$data.ruleForm.content = '';
          }else{
            this.$message.error(res.data.msg);
          }

        })
      }
    },
    onEditorChange({ editor, html, text }) {//富文本编辑器  文本改变时 设置字段值
      this.content = html;
    }

  }
}
