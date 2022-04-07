<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>

      <van-icon v-else name="delete-o" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index"
      @click="onSearchItemClick(history,index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",

  components: {},

  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      isDeleteShow: false, // 设置删除状态
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    onSearchItemClick(history,index) {
      if(this.isDeleteShow) {
        // 删除操作
        this.searchHistories.splice(index,1)
      } else{
        // 搜索操作
        // console.log('搜索了');
        this.$emit('search',history)
      }
    }
  },
};
</script>

<style lang="less" scoped>
</style>