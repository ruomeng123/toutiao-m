<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(result, index) in list"
        :key="index"
        :title="result.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";
export default {
  name: "SearchResult",

  components: {},

  props: {
    searchText: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false,
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    async onLoad() {
      // 请求获取数据
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.searchText,
      });

      // 将数据添加到列表中
      // console.log(data);
      const { results } = data.data;
      this.list.push(...results);

      // 设置加载状态
      this.loading = false;

      // 判断数据是否加载完毕
      if (results.length) {
        // 未加载完，更新页码
        this.page++;
      } else {
        // 加载完，则设置finished状态
        this.finished = true;
      }

      try {
      } catch (err) {
        // this.$toast("加载失败");
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>