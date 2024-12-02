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

      <procure v-if="this.flag==2||this.flag==1"></procure>&nbsp;
      <sale v-if="this.flag==3||this.flag==1"></sale>
      
      <el-table :data="tableData" border stripe class="tableCls">
        <el-table-column prop="name" label="" width="180" />
        <el-table-column prop="type.name" label="プロダクト" width="180" />
        <el-table-column prop="total" label="数量" width="180" />
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
  </template>
  
  <script>
  import procure from './procure.vue'
  import sale from './sale.vue'
  export default {
    name: 'user',
    components: { procure,sale },
    data () {
      return {
        queryParams: {//查询条件
          name: "",
          page: 1,
          size: 10
        },
        tableData: [],//每页数据
        total: 0,//总条数
      }
    },
    mounted () {
        const roleId=localStorage.getItem('roleId')
        if(roleId.includes('2')&&roleId.includes('3')){
            this.flag=1
        }else if(roleId.includes('1')){
            this.flag=1
        }else if(roleId.includes('2')){
            this.flag=2
        }else if(roleId.includes('3')){
            this.flag=3
        }
      //组件挂载之后开始调用接口查询数据
      this.initTableData();
    },
  
    methods: {
      initTableData () {
        this.$http.post('product/getProductList',{
            page:this.queryParams.page,
            size:this.queryParams.size,
            name:this.queryParams.name
        }).then((res)=>{
            this.tableData=res.data
            this.total=res.total
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
  