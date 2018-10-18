<template>
  <div class="top-menu">
    <div :style="{backgroundImage:'url(' + logo + ')'}" class="logo-wrapper"/>
    <div class="menu-list">
      <div class="menu-list-cutter">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">{{ $t('topMenu.businessHandling') }}</el-menu-item>
          <el-menu-item index="2">{{ $t('topMenu.orderManagement') }}</el-menu-item>
          <el-menu-item index="3">{{ $t('topMenu.clientManagement') }}</el-menu-item>
          <el-menu-item index="4">{{ $t('topMenu.workOrderManagment') }}</el-menu-item>
        </el-menu>
      </div>
      <div class="user-panel">
        <el-row>
          <el-col :span="24"><span style="">{{ $t('topMenu.msg1') }}【{{ showCusName }}】{{ $t('topMenu.msg2') }}!</span>
            <el-button type="primary big" @click="changeCust">{{ $t('topMenu.changeCustomer') }}</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>

</template>

<script>
import logo from '@/assets/site/logo.png'
import store from '@/store'
import router from '../../../router'
import { getToken } from '@/utils/auth' // getToken from cookie

// const roles = store.getters && store.getters.roles
// console.log('roles')
// console.log(roles)
console.log(getToken())
const roles = [getToken()]
export default {
  data() {
    return {
      activeIndex: '1',
      logo,
      showCusName: ''
    }
  },
  computed: {
    custom() {
      return this.$store.state.user.currentCus.custName
    }
  },
  mounted() {
    // 高亮菜单项
    const menuId = sessionStorage.getItem('SideMenu') ? JSON.parse(sessionStorage.getItem('SideMenu')).menuId : 1
    this.activeIndex = menuId
    const data = {
      roles,
      menuId
    }

    store.dispatch('GenerateRoutes', data).then(() => { // 根据roles权限生成可访问的路由表
      router.addRoutes(store.getters.addRouters)
      // router.push('/dashboard')
    })
    const obj = sessionStorage.getItem('cusObj')
    if (Object.prototype.toString.call(obj) === '[object String]') {
      this.showCusName = JSON.parse(obj).custName
    }

    // 注册事件
    this.$bus.$on('getCustomerName', (obj) => {
      this.showCusName = obj
    })

    this.$bus.$on('changeTopMenuIndex', (data) => {
      this.activeIndex = data
    })
  },
  methods: {
    hasPermission(roles, permissionRoles) {
      if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
      if (!permissionRoles) return true
      return roles.some(role => permissionRoles.indexOf(role) >= 0)
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key // 切换菜单
      const menuId = key
      // let roles = []
      sessionStorage.removeItem('SideMenu') // 删除本地缓存的菜单项
      store.dispatch('GenerateRoutes', { roles, menuId }).then(() => { // 根据roles权限生成可访问的路由表
        router.addRoutes(store.getters.addRouters)
        router.push('/dashboard')
      })
    },
    changeCust() {
      this.$bus.$emit('showClientSelectModal', true)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables.scss';

  .top-menu {
    position: fixed;
    top: 28px;
    width: 100%;
    height: 60px;
    background-color: #fff;
    z-index: 10;
    border-bottom: 3px solid rgb(215, 215, 215);
    .logo-wrapper {
      position: absolute;
      top: 0;
      width: $sw0;
      height: 57px;
      background-color: #fff;
      background-size: 116px 57px;
      background-repeat: no-repeat;
      background-position: 50%;
    }
    .menu-list {
      margin-left: $sw0;
      position: relative;
      padding: 0 15px;
      .menu-list-cutter {
        position: absolute;
        height: 60px;
        .el-menu-demo {
          background-color: transparent;
        }
        .el-menu--horizontal .el-menu-item:not(.is-disabled){
          color:$sc7;
          &:hover{
            color:$sc1;
          }
        }
      }
      .user-panel {
        position: absolute;
        right: 15px;
        top: 13px;
        span {
          padding-right: 15px;
          color: #666666
        }
      }
    }

  }
</style>
<style lang="scss">
  @import '../../../styles/variables.scss';

  body {
    -webkit-font-smoothing: subpixel-antialiased;
  }

  .el-menu--horizontal > .el-menu-item {
    cursor: pointer;
    font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    font-feature-settings: "kern";
    font-kerning: normal;
    text-rendering: optimizeLegibility;
  }

  .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 3px solid $sc1;
    color: $sc1;
  }

  .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover {
    background-color: transparent;
  }

  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
    outline: 0;
    color: $sc1;
  }

  .el-menu.el-menu--horizontal {
    border-bottom-width: 0;
  }

</style>
