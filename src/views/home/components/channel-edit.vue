<template>
  <div class="channel-edit">
    <!-- 我的频道模块 -->
    <div class="my-channel">
      <!-- title -->
      <van-cell title="我的频道">
        <!-- 编辑按钮插槽 -->
        <van-button
          slot="default"
          type="danger"
          plain
          size="small"
          round
          @click="isEditShow = !isEditShow"
          >{{ isEditShow ? "完成" : "编辑" }}</van-button
        >
      </van-cell>

      <!-- grid:频道数据 -->
      <van-grid :gutter="12">
        <van-grid-item
          class="grid-item"
          v-for="(channel, index) in myChannels"
          :key="index"
          @click="onChannelClick(channel, index)"
        >
          <van-icon
            class="close"
            slot="icon"
            name="close"
            v-show="isEditShow && !fixedChannels.includes(channel.id)"
          ></van-icon>

          <span :class="{ active: index === active }" slot="text">{{
            channel.name
          }}</span>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 频道推荐模块 -->
    <div class="recommend-channel">
      <!-- title -->
      <van-cell title="频道推荐"></van-cell>

      <!-- grid -->
      <van-grid :gutter="12">
        <van-grid-item
          class="grid-item"
          v-for="(channel, index) in recommendChannels"
          :key="index"
          :text="channel.name"
          @click="onAddChannel(channel)"
        >
          <van-icon class="add-o" slot="icon" name="add-o"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels, addUserChannels,deleteUserChannels } from "@/api/channel";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  name: "ChannelEdit",

  components: {},

  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      allChannels: [], // 存储所有频道数据
      isEditShow: false, // 控制编辑状态
      fixedChannels: [0], // 固定频道，不允许删除
    };
  },

  computed: {
    ...mapState(["user"]),
    // 封装计算属性，筛选频道推荐数据
    recommendChannels() {
      // 数组的 filter 方法：遍历数组，把符合条件的元素存储到新数组中并返回
      return this.allChannels.filter((channel) => {
        // const channels = []
        // 数组的 find 方法：遍历数组，把符合条件的第1个元素返回
        return (
          this.myChannels.findIndex((myChannel) => {
            return myChannel.id === channel.id;
          }) === -1
        );
        // return channels
      });
    },
  },

  watch: {},

  created() {
    this.loadAllChannels();
  },

  mounted() {},

  methods: {
    // 拿到所有频道数据
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels();
        // console.log(data);
        this.allChannels = data.data.channels;
      } catch (err) {
        this.$toast("获取所有频道列表数据失败！");
      }
    },
    // 给频道推荐中的频道注册点击事件
    async onAddChannel(channel) {
      // 将频道项添加到我的频道中
      this.myChannels.push(channel);
      try {
        // 数据持久化处理
        if (this.user) {
          // 如果已登录，则将数据存储到线上
          await addUserChannels({
            id: channel.id,
            seq: this.myChannels.length,
          });
          console.log('数据存储成功');
        } else {
          // 如果未登录，则存储到本地
          setItem("TOUTIAO_CHANNEL", this.myChannels);
        }
      } catch (err) {
        // console.log(err);
        this.$toast('数据存储失败，请稍后重试!')
      }
    },
    // 给我的频道中的频道注册点击事件
    onChannelClick(channel, index) {
      if (this.isEditShow) {
        // 编辑状态时，执行删除操作
        // 如果是固定频道，则不删除
        // includes()方法用来判断一个数组是否包含一个指定的值,如果是返回 true,否则false
        if (this.fixedChannels.includes(channel.id)) {
          return;
        }
        // 删除频道项
        this.myChannels.splice(index, 1);

        // 如果删除的是激活频道之前的频道，则更新激活的频道项
        if (index <= this.active) {
          this.$emit("update-active", this.active - 1, true);
        }
      } else {
        // 非编辑状态时，执行切换频道操作
        // 子传父
        this.$emit("update-active", index, false);
      }

      this.deleteChannel(channel);
    },
    // 封装我的频道中删除频道项数据持久化处理函数
    async deleteChannel(channel) {
      try {
        if (this.user) {
        // 如果已登录，则将数据存储到线上
        await deleteUserChannels(channel.id)
      } else {
        // 如果未登录，则存储到本地
        setItem("TOUTIAO_CHANNEL", this.myChannels);
      }
      } catch (err) {
        this.$toast('删除数据失败，请稍后重试!')
      }

    },
  },
};
</script>

<style lang="less" scoped>
.van-popup {
  .channel-edit {
    padding: 80px 0 0 0;
    .van-cell {
      .van-cell__title {
        font-size: 32px;
        color: #333;
        line-height: 58px;
      }
      .van-button {
        width: 104px;
        height: 48px;
        font-size: 26px;
        top: -4px;
        border: 1px solid #f85a5a;
      }
    }
    .van-cell::after {
      border-bottom: 0;
    }
    .van-grid {
      /deep/ .grid-item {
        margin-bottom: 30px !important;
        margin-top: 0 !important;
        width: 160px;
        height: 86px;
        border-radius: 6px;
        .van-grid-item__content {
          background-color: #f4f5f6;
          .van-grid-item__icon-wrapper {
            position: unset;
            .van-icon-close {
              font-size: 30px;
              position: absolute;
              right: -15px;
              top: -15px;
            }
          }
          .van-grid-item__text {
            font-size: 28px;
            color: #222;
            // 文字不换行
            white-space: nowrap;
          }
          span {
            font-size: 28px;
            color: #222;
            // 文字不换行
            white-space: nowrap;
          }
          .active {
            color: #f85a5a;
          }
        }

        .van-grid-item__content--surround::after {
          border-width: 0;
        }
      }
    }
    .recommend-channel {
      /deep/ .grid-item {
        .van-grid-item__content {
          flex-direction: row;
          .add-o {
            font-size: 30px;
            padding-right: 6px;
          }
        }
      }
    }
  }
}
</style>