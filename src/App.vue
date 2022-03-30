<template>
  <div id="app">
    <router-view />
    <h1>今日头条</h1>
    <i class="toutiao toutiao-wuwangluo"></i>
    <van-button loading type="primary" />
    <van-button loading type="primary" loading-type="spinner" />
    <van-button loading type="info" loading-text="加载中..." />
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.box {
  width: 750px;
  height: 200px;
  background-color: antiquewhite;
}
</style>
