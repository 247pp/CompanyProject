<template>
  <div class="telNumPoolWrap">
    <el-button type="text" @click="centerDialogVisible = true">内页-号码调配 库位 号码池 文档 45/46/47点击打开 Dialog</el-button>
    <el-dialog
      :visible.sync="centerDialogVisible"
      title=""
      center>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">库位</span>
          <div class="repository">
            <!-- <treeselect
              :multiple="true"
              :options="optionsTree"
              v-model="valueTree"
              :show-count="true"
              :default-expand-level="1"
              :searchable="true"
              placeholder="Select your favourite(s)...">
              <label slot="option-label" slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }" :class="labelClassName">
                {{ node.isBranch ? 'Branch' : 'Leaf' }}: {{ node.label }}
                <span v-if="shouldShowCount" :class="countClassName">({{ count }})</span>
              </label>
            </treeselect> -->
          </div>
        </el-tab-pane>
        <el-tab-pane label="号码池">
          <div class="demo-input-suffix">
            <div class="inputTit">组织机构</div>
            <el-input
              v-model="input2"
              placeholder="请输入">
              <i slot="suffix" class="el-input__icon el-icon-date"/>
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <div class="inputTit">池类型</div>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </div>
          <div class="demo-input-suffix">
            <div class="inputTit">池名称</div>
            <el-input
              v-model="input22"
              placeholder="请输入"/>
          </div>
          <el-row>
            <el-button type="primary">查询</el-button>
            <el-button >重置</el-button>
          </el-row>
          <div class="tableWrap">
            <el-table v-loading.body="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
              <el-table-column align="center" label="ID" width="80">
                <template slot-scope="scope">
                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>

              <el-table-column width="240px" align="center" label="Date">
                <template slot-scope="scope">
                  <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>

              <el-table-column width="120px" align="center" label="Author">
                <template slot-scope="scope">
                  <span>{{ scope.row.author }}</span>
                </template>
              </el-table-column>

              <el-table-column width="100px" label="Importance">
                <template slot-scope="scope">
                  <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon"/>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-container">
              <el-pagination
                :current-page="listQuery.page"
                :page-sizes="[10,20,30, 50]"
                :page-size="listQuery.limit"
                :total="total"
                background
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"/>
            </div>
          </div>

        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
// import the component
// import Treeselect from '@riophae/vue-treeselect'
// import the styles
// import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  // components: { Treeselect },
  data() {
    return {
      centerDialogVisible: false,
      input2: '',
      input22: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      // define default value
      valueTree: null,
      // define options
      optionsTree: [{
        id: 'fruits',
        label: 'Fruits',
        shouldShowCount: false,
        node: {
          isBranch: false
        },
        count: 43,
        children: [{
          id: 'apple',
          label: 'Apple 🍎',
          isNew: true,
          isBranch: 'Branch',
          node: {
            isBranch: false
          }

        }, {
          id: 'grapes',
          label: 'Grapes 🍇',
          isBranch: 'Branch'
        }, {
          id: 'pear',
          label: 'Pear 🍐'
        }, {
          id: 'strawberry',
          label: 'Strawberry 🍓'
        }, {
          id: 'watermelon',
          label: 'Watermelon 🍉'
        }]
      }, {
        id: 'vegetables',
        label: 'Vegetables',
        children: [{
          id: 'corn',
          label: 'Corn 🌽'
        }, {
          id: 'carrot',
          label: 'Carrot 🥕'
        }, {
          id: 'eggplant',
          label: 'Eggplant 🍆'
        }, {
          id: 'tomato',
          label: 'Tomato 🍅'
        }]
      }]
    }
  },
  created() {
    this.getList()
    console.log(this.list)
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}
</script>
<style lang="scss">
  @import "src/styles/variables.scss";

  .telNumPoolWrap  {
    .el-dialog {
      width: $sw2_1;
    }
    .el-dialog__body {
      padding: 0;
    }
    .el-dialog__header {
      display: none;
    }
    .el-tabs--border-card {
      border: none;
      box-shadow: none;
      margin-top: 30px;
      position: relative;
      &>.el-tabs__content {
          margin-top: 30px;
          padding: 0;
      }
      .el-tab-pane {
        overflow: hidden;
        .demo-input-suffix {
          margin-bottom: 20px;
          width: 100%;
          height: 28px;
          .el-input__suffix-inner .el-input__icon {
              line-height: 28px;
          }
        }
        .inputTit {
          width: $sw0;
          float: left;
          text-align: right;
          color: $sc13;
          font-size: $sfs;
          line-height: $sh3;
          margin-right: $sw4;
        }
        .el-input {
          width: $sw3;
          height: $sh3;
          float: left;
          input {
            height: $sh3;
          }
        }
        .el-row {
          text-align: center;
        }
        .tableWrap {
          padding: 30px 20px 0px 20px;
          .el-input {
            width: 100px;
          }
          .el-table--medium th {
            padding: 0;
            height: 30px;
            font-size: $sfs;
            font-weight: $sfw1;
            color: $sc13;
            background: $sc15;
            border: none;
          }
          .el-table--medium td{
            padding: 0;
            height: $sh4;
            font-size: $sfs;
            color: $sc8;
            border: none;
          }
          .pagination-container {
            margin: 20px 0;
            font-size: $sfs;
            color: $sc8;
            .el-pagination.is-background .el-pager li:not(.disabled).active {
                background-color: $sc1;
                color: #fff;
            }
            &>.el-pagination__total {
              font-size: $sfs;
              color: $sc13;
            }
          }
        }
      }
      .repository {
        min-height: 200px;
        position: relative;
        .vue-treeselect {
          width: $sw6;
          height: $sh7;
          position: absolute;
          right: 0;
          top: 0;
          left: 0;
          bottom: 0;
          margin: 10px auto 20px;
          &__control {
            border-radius: $sbr0;
            &-arrow-container {
              display: none;
            }
          }
          .tabStyle{
            background-color: #f40;
            color: #f40;
          }
        }
      }
    }
    .el-tabs__nav {
      width: 100%;
      .el-tabs__item {
        padding: 0;
        width: 50%;
        text-align: center;
        color: $sc13;
        height: $sh2;
        line-height: $sh2;
        font-weight: $sfw1;
        margin: 0;
      }
      .el-tabs__item:hover {
          color: $menuHover !important;
          background-color: $sc1 !important;
          border-right-color: $sc1 !important;
          border-left-color: $sc1 !important;
      }
      .is-active {
          color: $menuHover !important;
          background-color: $sc1 !important;
          margin: 0 !important;
          padding: 0 !important;
          border-right-color: $sc1 !important;
          border-left-color: $sc1 !important;
      }

    }
    .el-dialog__footer {
      text-align: right;
    }
  }
</style>
