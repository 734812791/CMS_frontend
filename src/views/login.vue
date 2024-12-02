<template>
  <div class="login-main">
    <div class="login-wrapper">
      <div class="login-header">管理システム</div>
      <div class="form-wrapper">
        <input type="text" v-model="account" name="username" placeholder="アカウント" class="login-input-item">
        <input type="password" v-model="password" name="password" placeholder="パスワード" class="login-input-item">
        <div class="login-btn" @click="handleLogin">ログイン&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
      <div class="login-msg">
        <!-- 没有账号? -->
        <a href="#" @click.prevent="handleRegister">登録&nbsp;&nbsp;&nbsp;&nbsp;</a>
      </div>
    </div>
  </div>
</template>

<script>
import { setTokenTime } from '../utils/tokenAuth'
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      account: "",
      password: "",
    }
  },
  mounted () {

  },
  methods: {
    handleLogin () {

      this.$http.post('user/login',{
        account:this.account,
        password:this.password
      }).then((res)=>{

        localStorage.setItem("roleId",res.roleId)
        localStorage.setItem("userId",res.user.id)
        localStorage.setItem("userName",res.user.name)

          if (res.code=='1') {
        //设置token时间
        setTokenTime();
        //登录成功，保存token
        this.$store.commit("setToken", "dataFromServer")
        //保存用户的头像地址
        this.$store.commit("setPhotoUrl", "");
        //跳转到主页
        this.$router.replace("/index")
      } else {
        ElMessage.error("登录失败")
      }
        
      })

      // axios({
      //   method:'get',
      //   url:'/api/login/login',
      //   params:{
      //     account:this.account,
      //     password:this.password
      //   }
      // }).then((res)=>{
      //   console.log(res.data);
      // })

      // if ("admin" == this.account) {
      //   //设置token时间
      //   setTokenTime();
      //   //登录成功，保存token
      //   this.$store.commit("setToken", "dataFromServer")
      //   //保存用户的头像地址
      //   this.$store.commit("setPhotoUrl", "");
      //   //跳转到主页
      //   this.$router.replace("/index")
      // } else {
      //   ElMessage.error("登录失败")
      // }
    },
    handleRegister () {
      // ElMessage.success("注册成功")
      this.$router.replace("/register")
    }

  }
}
</script>

<style scoped>
.login-main {
  height: 100%;
  background-image: linear-gradient(to right, #0081ff, #1cbbb4);
}

.login-wrapper {
  background-color: #fff;
  width: 358px;
  height: 588px;
  border-radius: 15px;
  padding: 0 50px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login-header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
  color: #2775ab
}

.login-input-item {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}

.login-input-item:placeholder {
  text-transform: uppercase;
}

.login-btn {
  text-align: center;
  padding: 10px;
  width: 100%;
  margin-top: 40px;
  background-image: linear-gradient(to right, #0081ff, #1cbbb4);
  color: #fff;
}

.login-msg {
  text-align: center;
  line-height: 88px;
}

.login-main a {
  text-decoration-line: none;
  color: #abc1ee;
}
</style>
