<template>
  <div class="search-suggestion">
    <van-cell
      :title="text"
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search',text)"
    >
      <div slot="title" v-html="highlight(text)" ></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
// 加载防抖函数
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",

  components: {},

  props: {
    searchText: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      suggestions: [],
    };
  },

  computed: {},

  watch: {
    searchText: {
      // 当searchText发生变化的时候调用该函数
      // debounce 函数
      // 参数1：一个函数
      // 参数2：延迟时间，单位是毫秒
      // 返回值：防抖之后的函数
      handler: debounce(function (value) {
        // console.log(value);
        this.loadSearchSuggestions(value);
      }, 200),
      //在侦听开始之后立即被调用
      immediate: true,
    },
  },

  created() {},

  mounted() {},

  methods: {
    async loadSearchSuggestions() {
      try {
        const { data } = await getSearchSuggestions(this.searchText);
        // console.log(data);
        this.suggestions = data.data.options;
      } catch (err) {
        this.$toast("加载失败");
      }
    },

    // 联想关键词高亮
    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`;
      // RegExp 正则表达式构造函数
      //    参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      //    参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, "gi");

      return text.replace(reg, highlightStr);
    },
  },
};
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/.active {
    color: #4fc08d;
  }
}
</style>