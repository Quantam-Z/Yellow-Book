<template>
  <div>
    <Menu as="div" class="relative inline-block text-left">
      <div v-if="authStore.user">
        <MenuButton
          class="flex items-center justify-center space-x-2 rounded-md bg-[#150E72] px-4 py-1 md:py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-[#0D4061] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >

        <div v-if="authStore.user.image?.link">
          <img 
            :src="authStore.user.image?.link" 
            alt="User profile" 
            class="h-8 w-8 rounded-full border-2 border-white"
          >
        </div>
        <div v-else>
          <img 
            src="https://bellfund.ca/wp-content/uploads/2018/03/demo-user.jpg" 
            alt="User profile" 
            class="h-8 w-8 rounded-full border-2 border-white"
          >
        </div>

          <span class="hidden sm:inline-block">{{ authStore.user.name }}</span>
          <Icon 
            name="mdi-light:chevron-down" 
            size="20" 
            class="hidden sm:inline-block text-white/80 transition-transform duration-200 group-hover:rotate-180" 
          />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-xl ring-1 ring-black/5 focus:outline-none"
        >
          <div class="p-1">
            <MenuItem 
              v-for="link in links" 
              v-slot="{ active }"
              as="template"
            >
              <button
                @click="$router.push(link.to); $emit('close')"
                :class="[
                  active ? 'bg-[#150E72]/10 text-[#150E72]' : 'text-gray-700',
                  'group flex w-full items-center rounded-md px-3 py-2.5 text-sm transition-colors',
                ]"
              >
                <Icon
                  :name="link.icon"
                  size="20"
                  class="mr-3 text-[#150E72]"
                />
                {{ link.label }}
              </button>
            </MenuItem>
          </div>
          <div class="p-1">
            <MenuItem v-slot="{ active }" as="template">
              <button
                :class="[
                  active ? 'bg-red-50 text-red-600' : 'text-red-500',
                  'group flex w-full items-center rounded-md px-3 py-2.5 text-sm transition-colors',
                ]"
                @click="authStore.logout()"
              >
                <Icon name="mdi-light:logout" size="20" class="mr-3" />
                লগ আউট
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

const links = [
  { 
    to: "/profile", 
    label: "প্রোফাইল", 
    icon: "mdi-light:account" 
  }
];
</script>