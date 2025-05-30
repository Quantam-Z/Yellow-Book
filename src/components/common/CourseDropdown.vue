<template>
  <div>
    <div>
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
              class="text-[20px] inline-flex w-full justify-center rounded-lg font-medium text-black duration-200">
            <!-- <Icon name="fa6-solid:graduation-cap" style="color: #007acc !important" class="pt-2" /> -->
            <NuxtLink to="/courses" class="text-[18px]">কোর্স</NuxtLink>
            <Icon name="mdi-light:chevron-down" size="30" class="ml-2" />
          </MenuButton>
        </div>

        <transition enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0">
          <MenuItems
              class="absolute  mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="px-1 py-1">
              <MenuItem v-for="( item, i ) in  category " :key="i" v-slot="{ active }">
                <div class="my-4">
                  <NuxtLink @click="close"  :to="`/courses/category/${item.slug}`" class="text-[18px] py-4">{{ item.title }}</NuxtLink>
                </div>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useAuthStore } from "~/stores/auth";
import $api from "~~/src/composables/useRequest";

const authStore = useAuthStore();
const route = useRoute();
const isActive = ref(false);
const isLoading = ref(false);
const category = ref([]);
const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};


// method
const init = async () => {
  isLoading.value = true;
  const { data, pending, error } = await $api.get("course-category");
  if (error && error._value) {
    console.log(error);
  } else {
    category.value = data.value.data;
  }
  isLoading.value = false;
};

init();


/* watch */
watch(route, function (nv, ov) {
  isActive.value = false;
});


</script>


<style lang="scss" scoped>
.router-link-active {
  color: #007acc;
  font-weight: 600;
}

a:hover {
  color: #007acc;
}
</style>

