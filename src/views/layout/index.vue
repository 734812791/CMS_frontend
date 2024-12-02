<template>
  <!-- element-plus (Basic 基础组件--布局容器) -->
  <el-container class="app-container">
    <el-aside :width="sideWidth" class="sidebar-container">
      <Menu></Menu>
    </el-aside>
    <el-container class="container">
      <el-header>
        <!-- 头部组件 -->
        <LayHead />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from './menu.vue'
import LayHead from './header/index.vue'
export default {
  components: { Menu, LayHead },
  name: '',
  data () {
    return {

    }
  },
  computed: {
    sideWidth () {
      //根据菜单折叠与否，重新计算菜单的宽度
      return this.$store.getters.siderType ? "210px" : "67px"
    }
  },
  mounted () {
    //首次登录系统，进入欢迎页
    let defaultPage = sessionStorage.getItem('path') || "/index/welcome"
    console.log(defaultPage);
    //进入首页后，直接打开第一个内容页或者刷新后的页面
    this.$router.push(defaultPage)
  },
  
}
</script>

<style scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.sidebar-container {
  height: 100%;
  transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -moz-transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -o-transition: width 0.15s;
  /* background-color: #304156; */
}

.container {
  width: calc(100% - v-bind(sideWidth));
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.15s;
}

.container .hidderContainer {
  width: calc(100% - v-bind(sideWidth));
}

/*样式穿透，修改默认样式里的属性*/
:deep(.el-header) {
  padding: 0;
}
</style>
