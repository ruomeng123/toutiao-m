<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search-form"
        v-model="searchText"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        background="#4fc08d"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果区域 -->
    <search-result v-if="isResultShow" :searchText="searchText" />

    <!-- 搜索联想区域 -->
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    />

    <!-- 搜索历史区域 -->
    <search-history
      v-else
      :searchHistories="searchHistories"
      @search="onSearch"
      @clear-search-histories="searchHistories = []"
    />
  </div>
</template>

<script>
import SearchHistory from "./components/search-history";
import SearchSuggestion from "./components/search-suggestion";
import SearchResult from "./components/search-result";
import { setItem, getItem } from "@/utils/storage";

export default {
  name: "SearchIndex",

  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },

  props: {},

  data() {
    return {
      searchText: "", // 搜索关键词
      isResultShow: false, //控制搜索结果是否显示
      searchHistories: getItem("TOUTIAO_SEARCH_HISTORIES") || [], // 存储历史记录数据
    };
  },

  computed: {},

  watch: {
    searchHistories(value) {
      setItem("TOUTIAO_SEARCH_HISTORIES", value);
    },
  },

  created() {},

  mounted() {},

  methods: {
    onSearch(val) {
      // 更新文本框内容
      this.searchText = val;

      // 存储搜索历史记录
      const index = this.searchHistories.indexOf(val);
      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(val);
      // 渲染搜索结果
      this.isResultShow = true;
    },
    onCancel() {
      // console.log("取消了");
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
}
</style>