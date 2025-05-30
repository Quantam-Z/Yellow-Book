<template>
  <div class="px-2 md:px-0">
    <div class="pt-0">
      <ProfileHeading  title="Edit Profile" />
    </div>
    <div class="bg-[white] border-dashed border-4 border-gray-300">
      <form class="container mx-auto px-8">
      <h2 class="mt-4 text-base font-semibold  leading-7 text-gray-900">
        User Information
      </h2>
      <div class="mt-8 grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label for="name" class="block mb-2 text-sm  font-medium text-black">Username</label>
          <input v-model="userDetails.name" id="name" name="name" type="name" autocomplete="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#F2F7FB] dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus: dark:focus:border-[#3b6b53]"
            required />
          <p v-if="errors.name && errors.name.length">
            <small class="text-red-500">{{ errors.name }}</small>
          </p>
        </div>
        <div>
          <label for="phone" class="block mb-2 text-sm  font-medium text-black">Phone number</label>
          <input :disabled="true"  v-model="userDetails.phone" type="text" name="phone" id="phone" autocomplete="phone"
            class="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#F2F7FB] dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
          <p v-if="errors.phone && errors.phone.length">
            <small class="text-red-500">{{ errors.phone }}</small>
          </p>
        </div>
        <div>
          <label for="guardian_phone" class="block mb-2 text-sm  font-medium text-black">Guardian Phone number</label>
          <input  v-model="userDetails.guardian_phone" type="text" name="guardian_phone" id="guardian_phone" autocomplete="guardian_phone"
            class="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#F2F7FB] dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus: dark:focus:border-[#3b6b53]"
            placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
          <p v-if="errors.guardian_phone && errors.guardian_phone.length">
            <small class="text-red-500">{{ errors.guardian_phone }}</small>
          </p>
        </div>
        <div>
          <label for="website" class="block mb-2 text-sm  font-medium text-black">Password</label>
          <input v-model="password" placeholder="Password" type="password" name="password" id="password"
            autocomplete="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#3b6b53] focus:border-blue-500 block w-full p-2.5 dark:bg-[#F2F7FB] dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-[#3b6b53] dark:focus:border-[#3b6b53]"
            required />
          <p v-if="errors.password && errors.password.length">
            <small class="text-red-500">{{ errors.password }}</small>
          </p>
        </div>
        <div>
          <label for="website" class="block mb-2 text-sm  dark:focus:border-[#3b6b53] font-medium text-black">Upload your photo</label>
          <common-aws-file-upload @photoUploaded="photo = $event" />
        </div>
        <div class="flex gap-2" v-if="user.image">
          Old Photo:
          <img class="h-[100px] w-[100px]" :src="user.image?.link ? user?.image?.link : '/images/no_image.jpg'" />
        </div>
      </div>
      <div class="py-4 flex justify-center">
        <button @click="submitData"
          class=" text-white hover:bg-[#618b81] focus:ring-4 focus:outline-none focus:ring-[#3b6b53] font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-[#3b6b53] rounded-md">
          Submit
        </button>
      </div>
    </form>
    </div>

    <!-- confirm modal -->
    <CommonModalConfirmAsk @trueAction="trueAction($event)" @falseAction="falseAction($event)"
      @profileAction="takeProfileAction($event)" text="Do you want to change it?" :isOpen="isOpen"
      :payLoad="userDetails" />
  </div>
</template>

<script setup>
import $api from "~~/src/composables/useRequest";
import { useAuthStore } from "~~/src/stores/auth";
import ProfileHeading from "~/components/common/ProfileHeading.vue";

definePageMeta({
  middleware: ["auth"],
});

const { user } = useAuthStore();
const isOpen = ref(false);
const password = ref("");
const photo = ref("");
const oldPhoto = ref(user.image);
const errors = ref({});

let userDetails = ref({
  name: user.name,
  email: user.email,
  institution: user.institution,
  educational_session: user.educational_session,
  guardian_phone: user.guardian_phone,
  phone: user.phone,
  _method: "PUT",
});

/* emit function receive boolean */
const trueAction = (evn) => {
  isOpen.value = false;
  errors.value = evn;
};
const falseAction = (evn) => {
  isOpen.value = evn;
};

const takeProfileAction = (event) => {
  photo.value = "";
  window.location.reload();
};

const submitData = async (e) => {
  e.preventDefault();
  if (password.value && password.value.length) {
    userDetails.value["password"] = password.value;
  }
  if (photo.value && photo.value.length) {
    userDetails.value["image"] = photo.value;
  }
  isOpen.value = true;
};
</script>

<style lang="scss" scoped>
.left-border {
  border-left: 3px solid #007acc;
}
</style>
