<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full md:w-[70%] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="bg-yellow-400 px-2 py-2">
                <div class="flex justify-between">
                  <h1>oh my god</h1>
                  <button
                    @click="closeModal"
                    class="bg-red-500 font-extrabold text-white px-2 rounded-md"
                  >
                    X
                  </button>
                </div>
              </DialogTitle>
              <div class="px-2 py-3">
                <p>image</p>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
const isOpen = ref(false);

/* method */

const closeModal = () => {
  isOpen.value = false;
};
</script>

<style lang="scss" scoped>
li {
  list-style: disc;
}
</style>
