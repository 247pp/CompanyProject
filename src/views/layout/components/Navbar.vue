<template>
  <div class="navbar">
    <div class="navbar-cutter">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../../styles/variables.scss';
  @import '../../../styles/mixin.scss';

  .navbar {
    position: fixed;
    top: 88px;
    margin-left: $sw1;
    height: $sh1;
    //@include calc(width, "100% - 180px - 1px");
    width: calc(100% - #{$sw0-1});
    line-height: $sh1;
    z-index: $sz1;
    background-color: $sc10;
    bordtags-view-containerer-radius: 0px !important;
    .navbar-cutter {
      position: relative;
      .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 15px;
      }
      .breadcrumb-container {
        float: left;
      }
      .errLog-container {
        display: inline-block;
        vertical-align: top;
      }
      .right-menu {
        float: right;
        height: 100%;
        &:focus {
          outline: none;
        }
        .right-menu-item {
          display: inline-block;
          margin: 0 8px;
        }
        .screenfull {
          height: 20px;
        }
        .international {
          vertical-align: top;
        }
        .theme-switch {
          vertical-align: 15px;
        }
        .avatar-container {
          height: 50px;
          margin-right: 30px;
          .avatar-wrapper {
            cursor: pointer;
            margin-top: 5px;
            position: relative;
            .user-avatar {
              width: 40px;
              height: 40px;
              border-radius: 10px;
            }
            .el-icon-caret-bottom {
              position: absolute;
              right: -20px;
              top: 25px;
              font-size: 12px;
            }
          }
        }
      }
    }

  }

  #app .hideSidebar .main-container {
    .navbar {
      width: calc(100% - 36px - 1px);
      background-color: $sc10;
    }
  }
</style>
