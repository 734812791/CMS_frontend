<template>
  <div>
    <div class="m-4">
      关联角色： 
      <el-select
        v-model="value"
        multiple
        placeholder="请选择角色"
        style="width: 240px"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      {{ this.value }}
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props:['obj'],
  emits:['sendRoleIds'],
  data () {
    return {
      value:[],
      options:[]
    }
  },
  mounted () {
    this.getAllRole()
    this.getRoleByUserId()
  },
  methods: {
    getAllRole(){
      this.$http.post('role/getAllRole',{

      }).then((res)=>{
        this.options=res.data
      })
    },
    getRoleByUserId(){
      this.$http.post('role/getRoleByUserId',{
        userId:this.obj.id
      }).then((res)=>{
      
        for(let i=0;i<res.data.length;i++){
          this.value.push(res.data[i].id)
        }
        
      })
    }
  },
  watch:{
    value(){
      this.$emit('sendRoleIds',this.value)
    }
  }
}
</script>

<style scoped>

</style>
