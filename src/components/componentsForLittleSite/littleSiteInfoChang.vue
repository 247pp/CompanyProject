<template>
  <el-card :body-style="{ padding: '15px', }" class="box-card tableOne">
    <div class="card-title">小站信息</div>
    <el-form ref="areaForm" :inline="true" :rules="rulesName" :model="ruleFormName" class="demo-form-inline">
      <el-form-item label="小站名称：" prop="smallStationName">
        <el-input v-model="ruleFormName.smallStationName" placeholder="" @change="channelFunc"/>
      </el-form-item>
      <el-form-item>
        <el-button v-if="buttonTitle==='校验'" type="primary" class="el-button--primary-28" @click="checkNameService">校验
        </el-button>
        <el-button v-if="buttonTitle==='查询'" type="primary" class="el-button--primary-28" @click="getList()">查询
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-if="littleSite.length"
      :data="littleSite"
      :height="listHeight"
      style="width: 100%">
      <el-table-column
        fixed
        prop="smallStationName"
        label="小站名称"/>
      <el-table-column
        prop="userName"
        label="客户名称"/>
      <el-table-column
        prop="createTime"
        label="创建时间"/>
      <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click.native.prevent="selectSite(scope.row)"
          >
            选 择
          </el-button>
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
import { fetchListChange, littleSiteServiceQry, SmallStationNameCheckService } from '@/api/newAccount'

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
      templateRadio: '',
      buttonType: 'radio',
      littleSite: [],
      ruleFormName: {
        smallStationName: ''
      },
      rulesName: {
        smallStationName: [{ required: true, message: '请输入小站名称', trigger: '' }]
      },
      productInfo: {
        listInfo: null,
        total: 0,
        page: 2,
        limit: 10
      }
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
    this.$bus.$on('changeLittleSite', (row) => {
      // console.log(row)
      const data = {
        userId: row.userId
      }
      console.log(data)
      littleSiteServiceQry({ ...data }).then(res => {
        console.log(res)
      })
    })
  },
  methods: {
    getList() {
      // alert(343434)
      // this.listLoading = true
      const data = {
        smallStationName: this.ruleFormName.smallStationName,
        custId: JSON.parse(sessionStorage.getItem('cusObj')).custId
        // smallStationName: '卫星',
        // custId: 2

      }
      // debugger
      fetchListChange({ ...data }).then(response => {
        this.littleSite = response.data.data
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
      this.ruleFormName.custId = ''
      if (!this.childAction()) return
      SmallStationNameCheckService().then(response => {
        console.log(response.data)
      })
    },
    getTemplateRow(index, row) { // 获取选中数据
      // this.$bus.$emit('change', row)
      // this.$bus.$emit('changeLittleSite', row)
      // this.$bus.$emit('selectLittleSite', row)
    },
    selectSite(row) {
      this.ruleFormName.smallStationName = row.smallStationName
      this.$bus.$emit('selectLittleSite', row)

      // console.log(row)
    }
  }
}
</script>
<style lang="scss">
</style>
