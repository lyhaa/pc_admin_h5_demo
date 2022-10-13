<template>
 <div class="sidebar">
    <van-popup
    v-model="isShow"
    position="left"
    :style="{ height: '100%',width:'70%'}"
    >
        <ul
            style="background-color:#ffffff;"
            class="sidebar-container"
        >
            <sidebar-item  v-for="(item,index) in getList" :menuItemData="item" :key="'sidebar-items_'+index">
                <submenu v-if="item[ckey]" :name="item.sidebarMenuName" :menuItemData="item" :list="item[ckey]" ></submenu>
                {{item[ckey] ? '' : item.sidebarMenuName}}
            </sidebar-item>
        </ul>
    </van-popup>
 </div>
</template>
 
<script>
import sidebarItem from './sidebar-item.vue'
import submenu from './submenu.vue'
import { getPropertyVal } from './utils'
export default {
 name: 'Sidebar',
 provide() {
    return {
      rootMenu: this
    };
  },
 props:{
     show:{
        type:Boolean,
        default:()=>false
     },
      list: {
      type: Array,
      default:()=>[]
    },
    ckey:{
        type:String,
        default:'children'
    },
    nameKey:{
        type:String,
        default:'name'
    },
    textColor:{
      type:String,
      default:''
    }
 },
 computed:{
    getList(){
      return this.setListKey(this.list)
    },
    isShow:{
      get(){
        return this.show
      },
      set(v){
        this.$emit('update:show',v)
      }
    }
 },
 components:{
    sidebarItem,
    submenu
 },
 data () {
    return {
        activeIndex:''
    }
 },
 methods:{
    getPropertyVal,
    setListKey(arr = [],parentIndex = ''){
      return arr.map((item,index)=>{
        item.menuKey = (((parentIndex +'') ? (parentIndex + '-') :'') +index);
        item.sidebarMenuName = getPropertyVal(item,this.nameKey);
        if(item[this.ckey]){
          item[this.ckey] = this.setListKey(item[this.ckey],item.menuKey ?item.menuKey : index)
        }
        return item
      })
    },
    onMenuClick(data){
      this.$emit('handleClick',data)
      this.activeIndex = data.menuKey
    }
 }
}
</script>
 
<style scoped lang = "scss">
 
</style>