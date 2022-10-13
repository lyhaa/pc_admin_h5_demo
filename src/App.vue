<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import sidebar from '@/components/sidebar'
import { sessionStorageGet } from '@/utils'
export default {
  name: 'App',
  components:{
    sidebar
  },
  created(){
    this.getMenuList()
  },
  methods:{
    ...mapActions(['getMenuList'])
  }
}
</script>
<style lang="scss"></style>
