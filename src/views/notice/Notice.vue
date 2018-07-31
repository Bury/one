<template>
	<div class="role-set-page">
    <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="account">
        <quill-editor ref="myTextEditor"
                      :content="content"
                      :options = "editorOption"
                      @change="onEditorChange($event)"
                      class="quill_editor">
        </quill-editor>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="fnCancel()">取消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">发送</el-button>
    </div>
	</div>
</template>
<script>
	import noticeApi from '../../api/notice'
  import {quillEditor} from 'vue-quill-editor'
	export default{
		name:'role-set',
		data(){
			return {
        content:"",
				tableData: [],
				pagination:{
          currentPage:1,
          totalCount:0,
        },
        ruleForm:{
          name:'',
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
		created:function(){
			this.lists();
		},
		methods: {
			//列表
			lists(){
				let qs = require('querystring')
	    		noticeApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
	    			if(res.data.errno === 0){
						console.log(res);
						this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
		        		this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
	    			}else{
						this.$message.error(res.data.msg);
	    			}
	    		})
	    	},

			fnRemove(row){
				this.$confirm('确认删除该角色：'+row.name+' ？', '删除提示', {
		          confirmButtonText: '确定',
		          fnCancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          let list = {
						'id': row.id
					}
					let qs = require('querystring')
          noticeApi.dele(qs.stringify(list)).then((res) => {
	        			if(res.data.errno === 0){
							console.log(res)
							this.$message({
					            type: 'success',
					            message: '删除成功!'
					          });
							this.lists();
	        			}else{
							this.$message.error(res.data.msg);
	        			}

	        		})
		        }).catch(() => {});
			},
			submitForm(formName){
				this.$refs[formName].validate((valid) => {
					console.log(valid)
			        if (valid) {
						if(this.$data.currentId !== ''){
							let list = {
								'id': this.$data.currentId,
								'name':this.$data.ruleForm.name,
								'sort':this.$data.ruleForm.sort
							}
							let qs = require('querystring')
              noticeApi.edit(qs.stringify(list)).then((res) => {
			        			if(res.data.errno === 0){
									console.log(res)
									this.$message({
				                      message: '操作成功',
				                      type: 'success',
				                      duration:1500
				                    });
									this.lists();
									this.$data.ruleForm.name = '';
									this.$data.ruleForm.sort = 0;
									this.$data.currentId = '';
									this.$data.dialogFormVisible = false;

			        			}else{
									this.$message.error(res.data.msg);
								}

			        		})
						}else{
							let list = {
						        'name':this.$data.ruleForm.name,
						        'sort':this.$data.ruleForm.sort
						    }
						    let qs = require('querystring')
              noticeApi.adds(qs.stringify(list)).then((res) => {
			        			if(res.data.errno === 0){
									console.log(res)
									this.$message({
				                      message: '操作成功',
				                      type: 'success',
				                      duration:1500
				                    });
									this.lists();
									this.$data.ruleForm.name = '';
									this.$data.ruleForm.sort = '';
									this.$data.currentId = '';
									this.$data.dialogFormVisible = false;

			        			}else{
			        				this.$message.error(res.data.msg);

			        			}
			        		})
						}
			        }
		        });
			},
      onEditorChange({ editor, html, text }) {//富文本编辑器  文本改变时 设置字段值
        this.content = html
      }

    }
	}
</script>
<style lang="scss" scoped>
	.role-set-page{
		.top-box{
			position:relative;
			margin-bottom:20px;
			height: 36px;
			border-bottom:1px solid #d2d2d2;
			.add-btn{
				position: absolute;
				top:0;
				right:20px;

			}
		}

	}
	.el-pagination{
		margin:20px 0;
	  	float: right;
	}
  .quill_editor{
    height: 400px;
    margin-bottom: 110px;
  }

</style>
