import { createStore } from 'vuex'
import router from '../router';
const store = createStore({
  state: {
    //登录用户头像
    photoUrl: localStorage.getItem("photoUrl") || "",
    //登录用户的token
    token: localStorage.getItem("token") || "",
    //汉堡伸缩按钮的伸缩状态，仅在layout-header-hamburger.vue通过按钮触发修改
    siderType: true,
  },
  mutations: {
    setToken (state, token) {//登录成功后设置token
      state.token = token;
      localStorage.setItem("token", token);
    },
    setPhotoUrl (state, photoUrl) {//登录成功后设置头像地址
      state.photoUrl = photoUrl;
      localStorage.setItem("photoUrl", photoUrl);
    },
    toggleMenu (state) {//切换汉堡按钮的伸缩状态值
      state.siderType = !state.siderType
    },
  },
  actions: {
    //退出操作
    logout ({ commit }) {
      //为了清空state状态
      commit("setToken", "")
      commit("setPhotoUrl", "")
      //清除本地存储的数据
      localStorage.clear();
      sessionStorage.clear();
      //弹到登录页
      router.replace("/login")
    }
  },
  getters: {
    //汉堡伸缩按钮的伸缩状态，默认打开，以下组件用到
    //1、layout-header-hamburger.vue
    //2、layout-index.vue
    siderType: (state) => state.siderType,
    formatPhoto (state) {
      if (state.photoUrl && state.photoUrl.length > 0) {
        return '/api' + state.photoUrl
      } else {
        return null
      }
    }
  }
})

export default store