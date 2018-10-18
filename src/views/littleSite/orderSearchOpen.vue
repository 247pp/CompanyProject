<template>
  <div class="template-cutter">
    <el-card :body-style="{ padding: '15px', }" class="box-card">
      <div class="card-title">{{ $t('strategyOrder.title4') }}</div>
      <el-form
        ref="ruleForm"
        :key="k"
        :model="ruleForm"
        :rules="rules"
        :style="{paddingRight:'2vw'}"
        class="demo-ruleForm"
        label-width="8vw"
        size="mini">
        <el-row>
          <el-col :span="8">
            <el-form-item label="" prop="jobId">
              <span slot="label">工单编号</span>
              <el-input
                v-model="ruleForm.jobId"
                :readonly="readonly"
                placeholder="工单编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="" prop="orderId">
              <span slot="label">订单编号</span>
              <el-input
                v-model="ruleForm.orderId"
                :readonly="readonly"
                placeholder="订单编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户类型" prop="custType">
              <el-select v-model="ruleForm.custType" :placeholder="$t('strategyOrder.orderTypeph')">
                <el-option
                  v-for="item in custTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="readonly"
                  :readonly="readonly"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="工单类型" prop="jobStatus">
              <el-select v-model="ruleForm.jobType" placeholder="工单类型">
                <el-option
                  v-for="item in jobTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="readonly"
                  :readonly="readonly"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="" prop="createTime">
              <span slot="label">{{ $t('strategyOrder.createdTime') }}</span>
              <el-date-picker
                v-model="ruleForm.createdTime"
                :picker-options="pickerOptions2"
                :start-placeholder="$t('strategyOrder.createdTimeStartph')"
                :end-placeholder="$t('strategyOrder.createdTimeEndph')"
                type="datetimerange"
                range-separator=" - "
                align="right"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item style="text-align: right">
              <el-button v-if="!readonly" @click="resetForm('ruleForm')">{{ $t('form.reset') }}</el-button>
              <el-button v-if="!readonly" type="primary" @click="submitForm('ruleForm')">查询
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-card>
    <work-order-table :list-height="listHeight" :list-info="listInfo" :total="total" :page-no="ruleForm.pageNo"/>
    <work-order-detail-strategy/>
  </div>
</template>

<script>
import workOrderTable from '@/components/componentsForLittleSite/openOrderTable'
import workOrderDetailStrategy from '@/components/modalUse/workOrderDetailStrategy'
import { strategyOrderQryListService } from '@/api/workOrderManagement'
import { parseTime } from '@/utils'
import { queryJobService } from '@/api/workOrderManagement'

export default {
  name: 'OrderSearchStrategy',
  components: {
    workOrderTable,
    workOrderDetailStrategy
  },
  data() {
    return {
      k: 1,
      total: 0,
      listInfo: [],
      listHeight: '200',
      dialogVisible: false,
      readonly: false,
      submit: false,
      ruleForm: {
        title: '策略工单-查询条件',
        custType: '',
        jobId: '',
        jobType: '',
        createdTime: '',
        startTime: '',
        endTime: '',
        orderId: '',
        pageNo: 1,
        pageSize: 10
      },
      eventTypeList: [{
        value: '0',
        label: this.$t('strategyOrder.flowRemind')
      }, {
        value: '1',
        label: this.$t('strategyOrder.flowReduction')
      }, {
        value: '2',
        label: this.$t('strategyOrder.flowHalt')
      }],
      custTypeList: [
        {
          value: '1',
          label: '个人客户'
        },
        {
          value: '2',
          label: '企业客户'
        }
      ],
      orderStatusList: [{
        value: '选项1',
        label: this.$t('strategyOrder.notPushed')
      }, {
        value: '选项2',
        label: this.$t('strategyOrder.pushed')
      }],
      clientTypeList: [{
        value: '1',
        label: this.$t('strategyOrder.personalClient')
      }, {
        value: '2',
        label: this.$t('strategyOrder.enterpriseClient')
      }],
      jobStatusList: [
        {
          value: '0',
          label: '已开通'
        }, {
          value: '1',
          label: '未开通'
        }, {
          value: '2',
          label: '开通中'
        }
      ],
      jobTypeList: [
        {
          value: '1',
          label: '开通工单'
        }, {
          value: '2',
          label: '实施工单'
        }
      ],
      jobTypeArr: [
        '0',
        '开通工单',
        '实施工单'
      ],
      custTypeArr: [
        '',
        '个人客户',
        '企业客户'
      ],
      countryList: [{
        value: '选项1',
        label: '中国'
      }, {
        value: '选项2',
        label: '美国'
      }],
      certificateTypes: [{
        value: '选项1',
        label: '身份证'
      }, {
        value: '选项2',
        label: '护照'
      }],
      businessModels: [{
        value: '选项1',
        label: '出租卫星资源'
      }, {
        value: '选项2',
        label: '出租卫星资源&基带系统'
      }, {
        value: '选项3',
        label: '出租卫星资源&基带系统&BOSS系统'
      }, {
        value: '选项4',
        label: '自主运营'
      }],
      pickerOptions2: {
        shortcuts: [{
          text: this.$t('strategyOrder.nearlyAweek'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('strategyOrder.nearlyAmonth'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('strategyOrder.nearly3month'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      rules: {
        // jobId: [{ required: true, message: '请输入工单编号', trigger: 'blur' }],
        // orderId: [{ required: true, message: '请输入订单编号', trigger: 'blur' }],
        // custType: [{ required: true, message: this.$t('strategyOrder.role.custType'), trigger: 'change' }],
        // eventType: [
        //   { required: true, message: this.$t('strategyOrder.role.eventType'), trigger: 'change' }
        // ],
        // orderStatus: [
        //   { required: true, message: this.$t('strategyOrder.role.orderStatus'), trigger: 'change' }
        // ],
        // createdTime: [
        //   { required: true, message: this.$t('strategyOrder.role.createdTime'), trigger: 'change' }
        // ]
      }
    }
  },

  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },

  mounted() {
    this.$bus.$on('showDetail', (data) => {
      console.log(data)
    })

    this.$bus.$on('changPage', (listQuery) => {
      console.log(listQuery)
      this.ruleForm.pageNo = listQuery.page
      this.ruleForm.pageSize = listQuery.limit
      this.ruleForm.startTime = this.ruleForm.createdTime ? parseTime(this.ruleForm.createdTime[0]) : ''
      this.ruleForm.endTime = this.ruleForm.createdTime ? parseTime(this.ruleForm.createdTime[1]) : ''
      queryJobService({ ...this.ruleForm }).then(res => {
        if (res.data.respCode === '0000') {
          console.log(res.data.data.rows)
          console.log(res.data.data.rows)
          this.total = res.data.data.recordsTotal - 0
          this.listInfo = res.data.data.rows
          this.listInfo.forEach(item => {
            item.createTime = parseTime(item.createTime)
            item.jobStatus = item.jobStatus !== '0' ? this.jobStatusList[item.jobStatus].label : ''
            item.jobType = item.jobType ? this.jobTypeArr[item.jobType] : ''
            item.custType = item.custType ? this.custTypeArr[item.custType] : ''
          })
        }
      })
    })
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.pageNo = 1

          this.ruleForm.startTime = this.ruleForm.createdTime ? parseTime(this.ruleForm.createdTime[0]) : ''
          this.ruleForm.endTime = this.ruleForm.createdTime ? parseTime(this.ruleForm.createdTime[1]) : ''
          queryJobService({ ...this.ruleForm }).then(res => {
            if (res.data.respCode === '0000') {

              this.$bus.$emit('resetPageorderSearchOpen')
              console.log('res.data.data.rows')
              console.log(res.data.data.rows)
              res.data.data.rows.forEach(item => {
                item.createTime = parseTime(item.createTime)
                item.jobStatus = item.jobStatus !== '0' ? this.jobStatusList[item.jobStatus].label : ''
                item.jobType = item.jobType ? this.jobTypeArr[item.jobType] : ''
                item.custType = item.custType ? this.custTypeArr[item.custType] : ''
              })
              this.listInfo = res.data.data.rows
              console.log('this.listInfo')
              console.log(this.listInfo)
              this.total = res.data.data.recordsTotal - 0
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.ruleForm.createdTime = null
    },
    openMsgBox() {
      this.$alert('已校验成功！', '处理成功', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'success',
            message: '请继续进行下一步操作。'
          })
        }
      })
    },
    openMsgSubmit() {
      this.$alert('个人客户已存在！', '处理成功', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'success',
            message: '请继续进行下一步操作。'
          })
          this.submit = true
        }
      })
    },
    closeAllTags() {
      this.$store.dispatch('delAllViews')
      this.$router.push('/')
    }
  }

}
</script>

<style scoped>

</style>
