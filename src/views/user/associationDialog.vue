<template>
  <div>
  <el-dialog
    v-model="associationDialogFlag"
    title="役職を与える"
    width="30%"
    :before-close="close"
    :destroy-on-close="true"
  >
    <div>
      <selectRole :obj="obj" @sendRoleIds="getRoleIds"></selectRole>
    </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="submit">
            提出
          </el-button>
        </span>
      </template>
      
    </el-dialog>
    </div>
</template>

<script>

import { ElMessageBox } from 'element-plus'
import selectRole from './selectRole.vue'

export default {
  components:{selectRole},
  props:['associationDialogFlag','obj'],
  emits:['sendFlag'],
  name: '',
  data () {
    return {
        name:'',
        roleIds:[]
    }
  },
  mounted () {

  },
  methods: {
    getRoleIds(roleIds){
      this.roleIds=roleIds
    },
    handleClose(){
        ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
        done()
        })
        .catch(() => {
        // catch error
        })
        this.$emit('sendFlag',false)
    },
    close(){
        this.$emit('sendFlag',false)
    },
    submit(){
      this.$http.post('role/updateRoleUser',{
        userId:this.obj.id,
        roleIds:this.roleIds.toString()
      }).then((res)=>{
        location.reload()
      })
    }
  }
}
</script>

<style scoped>

</style>
