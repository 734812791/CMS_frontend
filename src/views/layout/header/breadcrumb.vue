<!-- 面包屑路由显示
  可以实现多级路由的显示，当前代码屏蔽了多级路由，仅显示选中的菜单
-->
<template>
  <div class="breadcrumb-container">
    <el-breadcrumb separator="/">
      <!-- 多级路由显示 -->
      <!-- <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
      <span class="no-redirect" v-if="index === breadcrumbList.length - 1">{{
      item.meta.title
      }}</span>
      <span class="redirect" v-else @click="handleRedirect(item.path)">{{
      // $t(`menus.${item.name}`)
      item.name
      }}</span>
    </el-breadcrumb-item> -->
      <!-- 当前菜单项显示 -->
      <el-breadcrumb-item> <span class="single">{{currentTitle}}</span></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
//多级路由列表
const breadcrumbList = ref([])
//当前菜单
const currentTitle = ref('')
//获取当前的路由列表
const initBreadcrumbList = () => {
  breadcrumbList.value = route.matched
  if (route.matched) {
    //取最后一条路由信息
    let curTemp = route.matched[route.matched.length - 1]
    //获取外部数据值
    if (curTemp) { currentTitle.value = curTemp.meta.title; }

  }
  // console.log(route.matched)
}
//切换路由
const handleRedirect = (path) => {
  router.push(path)
}

watch(
  route,
  () => {
    initBreadcrumbList()
  },
  { deep: true, immediate: true }
)


</script>

<style  scoped>
.no-redirect {
  color: #97a8be;
  cursor: text;
}

.redirect {
  color: #666;
  font-weight: 600;
  cursor: pointer;
}

.redirect:hover {
  color: #304156;
}

/* 以下是仅显示单个路径菜单的样式 */
.single {
  color: black;
  font-weight: 600;
}

:deep(.el-breadcrumb__item) {
  margin-bottom: 3px;
}
</style>
