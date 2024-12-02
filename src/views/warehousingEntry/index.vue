<!-- 用户管理页 -->
<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input clearable placeholder="プロダクトの名前をご入力ください" v-model="queryParams.name"></el-input>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" @click="tableQuery">
            <el-icon>
              <Search />
            </el-icon>&nbsp;サーチ
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    
    <el-table :data="tableData" border stripe class="tableCls">
      <el-table-column prop="name" label="" width="50" />
      <el-table-column prop="type.name" label="プロダクト" width="180" />
      <el-table-column prop="number" label="数量" width="180" />
      <el-table-column prop="price" label="単価" width="180" />
      <el-table-column prop="createDate" label="申請日" width="180" />
      <el-table-column prop="status" label="状態" width="180" />
      <el-table-column prop="id" label="操作">
          <template v-slot="scope">
            <el-button size="small" type="danger" @click="deleteOrder(scope.row.id)">
              <el-icon>
                <Edit />
              </el-icon>取消
            </el-button>
            <el-button v-if="scope.row.status=='却下'" size="small" type="primary" @click="openDialog(scope.row.id)">
              <el-icon>
                <Delete />
              </el-icon>更新
            </el-button>
            <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              content=""
              @before-enter="showreason(scope.row.id)"
              v-if="scope.row.status=='却下'"
            >
              {{this.reason}}
              <template #reference>
                <el-button size="small" type="primary" class="m-2">却下された理由</el-button>
              </template>
            </el-popover>
          </template>
        </el-table-column>
      <!-- 单元格格式化的示例 -->
      <!-- <el-table-column prop="name" label="状态" width="180" :formatter="cellFormat" /> -->
      <!-- el-switch修改数值的示例 -->
      <!-- <el-table-column label="启用">
      <template v-slot="scope">
        <el-switch v-model="scope.row.status" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          @change="changeEnable(scope.row)" />
      </template>
    </el-table-column> -->
    </el-table>
    <el-pagination v-model:currentPage="queryParams.page" v-model:page-size="queryParams.size" :background="true"
      layout="->,total, prev, pager, next" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
  <fixOrderDialog :id="id" :dialogFlag="dialogFlag" @sendFlag="getFlag"></fixOrderDialog>
</template>

<script>
  import fixOrderDialog from './fixOrderDialog.vue'

export default {
  components:{fixOrderDialog},
  name: 'user',
  data () {
    return {
      queryParams: {//查询条件
        name: "",
        page: 1,
        size: 10
      },
      tableData: [],//每页数据
      total: 0,//总条数
      userId:'',
      dialogFlag:false,
      id:'',
      reason:''
    }
  },
  mounted () {
    this.userId=localStorage.getItem('userId')
    //组件挂载之后开始调用接口查询数据
    this.initTableData();
  },

  methods: {
    showreason(id){
      this.$http.post('order/getOrderById',{
          id:id
      }).then((res)=>{
        this.reason=res.data.reason
      })
    },
    getFlag(flag){
      this.dialogFlag=flag
    },
    openDialog(id){
      this.dialogFlag=true
      this.id=id
    },
    deleteOrder(id){
      this.$http.post('order/deleteOrder',{
        id:id
      }).then((res)=>{
        location.reload()
      })
    },
    initTableData () {
      this.$http.post('order/getOrderList',{
          page:this.queryParams.page,
          size:this.queryParams.size,
          name:this.queryParams.name,
          userId:this.userId,
          typeName:this.queryParams.name,
          orderType:1
      }).then((res)=>{
          this.tableData=res.data
          this.total=res.total
          //去掉日期的时区
          for(let i=0;i<this.tableData.length;i++){   
              if(this.tableData[i].createDate!=null && this.tableData[i].createDate!=undefined){
                this.tableData[i].createDate=this.tableData[i].createDate.substr(0,10)
              }         
          }

          for(let i=0;i<res.data.length;i++){
                if(res.data[i].status=='1'){
                    res.data[i].status='未着'
                }else if(res.data[i].status=='2'){
                    res.data[i].status='却下'
                }else if(res.data[i].status=='3'){
                    res.data[i].status='結束'
                }
            }
      })


      // const res = this.$test.userTableData
      // if (res && res.code == 1) {
      //   //更新每页的数据
      //   this.tableData = res.rows
      //   //更新表格的总条数
      //   this.total = res.total
      // }
    },
    tableQuery (e) {
      //查询按钮的事件
      this.$clearCss(e);
      //点击了查询按钮
      this.queryParams.page = 1;
      this.initTableData();
    },
    handleSizeChange (val) {
      //每页条数变化
      this.initTableData();
    },
    handleCurrentChange (val) {
      //页码变化
      this.initTableData()
    },
    cellFormat (row, column, cellValue, index) {
      //单元格的数据格式化
      return cellValue + "状态值"
    },
    changeEnable (data) {
      //switch按钮触发更改状态值
      let user = {
        id: data.id,
        status: data.status
      }
      // this.$http.post("/user/changeStatus", user).then((res) => {
      //   if (res && res.code == 1) {
      //   }
      // });
    }
  }
}
</script>

<style scoped>
:deep(.el-pagination) {
  margin-top: 5px;
}

.tableCls {
  width: 100%;
  margin-top: 10px;
}
</style>
