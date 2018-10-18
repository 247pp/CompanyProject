<template>
  <div class="template-cutter">
    <el-card :body-style="{ padding: '15px', }" class="box-card">
      <div class="card-title">{{ $t('strategyOrder.title1') }}</div>
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
            <el-form-item label="工单类型" prop="eventType">
              <span slot="label">{{ $t('strategyOrder.eventType') }}</span>
              <el-select v-model="ruleForm.eventType" :placeholder="$t('strategyOrder.orderTypeph')">
                <el-option
                  v-for="item in eventTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="readonly"
                  :readonly="readonly"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户类型" prop="custType">
              <span slot="label">{{ $t('strategyOrder.custType') }}</span>
              <el-select v-model="ruleForm.custType" :placeholder="$t('strategyOrder.custTypeph')">
                <el-option
                  v-for="item in clientTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="readonly"
                  :readonly="readonly"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">inline-edit-table
            <el-form-item label="" prop="identiNumber">
              <span slot="label">{{ $t('strategyOrder.identiNumber') }}</span>
              <el-input
                v-model="ruleForm.identiNumber"
                :readonly="readonly"
                :placeholder="$t('strategyOrder.identiNumberph')"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="16">
            <el-form-item label="" prop="createdTime">
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
              <el-button v-if="!readonly" type="primary" @click="submitForm('ruleForm')">{{ $t('form.submit') }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <work-order-table :list-height="listHeight" :list-info="listInfo"/>
    <work-order-detail-strategy/>
  </div>
</template>

<script>
import workOrderTable from '@/components/componentsForLittleSite/workOrderTable'
import workOrderDetailStrategy from '@/components/modalUse/workOrderDetailStrategy'
import { strategyOrderQryListService } from '@/api/workOrderManagement'
import { parseTime } from '@/utils'

export default {
  name: 'OrderSearchStrategy',
  components: {
    workOrderTable,
    workOrderDetailStrategy
  },
  data() {
    return {
      k: 1,
      listInfo: [],
      listHeight: '200',
      dialogVisible: false,
      readonly: false,
      submit: false,
      ruleForm: {
        title: '策略工单-查询条件',
        custType: '',
        eventType: '',
        startTime: '',
        endTime: '',
        identiNumber: '',
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
        identiNumber: [
          { required: true, message: this.$t('strategyOrder.role.identiNumber'), trigger: 'blur' }
        ],
        custType: [
          { required: true, message: this.$t('strategyOrder.role.custType'), trigger: 'change' }
        ],
        eventType: [
          { required: true, message: this.$t('strategyOrder.role.eventType'), trigger: 'change' }
        ],
        orderStatus: [
          { required: true, message: this.$t('strategyOrder.role.orderStatus'), trigger: 'change' }
        ],
        createdTime: [
          { required: true, message: this.$t('strategyOrder.role.createdTime'), trigger: 'change' }
        ]
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
      strategyOrderQryListService({ ...this.ruleForm }).then(res => {
        if (res.data.respCode === '0000') {
          console.log(res.data.rows)
          this.listInfo = res.data.rows
        }
      })
    })
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.startTime = parseTime(this.ruleForm.createdTime[0])
          this.ruleForm.endTime = parseTime(this.ruleForm.createdTime[1])
          strategyOrderQryListService({ ...this.ruleForm }).then(res => {
            if (res.data.respCode === '0000') {
              console.log(res.data.rows)
              this.listInfo = res.data.rows
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
