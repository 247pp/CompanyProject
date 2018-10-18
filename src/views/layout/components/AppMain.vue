<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables.scss';
  @import '../../../styles/mixin.scss';

  .app-main {
    /*84 = navbar + tags-view = 50 +34 */
    @include calc(min-height, "100vh - 84px");
    padding: $sp0 $sp1 0;
    width: 100%;
    position: relative;
    overflow: hidden;
    border-left: $sw1 solid $sc12; /*分隔效果*/
    background-color: $sc10;
  }
</style>

