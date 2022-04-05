<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- 文章列表项组件 -->
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from "@/api/article";
import ArticleItem from "@/components/article-item";

export default {
  name: "ArticleList",

  components: {
    ArticleItem,
  },

  props: {
    channel: {
      type: Object, // 数据类型
      required: true, // 是否必须的
    },
  },

  data() {
    return {
      list: [], // 数据列表
      loading: false, // 上拉加载更多的loading状态
      finished: false, // 是否加载结束
      error: false, // 是否加载失败
      timestamp: null, // 请求下一页数据的时间戳
      isRefreshLoading: false, // 下拉刷新加载完成
      refreshSuccessText: "刷新成功", // 下拉刷新成功后的文字提示
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    // 当触发上拉加载更多时调用该函数
    async onLoad() {
      try {
        //  1.请求数据
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
        });

        // console.log(data);
        // 2.把数据添加到list数组中
        const { results } = data.data;
        this.list.push(...results);

        // 3.设置loading状态为false
        this.loading = false;

        // 判断数据是否加载结束
        if (results.length) {
          // 数组长度不为0，表明还有数据可以加载，此时更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp;
          // console.log(this.timestamp);
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true;
        }
      } catch (err) {
        this.loading = false; // 关闭loading效果
        this.error = true; // 开启错误提示
      }
    },
    // 下拉刷新事件
    async onRefresh() {
      try {
        //  1.请求数据
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: Date.now(), // 下拉刷新每次获取最新数据
        });

        // console.log(data);
        // 2.把数据添加到list数组中
        const { results } = data.data;
        this.list.unshift(...results); // 刷新后的数据追加到最顶部

        // 3.关闭下拉刷新的loading状态
        this.isRefreshLoading = false;

        // 提示成功
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据！`;
      } catch (err) {
        this.isRefreshLoading = false; // 关闭下拉刷新loading效果
        this.refreshSuccessText = "刷新失败"; // 刷新失败提示
      }
    },
  },
};
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh; // 设置固定高度
  overflow-y: auto; // 溢出滚动
}
</style>