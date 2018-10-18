<template>
  <div :class="classObj" class="app-wrapper">
    <div class="top-bar">
      <div class="top-bar-cutter">
        <div class="top-item logout" @click="logout">{{ $t('topMenu.logout') }}</div>
        <div class="top-item logout">
          <el-dropdown trigger="click">
            <el-badge is-dot class="item">
              <svg-icon icon-class="bell-solid"/>
            </el-badge>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="clearfix">
                {{ $t('topMenu.orderWork') }}
                <el-badge :value="12" class="mark"/>
              </el-dropdown-item>
              <el-dropdown-item class="clearfix">
                {{ $t('topMenu.construction') }}
                <el-badge :value="3" class="mark"/>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="top-item">{{ $t('topMenu.number') }}: <span>00001</span></div>
        <div class="top-item">{{ $t('topMenu.admin') }}</div>
        <div class="top-item">{{ $t('topMenu.env') }}</div>
        <div class="top-item">
          <lang-select style="width: 12px;height: 12px;"/>
        </div>
      </div>

    </div>
    <top-menu/>
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>

    <div class="main-container">
      <tags-view/>
      <app-main/>
    </div>
    <choose-client :cus-choice="cusChoice" @cusShow="getCusType"/>
    <choose-enterprise :cus-id-obj="cusIdObj" @cusSearchShow="getCusTypeSearch"/>
    <choose-personal-cus :cus-id-obj="cusIdPersonalObj" @cusSearchShowPerson="getCusTypeSearchPerson"/>
  </div>
</template>

<script>
import { AppMain, Sidebar, TagsView, TopMenu } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import LangSelect from '@/components/LangSelect'
import ChooseClient from '@/components/componentsForLittleSite/ChooseClient'
import ChooseEnterprise from '@/components/componentsForLittleSite/chooseEnterprise'
import choosePersonalCus from '@/components/componentsForLittleSite/choosePersonalCus'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain,
    TagsView,
    TopMenu,
    LangSelect,
    ChooseClient,
    ChooseEnterprise,
    choosePersonalCus
  },
  mixins: [ResizeMixin],
  data() {
    return {
      cusChoice: false,
      cusIdObj: {
        cusIdFind: '',
        cusIdVisible: false
      },
      cusIdPersonalObj: {
        cusIdFind: '',
        cusIdVisible: false
      }

    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    this.$bus.$on('showClientSelectModal', (data) => {
      this.cusChoice = data
    })
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
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
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import '@/styles/variables.scss';

  .app-wrapper {
    @include clearfix;
    position: relative;
    /*height: 100%;*/
    height: calc(100% - 88px);
    margin-top: 88px;
    width: 100%;
    .top-bar {
      position: fixed;
      top: 0;
      width: 100%;
      height: 28px;
      line-height: 28px;
      background-color: rgba(51, 51, 51, 1);
      color: #fff;
      z-index: $sz1;
      .top-bar-cutter {
        margin: 0 15px;
        .top-item {
          float: right;
          display: inline-block;
          height: 28px;
          line-height: 28px;
          margin: 0 15px;
          font-size: 12px;
          font-weight: 400;
          color: $sc15;
          &:first-child {
            margin-right: 0;
          }
        }

      }
    }

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }

  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
<style lang="scss">
  @import '../../styles/variables.scss';

  #app {
    .top-bar {
      .top-item.logout {
        cursor: pointer;
        .el-badge__content.is-fixed.is-dot {
          top: 9px;
          right: 2px;
        }
      }
    }
  }
</style>

