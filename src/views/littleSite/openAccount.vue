<template>
  <div class="newAccountWrap">
    <little-site-info ref="smallStationRef" button-title="校验" @showSmallStationName="getLitleName"/>
    <area-info ref="areaInfoRef" :area-obj="areaObj" :options-obj="optionsObj" @showAreaOpenSite="getArea"/>
    <product-info
      :product-info="productInfo"
      list-height="124"
      button-type="radio"
      @listLimitChange="handleSizeChange()"
      @listPageChange="handleCurrentChange()"
      @listProductsInfo="getListProductsInfo"/>
    <package-info
      :product-info="productMultiInfo"
      product-title="增值产品"
      list-height="160"
      button-type="checkbox"
      @listLimitChange="handleSizeChange()"
      @listPageChange="handleCurrentChange()"
      @listProductsInfoMulti="getListMultiProductsInfo"/>
    <internet-service @serviceValue="getServiceValue"/>
    <area-info
      ref="areaInfoLevelRef"
      :button-show="false"
      :area-obj="areaGradeObj"
      :options-obj="optionsLevelObj"
      @showArea="getAreaUpgrade"/>
    <el-card :body-style="{ padding: '15px', }" class="box-card">
      <div class="card-title">合同信息</div>
      <div class="contractUpload">
        <div class="contractTit">合同信息:</div>
        <el-upload
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :on-success="uploadSuccess"
          name="files"
          multiple
          action="http://47.93.63.123:8082/rest/uploadFiles"
          class="upload-demo">
          <el-button size="small" type="primary" class="el-button--primary-28">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传zip文件，且不超过500kb</div>
        </el-upload>
      </div>
    </el-card>
    <channel-info ref="channelInfoRef" @showChannel="getChannel"/>
    <el-card :body-style="{ padding: '15px', }" class="box-card">
      <div class="card-title">安装/施工信息</div>
      <el-form ref="installInfoRef" :inline="true" :rules="rules" :model="account" class="demo-form-inline">
        <el-form-item label="安装地址：" prop="">
          <el-input v-model="account.installAddr" placeholder=""/>
        </el-form-item>
        <el-form-item label="联系人：" prop="">
          <el-input v-model="account.installContact" placeholder=""/>
        </el-form-item>
        <el-form-item label="联系电话：" prop="">
          <el-input v-model="account.installPhone" placeholder=""/>
        </el-form-item>
        <el-form-item label="备注：" prop="">
          <el-input v-model="account.note" type="textarea"/>
        </el-form-item>
      </el-form>
    </el-card>
    <agreement :agreement-checked="agreementChecked" @showAgreement="toshow"/>
    <div class="contentBottom">
      <el-button :disabled="submitButtonClose" type="primary" @click="submitForm()">免填单预览</el-button>
      <el-button :disabled="submitButtonShow" type="primary" @click="showCreateSucc()">提交订单</el-button>
      <el-button>取消</el-button>
    </div>
    <choose-client :cus-choice="cusChoice" @cusShow="getCusType"/>
    <choose-enterprise :cus-id-obj="cusIdObj" @cusSearchShow="getCusTypeSearch"/>
    <choose-personal-cus :cus-id-obj="cusIdPersonalObj" @cusSearchShowPerson="getCusTypeSearchPerson"/>
    <show-order-flow-for-payment :show-order="showOrder" :new-account="newAccount" @orderClose="orderClose"/>
    <pay-successfully/>
  </div>
</template>
<script>
import ChooseClient from '@/components/componentsForLittleSite/ChooseClient'
import ChooseEnterprise from '@/components/componentsForLittleSite/chooseEnterprise'
import choosePersonalCus from '@/components/componentsForLittleSite/choosePersonalCus'
import LittleSiteInfo from '@/components/componentsForLittleSite/littleSiteInfo'
import AreaInfo from '@/components/componentsForLittleSite/areaInfoOpenSite'
import ProductInfo from '@/components/componentsForLittleSite/productInfoOpenAccount'
import PackageInfo from '@/components/componentsForLittleSite/packageInfo'
import InternetService from '@/components/componentsForLittleSite/internetService'
import Agreement from '@/components/componentsForLittleSite/agreement'
import ChannelInfo from '@/components/componentsForLittleSite/channelInfo'
import { modityOrderStatusService, regisAccount } from '@/api/newAccount'
import showOrderFlowForPayment from '@/components/modalUse/showOrderFlowForPayment'
import paySuccessfully from '@/components/modalUse/paySuccessfully'

export default {
  name: 'OpenAccount',
  components: {
    ChooseClient,
    ChooseEnterprise,
    choosePersonalCus,
    LittleSiteInfo,
    AreaInfo,
    ProductInfo,
    InternetService,
    Agreement,
    ChannelInfo,
    showOrderFlowForPayment,
    paySuccessfully,
    PackageInfo
  },
  data() {
    const checkPhone = (rule, value, callback) => {
      const regex = /^d{11}$/
      if (!(regex.test(value))) {
        return callback(new Error('请输入11位手机号码'))
      }
    }
    return {
      test: {
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
        'installAddr': '实工地址',
        'installContact': 1,
        'note': '备注',
        'certType': 1,
        'certNo': '证件号码',
        'certAddr': '证件地址',
        'contactName': '联系人',
        'contactPhoneNo': '联系人电话',
        'contactAddr': '联系人地址',
        'products': [{
          'productId': '11111',
          'productName': '产品名称',
          'productType': '产品类型',
          'productPrice': 1212,
          'propackages': [{
            'prodPackageId': '11111',
            'prodPackageName': '产品包名称',
            'prodPackageType': '产品包类型',
            'prodPackageDesc': '产品包',
            'orderDiscnt': { 'discntId': '资费ID', 'discntActionType': '资费动作类型' },
            'pkgElement': { 'pkgElementId': '11111', 'pkgElementName': '包元素名称', 'pkgElementType': '包元素类型' }
          }, {
            'prodPackageId': '33333',
            'prodPackageName': '产品包名称',
            'prodPackageType': '产品包类型',
            'prodPackageDesc': '产品包',
            'orderDiscnt': { 'discntId': '资费ID', 'discntActionType': '资费动作类型' },
            'pkgElement': { 'pkgElementId': '33333', 'pkgElementName': '包元素名称', 'pkgElementType': '包元素类型' }
          }]
        }, {
          'productId': '22222',
          'productName': '产品名称',
          'productType': '产品类型',
          'productPrice': 222222,
          'propackages': [{
            'prodPackageId': '232323',
            'prodPackageName': '产品包名称',
            'prodPackageType': '产品包类型',
            'prodPackageDesc': '产品包',
            'orderDiscnt': { 'discntId': '22222', 'discntActionType': '资费动作类型' },
            'pkgElement': { 'pkgElementId': '22222', 'pkgElementName': '包元素名称', 'pkgElementType': '包元素类型' }
          }]
        }],
        'orderAccessory': {
          'objectType': 1,
          'attachmentType': 1,
          'accessoryName': '附加测试',
          'accessoryUrl': 'http://www.baidu.com',
          'attachmentStore': '/home/user/a.xml'
        },
        'installPhone': '12143434343',
        'modemId': '10001'
      },
      account: {
        'custId': 11,
        'businessType': 1,
        'custName': '客户名称',
        'custType': 1,
        'smallStationName': '小站名称',
        'phone': 12121212121,
        'coverageRange': '0063',
        'internetModel': 1,
        'modemCount': 1,
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
      fileList: [],
      packageList: [],
      ruleForm: {
        installAddr: '',
        installContact: '',
        installPhone: '',
        note: ''
      },
      rules: {
        installPhone: [{ validator: checkPhone, trigger: 'blur' }]
      },
      checked: '',
      agreementChecked: false,
      agreementRes: false,
      areaObj: {
        title: '区域信息',
        titleLabel: '通信区域选择',
        title1: '',
        buttonShow: true,
        litleSiteMulti: true,
        showArea: true
      },
      areaGradeObj: {
        title: '服务等级（SLA）',
        titleLabel: '服务等级（SLA）',
        title1: '',
        buttonShow: false,
        litleSiteMulti: true,
        showArea: true
      },
      cusChoice: false,
      cusIdObj: {
        cusIdFind: '',
        cusIdVisible: false
      },
      cusIdPersonalObj: {
        cusIdFind: '',
        cusIdVisible: false
      },
      areaValue: '',
      channelValue: '',
      productInfo: {
        listInfo: null,
        listMultiInfo: null,
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
      radioRes: '',

      newAccount: {
        'custId': 11,
        'businessType': 1,
        'custName': '客户名称',
        'custType': 1,
        'smallStationName': '小站名称',
        'phone': 12121212121,
        'coverageRange': '0063',
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
      area: 1,
      optionsObj: [{ 'regionCode': '0063', 'regionName': '中东北非' },
        { 'regionCode': '0060', 'regionName': '亚洲、大洋洲、太平洋岛国地区、夏威夷' }],
      optionsLevelObj: [
        { 'regionCode': '1', 'regionName': 'A级' },
        { 'regionCode': '2', 'regionName': 'AA级' },
        { 'regionCode': '3', 'regionName': 'AAA级' },
        { 'regionCode': '4', 'regionName': 'AAAA级' }],
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
      showOrder: false,
      submitResult: null,
      orderStatusUpdate: {
        orderId: '',
        orderStatus: '',
        operateType: ''
      },
      submitButtonShow: true,
      submitButtonClose: true
    }
  },
  created() {
    // this.getList()
    // this.getAreaList()
  },
  mounted() {
    this.judgeCusId()
    this.$bus.$on('receiveProductInfo', (data) => {
      console.log(data)
    })
    this.$bus.$on('showProductList', data => {
      console.log('***************')
      console.log(data)
      this.product = data
      console.log(data)
    })
  },
  methods: {
    foo() {
      this.$bus.$emit('removeCurrentTag', {})
    },
    submitForm() {
      console.log('this.productObj')
      console.log(this.productObj)
      console.log('this.account.products')
      this.account.products = []
      this.account.products[0] = {}
      this.account.products[0].propackages = []
      console.log(this.account.products)

      // this.newAccount.products = this.productA
      console.log('************')
      console.log(this.account)
      this.account.products[0].productId = this.product.productId
      this.account.products[0].productName = this.product.productName
      this.account.products[0].productPrice = this.product.productPrice
      this.account.products[0].productType = this.product.productType

      const list = [this.productObj].concat(this.packageList)
      this.account.products[0].propackages = list
      console.log('this.account.products[0].propackages')
      console.log(this.account.products[0].propackages)
      console.log('this.account.products')
      console.log(this.account.products)
      // this.productCon = this.productA
      // delete this.onlyProduct.propackage
      // this.onlyProduct.propackages = this.productCon
      // console.log(this.onlyProduct)
      // console.log(this.account.products)
      // const arr = []
      // arr.push(this.onlyProduct)
      // this.account.products = arr
      // console.log(this.newAccount.products)
      // console.log(this.newAccount)
      // this.newAccount.products = this.onlyProduct.propackage
      // console.log(this.newAccount)
      // 判断基础产品和增值产品
      // console.log(this.productA)
      // console.log(this.basicProdArr)
      // console.log('rpoducntAAAAAAAAAAAAAAAaaa')
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
      if (this.account.products.length < 1) {
        this.$message.error('请选择产品信息')
        return
      }
      if (!this.account.internetModel) {
        this.$message.error('请选择上网服务类型')
        return
      }
      if (!this.account.smallStationName || !this.account.devPerson || !this.account.internetModel) {
        return
      }
      if (!this.account.custId || !this.account.custType || !this.account.custName) {
        this.$message.error('请选择客户')
        return
      }

      console.log('this.account')
      console.log(this.account)
      regisAccount(this.account).then(response => {
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
          this.submitButtonClose = true
          this.submitButtonShow = false
        }
      })
    },
    toshow(obj) {
      this.agreementChecked = obj.agreementChecked
      this.agreementRes = obj.checked
      this.submitButtonClose = false
    },
    getArea(obj) {
      console.log(obj.areaValue)
      this.account.coverageRange = obj.areaValue
      console.log(this.account.coverageRange)
    },
    getChannel(obj) {
      this.account.devPerson = obj.channelValue
    },
    getServiceValue(obj) {
      console.log('countcccccccccccccc')
      console.log(obj)
      this.account.internetModel = obj.radioRes
      this.account.modemCount = obj.modemCount
    },
    getAreaUpgrade(obj) {
      console.log(obj)
      this.account.slaLevel = obj.areaValue
    },
    emitChildValid(ref, emitId) {
      this.$refs[ref].$emit(emitId)
    },
    getLitleName(obj) {
      this.account.smallStationName = obj.smallStationName
      // this.account.smallStationName = obj.smallStationName
      console.log('small', obj)
    },
    getAreaList() {
      this.optionsObj = [
        { 'regionCode': '0063', 'regionName': '亚洲、大洋洲、太平洋岛国地区、夏威夷' },
        { 'regionCode': '0060', 'regionName': '中东北非' }]
    },
    handleSizeChange(obj) {
      this.productInfo.limit = obj.limit
      this.getList()
    },
    handleCurrentChange(obj) {
      this.productInfo.page = obj.page
      this.getList()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
          } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    uploadSuccess(response, file, fileList) {
      if (response.respCode === '0000') {
        this.account.orderAccessory.accessoryName = response.data[0].accessoryName
        this.account.orderAccessory.accessoryUrl = response.data[0].accessoryUrl
        this.account.orderAccessory.attachmentStore = response.data[0].attachmentStore
      }
    },
    judgeCusId() {
      const obj = sessionStorage.getItem('cusObj')
      if (obj === undefined || obj === 'undefined' || !obj) {
        this.cusChoice = true
        return
      }
      const cusObj = JSON.parse(obj)
      if (!cusObj.custId) {
        console.log(cusObj)
        this.cusChoice = true
      } else {
        this.account.custId = cusObj.custId
        this.account.custName = cusObj.custName
        this.account.custType = cusObj.custType
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
    showOrderClick() {
      this.showOrder = true
    },
    getListProductsInfo(obj) {
      this.productObj = obj
    },
    getListMultiProductsInfo(obj) {
      console.log('objobjobjobjobjobjobj')
      console.log(obj)
      this.packageList = obj
      // debugger
      // alert(11)
      // console.log('getListMultiProductsInfo')
      // console.log(obj)
      // let curIndex = ''
      // const arr = this.productA.filter(function(item, index) {
      //   curIndex = index
      //   return item.prodPackageId === obj.prodPackageId
      // })
      // console.log(curIndex)
      // console.log(arr)
      // if (arr.length > 0) {
      //   this.productA.splice(curIndex, 1)
      // } else {
      //   this.productA.push(obj)
      // }
      // console.log(this.productA)
    },
    orderClose(obj) {
      this.showOrder = obj.orderClose
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
    }
  }
}
</script>
<style lang="scss">
</style>
