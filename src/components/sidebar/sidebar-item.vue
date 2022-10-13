<template>
    <li class="menu-item"
        role="menuitem"
        tabindex="-1"
        :class="{
            'is-active': active,
        }"
        :style="{color: active ? rootMenu.textColor :''}"
        @click="rootMenu.onMenuClick(menuItemData)"
    >
        <slot></slot>
    </li>
</template>
 
<script>
export default {
  name: 'SidebarItem',
  inject:['rootMenu'],
  props: {
    disabled: Boolean,
    backgroundColor:{
        type:String,
        default:''
    },
    menuItemData:{
      type:Object,
      default:()=>{}
    }
  },
  computed:{
    active() {
        return this.menuItemData.menuKey === this.rootMenu.activeIndex;
    },
  },
  data() {
    return {}
  },
  methods: {
    handleClick(){
        this.$emit('handleClick', this);
    }
  }
}
</script>
 
<style scoped lang = "scss">
.menu-item{
  padding: 20px 20px;
  font-size: 36px;
}
.is-active{
  color: #409eff;
}
</style>