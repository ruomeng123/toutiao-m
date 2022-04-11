<template>
  <div class="edit-gender">
    <van-picker
      title="性别"
      show-toolbar
      :default-index="value"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { editUserProfile } from "@/api/user";
export default {
  name: "EditGender",

  components: {},

  props: {
    value: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      columns: ["男", "女"],
      localGender: this.value,
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "更新中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        await editUserProfile({
          gender: this.localGender,
        });

        this.$emit("close");
        // 提交数据
        this.$emit("input", this.localGender);
        this.$toast.success("提交成功");
      } catch (err) {
        this.$toast.fail("提交失败");
      }
    },
    onChange(picker, value, index) {
      this.localGender = index;
      console.log(index);
    },
  },
};
</script>

<style lang="less" scoped>
.edit-gender {
  /deep/.van-picker__toolbar {
    .van-picker__cancel,
    .van-picker__confirm {
      color: #09b674ea;
    }
  }
}
</style>