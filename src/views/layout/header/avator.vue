<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar shape="square" :size="40" :src="squareUrl"></el-avatar>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import defaultAvator from '../../../assets/defaultAvator.png'
const store = useStore()
const squareUrl = store.getters.formatPhoto ? store.getters.formatPhoto : defaultAvator

const logout = () => {
  store.dispatch('logout')
}
</script>

<style  scoped>
:deep(.el-dropdown-menu__item) {
  white-space: nowrap;
}
</style>
