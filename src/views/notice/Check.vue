<template>
	<div class="role-set-page">
    <table></table>
    <el-form>
      <el-row>
      <el-col :span="12">
      <el-form-item label="标题：">
        <el-input></el-input>
      </el-form-item>
      </el-col>
      </el-row>
      <el-form-item label="内容：" prop="account">
        <el-input></el-input>
      </el-form-item>
    </el-form>
	</div>
</template>

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

</style>
