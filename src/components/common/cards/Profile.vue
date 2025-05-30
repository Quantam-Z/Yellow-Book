<template>
  <div>
    <div v-if="isLoading">
      <CommonShareLoader />
    </div>
    <div v-else>
      <div class="grid grid-cols-1 gap-y-4">
        <div class="pt-0">
          <ProfileHeading  title="Profile" />
        </div>
        <div class="h-full py-8 bg-[#FFFFFF] border-dashed border-4 border-gray-300">
          <div class="flex justify-center">
            <img class="h-[130px] rounded-md profile" :src="user.image?.link ? user?.image?.link : '/images/no_image.jpg'" />
          </div>
          <div class="pt-4">
              <p class=" text-[20px] md:text-[28px] text-[#3b6b53] text-center">{{ user?.name }}</p>
              <p class=" text-[16px] md:text-[20px] text-center">{{ user?.role }}</p>
              <p class=" text-[16px] md:text-[20px] text-center">{{ user?.phone }}</p>
              <p class=" text-[16px] md:text-[20px] text-center">{{ user?.email }}</p>
          </div>
        </div>
        <!-- Profile -->
        <!-- <div class="h-full p-4 flex gap-6 w-full rounded-lg bg-[#FFFFFF]">
          <div class=" ">
            <img class="h-[100px] w-full rounded-md profile"
              :src="user.image?.link ? user?.image?.link : '/images/no_image.jpg'" />
          </div>
          <div>
            <p class="text-[22px]">
              {{ user?.name }}
              <Icon color="blue" name="material-symbols:check-circle-sharp" />
            </p>
            <p class="text-[22px]">
              {{ user?.name }}
              <Icon
                :color="user?.email_verified_at !== null ? 'blue' : 'red'"
                :name="
                  user?.email_verified_at !== null
                    ? 'material-symbols:check-circle-sharp'
                    : 'carbon:close-filled'
                "
              />
            </p>
            <p class="text-[16px]">
              <span class="text-[#8FD2FD]">ID: </span>{{ user?.id }}
            </p>
            <button @click="verifyEmail" class="text-red-600 underline" v-if="user.email_verified_at === null">
              verify your email
            </button>
            <span v-if="isSectionLoading" class="ml-2">Sending email.......</span>
          </div>
        </div> -->
        <!-- <Alert class="py-2 my-1" v-if="successMessage" type="success">
          {{ successMessage }}
        </Alert> -->
        <!-- Basic Information -->
        <!-- <div class="max-h-[180px] py-2 w-full rounded-lg bg-[#FFFFFF]">
          <p class="text-[22px] px-8 text-justify">Basic Information</p>
          <div class="flex px-8 py-4 justify-between">
            <div>
              <p class="text-[14px] text-[#0072BB]">Name</p>
              <p class="text-[14px] text-[#0072BB]">Profession</p>
              <p class="text-[14px] text-[#0072BB]">Phone Number</p>
            </div>
            <div>
              <p class="text-[14px]">{{ user?.name }}</p>
              <p class="text-[14px]">{{ user?.role }}</p>
              <p class="text-[14px]">{{ user?.phone }}</p>
            </div>
          </div>
        </div> -->
        <!-- Contact Information -->
      </div>
    </div>
  </div>
</template>

<script setup>
import $api from "~/composables/useRequest";
import { throwFormError } from "~/composables/useCommon";
import Alert from "~/components/common/Alert.vue";
import { useAuthStore } from "~/stores/auth";
import ProfileHeading from "~/components/common/ProfileHeading.vue";

const authStore = useAuthStore();

const isLoading = ref(false);
const isSectionLoading = ref(false);
const successMessage = ref("");
const user = ref({});
// method
onMounted(() => {
  setTimeout(() => {
    init();
  }, 100);
});
const init = async () => {
  isLoading.value = true;
  const { data, pending, error } = await $api.get("/user");
  if (error && error._value) {
    console.log(error);
    if (error._value.status === 401) {
      await authStore.logout();
    }
  } else {
    user.value = data.value.data;
  }
  isLoading.value = false;
};

const verifyEmail = async () => {
  isSectionLoading.value = true;
  const formData = new FormData();
  formData.append("redirect_link", window.location.host + "/auth/verify-email");

  const options = {
    showSuccess: true,
    showError: true,
    successMessage:
      "An Email with email verify link has been sent to your email address!",
  };
  const { data, pending, error, refresh } = await $api.post("send-email-verification-link", formData, options);

  if (error.value) {
    throwFormError(error.value);
  } else {
    if (data.value?.status === "success") {
      successMessage.value = data.value?.message || "";
    }
  }
  isSectionLoading.value = false;
};
</script>

<style lang="scss" scoped>
.profile {
  box-shadow: 5px 5px 5px 0px rgb(103, 96, 109);
}
</style>
