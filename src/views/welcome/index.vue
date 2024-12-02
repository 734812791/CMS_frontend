<!-- 布局内容页 -->
<template>
  <div id="1">welcome</div>
</template>

<script>
export default {
  name: 'content',
  data () {
    return {

    }
  },
  mounted () {
    document.getElementById('1').innerText=localStorage.getItem("userName")+'さん,ようこそ';
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
