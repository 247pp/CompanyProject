<template>
  <el-card :body-style="{ padding: '15px', }" class="box-card tableOne">
    <div class="card-title">小站信息</div>
    <el-form ref="areaForm" :inline="true" :rules="rulesName" :model="ruleFormName" class="demo-form-inline">
      <el-form-item label="小站名称：" prop="smallStationName">
        <el-input
          :disabled="inputDisabled"
          v-model="ruleFormName.smallStationName"
          placeholder=""
          @change="channelFunc"/>
      </el-form-item>
      <el-form-item>
        <el-button v-if="buttonTitle==='校验'" type="primary" class="el-button--primary-28" @click="checkNameService">校验
        </el-button>
        <el-button v-if="buttonTitle==='查询'" type="primary" class="el-button--primary-28" @click="getList()" >查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-if="productInfo.listInfo"
      :data="productInfo.listInfo"
      :height="listHeight"
      style="width: 100%">
      <el-table-column
        fixed
        prop="date"
        label="日期"/>
      <el-table-column
        prop="name"
        label="姓名"/>
      <el-table-column
        prop="province"
        label="省份"/>
      <el-table-column
        prop="city"
        label="市区">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleChoose(scope.$index, scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div
      v-if="productInfo.listInfo"
      class="pagination-container">
      <el-pagination
        :current-page="productInfo.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="productInfo.limit"
        :total="productInfo.total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </el-card>
</template>
<script>
import { checkSmallStationNameService, queryUserscribeProdByUserInfoService } from '@/api/newAccount'

export default {
  components: {},
  props: {
    buttonTitle: {
      type: String,
      default: '校验'
    },
    listHeight: {
      type: String,
      default: '160'
    }
  },
  data() {
    return {
      ruleFormName: {
        smallStationName: '',
        userType: 2,
        custId: 2,
        status: 1
      },
      rulesName: {
        smallStationName: [{ required: true, message: '请输入小站名称', trigger: '' }]
      },
      productInfo: {
        listInfo: null,
        total: 0,
        page: 2,
        limit: 10
      },
      inputDisabled: false
    }
  },
  computed: {
    watchName() {
      return this.ruleFormName.smallStationName
    }
  },
  watch: {
    watchName: function(new1, old) {
      this.channelFunc()
    }
  },
  mounted() {
    this.$on('smallStation', (val) => {
      this.childAction(val)
    })
  },
  methods: {
    getList() {
      debugger
      console.log(432134)
      this.listLoading = true
      // this.ruleFormName.custId = JSON.parse(sessionStorage.getItem('cusObj')).custId
      console.log(this.ruleFormName)
      queryUserscribeProdByUserInfoService(this.ruleFormName).then(response => {
        console.log(response)
        // this.productInfo.listInfo = response.data.data
        // this.productInfo.total = response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.productInfo.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.productInfo.page = val
      this.getList()
    },
    handleChoose(index, row) {
      console.log(index, row)
    },
    channelFunc() {
      console.log(this.ruleFormName.smallStationName)
      this.$emit('showSmallStationName', {
        'smallStationName': this.ruleFormName.smallStationName
      })
    },
    childAction() {
      this.$refs['areaForm'].validate((valid) => {
        if (valid) {
          this.channelFunc()
          return true
        } else {
          return false
        }
      })
    },
    checkNameService() {
      this.listLoading = true
      if (!this.ruleFormName.smallStationName.replace(/\s+/)) return
      this.ruleFormName.custId = JSON.parse(sessionStorage.getItem('cusObj')).custId
      checkSmallStationNameService(this.ruleFormName).then(response => {
        console.log(response.data.respCode)
        if (response.data.respCode === '0000') {
          this.inputDisabled = true
        } else {
          this.$message.error('该小站存在，请重新填写')
        }
      })
    }
  }
}
</script>
<style lang="scss">
</style>
