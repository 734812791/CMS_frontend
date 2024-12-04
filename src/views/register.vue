<template>
  <div class="container">
    <div class="centered-div">
      <div>
        アカウント <input v-model="account"><br>
      パスワード <input v-model="password"><br>
      姓名 　　　<input v-model="name"><br>
      生年月日 　<input type="date" v-model="birthday"><br>
      </div>
      <br>
      <div>
        <button @click="register">登録</button>
        <button @click="this.$router.back()">前のページに戻る</button>
      </div>  
      <br>
      <br>
      <div>
        <h3>このページで作成するアカウントは、一部分の機能のみ利用できます。adminを使えば、全ての機能が使え利用できます。</h3>
        <h3>ご自由にお使いください</h3>
        <h3>アカウント：admin</h3>
        <h3>パスワード：admin</h3>
      </div>   
    </div> 
  </div>
  
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
  .container {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 100vh; /* 让容器的高度占满整个视口 */
    background-color: lightblue; /* 背景颜色 */
  }

  .centered-div {
    width: 300px; /* 设置 div 的宽度 */
    height: 200px; /* 设置 div 的高度 */
    
  }
</style>
