<!-- 用户管理页 -->
<template>
    <div>
      <el-card>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-input clearable placeholder="プロダクトの名前をご入力ください" v-model="queryParams.name"></el-input>
          </el-col>
          <el-col :span="7">
            <el-select v-model="orderType" placeholder="请选择订单类型">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
                />
            </el-select>
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
        <el-table-column prop="type.name" label="プロダクト" width="100" />
        <el-table-column prop="number" label="数量" width="100" />
        <el-table-column prop="price" label="単価" width="100" />
        <el-table-column prop="createDate" label="申請日" width="180" />
        <el-table-column prop="orderType" label="オーダータイプ" width="130" />
        <el-table-column prop="status" label="状態" width="100" />
        <el-table-column prop="creater" label="申請者" width="180" />
        <el-table-column prop="" label="操作">
            <template v-slot="scope">
              <el-button v-if="scope.row.status=='未着'" size="small" type="danger" @click="passOrder(scope.row.id,scope.row.number,scope.row.orderType,scope.row.typeId)">
                <el-icon>
                  <Edit />
                </el-icon>承認
              </el-button>
              <el-button v-if="scope.row.status=='未着'" size="small" type="primary" @click="openDialog(scope.row.id)">
                <el-icon>
                  <Delete />
                </el-icon>却下
              </el-button>
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
    <rejectDialog :id="id" :dialogFlag="dialogFlag" @sendFlag="getFlag"></rejectDialog>
  </template>
  
  <script>
import rejectDialog from './rejectDialog.vue'
  
  export default {
    components:{rejectDialog},
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
        options:[{value:1,label:'購入オーダー'},{value:2,label:'売渡オーダー'},{value:'',label:'全部'}],
        orderType:''
      }
    },
    mounted () {
      this.userId=localStorage.getItem('userId')
      //组件挂载之后开始调用接口查询数据
      this.initTableData();
    },
  
    methods: {
      passOrder(id,number,orderType,typeId){
        this.$http.post('order/passOrder',{
          id:id,
          number:number,
          orderType:orderType,
          typeId:typeId
        }).then((res)=>{
          console.log(res.data);
          location.reload()
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
        console.log('status',this.status);
        this.$http.post('order/getAllOrderList',{
            page:this.queryParams.page,
            size:this.queryParams.size,
            name:this.queryParams.name,
            userId:'this.userId',
            typeName:this.queryParams.name,
            orderType:this.orderType
        }).then((res)=>{
            
            for(let i=0;i<res.data.length;i++){
                if(res.data[i].orderType=='1'){
                    res.data[i].orderType='購入オーダー'
                }else if(res.data[i].orderType=='2'){
                    res.data[i].orderType='売渡オーダー'
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
            
            this.tableData=res.data
            this.total=res.total

            //去掉日期的时区
            for(let i=0;i<this.tableData.length;i++){   
                if(this.tableData[i].createDate!=null && this.tableData[i].createDate!=undefined){
                  this.tableData[i].createDate=this.tableData[i].createDate.substr(0,10)
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
  