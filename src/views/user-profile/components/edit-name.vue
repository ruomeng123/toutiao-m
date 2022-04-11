<template>
  <div class="edit-name">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="field-wrap">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入要修改的昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from "@/api/user";

export default {
  name: "EditName",

  components: {},

  props: {
    value: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      message: this.value,
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    async onConfirm() {
      if(!this.message.length) {
        this.$toast.fail('内容不能为空')
      }
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      try {
        await editUserProfile({
          name: this.message,
        });
        // console.log(data);
        // 关闭弹窗
        this.$emit('close')
        // 提交数据
        this.$emit('input',this.message)
        this.$toast.success("提交成功");
      } catch (err) {
        this.$toast.fail("提交失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.edit-name {
  /deep/.van-nav-bar__content {
    background-color: #fff;
    .van-nav-bar__title {
      color: #222;
    }
    .van-nav-bar__text {
      color: #09b674ea;
    }
  }
  /deep/.field-wrap {
    padding: 20px;
  }
}
</style>