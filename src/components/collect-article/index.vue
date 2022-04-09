<template>
  <van-icon
    :name="value ? 'star' : 'star-o'"
    :style="{ color: value ? '#ffa500' : '' }"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { addCollect, deleteCollect } from "@/api/article";
export default {
  name: "CollectArticle",

  components: {},

  props: {
    value: {
      type: Boolean,
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
    async onCollect() {
      this.loading = true;
      try {
        if (this.value) {
          // 收藏状态，要取消收藏
          await deleteCollect(this.articleId);
        } else {
          // 未收藏状态，要收藏
          await addCollect(this.articleId);
        }
        this.$toast.success(this.value ? "取消收藏":"收藏成功");

        // 修改父组件的value数据从而影响视图
        this.$emit("input", !this.value);
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