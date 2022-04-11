<template>
  <div class="edit-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { editUserProfile } from "@/api/user";
import dayjs from "dayjs"
export default {
  name: "EditBirthday",

  components: {},

  props: {
    value: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
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
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await editUserProfile({
          birthday: currentDate,
        });

        this.$emit("close");
        // 提交数据
        this.$emit("input", currentDate);
        this.$toast.success("提交成功");
      } catch (err) {
        this.$toast.fail("提交失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.edit-birthday {
  /deep/.van-picker__toolbar {
    .van-picker__cancel,
    .van-picker__confirm {
      color: #09b674ea;
    }
  }
}
</style>