<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"

      finished-text="已显示全部评论"
      @load="onLoad"
    >
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :comment="item"
        @replyClick="$emit('replyClick',$event)"
      />
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <!-- <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group> -->
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getComments } from "@/api/comment";
import CommentItem from "@/views/article/components/comment-item";

export default {
  name: "ArticleComment",
  components: {
    CommentItem,
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    type: {
      type: String,
      validator(value) {
        return ['a','c'].includes(value)
      },
      default: 'a'
    },
    list: {
      type: Array,
      default: () => [], //默认是一个空数组
    },
    // is_scroll: {
    //   type: Boolean,
    //   required: true,
    // },
  },
  data() {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 数据偏移量
      limit: 10, // 展示数据的数量
    };
  },

  created() {
    this.loading = true;
    this.onLoad();
  },
  methods: {
    async onLoad() {
      try {
        // 请求数据
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit,
        });
        // console.log(data);
        // 渲染视图
        const { results } = data.data;
        this.list.push(...results);

        // 把文章评论的总数量传给父组件
        this.$emit("onload-success", data.data);

        // if (this.is_scroll) {
        //   this.$nextTick(() => {
        //     // 获取
        //     let commentPageId = document.querySelector("#commentList");
        //     console.log(commentPageId.offsetTop);
        //     document.body.scrollTo(0,commentPageId.offsetTop);
        //   });
        // }
        // this.is_scroll=false
        // 设置loading为false
        this.loading = false;
        // 判断列表是否还有数据
        if (results.length) {
          // 请求下一页数据
          this.offset = data.data.last_id;
        } else {
          // 否则设置finished为true
          this.finished = true;
        }
      } catch (err) {
        this.$toast.fail("请求评论列表数据失败，请稍后再试");
        this.loading=false
      }
    },
  },
};
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>