<!-- 汉堡伸缩按钮，点击后可以对左侧菜单进行伸缩 -->
<template>
  <div class="hamburger-container" @click="toggleClick" id="hamburger">
    <template v-if="$store.getters.siderType">
      <el-icon :size="20">
        <Fold />
      </el-icon>
    </template>
    <template v-else>
      <el-icon :size="20">
        <Expand />
      </el-icon>
    </template>
  </div>
</template>

<script >
export default {
  methods: {
    toggleClick () {
      this.$store.commit('toggleMenu')
    }
  }
}
</script>

<style  scoped>
.hamburger-container {
  margin-right: 16px;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
