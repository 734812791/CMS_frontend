<!-- 新增和编辑的弹出框 -->
<template>
  <el-dialog :title="title" width="30%" :before-close="handleClose">
    <el-form ref="form" :rules="rules" label-position="right" label-width="100px" :model="formInfo"
      style="max-width: 460px">
      <el-form-item label="名前" prop="name">
        <el-input v-model="formInfo.name" />
      </el-form-item>
      <el-form-item label="アカウント" prop="account">
        <el-input v-model="formInfo.account" />
      </el-form-item>
      <el-form-item label="生年月日" prop="birthday">
        <el-input type="date" v-model="formInfo.birthday" />
      </el-form-item>
      <!-- 编辑的时候，密码框不显示 -->
      <el-form-item label="パスワード" prop="password" v-if="editObj && !editObj.id">
        <el-input v-model="formInfo.password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm()">提出</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      formInfo: {},//form表单的数据对象
      rules: {
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度范围为 3 到 8', trigger: 'blur' },
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
    }
  },
  props: ["title", "editObj"],//editObj为外部传递进来的参数，编辑用到
  mounted: function () {
    //外部传递的数据字段太多，最好进行一次转换，只取想要的字段
    // this.formInfo = this.editObj
    if (this.editObj && this.editObj.id) {
      let temp = {}
      temp.id = this.editObj.id
      temp.account = this.editObj.account
      temp.name = this.editObj.name
      temp.birthday=this.editObj.birthday
      this.formInfo = temp
    }

  },
  emits: ['updateFlag', 'tableRefresh'],//声明自定义事件，否则浏览器控制台会有警告
  methods: {
    handleClose () {
      //发送事件，告诉父组件，关闭dialog
      this.$emit("updateFlag", false)
    },
    handleConfirm () {
      //获取表单的dom对象，并进行数据校验
      this.$refs['form'].validate((valid, fields) => {
        if (valid) {
          //调用服务端接口，更新数据
          this.$http.post('user/addUser',{
            id:this.formInfo.id,
            account:this.formInfo.account,
            name:this.formInfo.name,
            password:this.formInfo.password,
            birthday:this.formInfo.birthday,
            title:this.title
          }).then((res)=>{
            alert(res.msg)
            location.reload()
          })
          //关闭dialog
          this.handleClose();
          //成功 刷新表格
          this.$emit("tableRefresh")
        } else {
        }
      })

    }
  }
}
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
