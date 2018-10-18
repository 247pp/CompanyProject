<template>
  <div>
    <h1>举个例子</h1>
    <button @click="admin">admin</button>
    <button @click="editor">editor</button>
  </div>

</template>

<script>
export default {
  name: 'Modal',
  methods: {
    admin() {
      this.$store.dispatch('ChangeRoles', 'admin').then(() => {
        // this.$emit('change')
      })
    },
    editor() {
      this.$store.dispatch('ChangeRoles', 'editor').then(() => {
        // this.$emit('change')
      })
    }
  }
}
</script>

<style scoped>

</style>
