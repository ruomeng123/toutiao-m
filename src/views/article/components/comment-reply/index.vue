<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        comment.reply_count > 0
          ? `已有${comment.reply_count}条回复`
          : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('closeReply')" />
    </van-nav-bar>

    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <comment-item :comment="comment" />
      <!-- /当前评论项 -->

      <van-cell title="全部回复"></van-cell>
      <!-- 回复列表 -->
      <article-comment  :source="comment.com_id" type="c" :list="commentList" />
      <!-- /回复列表 -->
    </div>

    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post :target="comment.com_id"  @post-success="onPostSuccess" />
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentItem from "@/views/article/components/comment-item";
import ArticleComment from "@/views/article/components/article-comment";
import CommentPost from "@/views/article/components/comment-post"
export default {
  name: "CommentReply",

  components: {
    CommentItem,
    ArticleComment,
    CommentPost
  },

  props: {
    comment: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isPostShow: false,
      commentList: []
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    onPostSuccess(data) {
      // 关闭弹层
      this.isPostShow = false
      // 将评论渲染到回复列表
      this.commentList.unshift(data.new_obj)
      // 更新回复数量
      this.comment.reply_count++

    }
  },
};
</script>

<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>