<template>
  <div id="div" v-show=this.visible>
    <slot name="content"></slot>
    {{ visible }}
  </div>
</template>

<script>
export default {
  name: '',
  props:['visible'],
  data () {
    return {
      
    }
  },
  mounted () {
    
  },
  methods: {

  },
  watch:{
  }
}
</script>

<style scoped>
#div{
  
}
</style>
