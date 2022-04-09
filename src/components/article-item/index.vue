<template>
  <van-cell class="article-item" :to="`/article/${article.art_id}`">
    <!-- 文章标题 -->
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <!-- 如果文章有三张封面，显示这个结构 -->
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item-img" :src="img" />
        </div>
      </div>
      <!-- 文章底部信息 -->
      <div class="article-info">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- 如果文章只有一张封面，则显示这个结构 -->
    <van-image
      fit="cover"
      slot="default"
      class="cover-right"
      v-if="article.cover.type === 1"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: "ArticleItem",

  components: {},

  props: {
    article: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {};
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.article-item {
  .article-item {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    .cover-right {
      width: 232px;
      height: 146px;
      padding-left: 25px;
      .van-image__img {
        width: 232px;
        height: 146px;
      }
    }
  }
  .article-info span {
    font-size: 23px;
    color: #b4b4b4;
    &:nth-child(2) {
      padding: 0 28px;
    }
  }
  .cover-wrap {
    display: flex;
    padding: 25px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
      &:nth-child(2) {
        padding: 0 4px;
      }
    }
  }
}
</style>