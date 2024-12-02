
<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
<script >
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default {
  components: {
    ElConfigProvider
  },
  setup (props) {
    let locale = zhCn
    return {
      locale
    };
  },
};
</script>
<style scoped>

</style>
