<template>
  <div class="newAccountWrap">

    <little-site-info button-title="查询" list-height="160" @showSmallStationName="getLitleName"/>

    <!--<area-info :show="Show" :area-obj="areaObj" :options-obj="optionsObj"    @showArea="getArea"/>-->
    <template>
      <el-card :body-style="{ padding: '15px', }" class="box-card">
        <div class="card-title">{{ areaObj.title }}</div>
        <el-form
          :inline="true"
          class="demo-form-inline areaSelectInfo">
          <el-row>
            <el-col>
              <el-form-item v-if="areaObj.showArea" :label="areaObj.titleLabel+'：'" prop="channelInfo">
                <el-input v-model="coverageRange" disabled placeholder=""/>
              </el-form-item>
              <el-form-item v-if="areaObj.buttonShow">
                <el-button class="el-button--primary-28" type="primary" @click="chengeLitle_service">变更区域
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </el-card>
    </template>
    <!--添加按钮-->

    <template>
      <div class="operation">
        <el-button type="primary" @click="add0">变更</el-button>
      </div>
    </template>
    <product-info
      :product-info="productInfo_current"
      list-height="124"
      button-type="radio"
      @listProductsInfo="getListProductsInfo_01"/>
    <!--添加按钮-->
    <template>
      <div class="operation">
        <el-button type="primary" @click="add1">新 增</el-button>
        <el-button @click="delete1">删 除</el-button>
      </div>
    </template>
    <product-info
      :product-info="productMultiInfo_current"
      product-title="增值产品"
      list-height="160"
      button-type="checkbox"

      @listProductsInfoMulti="getListMultiProductsInfo_01"/>

    <internet-service @serviceValue="getServiceValue"/>
    <area-info :button-show="false" :area-obj="areaGradeObj" :options-obj="optionsObjGrade" @showArea="getAreaUpgrade"/>
    <agreement :agreement-checked="agreementChecked" @showAgreement="toshow"/>
    <div class="contentBottom">
      <!--<el-button type="primary">免填单预览</el-button>-->
      <el-button :disabled="submitButtonShow" type="primary" @click="submitForm()">确认变更</el-button>
      <el-button>取消</el-button>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      class="dialog_val">
      <span slot="title" style="color:#fff;text-align: left">
        <span>产品信息变更</span>
      </span>
      <area-info-change-area
        :change-area="true"
        :area-obj="areaObj"
        :show="Show_val"
        :options-obj="optionsObj"
        @showArea="getChangeArea"/>

      <product-info
        :product-info="productInfo_current_toAdd_change_area"
        list-height="124"
        button-type="radio"
        @listProductsInfo="getListProductsInfo"
      />

      <product-info
        :product-info="productMultiInfo_current_toAdd_change_area"
        product-title="增值产品"
        list-height="160"
        button-type="checkbox"
        @listProductsInfoMulti="getListMultiProductsInfo"/>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="ok" type="primary" @click="changeAreaChooseProducts">确 定1</el-button>
        <el-button v-if="!ok" type="primary" @click="returnCusSearch_val">确 定 2</el-button>
        <el-button @click="handleClose(1)">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 主产品 -->
    <el-dialog
      :visible.sync="dialogProductVisible"
      :before-close="handleClose"
      class="dialog_val">
      <span slot="title" style="color:#fff;text-align: left">
        <span>产品信息变更</span>
      </span>
      <product-info
        :product-info="productInfo"
        list-height="124"
        button-type="radio"
        @listProductsInfo="getListProductsInfo"
      />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="returnCusSearch_val">确 定 1</el-button>
        <el-button @click="handleClose(2)">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 增值产品包 新增 -->
    <el-dialog
      :visible.sync="dialogProductPackageVisible"
      :before-close="handleClose"
      class="dialog_val">
      <span slot="title" style="color:#fff;text-align: left">
        <span>产品信息变更</span>
      </span>
      <product-info
        :product-info="productMultiInfo_current_toAdd"
        product-title="增值产品"
        list-height="160"
        button-type="checkbox"
        @listProductsInfoMulti="getListMultiProductsInfo"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="returnCusSearch">确 定</el-button>
        <!--<el-button v-if="!ok" type="primary" @click="returnCusSearch_val">确 定 1</el-button>-->
        <el-button @click="handleClose(3)">取 消</el-button>
      </span>
    </el-dialog>
    <pay-successfully/>
  </div>
</template>
<script>
import LittleSiteInfo from '@/components/componentsForLittleSite/littleSiteInfoChang'
import AreaInfo from '@/components/componentsForLittleSite/areaInfoChange'
import AreaInfoChangeArea from '@/components/componentsForLittleSite/areaInfoChangeArea'

import ProductInfo from '@/components/componentsForLittleSite/productIn'
// import PackageInfo from '@/components/componentsForLittleSite/packageInfo'
// import channelInfoService from '@/components/componentsForLittleSite/channelInfoService'
import InternetService from '@/components/componentsForLittleSite/internetService'
import Agreement from '@/components/componentsForLittleSite/agreement'
import paySuccessfully from '@/components/modalUse/paySuccessfullyChange'

import {
  productServiceQryServices,
  stationPerChangeServiceModify,
  fetchList,
  productServiceQry
} from '@/api/newAccount'

export default {
  name: 'ChangeService',
  components: {
    LittleSiteInfo,
    AreaInfo,
    ProductInfo,
    AreaInfoChangeArea,
    InternetService,
    Agreement,
    paySuccessfully
  },
  data() {
    return {
      t: [{
        'productId': 'PR_0001',
        'productName': '卫星宽带',
        'productType': '01',
        'productPrice': 10000,
        'propackages': [{
          'respCode': null,
          'respDesc': null,
          'prodPackageId': 'PK_0036',
          'prodPackageName': 'VOIP电话产品',
          'prodPackageType': '02',
          'prodPackageDesc': 'IP电话/1000元/月',
          'pkgElement': {
            'respCode': null,
            'respDesc': null,
            'pkgElementId': 'PE_0036',
            'pkgElementName': '1元/分钟',
            'pkgElementType': '1'
          },
          'selected': false,
          'has': true
        }, {
          'respCode': null,
          'respDesc': null,
          'prodPackageId': 'PK_0037',
          'prodPackageName': '视频会议产品',
          'prodPackageType': '02',
          'prodPackageDesc': '视频会议/1000元/月',
          'pkgElement': {
            'respCode': null,
            'respDesc': null,
            'pkgElementId': 'PE_0037',
            'pkgElementName': '1200/月',
            'pkgElementType': '1'
          },
          'selected': false,
          'has': true
        }, {
          'respCode': null,
          'respDesc': null,
          'prodPackageId': 'PK_0002',
          'prodPackageName': '包频段1GHz',
          'prodPackageType': '00',
          'prodPackageDesc': '包频段1GHz',
          'pkgElement': {
            'respCode': null,
            'respDesc': null,
            'pkgElementId': 'PE_0002',
            'pkgElementName': '1000万/年',
            'pkgElementType': '1'
          }
        }]
      }],
      s: [{
        'productId': 'PR_0001',
        'productName': '卫星宽带',
        'productType': '01',
        'productPrice': 10000,
        'propackages': [{
          'userSubscribePackageId': 992,
          'prodPackageId': 'PK_0011',
          'prodPackageName': '视频监控产品',
          'prodPackageType': '02',
          'prodPackageDesc': '视频监控',
          'pkgElement': { 'pkgElementId': 'PE_0011', 'pkgElementName': '1万/月', 'pkgElementType': '1' }
        }, {
          'userSubscribePackageId': 993,
          'prodPackageId': 'PK_0036',
          'prodPackageName': 'VOIP电话产品',
          'prodPackageType': '02',
          'prodPackageDesc': 'IP电话/1000元/月',
          'pkgElement': { 'pkgElementId': 'PE_0036', 'pkgElementName': '1元/分钟', 'pkgElementType': '1' },
          'unDel': true
        }, {
          'userSubscribePackageId': 994,
          'prodPackageId': 'PK_0037',
          'prodPackageName': '视频会议产品',
          'prodPackageType': '02',
          'prodPackageDesc': '视频会议/1000元/月',
          'pkgElement': { 'pkgElementId': 'PE_0037', 'pkgElementName': '1200/月', 'pkgElementType': '1' },
          'unDel': true
        }, {
          'userSubscribePackageId': 991,
          'prodPackageId': 'PK_0002',
          'prodPackageName': '包频段1GHz',
          'prodPackageType': '00',
          'prodPackageDesc': '包频段1GHz',
          'pkgElement': { 'pkgElementId': 'PE_0002', 'pkgElementName': '1000万/年', 'pkgElementType': '1' }
        }]
      }],
      areaChanged: false,
      coverageRangeCodeOrigin: null,
      coverageRangeCodeCurrent: null,
      userId: null,
      productResObj: {}, // 全量产品
      productInfo_current: {
        listInfo: [], // 当前产品包
        listMultiInfo: null,
        total: 0,
        page: 2,
        limit: 10,
        listInfo_name: ''
      },
      productInfo_current_origin: {
        listInfo: [], // 当前产品包原始值
        listMultiInfo: null,
        total: 0,
        page: 2,
        limit: 10,
        listInfo_name: ''
      },
      productMultiInfo_current: {
        listInfo: [], // 当前增值包
        listMultiInfo: null,
        total: 0,
        page: 2,
        limit: 10
      },
      productMultiInfo_current_origin: {
        listInfo: [], // 当前增值包的原始值
        listMultiInfo: null,
        total: 0,
        page: 2,
        limit: 10
      },

      productMultiInfo_current_toAdd: {
        listInfo: [], // 可供添加的增值包
        listMultiInfo: null,
        total: 0,
        page: 2,
        limit: 10
      },

      productMultiInfo_current_toAdd_change_area: {
        listInfo: [], // 可供添加的增值包(变更区域)
        listMultiInfo: null,
        total: 0,
        page: 2,
        limit: 10
      },

      productInfo_current_toAdd_change_area: {
        listInfo: [], // 可供添加的产品包(变更区域)
        listMultiInfo: null,
        total: 0,
        page: 2,
        limit: 10
      },

      productMultiInfo_current_added: {
        listInfo: [], // 已添加的增值包
        listMultiInfo: null,
        total: 0,
        page: 2,
        limit: 10
      },

      productMultiInfo_current_deleted: {
        listInfo: [], // 已删除增值包
        listMultiInfo: [],
        total: 0,
        page: 2,
        limit: 10
      },

      productInfo: {
        listInfo: [], // 全量产品包
        listMultiInfo: null,
        total: 0,
        page: 2,
        limit: 10,
        listInfo_name: ''
      },
      productMultiInfo: {
        listInfo: [], // 全量增值包
        listMultiInfo: null,
        total: 0,
        page: 2,
        limit: 10
      },

      // poject_01: {},
      // project_02: [],
      // project_03: [],
      // productA: [],
      // productB: [],
      // productAB: [],
      // productBB: [],
      // addA: [],
      // addB: [],
      Show: true,
      coverageRange: '',
      Show_val: false,
      ok: true,
      fileList: [],
      dialogVisible: false,
      dialogProductVisible: false,
      dialogProductPackageVisible: false,
      ruleFormPer: {
        channelInfo: ''
      },

      rulesPer: {
        channelInfo: [
          { required: true, message: '请输入发展人', trigger: '' }
        ]
      },
      ruleForm: {
        address: '',
        person: '',
        mobile: '',
        desc: ''
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

      submitButtonShow: true,
      optionsObj: [{ 'regionCode': '0063', 'regionName': '中东北非' },
        { 'regionCode': '0060', 'regionName': '亚洲、大洋洲、太平洋岛国地区、夏威夷' }],
      // optionsObjs
      optionsObjGrade: [
        { 'regionCode': '1', 'regionName': 'A级' },
        { 'regionCode': '2', 'regionName': 'AA级' },
        { 'regionCode': '3', 'regionName': 'AAA级' },
        { 'regionCode': '4', 'regionName': 'AAAA级' }],
      newChange: {
        userId: 174,
        custId: 11,
        businessType: 1,
        custName: '客户名称',
        custType: 1,
        smallStationName: '小站名称',
        phone: 12121212121,
        coverageRange: 2,
        internetModel: 1,
        modemCount: 5,
        modemName: '资源名称',
        slaLevel: 1,
        devPerson: '客户发展人',
        installAddr: '实工地址',
        installContact: 1,
        note: '备注',
        certType: 1,
        certNo: '证件号码',
        certAddr: '证件地址',
        contactName: '联系人',
        contactPhoneNo: '联系人电话',
        contactAddr: '联系人地址',
        productUnSubScribes: [{
          'productId': '11111',
          'productName': '产品名称',
          'productType': '产品类型',
          'productPrice': 1212,
          'propackages': [{
            'prodPackageId': '11111',
            'prodPackageName': '产品包名称',
            'prodPackageType': '产品包类型',
            'prodPackageDesc': '产品包',
            'pkgElement': {
              'pkgElementId': '11111',
              'pkgElementName': '包元素名称',
              'pkgElementType': '包元素类型'
            }
          }, {
            'prodPackageId': '33333',
            'prodPackageName': '产品包名称',
            'prodPackageType': '产品包类型',
            'prodPackageDesc': '产品包',
            'pkgElement': {
              'pkgElementId': '33333',
              'pkgElementName': '包元素名称',
              'pkgElementType': '包元素类型'
            }
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
            'pkgElement': {
              'pkgElementId': '22222',
              'pkgElementName': '包元素名称',
              'pkgElementType': '包元素类型'
            }
          }]
        }],
        productSubScribes: [{
          'productId': '3333333',
          'productName': '产品名称',
          'productType': '产品类型',
          'productPrice': 1212,
          'propackages': [{
            'prodPackageId': '33311',
            'prodPackageName': '产品包名称',
            'prodPackageType': '产品包类型',
            'prodPackageDesc': '产品包',
            'pkgElement': {
              'pkgElementId': '11111',
              'pkgElementName': '包元素名称',
              'pkgElementType': '包元素类型'
            }
          }, {
            'prodPackageId': '33322',
            'prodPackageName': '产品包名称',
            'prodPackageType': '产品包类型',
            'prodPackageDesc': '产品包',
            'pkgElement': {
              'pkgElementId': '888888',
              'pkgElementName': '包元素名称',
              'pkgElementType': '包元素类型'
            }
          }]
        }, {
          'productId': '4444444',
          'productName': '产品名称',
          'productType': '产品类型',
          'productPrice': 222222,
          'propackages': [{
            'prodPackageId': '44111',
            'prodPackageName': '产品包名称',
            'prodPackageType': '产品包类型',
            'prodPackageDesc': '产品包',
            'pkgElement': {
              'pkgElementId': '22777222',
              'pkgElementName': '包元素名称',
              'pkgElementType': '包元素类型'
            }
          }]
        }],
        orderAccessory: {
          'objectType': 1,
          'attachmentType': 1,
          'accessoryName': '附加测试',
          'accessoryUrl': 'http://www.baidu.com',
          'attachmentStore': '/home/user/a.xml'
        },
        installPhone: 12143434343,
        modemId: 10001
      }
    }
  },
  created() {
    // this.getList()
  },
  mounted() {
    // this.$bus.$on('showProductList_con', data => {
    //   this.Show_val = false
    //   this.dialogVisible = true
    // })

    // 获取小站
    this.$bus.$on('selectLittleSite', data => {
      console.log('xiaohong', data)
      console.log('xiaohong', data.userId)
      this.userId = data.userId
      this.newChange.accoutId = data.accoutId
      this.newChange.coverageRange = data.coverageRange
      this.newChange.createTime = data.createTime
      this.newChange.custId = data.custId
      this.newChange.devPerson = data.devPerson
      this.newChange.phone = data.phone
      this.newChange.slaMess = data.slaMess
      this.newChange.smallStationLogo = data.smallStationLogo
      this.newChange.smallStationName = data.smallStationName
      this.newChange.status = data.status
      this.newChange.updateTime = data.updateTime
      this.newChange.userId = data.userId
      this.newChange.userLevel = data.userLevel
      this.newChange.userName = data.userName
      this.newChange.userType = data.userType
      this.getProductList(data.coverageRange)
      this.coverageRangeCodeOrigin = data.coverageRange
      this.coverageRangeCodeCurrent = data.coverageRange
      this.coverageRange = data.coverageRange === '0063' ? this.optionsObj[0].regionName : this.optionsObj[1].regionName
      this.getLists(data.userId)

    })

    // 获取产品
    // this.$bus.$on('showProductList', data => {
    //
    // })
  },
  methods: {
    // 获取产品
    getProductList(productRegion) {
      console.log(3331110000000)
      const data = {}
      // data.userType = JSON.parse(sessionStorage.getItem('cusObj')).custType
      // data.custId = JSON.parse(sessionStorage.getItem('cusObj')).custId
      data.productRegion = productRegion
      data.productModel = '02'
      this.listLoading = true

      productServiceQry({ ...data }).then(response => {
        this.productResObj = response.data.data
        // this.$bus.$emit('showProductList', response.data.data)
        const pro = this.productResObj.propackage
        this.productInfo.listInfo_name = data.productName
        this.productInfo.listInfo = pro.filter(function(obj) {
          return obj.prodPackageType === '00'
        })

        this.productMultiInfo.listInfo = pro.filter(function(obj) {
          return obj.prodPackageType === '02'
        })

        this.listLoading = false
      })
    },
    chengeLitle_service() {
      this.ok = true
      // this.productInfo.listInfo_name = ''
      // this.productInfo.listInfo = []
      // this.productMultiInfo.listInfo = []
      // this.productA = []
      // this.productB = []
      this.Show_val = false
      this.dialogVisible = true
    },
    getLists(userId) {
      this.listLoading = true
      productServiceQryServices({ userId: userId }).then(response => {
        const pro = response.data.data.prodPackage
        this.project_02 = pro
        if (response.data.respDesc == '用户不存在订购实例') {
          this.$message({
            message: '用户不存在订购实例',
            type: 'success'
          })
          return
        } else {
          this.productInfo_current.listInfo_name = response.data.data.productName
          const listInfo = pro.filter(function(obj) {
            // obj.selected = false
            return obj.prodPackageType === '00'
          })

          const productMultiInfo = pro.filter(function(obj) {
            // obj.selected = false
            return obj.prodPackageType === '02'
          })
          // this.productB =  listInfo;
          // this.productA =  productMultiInfo;
          // console.log(this.productA, this.productB)
          this.productInfo_current.listInfo = listInfo
          this.productInfo_current_origin.listInfo = JSON.parse(JSON.stringify(listInfo))
          this.productMultiInfo_current.listInfo = productMultiInfo
          this.productMultiInfo_current_origin.listInfo = JSON.parse(JSON.stringify(productMultiInfo))

          const arr1 = this.productMultiInfo_current.listInfo
          const arr2 = this.productMultiInfo.listInfo

          console.log('arr1')
          console.log(arr1)
          console.log('arr2')
          console.log(arr2)
          for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
              if (arr1[i].prodPackageId === arr2[j].prodPackageId) {
                arr2[j].del = true
              }
            }
          }

          console.log('finalarr2')
          console.log(arr2)

          var arrFinish = []
          for (let i = 0; i < arr2.length; i++) {
            if (!arr2[i].del) {
              arrFinish.push(arr2[i])
            }
          }
          this.productMultiInfo_current_toAdd.listInfo = arrFinish
        }
      })
    },
    add0() {
      this.dialogProductVisible = true
      this.Show_val = true
      this.ok = false
      console.log('tianjia0', this.productB)
      this.addB = this.productB
      this.addA = this.productA
    },
    add1() {
      this.dialogProductPackageVisible = true
      // this.Show_val = true
      // this.ok = false
      // console.log('tianjia1', this.productA)
      // this.addB = this.productB
      // this.addA = this.productA
    },
    delete0() {
      alert('点击第一个表格删除')
      // this.productInfo_current.listInfo = []
      console.log(this.productInfo_current.listInfo)

      console.log('对两个数组进行操作', this.productB, this.productBB)
      const arr1 = this.productBB
      console.log(arr1[0])
      let curIndex = ''
      const arr = this.productB.filter(function(item, index) {
        curIndex = index
        return item.prodPackageId === arr1[0].prodPackageId
      })
      if (arr.length > 0) {
        this.productB.splice(curIndex, 1)
      }
      // this.productInfo_current.listInfo = this.productB
    },

    delete1() {
      // alert(4)
      // console.log('对两个数组进行操作2', this.productA, this.productAB)
      // const arr = this.getArrDifference(this.productA, this.productAB)
      // console.log('新的数组', arr)
      const arrUnselected = this.productMultiInfo_current.listInfo.filter(item => {
        return item.selected !== true
      })
      const arrSelected = this.productMultiInfo_current.listInfo.filter(item => {
        return item.selected === true
      })
      // alert(arrSelected.length)
      console.log('arrDeleted')
      console.log(arrSelected)

      // 设置状态listProductsInfoMulti
      arrSelected.forEach(item => {
        if (item.selected) {
          item.selected = false
          // delete item.selected
        }
      })

      this.productMultiInfo_current.listInfo.forEach(item => {
        if (item.selected) {
          item.selected = false
          // delete item.selected
        }
      })
      this.productMultiInfo_current.listInfo = arrUnselected
      this.productMultiInfo_current_toAdd.listInfo = this.productMultiInfo_current_toAdd.listInfo.concat(arrSelected)

    },

    getArrDifference(arr1, arr2) {
      return arr1.concat(arr2).filter(function(v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v)
      })
    },
    returnCusSearch_val() { // 变更产品包
      this.dialogProductVisible = false
    },
    returnCusSearch() {
      // alert('点击确定')
      this.dialogProductPackageVisible = false
      const arrSelected = this.productMultiInfo_current_toAdd.listInfo.filter(function(item, index) {
        return item.selected === true
      })

      const arrUnchecked = []
      this.productMultiInfo_current_toAdd.listInfo.forEach(function(item) {
        console.log(item)
        if (!item.selected) {
          arrUnchecked.push(item)
        }
      })

      this.productMultiInfo_current_toAdd.listInfo = arrUnchecked

      console.log('arrSelected')
      console.log(arrSelected)
      arrSelected.forEach(item => {
        // item.selected = false
      })

      // 设置状态
      arrSelected.forEach(item => {
        if (item.selected) {
          // delete item.selected
          item.selected = false
        }
      })

      this.productMultiInfo_current.listInfo = this.productMultiInfo_current.listInfo.concat(arrSelected)

      // const val = this.newChange.coverageRange == '0063' ? '菲律宾' : '马来西亚'
      // this.coverageRange = val
      // this.productInfo_current.listInfo = this.productB.length > 0 ? this.productB : []
      // this.productMultiInfo_current.listInfo = this.productA.length > 0 ? this.productA : []
      // console.log('xiaoming', this.productInfo_current.listInfo, this.productMultiInfo_current.listInfo)
    },

    changeAreaChooseProducts() {
      // alert('点击确定')
      this.dialogVisible = false
      const arrSelected = this.productMultiInfo_current_toAdd_change_area.listInfo.filter(function(item, index) {
        return item.selected === true
      })

      const arrUnSelected = this.productMultiInfo_current_toAdd_change_area.listInfo.filter(function(item, index) {
        return !!item.selected !== true
      })

      // const arrUnchecked = []
      // this.productMultiInfo_current_toAdd.listInfo.forEach(function(item) {
      //   console.log(item)
      //   if (!item.selected) {
      //     arrUnchecked.push(item)
      //   }
      // })

      this.productMultiInfo_current_toAdd.listInfo = arrUnSelected
      //
      // console.log('arrSelected')
      // console.log(arrSelected)
      // arrSelected.forEach(item => {
      //   // item.selected = false
      // })

      // 设置状态
      arrSelected.forEach(item => {
        if (item.selected) {
          // delete item.selected
          item.selected = false
        }
      })

      // 增值包赋值
      this.productMultiInfo_current.listInfo = arrSelected

      // const val = this.newChange.coverageRange == '0063' ? '菲律宾' : '马来西亚'
      // this.coverageRange = val
      // this.productInfo_current.listInfo = this.productB.length > 0 ? this.productB : []
      // this.productMultiInfo_current.listInfo = this.productA.length > 0 ? this.productA : []
      // console.log('xiaoming', this.productInfo_current.listInfo, this.productMultiInfo_current.listInfo)
    },

    getListProductsInfo_01(row) {
      // this.productBB = []
      // this.productBB.push(row)
    },
    getListMultiProductsInfo_01(obj) {
      // let curIndex = ''
      // const arr = this.productAB.filter(function(item, index) {
      //   curIndex = index
      //   return item.prodPackageId === obj.prodPackageId
      // })
      // if (arr.length > 0) {
      //   this.productAB.splice(curIndex, 1)
      // } else {
      //   this.productAB.push(obj)
      // }
    },
    getListProductsInfo(row) {
      // this.productB = []
      // this.productB.push(row)
      console.log(row)
      this.productInfo_current.listInfo = [row]
    },
    getListMultiProductsInfo(obj) {
      // let curIndex = ''
      // const arr = this.productA.filter(function(item, index) {
      //   curIndex = index
      //   return item.prodPackageId === obj.prodPackageId
      // })
      // if (arr.length > 0) {
      //   this.productA.splice(curIndex, 1)
      // } else {
      //   this.productA.push(obj)
      // }
    },
    handleClose(val) {
      switch (val) {
        case 1:
          this.dialogVisible = false
          break
        case 2:
          this.dialogProductVisible = false
          break
        case 3:
          this.dialogProductPackageVisible = false
      }
    },
    submitForm() {
      // alert('keaiai')

      const arrOrigin = this.productMultiInfo_current_origin.listInfo // 旧包
      const len1 = arrOrigin.length
      const arrCurrent = this.productMultiInfo_current.listInfo
      const len2 = arrCurrent.length
      // 被删除的增值包, 旧包有,新包没有，循环旧包
      // 1、旧包里标出新包也有的
      for (let i = 0; i < len1; i++) {
        for (let j = 0; j < len2; j++) {
          if (arrOrigin[i].prodPackageId === arrCurrent[j].prodPackageId) {
            arrOrigin[i].unDel = true
            break
          }
        }
      }
      // 2、把旧包里新包没有的取出来
      for (let i = 0; i < len1; i++) {
        if (arrOrigin[i].unDel !== true) {
          this.productMultiInfo_current_deleted.listInfo.push(arrOrigin[i])
        }
      }
      // debugger

      const arrDeleted = arrOrigin.filter(item => {
        return item.unDel === false
      })

      console.log('arrDeletedarrDeletedarrDeletedarrDeleted')
      console.log(arrDeleted)

      // 新添加的增值包，新包有，旧包没有 循环新包
      for (let i = 0; i < len2; i++) {
        for (let j = 0; j < len1; j++) {
          if (arrCurrent[i].prodPackageId === arrOrigin[j].prodPackageId) {
            arrCurrent[i].has = true
            break
          } else {
            arrCurrent[i].has = false
          }
        }
      }

      const arrAdded = arrCurrent.filter(item => {
        return item.has !== true
      })
      this.productMultiInfo_current_added.listInfo = arrAdded

      // 产品包变更

      if (this.productInfo_current.listInfo[0].prodPackageId !== this.productInfo_current_origin.listInfo[0].prodPackageId) {
        this.productMultiInfo_current_deleted.listInfo = this.productMultiInfo_current_deleted.listInfo.concat(this.productInfo_current_origin.listInfo)
        this.productMultiInfo_current_added.listInfo = this.productMultiInfo_current_added.listInfo.concat(this.productInfo_current.listInfo)
      }

      let productUnSubScribes
      let productSubScribes
      // alert(!this.areaChanged)
      if (this.areaChanged) {
        if (this.coverageRangeCodeOrigin === this.coverageRangeCodeCurrent) {
          // 变更套餐
          // alert('变套餐')
          productUnSubScribes = [{
            'productId': this.productResObj.productId,
            'productName': this.productResObj.productName,
            'productType': this.productResObj.productType,
            'productPrice': this.productResObj.productPrice,
            'propackages': this.productMultiInfo_current_deleted.listInfo
          }]
          productSubScribes = [{
            'productId': this.productResObj.productId,
            'productName': this.productResObj.productName,
            'productType': this.productResObj.productType,
            'productPrice': this.productResObj.productPrice,
            'propackages': this.productMultiInfo_current_added.listInfo
          }]
        } else {
          // 变更区域
          // alert('变区域')

          productUnSubScribes = [{
            'productId': this.productResObj.productId,
            'productName': this.productResObj.productName,
            'productType': this.productResObj.productType,
            'productPrice': this.productResObj.productPrice,
            'propackages': this.productMultiInfo_current_origin.listInfo.concat(this.productInfo_current_origin.listInfo)
          }]
          productSubScribes = [{
            'productId': this.productResObj.productId,
            'productName': this.productResObj.productName,
            'productType': this.productResObj.productType,
            'productPrice': this.productResObj.productPrice,
            'propackages': this.productMultiInfo_current.listInfo.concat(this.productInfo_current.listInfo)
          }]
        }
      } else {
        // 变更套餐
        //   alert('变套餐')
        productUnSubScribes = [{
          'productId': this.productResObj.productId,
          'productName': this.productResObj.productName,
          'productType': this.productResObj.productType,
          'productPrice': this.productResObj.productPrice,
          'propackages': this.productMultiInfo_current_deleted.listInfo
        }]
        productSubScribes = [{
          'productId': this.productResObj.productId,
          'productName': this.productResObj.productName,
          'productType': this.productResObj.productType,
          'productPrice': this.productResObj.productPrice,
          'propackages': this.productMultiInfo_current_added.listInfo
        }]
      }
      // this.newChange.userId = ''
      // this.newChange.custId = ''
      // this.newChange.businessType = ''
      // this.newChange.custName = ''
      // this.newChange.custType = ''
      // this.newChange.smallStationName = ''
      // this.newChange.phone = ''
      // this.newChange.coverageRange = ''
      // this.newChange.internetModel = ''
      // this.newChange.modemCount = ''
      // this.newChange.modemName = ''
      // this.newChange.devPerson = ''
      // this.newChange.installAddr = ''
      // this.newChange.installContact = ''
      // this.newChange.note = ''
      // this.newChange.certType = ''
      // this.newChange.certNo = ''
      // this.newChange.certAddr = ''
      // this.newChange.contactName = ''
      // this.newChange.contactPhoneNo = ''
      // this.newChange.contactAddr = ''

      // this.userId = data.userId
      // this.newChange.accoutId = data.accoutId
      // this.newChange.coverageRange = data.coverageRange
      // this.newChange.createTime = data.createTime
      // this.newChange.custId = data.custId
      // this.newChange.devPerson = data.devPerson
      // this.newChange.phone = data.phone
      // this.newChange.slaMess = data.slaMess
      // this.newChange.smallStationLogo = data.smallStationLogo
      // this.newChange.smallStationName = data.smallStationName
      // this.newChange.status = data.status
      // this.newChange.updateTime = data.updateTime
      // this.newChange.userId = data.userId
      // this.newChange.userLevel = data.userLevel
      // this.newChange.userName = data.userName
      // this.newChange.userType = data.userType

      const newChange = {
        orderId: null,
        userId: this.userId,
        custId: JSON.parse(sessionStorage.getItem('cusObj')).custId,
        businessType: 1,
        custName: JSON.parse(sessionStorage.getItem('cusObj')).custName,
        custType: JSON.parse(sessionStorage.getItem('cusObj')).custType,
        smallStationName: this.newChange.smallStationName,
        phone: this.newChange.phone,
        coverageRange: this.coverageRangeCodeCurrent,
        internetModel: this.newChange.internetModel,
        modemCount: this.newChange.modemCount,
        modemName: '',
        slaLevel: 1,
        devPerson: this.newChange.devPerson,
        installAddr: '',
        installContact: '',
        note: '',
        certType: 1,
        certNo: 145555555555554444,
        certAddr: '北京',
        contactName: '马云',
        contactPhoneNo: 13333333333,
        contactAddr: 'beijing ',
        productUnSubScribes: productUnSubScribes,
        productSubScribes: productSubScribes,
        orderAccessory: {
          'objectType': '',
          'attachmentType': '',
          'accessoryName': '',
          'accessoryUrl': '',
          'attachmentStore': ''
        },
        installPhone: 13333333333,
        modemId: 10001
      }

      stationPerChangeServiceModify(newChange).then(response => {
        console.log('1111aaaaaaa22222222bbbbbb')
        console.log(response.data)
        // console.log(response.data.data.respCode)
        // console.log(response.data.data.respCode === '0000')
        // response.data.data = { 'respDesc': '成功', 'data': 20181010492, 'respCode': '0000' }
        if (response.data.respCode === '0000') {
          const orderId = response.data.data
          newChange.orderId = orderId
          // alert(newChange.orderId)
          sessionStorage.setItem('OrderId', orderId)
          this.$bus.$emit('hideDetailListenData', newChange)
          this.$bus.$emit('hideDetailListen', true)

          const menuId = 1
          // this.$bus.$jump(menuId, 'littleSite/paymentSuccPage')
        }
        //   console.log(response.data.data)
        //   this.$bus.$emit('passOrderData', response.data.data)
        //   this.$bus.$emit('passOrderData', response.data.data)
        //   this.submitResult = response.data.data
        //   console.log(this.submitResult)
        //   console.log(333333333333333333)
        //   this.showOrderClick()
        //   this.submitButtonClose = true
        //   this.submitButtonShow = false
        // }
      })
    },
    toshow(obj) {
      this.agreementChecked = obj.agreementChecked
      this.agreementRes = obj.checked
      this.submitButtonShow = !this.submitButtonShow
    },
    getLitleName(obj) {
      this.newChange.smallStationName = obj.smallStationName
    },
    getArea(obj) {
      // alert(JSON.stringify(obj))
      // alert(888)
      // this.areaChanged = true
      console.log(obj.areaValue)
      // this.newChange.coverageRange = obj.areaValue
      // this.coverageRangeCodeCurrent = obj.areaValue

      this.coverageRange = obj.areaValue === '0063' ? this.optionsObj[0].regionName : this.optionsObj[1].regionName

      // alert(99)
      // alert(this.coverageRange)
      console.log('这是新的修改页面', this.newChange)
      this.changeArea(obj.areaValue)
      this.$bus.$emit('areaCodeChanged', this.coverageRange)
    },
    getChangeArea(obj) {
      // alert(JSON.stringify(obj))
      // alert(555)
      // alert(obj.areaValue)
      this.areaChanged = true
      console.log(obj.areaValue)
      this.newChange.coverageRange = obj.areaValue
      this.coverageRangeCodeCurrent = obj.areaValue

      this.coverageRange = obj.areaValue === '0063' ? this.optionsObj[0].regionName : this.optionsObj[1].regionName

      // alert(99)
      // alert(this.coverageRange)
      // alert(this.newChange.coverageRange)
      console.log('这是新的修改页面', this.newChange)
      this.changeArea(obj.areaValue)
      this.$bus.$emit('areaCodeChanged', this.coverageRange)
    },
    getServiceValue(obj) {
      console.log(obj)
      this.newChange.internetModel = obj.radioRes
      this.newChange.modemCount = obj.modemCount
      console.log(this.newChange.internetModel, '--------', this.newChange.modemCount)
    },
    getAreaUpgrade(obj) {
      console.log(obj)
      this.newChange.slaLevel = obj.areaValue
      console.log(this.newChange.areaValue, '-------------')
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
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
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
          } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    changeArea(productRegion) {
      const data = {}
      data.productRegion = productRegion
      data.productModel = '02'
      this.listLoading = true
      // alert(999)
      // this.coverageRangeCodeOrigin = productRegion

      productServiceQry({ ...data }).then(response => {
        // this.smalltestObj = response.data.data
        // this.$bus.$emit('showProductList', response.data.data)
        // this.listLoading = false
        this.productResObj = response.data.data
        // this.$bus.$emit('showProductList', response.data.data)
        const pro = this.productResObj.propackage
        // this.productInfo.listInfo_name = data.productName
        this.productInfo_current_toAdd_change_area.listInfo = pro.filter(function(obj) {
          return obj.prodPackageType === '00'
        })

        this.productMultiInfo_current_toAdd_change_area.listInfo = pro.filter(function(obj) {
          return obj.prodPackageType === '02'
        })

        this.listLoading = false
      })
    }
  }
}
</script>
<style lang="scss">
  .button_val0 {
    display: block;
  }

  .button_val {
    display: none;
  }

  .dialog_val {
    .el-dialog {
      width: 1000px;
      .button_val0 {
        display: none;
      }
      .button_val {
        display: block;
      }
    }
  }

  .el-dialog__footer {
    text-align: center;
  }

  .operation {
    position: relative;
    left: 120px;
    top: 37px;
  }
</style>
