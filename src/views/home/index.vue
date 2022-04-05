<template>
  <div class="home-container">
    <!-- 搜索区域 -->
    <van-nav-bar class="home-navbar" fixed>
      <van-button slot="title" icon="search" round small type="info"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 标签导航栏 -->
    <van-tabs class="home-tab" v-model="active" animated swipeable>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 文章列表组件 -->
        <article-list :channel="channel"></article-list>
      </van-tab>
      <div class="hamburger-btn" slot="nav-right">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
      <!-- 占位盒子 -->
      <div class="placeholder" slot="nav-right"></div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannelsList } from "@/api/user";
import ArticleList from "@/views/home/components/article-list.vue";

export default {
  name: "HomeIndex",

  components: {
    ArticleList,
  },

  props: {},

  data() {
    return {
      active: 0,
      channels: [], // 频道列表
    };
  },

  computed: {},

  watch: {},

  created() {
    this.loadChannels();
  },

  mounted() {},

  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannelsList();
        // console.log(data);
        this.channels = data.data.channels;
      } catch (err) {
        this.$toast("频道数据获取失败！");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  // CSS深度操作符/deep/
  padding-bottom: 100px;
  padding-top: 175px;
  /deep/.van-nav-bar__title {
    min-width: 100%;
    // margin: 0;
    .van-button {
      width: 555px;
      height: 64px;
      background-color: rgba(255, 255, 255, 0.2);
      // opacity: .2;
      border: none;
      i.van-icon {
        color: #fff;
        font-size: 32px;
      }
      .van-button__text {
        font-size: 28px;
      }
    }
  }
  // 标签导航样式
  .home-tab {
    /deep/.van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
    }
    /deep/.van-tabs__nav {
      padding: 0;
      height: 80px;
      .van-tab {
        min-width: 200px;
        border-right: 1px solid #edeff3;
        font-size: 30px;
        color: #777;
      }
      .van-tab--active {
        color: #333;
      }
      .van-tabs__line {
        width: 31px;
        height: 6px;
        background-color: #3296fa;
        bottom: 8px;
      }
      .hamburger-btn {
        position: fixed;
        right: 0;
        width: 66px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        background-color: rgba(255, 255, 255, 0.9);
        i.toutiao {
          color: #333;
          font-size: 33px;
        }
        &::before {
          content: "";
          position: absolute;
          left: 0;
          width: 2px;
          height: 100%;
          background: url("~@/assets/gradient-gray-line.png") no-repeat;
          background-size: contain;
        }
      }
      .placeholder {
        flex-shrink: 0;
        width: 66px;
        height: 80px;
      }
    }
  }
}
</style>