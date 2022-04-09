<template>
  <van-icon
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    :style="{ color: value === 1 ? '#e5645f' : '' }"
    @click="onLikings"
    :loading="loading"
  />
</template>

<script>
import { addLikings, deleteLikings } from "@/api/article";
export default {
  name: "LikeArticle",

  components: {},

  props: {
    value: {
      type: Number,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    async onLikings() {
      this.loading = true;
      try {
        let status = -1;

        if (this.value === 1) {
          // 点赞状态，要取消点赞
          await deleteLikings(this.articleId);
        } else {
          // 未点赞状态，要点赞
          await addLikings(this.articleId);
          status = 1;
        }
        this.$toast.success(status === 1 ? "点赞成功" : "取消点赞");

        // 修改父组件的value数据从而影响视图
        this.$emit("input", status);
      } catch (err) {
        this.$toast.fail("操作失败");
        console.log(err);
      }

      this.loading = false;
    },
  },
};
</script>

<style lang="less" scoped></style>