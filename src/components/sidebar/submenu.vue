<template>
 <div class="submenu" >
    <div class="submenu-title-wrap" @click.stop.prevent="onSubMenuClick" >
      <span class="submenu-name">{{name}}</span>
      <i  :class="['submenu-icon','van-icon','van-icon-arrow-down']" :style="{transform: show ? 'rotate(180deg)' :'' }" ></i>
    </div>
    <collapse-transition>
      <ul class="submenu-wrap" v-show="show" >
          <li
              v-for="(item,index) in list" :key="'submenu-items_'+index"
            style="padding-left:20px;"
            role="menuitem"
          >
          <submenu v-if="item[rootMenu.ckey]" :list="item[rootMenu.ckey]" :name="item[rootMenu.nameKey]" />
            <div
            v-else
            :class="{'submenu__title':true,'is-active':item.menuKey === rootMenu.activeIndex}"
            :style="{color: item.menuKey === rootMenu.activeIndex ? rootMenu.textColor : ''}"
            @click.stop.prevent="handleClick(item)"
            >
            {{item.sidebarMenuName}}
            </div>
          </li>
      </ul>
    </collapse-transition>
 </div>
</template>
 
<script>
import collapseTransition from './collapse-transition'
export default {
 name: 'Submenu',
 inject:['rootMenu'],
 data () {
    return {
      show:false,
      activeIndex:undefined
    }
 },
 components:{
  collapseTransition
 },
 props:{
    name:{
        type:String,
        default:()=>""
    },
    list:{
        type:Array,
        default:[]
    }
 },
 methods:{
    handleClick(item){
      this.rootMenu.onMenuClick(item)
      this.activeIndex = item.menuKey
    },
    onSubMenuClick(){
      this.show = !this.show
    }
 }
}
</script>
 
<style scoped lang="scss">
 .submenu-title-wrap{
  display: flex;
  padding: 10px 0;
  .submenu-name{
    display: inline-block;
    flex: 1;
    font-size: 36px;
  }
}
.submenu__title{
  padding: 10px 0;
}
.submenu-wrap{
  overflow: hidden;
}
.collapse-transition {
  -webkit-transition: .3s height ease-in-out, .3s padding-top ease-in-out, .3s padding-bottom ease-in-out;
  transition: .3s height ease-in-out, .3s padding-top ease-in-out, .3s padding-bottom ease-in-out
}
.is-active{
  color: #409eff;
}
.submenu-icon{
  transition: all 0.2s;
}

</style>