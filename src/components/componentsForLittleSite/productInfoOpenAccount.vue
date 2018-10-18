<template>
  <el-card :body-style="{ padding: '15px', }" class="box-card tableOne">
    <div class="card-title">{{ productTitle }}</div>
    <el-table
      :data="productInfo"
      :height="listHeight"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @select="select">
      <el-table-column
        prop="productName"
        fixed
        label="产品名称"/>
      <el-table-column
        prop="prodPackageName"
        label="产品包"/>
      <el-table-column
        prop="pkgElement.pkgElementName"
        label="包资费"/>
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
      packageInfo: []
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
      this.productInfo = data.propackage.filter(function(obj) {
        // obj.productName = data.productName
        return obj.prodPackageType === '00'
      })
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
      this.$emit('listProductsInfoMulti', row)
    },
    pushObj(obj) {
      this.$emit('listProductsInfo', obj)
    }
  }
}
</script>
<style lang="scss">
</style>
