<template>
  <div class="user-profile">
    <van-nav-bar
      class="profile-title"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" hidden ref="file" @change="onFileChange" />

    <van-cell
      center
      title="头像"
      value="内容"
      is-link
      @click="$refs.file.click()"
    >
      <van-image round fit="cover" :src="userProfile.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="userProfile.name"
      is-link
      @click="isEditNameShow = true"
    />
    <van-cell
      title="性别"
      :value="userProfile.gender === 0 ? '男' : '女'"
      is-link
      @click="isEditGenderShow = true"
    />
    <van-cell
      title="生日"
      :value="userProfile.birthday"
      is-link
      @click="isEditBirthdayShow = true"
    />

    <!-- 修改昵称弹层 -->
    <van-popup
      class="name-popup"
      v-if="isEditNameShow"
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <edit-name v-model="userProfile.name" @close="isEditNameShow = false" />
    </van-popup>
    <!-- /修改昵称弹层 -->

    <!-- 修改性别弹层 -->
    <van-popup
      v-if="isEditGenderShow"
      v-model="isEditGenderShow"
      position="bottom"
    >
      <edit-gender
        v-if="isEditGenderShow"
        v-model="userProfile.gender"
        @close="isEditGenderShow = false"
      />
    </van-popup>
    <!-- /修改性别弹层 -->

    <!-- 修改生日弹层 -->
    <van-popup
      v-if="isEditBirthdayShow"
      v-model="isEditBirthdayShow"
      position="bottom"
    >
      <edit-birthday
        v-if="isEditBirthdayShow"
        v-model="userProfile.birthday"
        @close="isEditBirthdayShow = false"
      />
    </van-popup>
    <!-- /修改生日弹层 -->

    <!-- 修改头像弹层 -->

    <van-popup
      v-model="isEditAvatarShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <edit-avatar
        v-if="isEditAvatarShow"
        :img="img"
        @close="isEditAvatarShow = false"
        @update-photo="UserProfile.photo = $event"
      />
    </van-popup>
    <!-- /修改头像弹层 -->
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
import EditName from "@/views/user-profile/components/edit-name.vue";
import EditGender from "@/views/user-profile/components/edit-gender.vue";
import EditBirthday from "@/views/user-profile/components/edit-birthday.vue";
import EditAvatar from "@/views/user-profile/components/edit-avatar.vue";

export default {
  name: "UserProfile",

  components: {
    EditName,
    EditGender,
    EditBirthday,
    EditAvatar,
  },

  props: {},

  data() {
    return {
      userProfile: {}, // 用户资料
      isEditNameShow: false, // 控制"修改昵称弹层"是否显示
      isEditGenderShow: false, // 控制"修改性别弹层"是否显示
      isEditBirthdayShow: false, // 控制"修改生日弹层"是否显示
      img: null,
      isEditAvatarShow: false, // 控制"修改头像弹层"是否显示
    };
  },

  computed: {},

  watch: {},

  created() {
    this.loadUserProfile();
  },

  mounted() {},

  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile();
        // console.log(data);
        this.userProfile = data.data;
      } catch (err) {
        this.$toast.fail("获取信息失败");
      }
    },
    onFileChange() {
      const file = this.$refs.file.files[0];
      // console.log(file);
      this.img = window.URL.createObjectURL(file);

      this.isEditAvatarShow = true;
    },
  },
};
</script>

<style lang="less" scoped>
.user-profile {
  /deep/.van-nav-bar .van-icon {
    color: #fff;
  }
  /deep/.van-cell {
    align-items: center;
    justify-content: center;
    .van-image__img {
      width: 60px;
      height: 60px;
    }
  }
  .name-popup {
    background-color: #f5f7f9;
  }
}
</style>