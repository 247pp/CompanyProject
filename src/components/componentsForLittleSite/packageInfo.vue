<template>
  <el-card :body-style="{ padding: '15px', }" class="box-card tableOne">
    <div class="card-title">{{ productTitle }}</div>
    <el-table
      :data="packageInfo"
      :height="listHeight"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @select="select">
      <el-table-column
        prop="prodPackageName"
        fixed
        label="产品名称"/>
      <el-table-column
        prop="pkgElement.pkgElementName"
        label="产品资费"/>
      <el-table-column
        prop="prodPackageDesc"
        label="产品描述"/>
      <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">
          <el-radio
            v-if="buttonType=='radio'"
            :label="scope.row.prodPackageId"
            v-model="templateRadio"
            @change.native="getTemplateRow(scope.$index, scope.row)">
            选择
          </el-radio>
          <el-checkbox
            v-if="buttonType=='checkbox'"
            v-model="scope.row.date"
            label="scope.row.date"
            @change.native="handleChoose(scope.$index,scope.row)">
            选择
          </el-checkbox>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
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

export default {
  props: {
    listHeight: {
      default: '124',
      type: String
    },
    buttonType: {
      default: 'radio',
      type: String
    },

    productTitle: {
      type: String,
      default: '产品信息'
    }
  },
  data() {
    return {
      prodPackageName: '',
      listLoading: true,
      radio: 0,
      checkboxCheck: 0,
      templateSelection: '',
      templateRadio: 'radio',
      multiProducts: [],
      productInfo: [],
      packageInfo: [],
      test: {
        'productId': 'PR_0001',
        'propackage': [{
          'respCode': null,
          'respDesc': null,
          'prodPackageId': 'PK_0002',
          'prodPackageName': '宽带数据包1GB',
          'prodPackageType': '00',
          'prodPackageDesc': '数据描述',
          'pkgElement': {
            'respCode': null,
            'respDesc': null,
            'pkgElementId': 'PE_0002',
            'pkgElementName': '10GB/2000元',
            'pkgElementType': '1'
          }
        }, {
          'respCode': null,
          'respDesc': null,
          'prodPackageId': 'PK_0007',
          'prodPackageName': '2MB带宽包年',
          'prodPackageType': '00',
          'prodPackageDesc': '2MB带宽包年',
          'pkgElement': {
            'respCode': null,
            'respDesc': null,
            'pkgElementId': 'PE_0007',
            'pkgElementName': '2MB/年，10000元',
            'pkgElementType': '1'
          }
        }, {
          'respCode': null,
          'respDesc': null,
          'prodPackageId': 'PK_0011',
          'prodPackageName': '视频监控',
          'prodPackageType': '02',
          'prodPackageDesc': '视频监控',
          'pkgElement': {
            'respCode': null,
            'respDesc': null,
            'pkgElementId': 'PE_0011',
            'pkgElementName': '4000元',
            'pkgElementType': '1'
          }
        }, {
          'respCode': null,
          'respDesc': null,
          'prodPackageId': 'PK_0012',
          'prodPackageName': '1MB包月数据产品',
          'prodPackageType': '00',
          'prodPackageDesc': '1MB/2000元/月',
          'pkgElement': {
            'respCode': null,
            'respDesc': null,
            'pkgElementId': 'PE_0012',
            'pkgElementName': '1MB/2000元/月',
            'pkgElementType': '1'
          }
        }, {
          'respCode': null,
          'respDesc': null,
          'prodPackageId': 'PK_0013',
          'prodPackageName': '2MB包月数据产品',
          'prodPackageType': '00',
          'prodPackageDesc': '2MB/3000元/月',
          'pkgElement': {
            'respCode': null,
            'respDesc': null,
            'pkgElementId': 'PE_0013',
            'pkgElementName': '2MB/3000元/月',
            'pkgElementType': '1'
          }
        }, {
          'respCode': null,
          'respDesc': null,
          'prodPackageId': 'PK_0014',
          'prodPackageName': '4MB包月数据产品',
          'prodPackageType': '00',
          'prodPackageDesc': '4MB/8000元/月',
          'pkgElement': {
            'respCode': null,
            'respDesc': null,
            'pkgElementId': 'PE_0014',
            'pkgElementName': '4MB/8000元/月',
            'pkgElementType': '1'
          }
        }, {
          'respCode': null,
          'respDesc': null,
          'prodPackageId': 'PK_0015',
          'prodPackageName': '10GB流量包产品',
          'prodPackageType': '00',
          'prodPackageDesc': '10GB/1000元/月',
          'pkgElement': {
            'respCode': null,
            'respDesc': null,
            'pkgElementId': 'PE_0015',
            'pkgElementName': '10GB/1000/月',
            'pkgElementType': '1'
          }
        }, {
          'respCode': null,
          'respDesc': null,
          'prodPackageId': 'PK_0016',
          'prodPackageName': '20GB流量包产品',
          'prodPackageType': '00',
          'prodPackageDesc': '20GB/2000元/月',
          'pkgElement': {
            'respCode': null,
            'respDesc': null,
            'pkgElementId': 'PE_0016',
            'pkgElementName': '20GB/2000/月',
            'pkgElementType': '1'
          }
        }, {
          'respCode': null,
          'respDesc': null,
          'prodPackageId': 'PK_0036',
          'prodPackageName': 'IP电话产品',
          'prodPackageType': '02',
          'prodPackageDesc': 'IP电话/1000元/月',
          'pkgElement': {
            'respCode': null,
            'respDesc': null,
            'pkgElementId': 'PE_0036',
            'pkgElementName': 'IP电话',
            'pkgElementType': '1'
          }
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
            'pkgElementName': '视频会议',
            'pkgElementType': '1'
          }
        }, {
          'respCode': null,
          'respDesc': null,
          'prodPackageId': 'PK_0038',
          'prodPackageName': '视频监控产品',
          'prodPackageType': '02',
          'prodPackageDesc': '视频监控/1000元/月',
          'pkgElement': {
            'respCode': null,
            'respDesc': null,
            'pkgElementId': 'PE_0038',
            'pkgElementName': '视频监控',
            'pkgElementType': '1'
          }
        }],
        'productName': '卫星宽带',
        'productPrice': 10000,
        'productType': '01'
      }
    }
  },
  computed: {},
  created() {

  },
  mounted() {
    this.$bus.$on('showProductList', data => {
      console.log('datadatadatadatadatadata')
      console.log(data)
      // this.prodPackageName = data.productName
      // debugger
      this.packageInfo = data.propackage.filter(function(obj) {
        obj.productName = data.productName
        return obj.prodPackageType === '02'
      })
      // debugger
      console.log(this.packageInfo)
    })
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('listLimitChange', {
        'limit': val
      })
    },
    handleCurrentChange(val) {
      this.$emit('listPageChange', {
        'page': val
      })
    },
    handleSelectionChange(val) {
      console.log(val)
    },
    select(selection, row) {
      console.log(selection)
      console.log(row)
    },
    getTemplateRow(index, row) { // 获取选中数据
      this.templateSelection = row
      console.log(index)
      console.log(row)
      this.pushObj(row)
    },
    handleChoose(index, row) {
      console.log(this)
      const data = this.packageInfo.filter(function(obj) {
        // obj.date = data.productName
        return obj.date === true
      })

      console.log('data-----------------')
      console.log(data)
      // debugger
      this.$emit('listProductsInfoMulti', data)
    },
    pushObj(obj) {
      this.$emit('listProductsInfo', obj)
    }
  }
}
</script>
<style lang="scss">
</style>
