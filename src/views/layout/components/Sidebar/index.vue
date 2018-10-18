<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" class="side-menu-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#eeeff0"
      text-color="#666"
      active-text-color="#e50017"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="scss" scoped>
  .side-menu-wrapper {
    background-color: rgb(238, 239, 240);
  }

  .menu-wrapper {
    /*margin: 0 10px;*/
    border-bottom: 2px solid #dedede;
    border-image: -webkit-linear-gradient(#acacac, #fff) 30 30;
    border-image: -moz-linear-gradient(#acacac, #fff) 30 30;
    border-image: linear-gradient(#acacac, #fff) 30 30;
  }

  .menu-wrapper:last-child {
    margin-bottom: 200px;
  }

  .el-menu--collapse.el-menu .menu-wrapper {
    margin: 0;
  }

  #app .sidebar-container .el-menu {
    height: auto;
  }
</style>
<style lang="scss">
  .sidebar-container .el-submenu__title:hover {
    background-color: #fff !important;
  }

  .sidebar-container .el-menu-item:hover {
    outline: 0;
    background-color: #fff !important;
  }

  .el-menu-item, .el-submenu__title {
    height: 42px;
    line-height: 42px;
  }
</style>
