<template>
    <div class="container" @click="prevent_show">
    <div class="flex_out">
      <div id="left" class="bg-primary">
        <SideBar ref="sidebar">
        </SideBar>
      </div>
      <RouterView />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import SideBar from '../../components/SideBar/SideBar.vue'
let sidebar = ref();
let prevent_show = () => {
    sidebar.value.is_show()
}
</script>
<style scoped>
.flex_out{
  min-width: 1000px;
  min-height: 700px;
  height: 100vh;
  display: flex;
}
#left{
  width:100px;
  height: 100%;
  position: relative;
}
</style>