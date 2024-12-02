<template>
  <div>
    账号 <input v-model="account"><br>
    密码 <input v-model="password"><br>
    姓名 <input v-model="name"><br>
    出生日期 <input type="date" v-model="birthday"><br>
  </div>
  <button @click="register">注册</button>
  <button @click="this.$router.back()">返回</button>
</template>

<script>
export default {
  name: '',
  data () {
    return {
        account:'',
        password:'',
        name:'',
        birthday:''
    }
  },
  mounted () {

  },
  methods: {
    register(){
        this.$http.post('user/register',{
            account:this.account,
            password:this.password,
            name:this.name,
            birthday:this.birthday
        }).then((res)=>{
            ElMessage.success(res.msg)
            // this.$router.replace("/login")
        })
    }
  }
}
</script>

<style scoped>

</style>
