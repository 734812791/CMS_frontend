<template>
  <div>
  <el-dialog
    v-model="dialogFlag"
    title="下级を追加"
    width="30%"
    :before-close="close"
  >
    <div>
      {{ this.id }} <br>
        タイプ：<input v-model="name">
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
  {{ this.id }}
</template>

<script>

import { ElMessageBox } from 'element-plus'

export default {
  props:['dialogFlag','id'],
  emits:['sendFlag'],
  name: '',
  data () {
    return {
        name:''
    }
  },
  mounted () {

  },
  methods: {
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
        this.$http.post('type/addType',{
            name:this.name,
            id:this.id
        })

        this.close
        location.reload()
    }
  }
}
</script>

<style scoped>

</style>
