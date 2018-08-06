<template>
	<div class="role-set-page">
    <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题：">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <quill-editor ref="myTextEditor" v-model="ruleForm.content"
                      :content="content"
                      :options = "editorOption"
                      @change="onEditorChange($event)"
                      class="quill_editor">
        </quill-editor>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="fnCancel(ruleForm)" class="dialog-footer-cancle">取消</el-button>
      <el-button type="primary" @click="submitForm(ruleForm)" class="dialog-footer-submit">发送</el-button>
    </div>
	</div>
</template>

<script src="@/assets/js/notice/Notice.js"></script>
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
  .dialog-footer{
    margin-bottom: 50px;
  }
  .dialog-footer-cancle{
    position: absolute;
    right: 150px;
  }
  .dialog-footer-submit{
    position: absolute;
    right: 50px;
  }

</style>
