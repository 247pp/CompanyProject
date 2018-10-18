<template>
  <div class="template-cutter">
    <el-card :body-style="{ padding: '15px', }" class="box-card">
      <div class="card-title">{{ ruleForm.title }}</div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        :style="{paddingRight:'10vw'}"
        class="demo-ruleForm"
        label-width="15vw"
        size="mini">
        <el-row>
          <el-col :span="11">
            <el-form-item label="客户名称" prop="custName">
              <el-input v-model="ruleForm.custName" :readonly="readonly" placeholder="请输入客户名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="ruleForm.sex" :disabled="readonly">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="证件类型" prop="certType">
              <el-select v-model="ruleForm.certType" placeholder="请选择证件类型">
                <el-option
                  v-for="item in certTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="readonly"
                  :readonly="readonly"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="证件号码" prop="certNo">
              <el-input v-model="ruleForm.certNo" :readonly="readonly" placeholder="请选择证件号码"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="证件地址" prop="custAddr">
              <el-input v-model="ruleForm.custAddr" :readonly="readonly" placeholder="请输入证件地址"/>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="证件有效日期" prop="endTime">
              <el-date-picker
                v-model="ruleForm.endTime"
                :readonly="readonly"
                type="date"
                placeholder="选择证件有效日期"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">

            <el-form-item label="选择国籍" prop="country">
              <el-select v-model="ruleForm.country" placeholder="请选择国籍">
                <el-option
                  v-for="item in countryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="readonly"
                  :readonly="readonly"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="联系电话" prop="telePhone">
              <el-input v-model="ruleForm.telePhone" :readonly="readonly" placeholder="请输入联系电话"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item style="text-align: center">
          <el-button v-if="!readonly" type="primary big" @click="verifyForm('ruleForm')">证件校验</el-button>
          <el-button v-if="!readonly" class="big" @click="resetForm('ruleForm')">重置</el-button>
          <el-button v-if="readonly && !submit" type="primary big" @click="submitForm('ruleForm')">提交</el-button>
          <el-button v-if="submit" class="big" @click="closeAllTags">关闭本页</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addPersonCustService, qryCustInfoService } from '@/api/clientManagement'

export default {
  name: 'OpenAccountEnterpriseA',
  data() {
    return {
      readonly: false,
      submit: false,
      ruleForm: {
        title: '个人客户新增-基本信息',
        custName: '',
        custType: '1',
        custAddr: '',
        certType: '',
        certNo: '',
        telePhone: '',
        sex: '',
        country: '',
        isMarriage: '',
        defaultLanguage: '',
        endTime: ''
      },
      languageList: [{
        value: '1',
        label: '汉语'
      }, {
        value: '2',
        label: '英语'
      }, {
        value: '3',
        label: '法语'
      }, {
        value: '4',
        label: '俄语'
      }, {
        value: '5',
        label: '阿拉伯语'
      }, {
        value: '6',
        label: '西班牙语'
      }],
      countryList: [{
        value: '中国',
        label: '中国'
      }, {
        value: '美国',
        label: '美国'
      }],
      certTypes: [{
        value: '1',
        label: '身份证'
      }, {
        value: '2',
        label: '护照'
      }, {
        value: '3',
        label: '军官证'
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

      rules: {
        custName: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        defaultLanguage: [
          { required: true, message: '请选择用户语言', trigger: 'change' }
        ],
        country: [
          { required: true, message: '请选择用户国际', trigger: 'change' }
        ],
        isMarriage: [
          { required: true, message: '请选择用户婚姻情况', trigger: 'change' }
        ],
        custAddr: [
          { required: true, message: '请选择证件地址', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请输入证件有效期', trigger: 'change' }
        ],
        telePhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        certType: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        certNo: [
          { required: true, message: '请输入证件号码', trigger: 'blur' },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '证件号码格式有误！',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  methods: {
    verifyForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          qryCustInfoService({ ...this.ruleForm }).then(res => {
            if (res.data.respCode === '9999') {
              console.log('res')
              console.log(res)
              this.readonly = true
              // this.openMsgBoxSuccess()
              this.$message({
                type: 'success',
                message: '身份校验成功，请继续操作提交数据。'
              })
            } else {
              // this.openMsgBox()
              this.$message({
                type: 'success',
                message: '客户已存在，请继续进行下一步操作。'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addPersonCustService({ ...this.ruleForm }).then(res => {
            if (res.data.respCode === '0000') {
              // this.readonly = true
              // this.openMsgSubmit()
              this.$message({
                type: 'success',
                message: '客户信息提交成功。'
              })
              this.submit = true
            } else {
              // this.openMsgBox()
              this.$message({
                type: 'error',
                message: '提交不成功，请稍后重新提交'
              })
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
    },
    // openMsgBoxSuccess() {
    //   this.$alert('已校验成功！', '处理成功', {
    //     confirmButtonText: '确定',
    //     callback: action => {
    //       this.$message({
    //         type: 'success',
    //         message: '请继续进行下一步操作。'
    //       })
    //     }
    //   })
    // },
    openMsgBox() {
      this.$alert('已校验失败！', '校验完成', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'success',
            message: '请修改客户信息后继续再次校验。'
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
