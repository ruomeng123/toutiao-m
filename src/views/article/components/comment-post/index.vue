<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论会优先展示"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPost" :disabled="!message.length">发布</van-button>
  </div>
</template>

<script>
import { addComment } from "@/api/comment"
export default {
  name: "CommentPost",

  components: {},

  props: {
    target: {
      type: [Number,String,Object],
      required: true,
    },

  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },

  data() {
    return {
      message: ''
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    async onPost(){
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
      })

      try {
        const { data } = await addComment({
          target: this.target.toString(),
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : null
        })
        // console.log(data);
        // 关闭弹窗
        // 把评论追加到评论列表顶部
        this.$emit('post-success',data.data)
        // 清空输入框
        this.message = ''
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发布失败')
      }
    }
  },
};
</script>

<style lang="less" scoped>
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>