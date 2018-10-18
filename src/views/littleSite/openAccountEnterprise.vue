<template>
  <div class="template-cutter">
    <el-card :body-style="{ padding: '15px', }" class="box-card">
      <div class="card-title">{{ title }}</div>
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
            <el-form-item label="客户地址" prop="custAddr">
              <el-input v-model="ruleForm.custAddr" :readonly="readonly" placeholder="请输入客户地址"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="营业执照" prop="busiLicenseCode">
              <el-input v-model="ruleForm.busiLicenseCode" :readonly="readonly" placeholder="请输入营业执照"/>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="开户税号" prop="taxNumber">
              <el-input v-model="ruleForm.taxNumber" :readonly="readonly" placeholder="请输入开户税号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="开户行" prop="payBank">
              <el-input v-model="ruleForm.payBank" :readonly="readonly" placeholder="请输入开户行名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="开户行账号" prop="bankAccount">
              <el-input v-model="ruleForm.bankAccount" :readonly="readonly" placeholder="请输入开户行账号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="法人代表" prop="legalRepres">
              <el-input v-model="ruleForm.legalRepres" :readonly="readonly" placeholder="请输入法人代表名字"/>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="联系电话" prop="telePhone">
              <el-input v-model="ruleForm.telePhone" :readonly="readonly" placeholder="请输入联系电话"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="证件类型" prop="certType">
              <el-select v-model="ruleForm.certType" placeholder="请选择证件类型">
                <el-option
                  v-for="item in certificateTypes"
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
        <el-form-item style="text-align: right">
          <el-button v-if="!readonly" type="primary" @click="submitForm('ruleForm')">证件校验</el-button>
          <el-button v-if="!readonly" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card :body-style="{ padding: '15px' }" class="box-card">
      <div class="card-title">{{ ruleForm1.title }}</div>
      <el-form
        ref="ruleForm1"
        :model="ruleForm1"
        :rules="rules"
        :style="{paddingRight:'10vw'}"
        class="demo-ruleForm"
        label-width="15vw"
        size="mini">
        <el-row>
          <el-form-item label="商业模式" prop="businessType">
            <el-select v-model="ruleForm1.businessType" placeholder="请选择商业模式">
              <el-option
                v-for="item in businessModels"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="readonly1"
                :readonly="readonly1"/>
            </el-select>
          </el-form-item>
        </el-row>
        <el-form-item style="text-align: center">
          <el-button v-if="!readonly1" type="primary big" @click="submitForm('ruleForm1')">提交</el-button>
          <el-button v-if="!readonly1" class="big" @click="resetForm('ruleForm1')">重置</el-button>
          <el-button v-if="readonly1" class="big" @click="closeAllTags">关闭本页</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { qryCustInfoServiceEnterprise, addEnterpriseCustService } from '@/api/clientManagement'

export default {
  name: 'OpenAccountEnterprise',
  data() {
    return {
      readonly: false,
      readonly1: true,
      title: '企业客户新增-基本信息',
      ruleForm: {
        custName: '',
        custType: '2',
        custAddr: '',
        certType: '',
        certNo: '',
        telePhone: '',
        busiLicenseCode: '',
        taxNumber: '',
        payBank: '',
        bankAccount: '',
        legalRepres: ''
      },
      certificateTypes: [{
        value: '1',
        label: '身份证'
      }, {
        value: '2',
        label: '护照'
      }, {
        value: '3',
        label: '护照'
      }],
      businessModels: [{
        value: '01',
        label: '出租卫星资源'
      }, {
        value: '02',
        label: '出租卫星资源&基带系统'
      }, {
        value: '03',
        label: '出租卫星资源&基带系统&BOSS系统'
      }, {
        value: '04',
        label: '自主运营'
      }],
      ruleForm1: {
        title: '企业客户新增-商业模式',
        businessType: ''
      },
      rules: {
        custName: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
          // { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
        ],
        custAddr: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        busiLicenseCode: [
          { required: true, message: '请输入营业执照', trigger: 'blur' }
        ],
        taxNumber: [
          { required: true, message: '请输入税号', trigger: 'blur' }
        ],
        payBank: [
          { required: true, message: '请输入开户行', trigger: 'blur' }
        ],
        bankAccount: [
          { required: true, message: '请输入开户行账号', trigger: 'blur' }
        ],
        legalRepres: [
          { required: true, message: '请输法人姓名', trigger: 'blur' }
        ],
        telePhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        certType: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        certNo: [
          { required: true, message: '请输入证件号码', trigger: 'blur' }
        ],
        businessType: [
          { required: true, message: '请选择商业模式', trigger: 'change' }
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          // 提交流程
          if (formName === 'ruleForm1') {
            this.readonly1 = true
            const data = this.ruleForm
            data.businessType = this.ruleForm1.businessType
            addEnterpriseCustService(data).then(res => {
              if (res.data.respCode === '0000') {
                this.$message({
                  type: 'success',
                  message: '企业客户添加完成。'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.respDesc
                })
              }
            })
          } else {
            // 校验流程开始
            // const certType = this.ruleForm.certType
            // const certNo = this.ruleForm.certNo
            // debugger
            qryCustInfoServiceEnterprise({ ...this.ruleForm }).then(res => {
              console.log(res)
              if (res.data.respCode === '9999') {
                // this.openMsgBox()
                this.$message({
                  type: 'success',
                  message: '校验成功，请提交客户数据。'
                })
                this.readonly = true
                this.readonly1 = false
              } else {
                this.$message({
                  type: 'success',
                  message: '客户已存在，请继续进行下一步操作。'
                })
                // this.openMsgBoxReject()
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    openMsgBox() {
      this.$alert('企业客户已存在！', '处理成功', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'success',
            message: '请继续进行下一步操作。'
          })
        }
      })
    },
    openMsgBoxReject() {
      this.$alert('校验不成功！', '校验完成', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: '请修改表单后再次校验。'
          })
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
