<template>
  <Popover class="fixed w-full shadow-xl bg-[#ffffff] z-50">
    <!-- Web View Navigation Bar -->
    <div class="px-2 md:px-6 py-0">
      <Container>
        <div class="flex justify-between items-center w-full py-2  gap-x-2 md:space-x-10">
          <div class="-my-2 -mr-2 md:hidden">
            <PopoverButton
              class="inline-flex items-center justify-center focus:outline-none">
              <span class="sr-only">Open menu</span>
              <Icon name="ic:sharp-menu" color="#150E72" class="h-8 w-8"></Icon>
            </PopoverButton>
          </div>
          <div class="">
            <NuxtLink to="/">
              <Logo />
              <span class="sr-only">karigori Pathshala</span>
            </NuxtLink>
          </div>
          <div class="">
            <PopoverGroup as="nav" class="hidden space-x-10 md:flex items-center justify-center">
              <template v-for="(nv, n) in navigationLinks" :key="n">
                <NuxtLink :to="nv.link"
                  class="nav text-[16px] md:text-[18px] lg:text-[18px]  text-black hover:text-gray-900">{{ nv.title }}
                </NuxtLink>
              </template>
            </PopoverGroup>
          </div>

          <div class="flex gap-x-4 items-center">
            <a href="tel:+8801921214910"
              class="bg-[#E8E7F2] hover:bg-[#D9D8E8] p-2 md:p-3 flex items-center justify-center rounded-[4px] cursor-pointer transition-colors duration-200"
              aria-label="Call +880 1921-214910">
              <Icon name="ic:outline-local-phone" size="" color="#150E72" class="h-6 w-6" />
            </a>

            <div class="">
              <div v-if="authStore.token">
                <CommonUserMenuDropdown />
              </div>
              <div v-else>
                <NuxtLink to="/auth/login">
                  <button
                    class="px-4 py-2 md:py-3 bg-[#150E72] text-white rounded-[4px] font-semibold text-[18px] hover:bg-[#3a008a] transition-colors duration-200">
                    লগইন
                  </button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>



    <!-- Second Header for mobile  -->
    <div class="block md:hidden">
      <PopoverGroup as="nav" class="flex space-x-6 items-center justify-center py-2">
        <!-- Category items -->
        <template v-if="category && category.length">
          <template v-for="(item, i) in category.slice(0,2)" :key="`cat-${i}`">
            <Popover v-if="item.children && item.children.length" class="relative">
              <PopoverButton class="text-sm  flex items-center hover:text-gray-800 transition-colors">
                {{ item.title }}
                <Icon name="material-symbols:keyboard-arrow-down-rounded" class="h-5 w-5 ml-1 text-gray-500" />
              </PopoverButton>

              <PopoverPanel class="absolute z-10 bg-white p-3 mt-2 rounded-md shadow-lg min-w-[200px]">
                <div class="grid gap-2">
                  <NuxtLink v-for="(child, j) in item.children" :key="`child-${j}`"
                    :to="`/courses/category/${child.slug}`"
                    class="text-sm px-2 py-1.5 hover:bg-gray-50 rounded transition-colors">
                    {{ child.title }}
                  </NuxtLink>
                </div>
              </PopoverPanel>
            </Popover>

            <!-- No children: show as regular link -->
            <NuxtLink v-else :to="`/courses/category/${item.slug}`"
              class="text-sm hover:text-gray-800 transition-colors">
              {{ item.title }}
            </NuxtLink>
          </template>
        </template>

        <!-- Other navigation links -->
        <template v-for="(nv, n) in mobileNavigationLinks" :key="`nav-${n}`">
    <NuxtLink
      :to="nv.link"
      class="text-sm hover:text-gray-800 transition-colors"
    >
      {{ nv.title }}
    </NuxtLink>
  </template>
      </PopoverGroup>
    </div>





    <!-- Mobile View Navigation Bar -->
    <transition enter-active-class="duration-200 ease-out transform" enter-from-class="opacity-0 -translate-x-full"
      enter-to-class="opacity-100 translate-x-0" leave-active-class="duration-200 ease-in transform"
      leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 -translate-x-full">

      <PopoverPanel focus
        class="absolute  inset-y-0 right-0 w-full h-screen origin-right transition bg-[#eee]  md:hidden"
        v-slot="{ close }">
        <div class="rounded-lg bg-[#eee]">
          <div class="px-5 pt-5 pb-6">
            <div class="flex items-center justify-between">
              <div>
                <Logo class-name="h-12 w-auto" />
              </div>
              <div class="-mr-2">
                <!-- Navigation Close menu -->
                <PopoverButton
                  class="inline-flex items-center justify-center rounded-md bg-gray-200  p-2 text-red-600 hover:bg-gray-200 focus:outline-none">
                  <span class="sr-only">Close menu</span>
                  <Icon name="ion:close-round" class="h-6 w-6" />
                </PopoverButton>
              </div>
            </div>
            <div class="mt-0 p-[30px]">
              <!-- Mobile Navigation links -->
              <div :class="authStore.token ? 'grid grid-cols-2' : 'grid grid-cols-1'">
                <nav class="grid gap-y-8">
                  <!-- Dropdown -->
                  <div class="flex items-center">
                    <CourseDropdown @close="close()" />
                  </div>
                  <!-- Dynamic Navigation Links -->
                  <template v-for="(nv, n) in navigationLinks" :key="n">
                    <div class="flex items-center">
                      <!-- Link or Button -->
                      <NuxtLink v-if="nv.link" :to="nv.link" @click="close()"
                        class="text-lg font-bold text-white hover:text-gray-900">
                        {{ nv.title }}
                      </NuxtLink>
                      <button v-else @click="openModal"
                        :class="`text-lg text-left ${isActive ? 'text-blue-500 font-medium' : 'text-white'} font-bold`">
                        {{ nv.title }}
                      </button>
                    </div>
                  </template>

                  <!-- Static Links with Icons -->
                  <!-- <div class="flex items-center" v-if="authStore?.user">
                    <nuxt-link @click="close()" class="text-lg text-white hover:text-gray-900 font-bold"
                      to="/profile/my-course">
                      My Courses
                    </nuxt-link>
                  </div>
                  <div class="flex items-center" v-if="authStore?.user">
                    <nuxt-link @click="close()" class="text-lg text-white hover:text-gray-900 font-bold"
                      to="/favourite-mcqs">
                      Favt. MCQ
                    </nuxt-link>
                  </div> -->

                  <!-- <div class="flex items-center">
                    <nuxt-link @click="close()" class="text-lg font-bold text-white hover:text-gray-900"
                      :to="authStore.user?.isAffiliate ? '/affiliation' : '/affiliator-registration'">
                      {{ authStore.user?.isAffiliate ? 'Affiliation' : 'Affiliation ' }}
                    </nuxt-link>
                  </div> -->
                  <!-- 
                  <div class="flex items-center" v-if="authStore?.user && authStore?.user.premium_user">
                    <nuxt-link @click="close()"
                      class="flex items-center text-lg text-black hover:text-gray-900 font-bold "
                      to="/profile/question-bank">
                      Ninja Practice
                    </nuxt-link>
                  </div> -->
                </nav>

                <!-- User Menu -->
                <!-- <div class="text-right" v-if="authStore.token">
                  <CommonUserMenuDropdown @close="close()" />
                </div> -->
              </div>
            </div>
          </div>
          <div class="space-y-6 px-[50px]">
            <div class="space-y-3">
              <div v-if="!authStore.token">
                <NuxtLink to="/auth/login">
                  <PrimaryButton text="Login" class-name="rounded-full text-[16px]"
                  icon="material-symbols:arrow-right-alt-rounded" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup>
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";
import Logo from "~/components/common/Logo.vue";
import Container from "~/components/common/Container.vue";
import PrimaryButton from "~/components/common/Buttons/PrimaryButton.vue";
import { useAuthStore } from "~/stores/auth";
import $api from "~~/src/composables/useRequest";
import CourseDropdown from "./CourseDropdown.vue";

const authStore = useAuthStore();
const route = useRoute();
const isActive = ref(false);
const noticeModalOpen = ref(false);
const open = ref(false);
const isLoading = ref(false);
const category = ref([]);
const navigationLinks = [
  { title: "হোম", link: "/", icon: "fa6-solid:house-chimney" },
  { title: "কোর্স", link: "/courses", icon: "fa6-solid:graduation-cap" },
  // { title: "Books", link: "/e-books", icon: "fa6-solid:book-open-reader" },
  // {
  //   title: "Blogs",
  //   link: "/blogs",
  //   icon: "material-symbols:keyboard-capslock-badge",
  // },
  {
    title: "নোটিশ",
    link: "/notice",
    icon: "material-symbols:circle-notifications",
  },
  { title: "আমাদের সম্পর্কে", link: "/about-us", icon: "fa6-solid:graduation-cap" },
];

const mobileNavigationLinks = [
  {
    title: "নোটিশ",
    link: "/notice",
    icon: "material-symbols:circle-notifications",
  },
];

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
.nav.router-link-active {
  color: #150E72;
  font-weight: 600;
  border-bottom: 2px solid #150E72;
}

a {
  color: black;
  font-weight: 500;
}

a:hover {
  color: #150E72;
}
</style>
