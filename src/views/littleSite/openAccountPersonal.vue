<template>
  <div v-if="resetThisPage" class="newAccountWrap">
    <area-info ref="areaInfoRef" :area-obj="areaMultiObj" :options-obj="optionsLitleObj" @smallStation="getStationN"/>
    <product-info
      :product-info="productInfo"
      list-height="124"
      button-type="radio"
      @listLimitChange="handleSizeChange()"
      @listPageChange="handleCurrentChange()"
      @listProductsInfo="getListProductsInfo"/>
    <product-info
      :product-info="productMultiInfo"
      product-title="增值产品"
      list-height="160"
      button-type="checkbox"
      @listLimitChange="handleSizeChange()"
      @listPageChange="handleCurrentChange()"
      @listProductsInfoMulti="getListMultiProductsInfo"/>
    <area-info
      ref="areaInfoLevelRef"
      :button-show="false"
      :area-obj="areaGradeObj"
      :options-obj="optionsLevelObj"
      @showArea="getAreaUpgrade"/>
    <channel-info ref="channelInfoRef" @showChannel="getChannel" />
    <agreement :agreement-checked="agreementChecked" @showAgreement="toshow"/>
    <div class="contentBottom">
      <el-button :disabled="isDisposed" type="primary" @click="submitForm()">免填单预览</el-button>
      <el-button :disabled="isDisposedSubmit" type="primary" @click="showCreateSucc()" >提交订单</el-button>
      <el-button >取消</el-button>
    </div>
    <choose-client :cus-choice="cusChoice" @cusShow="getCusType"/>
    <choose-enterprise :cus-id-obj="cusIdObj" @cusSearchShow="getCusTypeSearch"/>
    <choose-personal-cus :cus-id-obj="cusIdPersonalObj" @cusSearchShowPerson="getCusTypeSearchPerson"/>
    <show-order-flow-for-payment :show-order="showOrder" @orderClose="orderClose"/>
    <pay-successfully/>
  </div>
</template>
<script>
import LittleSiteInfo from '@/components/componentsForLittleSite/littleSiteInfo'
import AreaInfo from '@/components/componentsForLittleSite/areaInfoPersonal'
import ProductInfo from '@/components/componentsForLittleSite/productInfo'
import InternetService from '@/components/componentsForLittleSite/internetService'
import Agreement from '@/components/componentsForLittleSite/agreement'
import ChannelInfo from '@/components/componentsForLittleSite/channelInfo'
import { modityOrderStatusService, productServiceQry, qryCustInfoListService, regisAccount } from '@/api/newAccount'
import ChooseClient from '@/components/componentsForLittleSite/ChooseClient'
import ChooseEnterprise from '@/components/componentsForLittleSite/chooseEnterprise'
import choosePersonalCus from '@/components/componentsForLittleSite/choosePersonalCus'
import showOrderFlowForPayment from '@/components/modalUse/showOrderFlowForPayment'
import paySuccessfully from '@/components/modalUse/paySuccessfully'

export default {
  name: 'OpenAccountPersonal',
  components: {
    LittleSiteInfo,
    AreaInfo,
    ProductInfo,
    InternetService,
    Agreement,
    ChannelInfo,
    ChooseClient,
    ChooseEnterprise,
    choosePersonalCus,
    showOrderFlowForPayment,
    paySuccessfully
  },
  data() {
    return {
      agreementChecked: false,
      agreementRes: false,
      areaGradeObj: {
        title: '服务等级（SLA）',
        titleLabel: '服务等级（SLA）',
        title1: '',
        buttonShow: false,
        litleSiteMulti: true,
        showArea: true
      },
      areaValue: '',
      productInfo: {
        listInfo: null,
        listMultiInfo: null,
        listInfo_name: '',
        total: 0,
        page: 2,
        limit: 10
      },
      productMultiInfo: {
        listInfo: null,
        listMultiInfo: null,
        total: 0,
        page: 2,
        limit: 10
      },
      areaMultiObj: {
        title: '小站信息',
        titleLabel: '企业名称',
        title1: '小站名称',
        buttonShow: false,
        litleSiteMulti: false
      },
      optionsObj: [],
      optionsLevelObj: [
        { 'regionCode': '1', 'regionName': 'A级' },
        { 'regionCode': '2', 'regionName': 'AA级' },
        { 'regionCode': '3', 'regionName': 'AAA级' },
        { 'regionCode': '4', 'regionName': 'AAAA级' }],
      optionsLitleObj: [],
      area: 1,
      qryLitle: {
        custType: 2,
        status: 0,
        custId: 2
      },
      newAccount: {
        'custId': 11,
        'businessType': 1,
        'custName': '客户名称',
        'custType': 1,
        'smallStationName': '小站名称',
        'phone': 12121212121,
        'coverageRange': 2,
        'internetModel': 1,
        'modemCount': 5,
        'modemName': '资源名称',
        'slaLevel': 1,
        'devPerson': '客户发展人',
        'installAddr': '',
        'installContact': '',
        'note': '',
        'certType': 1,
        'certNo': '证件号码',
        'certAddr': '证件地址',
        'contactName': '联系人',
        'contactPhoneNo': '联系人电话',
        'contactAddr': '联系人地址',
        'products': [],
        'orderAccessory': {
          'objectType': 1,
          'attachmentType': 1,
          'accessoryName': '附加测试',
          'accessoryUrl': 'http://www.baidu.com',
          'attachmentStore': '/home/user/a.xml'
        },
        'installPhone': '',
        'modemId': '10001'
      },
      productListQuery: {
        productRegion: '',
        productType: '',
        productModel: '',
        startTime: '',
        endTime: '',
        productName: '',
        productId: ''
      },
      onlyProduct: null,
      productCon: [],
      productA: [],
      basicProdArr: [],
      cusChoice: false,
      cusIdObj: {
        cusIdFind: '',
        cusIdVisible: false
      },
      cusIdPersonalObj: {
        cusIdFind: '',
        cusIdVisible: false
      },
      isDisposed: true,
      isDisposedSubmit: true,
      showOrder: false,
      submitResult: null,
      orderStatusUpdate: {
        orderId: '',
        orderStatus: '',
        operateType: ''
      },
      resetThisPage: true,
      showAgreementButton: false

    }
  },
  created() {
    // this.getList()
    // this.getAreaList()
    this.getLitleList()
  },
  mounted() {
    this.judgeCusId()
    this.$bus.$on('reloadPageListener', () => {
      this.reloadPage()
      this.productInfo = {
        listInfo: null,
        listMultiInfo: null,
        listInfo_name: '',
        total: 0,
        page: 2,
        limit: 10
      }
      this.productMultiInfo = {
        listInfo: null,
        listMultiInfo: null,
        total: 0,
        page: 2,
        limit: 10
      }
      this.isDisposedSubmit = true
      this.basicProdArr = []
      this.productA = []
      this.showAgreementButton = false
    })
  },
  methods: {
    submitForm() {
      this.productCon = this.productA
      delete this.onlyProduct.propackage
      this.onlyProduct.propackages = this.productCon

      const arr = []
      arr.push(this.onlyProduct)
      this.newAccount.products = arr

      // this.newAccount.products = this.onlyProduct.propackage
      // console.log(this.newAccount)
      this.emitChildValid('smallStationRef', 'smallStation')
      this.emitChildValid('channelInfoRef', 'channel')
      this.emitChildValid('areaInfoRef', 'area')
      this.emitChildValid('areaInfoLevelRef', 'area')
      if (!this.agreementRes) {
        this.agreementChecked = true
        return
      } else {
        this.agreementChecked = false
      }
      if (!this.newAccount.internetModel) {
        this.$message.error('请选择上网服务类型')
        return
      }
      if (!this.basicProdArr.length || this.productA.length < 2) {
        this.$message.error('请选择产品信息')
        return
      }
      if (!this.newAccount.custId || !this.newAccount.custType || !this.newAccount.custName) {
        this.$message.error('请选择客户')
        return
      }
      if (!this.newAccount.smallStationName || !this.newAccount.devPerson || !this.newAccount.internetModel) {
        return
      }
      regisAccount(this.newAccount).then(response => {
        console.log('1111aaaaaaa22222222bbbbbb')
        console.log(response.data)
        console.log(response.data.data.respCode)
        console.log(response.data.data.respCode === '0000')
        if (response.data.respCode === '0000') {
          console.log(response.data.data)
          this.$bus.$emit('passOrderData', response.data.data)
          this.submitResult = response.data.data
          console.log(this.submitResult)
          console.log(333333333333333333)
          this.showOrderClick()
          this.isDisposed = true
          this.isDisposedSubmit = false
        }
      })
    },
    toshow(obj) {
      console.log(obj)
      if (obj.checked && !this.showAgreementButton) {
        this.showAgreementButton = true
        this.isDisposed = false
      }
      this.agreementChecked = obj.agreementChecked
      this.agreementRes = obj.checked
    },
    getArea(obj) {
      this.areaValue = obj.areaValue
    },
    emitChildValid() {
      this.$refs.areaInfoRef.$emit('area')
    },
    getListProductsInfo(obj) {
      console.log(obj)
      const arr = this.productA.filter(function(obj) {
        return obj.prodPackageType === '02'
      })
      this.productA = arr
      this.productA.push(obj)
      // 方便判断基础产品
      this.basicProdArr.push(obj)
      console.log(this.productA)
    },
    getListMultiProductsInfo(obj) {
      let curIndex = ''
      const arr = this.productA.filter(function(item, index) {
        curIndex = index
        return item.prodPackageId === obj.prodPackageId
      })
      if (arr.length > 0) {
        this.productA.splice(curIndex, 1)
      } else {
        this.productA.push(obj)
      }
      console.log(this.productA)
    },
    getList() {
      this.listLoading = true
      productServiceQry(this.productListQuery).then(response => {
        const pro = response.data.data.propackage
        this.productInfo.listInfo_name = response.data.data.productName
        this.productInfo.listInfo = pro.filter(function(obj) {
          return obj.prodPackageType === '00'
        })
        console.log(this.productInfo)
        this.productMultiInfo.listInfo = pro.filter(function(obj) {
          return obj.prodPackageType === '02'
        })

        this.onlyProduct = response.data.data
        // this.productCon =
        //   console.log(response.data.data)
        // console.log(this.onlyProduct)
      })
    },
    getAreaList() {
      // this.listLoading = true
      // fetchArea(this.area).then(response => {
      //   this.optionsObj = response.data.data
      //   console.log(this.optionsObj)
      //   this.listLoading = false
      // })
    },
    getLitleList() {
      this.listLoading = true
      qryCustInfoListService(this.qryLitle).then(response => {
        this.optionsLitleObj = response.data.data.customerBOList
        this.listLoading = false
      })
    },
    getChannel(obj) {
      this.newAccount.devPerson = obj.channelValue
    },
    getServiceValue(obj) {
      this.newAccount.internetModel = obj.radioRes
      this.newAccount.modemCount = obj.modemCount
    },
    getAreaUpgrade(obj) {
      console.log(obj)
      this.newAccount.slaLevel = obj.areaValue
    },
    handleSizeChange(obj) {
      this.productInfo.limit = obj.limit
      this.getList()
    },
    handleCurrentChange(obj) {
      this.productInfo.page = obj.page
      this.getList()
    },
    getStationN(obj) {
      console.log(obj)
      console.log(obj.productRegion)
      // this.productRegion = obj.productRegion
      this.productListQuery.productRegion = obj.productRegion
      this.productListQuery.productModel = '01'
      this.newAccount.smallStationName = obj.areaValue
      // alert(this.productListQuery.productRegion)
      //  去调接口
      this.getList()
    },
    judgeCusId() {
      const obj = sessionStorage.getItem('cusObj')
      if (obj === undefined || obj === 'undefined' || !obj) {
        this.cusChoice = true
        return
      }
      const cusObj = JSON.parse(obj)
      if (!cusObj.custId) {
        this.cusChoice = true
      } else {
        this.newAccount.custId = cusObj.custId
        this.newAccount.custType = cusObj.custType
        this.newAccount.custName = cusObj.custName
      }
    },
    getCusType(obj) {
      if (obj.result === '个人客户选择') {
        this.cusChoice = obj.cusChoice
        this.cusIdPersonalObj.cusIdVisible = true
        this.cusIdPersonalObj.cusIdFind = obj.result
      } else {
        this.cusChoice = obj.cusChoice
        this.cusIdObj.cusIdFind = obj.result
        this.cusIdObj.cusIdVisible = true
      }
    },
    getCusTypeSearch(obj) {
      this.cusIdObj.cusIdVisible = obj.cusChoice
    },
    getCusTypeSearchPerson(obj) {
      this.cusIdPersonalObj.cusIdVisible = obj.cusChoice
    },
    orderClose(obj) {
      this.showOrder = obj.orderClose
    },
    showOrderClick() {
      this.showOrder = true
    },
    showCreateSucc() {
      this.orderStatusUpdate.orderId = this.submitResult.orderId
      this.orderStatusUpdate.orderStatus = 0
      this.orderStatusUpdate.operateType = 1
      this.orderStatusUpdate.orderProcStatus = 12

      modityOrderStatusService(this.orderStatusUpdate).then(response => {
        console.log(response)
        console.log(888888888888888888888888)
        console.log(response.data.respCode === '0000')
        console.log(response.data.respCode)
        if (response.data.respCode === '0000') {
          this.$bus.$emit('hideDetailListen', true)
          this.$bus.$emit('hideDetailListenData', this.submitResult)
        } else {
          this.$message.error('订单修改失败')
        }
      })
    },
    reloadPage() {
      this.resetThisPage = false
      this.$nextTick(() => {
        this.resetThisPage = true
      })
    }

  }
}
</script>
<style lang="scss">
</style>
