<template>
  <div class="app-container documentation-container">
    <el-button type="primary" @click="createPerson">测试ajax</el-button>
    <el-button type="primary" @click="searchClient">测试ajax</el-button>
    <!--<a class="document-btn" target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/">{{ $t('documentation.documentation') }}</a>-->
    <!--<a class="document-btn" target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">{{ $t('documentation.github') }}</a>-->
    <!--<a class="document-btn" target="_blank" href="https://panjiachen.gitee.io/vue-element-admin-site/zh/">国内文档</a>-->
    <!--<dropdown-menu :items="articleList" style="float:left;margin-left:50px;" title="系列文章"/>-->
    <ul class="content_ul">
      <li>
        <div>
          <span class="red_val"/>
          <span class="red_text">选择仓库/池</span>
        </div>

        <div class="box_val">
          <div class="box box0">
            <div>

              <div class="list_val list1">调出仓库/池：</div>
              <el-autocomplete
                v-model="state3"
                :fetch-suggestions="querySearch"
                popper-class="my-autocomplete"
                placeholder="请输入内容"
                @select="handleSelect">
                <i slot="suffix" class="el-icon-search" @click="handleIconClick"/>
                <template slot-scope="{ item }">
                  <div class="name">{{ item.value }}</div>
                  <span class="addr">{{ item.address }}</span>
                </template>
              </el-autocomplete>
            </div>
            <div>
              <div class="list_val">常用库/池：</div>
              <ul class="box0_ul">
                <li v-for="child in box0_list" :key="child.index">{{ child }}</li>
              </ul>
            </div>
          </div>
          <div class="box box1">
            <div>

              <div class="list_val list1">调出仓库/池：</div>
              <el-autocomplete
                v-model="state3"
                :fetch-suggestions="querySearch"
                popper-class="my-autocomplete"
                placeholder="请输入内容"
                @select="handleSelect">
                <i
                  slot="suffix"
                  class="el-icon-search"
                  @click="handleIconClick"/>
                <template slot-scope="{ item }">
                  <div class="name">{{ item.value }}</div>
                  <span class="addr">{{ item.address }}</span>
                </template>
              </el-autocomplete>
            </div>
            <div>
              <div class="list_val">常用库/池：</div>
              <ul class="box0_ul">
                <li v-for="child in box0_list" :key="child.index">{{ child }}</li>
              </ul>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div>
          <span class="red_val"/>
          <span class="red_text">查询条件</span>
        </div>
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane label="手工录入" name="first">
            <div class="pan">
              <div class="inquiry">

                <el-form :inline="true" :model="formInline" class="demo-form-inline">

                  <el-row :gutter="20">
                    <el-col :span="8">
                      <div class="grid-content">
                        <el-form-item label="开始号码：" prop="weapon">
                          <el-input v-model="formInline.weapon" placeholder="请输入装备类型" clearable/>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content">
                        <el-form-item label="开始号码：" prop="weapon">

                          <el-input v-model="formInline.weapon" placeholder="请输入装备类型" clearable/>
                        </el-form-item>

                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content">
                        <el-form-item label="开始号码：" prop="weapon">
                          <el-input v-model="formInline.weapon" placeholder="请输入装备类型" clearable/>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form>

                <el-form :inline="true" class="demo-form-inline" style="float:right;">

                  <el-form-item>
                    <el-button type="primary" class="red_button">查询</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" class="white_button">重置</el-button>
                  </el-form-item>
                </el-form>

              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="文件导入" name="second">
            <div class="pan"/>
          </el-tab-pane>
          <el-tab-pane label="预设定" name="third">
            <div class="pan"/>
          </el-tab-pane>
        </el-tabs>
      </li>
      <li>
        <div>
          <span class="red_val"/>
          <span class="red_text">查询结果</span>
          <span>
            <ul class="tab_val">
              <li v-for="child in model_list" :key="child.index">
                <span> <i class="el-icon-tickets"/>{{ child }}</span>
              </li>
              <li class="last">
                <span><i class="el-icon-tickets"/> .........</span>
              </li>
            </ul>
          </span>
          <span class="min_text">共有{{ num }}条查询结果</span>
          <span>
            <el-form :inline="true" class="demo-form-inline" style="float:right;">
              <el-form-item>
                <el-button type="primary" class="white_button">导出Excle</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="red_button">回库</el-button>
              </el-form-item>
            </el-form>
          </span>
        </div>
        <el-table
          :data="tableData"
          class="table"
          style="width: 100%">
          @selection-change="handleSelectionChange"
          <el-table-column
            type="selection"
            width="55"/>
          <el-table-column
            prop="val1"
            label="号码"/>
          <el-table-column
            prop="val2"
            label="号码分类"/>
          <el-table-column
            prop="val3"
            label="标签"
            width="100"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag

                :type="scope.row.val3 === '空闲' ? 'primary' : scope.row.val3 === '待审核' ? 'info':scope.row.val3 === '占用' ? 'warning':'danger'"
                disable-transitions>{{ scope.row.val3 }}
              </el-tag>
            </template>
          </el-table-column>
          <!--<el-table-column-->
          <!--prop="val3"-->
          <!--label="号码状态"-->
          <!--&gt;-->
          <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.val3 | userWayData}}</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column
            prop="val4"
            label="仓位归属省份"
          />
          <el-table-column
            prop="val5"
            label="仓位归属城市"
          />
          <el-table-column
            prop="val6"
            label="仓位归属区县"
          />
          <el-table-column
            prop="val7"
            label="仓位"
          />

          <el-table-column
            label="操作"
            width="120px;">
            <template slot-scope="scope">
              <el-button type="text" size="small">
                <span style="color:#007ce5">回库</span>
              </el-button>
            </template>

          </el-table-column>
        </el-table>
        <div class="paging">
          <el-pagination
            :total="total"
            :current-page.sync="currentPage"
            :page-size="formInline.pageSize"
            :page-sizes="[10, 20, 30, 40]"
            background
            layout="sizes,total,prev, pager, next"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </div>
        <el-form :inline="true" class="demo-form-inline" style="float:right;">
          <el-form-item>
            <el-button type="primary" class="red_button">回库</el-button>
          </el-form-item>
        </el-form>
      </li>
    </ul>

  </div>
</template>
<script>
import DropdownMenu from '@/components/Share/dropdownMenu'
import { addPersonCustService, qryCustInfoService } from '@/api/clientManagement'

export default {
  name: 'Documentation',
  components: {
    DropdownMenu
  },
  data() {
    return {
      // isActive:'',
      tableData: [
        {
          val1: '13121001495',
          val2: '普号',
          val3: '空闲',
          val4: '北京',
          val5: '北京',
          val6: '北京',
          val7: '北京'
        }, {
          val1: '13121001495',
          val2: '普号',
          val3: '待审核',
          val4: '北京',
          val5: '北京',
          val6: '北京',
          val7: '北京'
        }, {
          val1: '13121001495',
          val2: '普号',
          val3: '占用',
          val4: '北京',
          val5: '北京',
          val6: '北京',
          val7: '北京'
        }, {
          val1: '13121001495',
          val2: '普号',
          val3: '预配',
          val4: '北京',
          val5: '北京',
          val6: '北京',
          val7: '北京'
        }
      ],
      currentPage: 1,
      total: 1,
      formInline: {
        weapon: ''
      },
      // checked: true,
      num: 20,
      model_list: ['模板一', '模板二', '模板三'],
      activeName2: 'first',
      restaurants: [],
      state3: '',
      box0_list: ['天津市仓库', '天津市仓库', '天津市仓库']
    }
  },

  mounted() {
    this.restaurants = this.loadAll()
  },

  methods: {
    searchClient() {
      const data = {
        custType: '2',
        certNo: '34082318781212198'
      }
      qryCustInfoService({ ...data }).then(res => {
        console.log(res)
      })
    },
    createPerson() {
      const custName = '王鹏'
      const custType = '1'
      const custAddr = '北京中关村'
      const certType = '1'
      const certNo = '34082318781212198'
      const telePhone = '13789871232'
      const sex = '1'
      const country = '中国'
      const isMarriage = '1'
      const defaultLanguage = '1'
      const endTime = '2018-12-12 12:12:12'
      addPersonCustService(
        custName,
        custType,
        custAddr,
        certType,
        certNo,
        telePhone,
        sex,
        country,
        isMarriage,
        defaultLanguage,
        endTime
      ).then(res => {
        console.log('addPersonCustService')
        console.log(res)
      })
    },
    filterTag(value, row) {
      return row.val3 === value
    },
    handleSelectionChange() {
    },
    // 分页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.formInline.pageNo = currentPage
    },
    handleSizeChange(size) {
      this.formInline.pageSize = size
      this.formInline.pageNo = 0
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll() {
      return [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
        { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' },
        { 'value': '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
        { 'value': '贡茶', 'address': '上海市长宁区金钟路633号' },
        { 'value': '豪大大香鸡排超级奶爸', 'address': '上海市嘉定区曹安公路曹安路1685号' },
        { 'value': '茶芝兰（奶茶，手抓饼）', 'address': '上海市普陀区同普路1435号' },
        { 'value': '十二泷町', 'address': '上海市北翟路1444弄81号B幢-107' },
        { 'value': '星移浓缩咖啡', 'address': '上海市嘉定区新郁路817号' },
        { 'value': '阿姨奶茶/豪大大', 'address': '嘉定区曹安路1611号' },
        { 'value': '新麦甜四季甜品炸鸡', 'address': '嘉定区曹安公路2383弄55号' },
        { 'value': 'Monica摩托主题咖啡店', 'address': '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
        { 'value': '浮生若茶（凌空soho店）', 'address': '上海长宁区金钟路968号9号楼地下一层' },
        { 'value': 'NONO JUICE  鲜榨果汁', 'address': '上海市长宁区天山西路119号' },
        { 'value': 'CoCo都可(北新泾店）', 'address': '上海市长宁区仙霞西路' },
        { 'value': '快乐柠檬（神州智慧店）', 'address': '上海市长宁区天山西路567号1层R117号店铺' },
        { 'value': 'Merci Paul cafe', 'address': '上海市普陀区光复西路丹巴路28弄6号楼819' },
        { 'value': '猫山王（西郊百联店）', 'address': '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
        { 'value': '枪会山', 'address': '上海市普陀区棕榈路' },
        { 'value': '纵食', 'address': '元丰天山花园(东门) 双流路267号' },
        { 'value': '钱记', 'address': '上海市长宁区天山西路' },
        { 'value': '壹杯加', 'address': '上海市长宁区通协路' },
        { 'value': '唦哇嘀咖', 'address': '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元' },
        { 'value': '爱茜茜里(西郊百联)', 'address': '长宁区仙霞西路88号1305室' },
        { 'value': '爱茜茜里(近铁广场)', 'address': '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺' },
        { 'value': '鲜果榨汁（金沙江路和美广店）', 'address': '普陀区金沙江路2239号金沙和美广场B1-10-6' },
        { 'value': '开心丽果（缤谷店）', 'address': '上海市长宁区威宁路天山路341号' },
        { 'value': '超级鸡车（丰庄路店）', 'address': '上海市嘉定区丰庄路240号' },
        { 'value': '妙生活果园（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': '香宜度麻辣香锅', 'address': '长宁区淞虹路148号' },
        { 'value': '凡仔汉堡（老真北路店）', 'address': '上海市普陀区老真北路160号' },
        { 'value': '港式小铺', 'address': '上海市长宁区金钟路968号15楼15-105室' },
        { 'value': '蜀香源麻辣香锅（剑河路店）', 'address': '剑河路443-1' },
        { 'value': '北京饺子馆', 'address': '长宁区北新泾街道天山西路490-1号' },
        { 'value': '饭典*新简餐（凌空SOHO店）', 'address': '上海市长宁区金钟路968号9号楼地下一层9-83室' },
        { 'value': '焦耳·川式快餐（金钟路店）', 'address': '上海市金钟路633号地下一层甲部' },
        { 'value': '动力鸡车', 'address': '长宁区仙霞西路299弄3号101B' },
        { 'value': '浏阳蒸菜', 'address': '天山西路430号' },
        { 'value': '四海游龙（天山西路店）', 'address': '上海市长宁区天山西路' },
        { 'value': '樱花食堂（凌空店）', 'address': '上海市长宁区金钟路968号15楼15-105室' },
        { 'value': '壹分米客家传统调制米粉(天山店)', 'address': '天山西路428号' },
        { 'value': '福荣祥烧腊（平溪路店）', 'address': '上海市长宁区协和路福泉路255弄57-73号' },
        { 'value': '速记黄焖鸡米饭', 'address': '上海市长宁区北新泾街道金钟路180号1层01号摊位' },
        { 'value': '红辣椒麻辣烫', 'address': '上海市长宁区天山西路492号' },
        { 'value': '(小杨生煎)西郊百联餐厅', 'address': '长宁区仙霞西路88号百联2楼' },
        { 'value': '阳阳麻辣烫', 'address': '天山西路389号' },
        { 'value': '南拳妈妈龙虾盖浇饭', 'address': '普陀区金沙江路1699号鑫乐惠美食广场A13' }
      ]
    },
    handleSelect(item) {
      console.log(item)
    },
    handleIconClick(ev) {
      console.log(ev)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../styles/variables';
  @import '../../styles/content';

  .documentation-container {
    background: $border_color;
    font-size: 14px;
    /*div{*/
    /*overflow:hidden;*/
    /*}*/
    .red_val {
      @extend .red_val;
    }
    .red_text {
      @extend .red_text;
    }
    /*页面布局*/
    .content_ul > li {
      list-style: none;
      margin-bottom: 20px;
      overflow: hidden;
      background: #fff;
      padding: 20px;
      > div:nth-child(1) {
        margin-bottom: 20px;
      }
    }
    /*第一个li内容*/
    .box_val {
      .box {
        padding: 20px 0;
        width: 500px;
        border: 1px solid $border_color;
        float: left;
        margin-right: 90px;
        overflow: hidden;
        & > div:nth-child(2) {
          margin-top: 48px;
          position: relative;
        }
        .list1 {
          line-height: 30px;
          margin-right: 10px;
        }
        .list_val {
          width: 120px;
          float: left;
          text-align: right;
        }
        /*搜索框的样式*/
        .el-autocomplete {
          width: 355px;
          height: 30px;
          line-height: 30px;
        }
        .box0_ul {
          position: absolute;
          overflow: hidden;
          left: 130px;
          width: 300px;
          li {
            float: left;
            margin-right: 15px;

          }
        }
      }
    }
    /*搜索的*/
    .pan {
      width: 100%;
      height: 130px;
      border: 1px solid $border_color;
      border-top: none;
      padding: 20px;

    }
    .my-autocomplete {
      li {
        line-height: normal;
        padding: 7px;

        .name {
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .addr {
          font-size: 12px;
          color: #b4b4b4;
        }

        .highlighted .addr {
          color: $border_color;
        }
      }
    }
    .tab_val {
      @extend .model;
    }
    .min_text {
      @extend .tip;
    }

  }

  .val_color1 {
    color: red;
  }

  .val_color2 {
    color: #000;
  }
</style>
<style>

  .box .el-input__inner {
    border: 1px solid #ccc;
    border-radius: 0;
    height: 30px;
    line-height: 30px;
  }

  .el-tabs__nav-scroll {
    background: #fafafa;
  }

  .el-tabs__nav-scroll .el-tabs__item {
    color: #666;
  }

  .el-tabs__nav-scroll .is-active {
    color: #333;
    background: #fff;
    border: none;
    border-top: 2px solid #e50117;

  }

  .inquiry .el-form-item__label {
    font-size: 14px;
    font-weight: normal;
    color: #333;
  }

  .inquiry .el-input__inner {
    width: 230px;
    height: 28px;
  }

  .el-tabs__header {
    margin: 0;
  }

  /*table样式的修改*/
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #e50117;
    border-color: #e50117;
    width: 14px;
    height: 14px;
    display: inline-block;
  }

  tbody .cell, tbody th div {
    font-size: 12px;
    color: #999;
  }

  .el-table thead {
    background: #f0f0f0;
    font-size: 14px;
    color: #333;
  }

  .has-gutter th,
  .has-gutter tr {
    background: #f0f0f0;
  }

  .el-table thead .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-table thead .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    width: 20px;
    height: 20px;
  }

  .el-table thead .el-checkbox__input .el-checkbox__inner,
  .el-table thead .el-checkbox__input .el-checkbox__inner {
    width: 20px;
    height: 20px;
  }

  .el-table thead .el-checkbox__inner::after {
    height: 10px;
    left: 7px;
    top: 2px;
  }

  .el-tag {
    color: #fff;
    border: none;
  }

  .el-tag--info {
    background: #f8b413;

  }

  .el-tag--primary {
    background: #00ffff;
  }

  .el-tag--danger {
    background: #00aaff;
  }

  .el-tag--warning {
    background: #ff4133;
  }

  .el-table tbody td {
    border-bottom: 1px dotted #e5e5e5
  }

  /*.el-table--enable-row-hover*/
  .el-table__body tr:hover > td {
    background: #fafafa;
    color: #333;
  }

  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #ff4133;
  }

  .paging {
    margin-top: 20px;
  }
</style>
