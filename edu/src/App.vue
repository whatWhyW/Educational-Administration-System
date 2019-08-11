<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // 模板挂载之后
  created() {
    
  }
}
</script>

<style>
@import './static/css/normalize.css';
#app {
	height: 100%;
}
</style>
