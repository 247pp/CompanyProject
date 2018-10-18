<template>
  <div class="openOrderHandleWrapForOrderUpdate">
    <el-card class="box-card detail1" style="">
      <!--<div>客户信息</div>-->
      <div class="card-title">基本信息</div>
      <!--业务信息-->
      <!--</div>-->
      <el-row>
        <el-col :span="3" class="text item right"><span class="title">客户名称:</span>
        </el-col>
        <el-col :span="4" class="text item">{{ detail.custName }}</el-col>
        <el-col :span="3" class="text item right"><span class="title">客户类型:</span>
        </el-col>
        <el-col :span="4" class="text item">{{ detail.custType }}</el-col>
        <el-col :span="3" class="text item right"><span class="title">联系人:</span>
        </el-col>
        <el-col :span="4" class="text item">{{ '' }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="3" class="text item right"><span class="title">联系方式:</span>
        </el-col>
        <el-col :span="4" class="text item">{{ '' }}</el-col>
        <el-col :span="3" class="text item right"><span class="title">小站名称:</span>
        </el-col>
        <el-col :span="4" class="text item">{{ '' }}</el-col>
        <el-col :span="3" class="text item right"><span class="title">小站类型:</span>
        </el-col>
        <el-col :span="4" class="text item">{{ '' }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="3" class="text item right"><span class="title">小站覆盖区域:</span>
        </el-col>
        <el-col :span="4" class="text item">{{ '' }}</el-col>
        <el-col :span="3" class="text item right"><span class="title">增值产品:</span>
        </el-col>
        <el-col :span="4" class="text item">{{ '' }}</el-col>
        <el-col :span="3" class="text item right"><span class="title">上网服务:</span>
        </el-col>
        <el-col :span="4" class="text item">{{ '' }}</el-col>
      </el-row>
    </el-card>
    <el-form ref="orderTotalInfoRef" :inline="true" :rules="rules" :model="resourceInfo" class="demo-form-inline">
      <el-card :body-style="{ padding: '15px', }" class="box-card inputInfo">
        <div class="card-title">集成商信息</div>
        <el-form-item label="集成商名称：" prop="integratorName">
          <el-input v-model="resourceInfo.integratorName" placeholder=""/>
        </el-form-item>
        <el-form-item label="联系人：" prop="contactName">
          <el-input v-model="resourceInfo.contactName" placeholder=""/>
        </el-form-item>
        <el-form-item label="联系方式：" prop="contactPhone">
          <el-input v-model="resourceInfo.contactPhone" placeholder=""/>
        </el-form-item>
        <el-form-item label="通讯地址：" prop="contactAddr">
          <el-input v-model="resourceInfo.contactAddr"/>
        </el-form-item>
        <!--</el-form>-->
      </el-card>
      <el-card :body-style="{ padding: '15px', }" class="box-card inputInfo">
        <div class="card-title">资源信息</div>
        <!--<el-form ref="installInfoRef" :inline="true" :rules="rules" :model="resourceInfo" class="demo-form-inline">-->
        <el-form-item label="Modem厂家：" prop="modemFactory">
          <el-input v-model="resourceInfo.modemFactory" placeholder=""/>
        </el-form-item>
        <el-form-item label="Modem型号：" prop="modemModel">
          <el-input v-model="resourceInfo.modemModel" placeholder=""/>
        </el-form-item>
        <el-form-item label="Modem数量：" prop="modemCount">
          <el-input v-model="resourceInfo.modemCount"/>
        </el-form-item>
        <el-form-item label="天线厂家：" prop="antennaManu">
          <el-input v-model="resourceInfo.antennaManu" placeholder=""/>
        </el-form-item>
        <el-form-item label="天线型号：" prop="antennaModel">
          <el-input v-model="resourceInfo.antennaModel" placeholder=""/>
        </el-form-item>
        <el-form-item label="天线口径：" prop="antennaAperture">
          <el-input v-model="resourceInfo.antennaAperture" placeholder=""/>
        </el-form-item>
        <el-form-item label="管理IP段：" prop="managerIp">
          <el-input v-model="resourceInfo.managerIp" placeholder=""/>
        </el-form-item>
        <el-form-item label="业务IP段：" prop="busiIp">
          <el-input v-model="resourceInfo.busiIp" placeholder=""/>
        </el-form-item>
        <el-form-item label="卫星IP段：" prop="satelliteIp">
          <el-input v-model="resourceInfo.satelliteIp"/>
        </el-form-item>
        <el-form-item label="入网模式：" prop="internetModel">
          <el-input v-model="resourceInfo.internetModel" placeholder=""/>
        </el-form-item>
        <el-form-item label="帐号名称：" prop="accountName">
          <el-input v-model="resourceInfo.accountName" placeholder=""/>
        </el-form-item>
        <el-form-item label="帐号密码：" prop="accountPassword">
          <el-input v-model="resourceInfo.accountPassword" placeholder=""/>
        </el-form-item>
      </el-card>
      <!--</el-form>-->
      <el-card :body-style="{ padding: '15px', }" class="box-card inputInfo">
        <div class="card-title">Qos信息</div>
        <!--<el-form ref="installInfoRef" :inline="true" :rules="rules" :model="resourceInfo" class="demo-form-inline">-->
        <el-form-item label="MIR：" prop="mir">
          <el-input v-model="resourceInfo.mir" placeholder=""/>
        </el-form-item>
        <el-form-item label="CIR：" prop="cir">
          <el-input v-model="resourceInfo.cir" placeholder=""/>
        </el-form-item>
      </el-card>
    </el-form>
    <el-card :body-style="{ padding: '15px', }" class="box-card tableOne">
      <div class="card-title">卫星信息</div>
      <div class="addDeletewrap">
        <div style="text-align: right;padding: 0 0 10px 0;"/>
        <el-form
          ref="installInfoRef"
          :inline="true"
          :rules="rules"
          :model="resourceInfo"
          class="demo-form-inline sateInfoInput">
          <el-form-item label="卫星名称：" prop="">
            <el-input v-model="addObj.statelliteName" placeholder=""/>
          </el-form-item>
          <el-form-item label="卫星轨迹：" prop="">
            <el-input v-model="addObj.statelliteRails" placeholder=""/>
          </el-form-item>
          <el-form-item label="卫星频段：" prop="">
            <el-input v-model="addObj.statelliteFreq" placeholder=""/>
          </el-form-item>
          <el-button type="primary" class="addBtn" @click="addSatelliteBtn">新增</el-button>
          <el-button type="primary" class="deleteBtn" @click="reduce">删除</el-button>
        </el-form>
        <div/>
      </div>
      <el-table
        :data="productInfo.listInfo"
        :height="listHeight"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          fixed
          type="index"
          prop=""
          label="序号"/>
        <el-table-column
          prop="statelliteName"
          label="卫星名称"/>
        <el-table-column
          prop="statelliteRails"
          label="卫星轨迹"/>
        <el-table-column
          prop="statelliteFreq"
          label="卫星频段"/>
        <!--<el-table-column-->
        <!--width="150px"-->
        <!--prop="time"-->
        <!--label="创建时间"/>-->
        <el-table-column
          type="selection"
          width="55"/>
      </el-table>
      <div class="orderButtonWrap">
        <el-button type="primary" @click="submitBtn">提交</el-button>
        <el-button type="primary" @click="goOrderSearch()">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addJobOpenService } from '@/api/newAccount'

export default {
  name: 'OpenOrderHandle',
  data() {
    return {
      rules: {
        modemFactory: [{ required: true, message: '请输入Modem厂家', trigger: '' }],
        integratorName: [{ required: true, message: '请输入集成商名称', trigger: '' }],
        contactAddr: [{ required: true, message: '请输入通信地址', trigger: '' }],
        contactName: [{ required: true, message: '请输入联系人', trigger: '' }],
        contactPhone: [{ required: true, message: '请输入联系方式', trigger: '' }],
        smallStationLogo: [{ required: true, message: '请输入小站名称', trigger: '' }],
        smallStationType: [{ required: true, message: '请输入小站类型', trigger: '' }],
        antennaManu: [{ required: true, message: '请输入天线生产厂家', trigger: '' }],
        antennaModel: [{ required: true, message: '请输入天线型号', trigger: '' }],
        antennaAperture: [{ required: true, message: '请输入天线口径', trigger: '' }],
        modemModel: [{ required: true, message: '请输入Modem型号', trigger: '' }],
        modemCount: [{ required: true, message: '请输入Modem数量', trigger: '' }],
        managerIp: [{ required: true, message: '请输入管理IP段', trigger: '' }],
        busiIp: [{ required: true, message: '请输入业务IP段', trigger: '' }],
        satelliteIp: [{ required: true, message: '请输入卫星IP段', trigger: '' }],
        mir: [{ required: true, message: '请输入MIR', trigger: '' }],
        cir: [{ required: true, message: '请输入CIR', trigger: '' }],
        accountName: [{ required: true, message: '请输入帐号名称', trigger: '' }],
        accountPassword: [{ required: true, message: '请输入帐号密码', trigger: '' }],
        internetModel: [{ required: true, message: '请输入入网模式', trigger: '' }]
      },
      productInfo: {
        listInfo: [],
        total: 0,
        page: 1,
        limit: 10,
        listInfo_name: ''
      },
      addObj: {
        statelliteName: '',
        statelliteRails: '',
        statelliteFreq: ''
      },
      listHeight: '200px',
      resourceInfo: {
        jobId: '',
        openBusi: '23242',
        openCommod: '234234',
        commodStatus: 'ewrwer',
        integratorName: '',
        contactAddr: '',
        contactName: '',
        contactPhone: '',
        smallStationLogo: '333',
        smallStationType: '333',
        country: 'China',
        antennaManu: '',
        antennaModel: '',
        antennaAperture: '',
        modemFactory: '',
        modemModel: '',
        modemCount: '',
        managerIp: '',
        busiIp: '',
        satelliteIp: '',
        mir: '',
        cir: '',
        note: '',
        resName: 'efwf',
        resMark: 'wefwef',
        accountName: '',
        accountPassword: '',
        internetModel: '',
        addJobOpenStatellites: []
      },
      resourceRules: {
        installPhone: [{ validator: '', trigger: 'change' }]
      },
      reduceListInfo: null,
      detail: {
        row: {}
      }

    }
  },
  mounted() {
    this.$bus.$on('showDetailJobOrderGoto', (data) => {
      console.log(data)
      console.log('orderorderorderorderorderorderorderorderorderorderorder')
      console.log(data)
      this.detail = this.$store.state.orderDetail
      console.log(this.detail.custName)
      // console.log(this.detail.row)
    })
    this.detail = JSON.parse(sessionStorage.getItem('orderDetail'))
    console.log(this.detail.custType)
  },
  methods: {
    handleSizeChange() {
      console.log()
    },
    handleCurrentChange() {
    },
    addSatelliteBtn() {
      if (this.addObj.statelliteName && this.addObj.statelliteRails && this.addObj.statelliteFreq) {
        console.log(this.addObj)
        console.log(this.addObj.statelliteName)
        console.log(this.addObj)
        console.log(this.addObj)
        const obj = {
          statelliteName: this.addObj.statelliteName,
          statelliteRails: this.addObj.statelliteRails,
          statelliteFreq: this.addObj.statelliteFreq
        }
        this.addObj.time = '111111111111'
        this.productInfo.listInfo.push(obj)
        console.log(this.productInfo)
        this.addObj.statelliteName = ''
        this.addObj.statelliteRails = ''
        this.addObj.statelliteFreq = ''
      } else {
        this.$message.error('新增信息不完整')
        return
      }
    },
    submitBtn() {
      this.resourceInfo.addJobOpenStatellites = this.productInfo.listInfo
      this.$refs['orderTotalInfoRef'].validate((valid) => {
        if (valid) {
          this.submitHandle()
        }
      })
    },
    submitHandle() {
      if (this.resourceInfo.addJobOpenStatellites.length < 1) {
        this.$message.error('请添加卫星信息')
        return
      }
      this.resourceInfo.custId = this.detail.custId
      this.resourceInfo.custName = this.detail.custName
      this.resourceInfo.custType = this.detail.custType
      this.resourceInfo.jobId = this.detail.jobId
      this.resourceInfo.jobStatus = this.detail.jobStatus
      this.resourceInfo.orderId = this.detail.orderId
      this.resourceInfo.userId = this.detail.userId
      this.resourceInfo.modemCount = Number(this.resourceInfo.modemCount)
      addJobOpenService(this.resourceInfo).then(response => {
        console.log('1111aaaaaaa22222222bbbbbb')
        console.log(response.data)
        if (response.data.respCode === '0000') {
          console.log(response.data.respCode)
          this.$message.success('提交成功')
          this.$bus.$jump(4, 'openWorkOrder/orderSearchOpen')
        }
      })
    },
    handleSelectionChange(a, b, c) {
      this.reduceListInfo = a
    },
    reduce() {
      const pro = this.productInfo.listInfo
      for (let i = pro.length - 1; i >= 0; i--) {
        const item = pro[i]
        const n = this.reduceListInfo.filter(function(n, index) {
          return (item.statelliteName === n.statelliteName && item.statelliteRails === n.statelliteRails && item.statelliteFreq === n.statelliteFreq)
        })
        console.log(n)
        if (n.length) {
          this.productInfo.listInfo.splice(i, 1)
        }
      }
    },
    goOrderSearch() {
      this.$bus.$jump(4, 'openWorkOrder/orderSearchOpen')
    }
  }
}
</script>

<style lang="scss" scoped>
  .orderButtonWrap {
    text-align: center;
    padding-top: 20px;
  }

  .sateInfoInput {
    pading: 15px 0
  }

  .addTips {
    font-size: 14px !important;
    line-height: 39px;
    margin: 0 50px;
    font-weight: 400;
    display: block;
  }

</style>
<style lang="scss">
  .openOrderHandleWrapForOrderUpdate {
    .addDeletewrap {
      padding: 0 0 10px 0;
      .el-button {
        min-width: 80px;
        height: 25px;
      }
    }
    .el-card.inputInfo {
      .el-form-item__label {
        width: 120px !important;
      }
    }
    .el-card.is-always-shadow {
      /*padding: 32px 0px 0px !important;*/
    }
    .el-button--medium.addBtn {
      margin: 3px 0;
    }
    .el-button--medium.deleteBtn {
      float: right;
      margin: 3px 0;
    }
    .addDeletewrap .el-form-item {
      margin-bottom: 0px;
    }
  }

</style>
