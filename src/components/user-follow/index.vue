<template>
  <van-button
    v-if="isFollow"
    class="follow-btn"
    round
    size="small"
    :loading="loading"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#4fc08d"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from "@/api/user";

export default {
  name: "UserFollow",

  components: {},

  model: {
    prop: "isFollow",
    event: "update-isFollow",
  },
  props: {
    isFollow: {
      type: Boolean,
      required: true,
    },
    userId: {
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
    async onFollow() {
      this.loading = true;
      try {
        if (this.isFollow) {
          // 代表在关注状态，要取消关注
          await deleteFollow(this.userId);
        } else {
          // 代表在未关注状态，要关注
          await addFollow(this.userId);
        }
        // this.isFollow = !this.isFollow;
        this.$emit("update-isFollow", !this.isFollow);
      } catch (err) {
        let message = "操作失败，请重试!";
        if (err.response && err.response.status === 401) {
          message = "请登录后重试!";
        } else if (err.response && err.response.status === 400) {
          message = "不能关注自己!";
        }
        this.$toast(message);
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="less" scoped>
</style>