<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
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
              class="w-full md:w-[40%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="font-medium leading-6 text-[20px] text-[#007acc] text-center"
              >
              আপনি কি পরীক্ষায় অংশগ্রহণ করতে নিশ্চিত?
              </DialogTitle>
              <div class="mt-6 px-5">
                <ul v-for="(it, i) in fakedata" :key="i">
                  <li class="text-[18px] text-[#2B2B2B]">{{ it }}</li>
                </ul>
              </div>

              <div class="mt-8 flex justify-center gap-8">
                <button
                  type="button"
                  class="bg-[#FF0000] text-[20px] text-white rounded-md px-6 py-2"
                  @click="closeModal"
                >
                বাতিল 
                </button>
                <nuxt-link
                  :to="`/exam/${exam.exam.id}`"
                  type="button"
                  class="bg-[#14AE5C] text-[20px] text-white rounded-md px-6 py-2"
                  @click="startExam"
                >
                কনফার্ম 
                </nuxt-link>
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

const emit = defineEmits(["closeModal"]);

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  exam: {
    type: Object,
    default: {},
  },
});
const fakedata = [
  "পরীক্ষায় অংশগ্রহণ করার আগে নিরবিচ্ছিন্ন ইন্টারনেট সংযোগ নিশ্চিত করে নিন।",
  "পরীক্ষায় অংশগ্রহণ করলে, আপনি আর আগের পেজে ফিরে আসতে পারবেন না।",
  "আপনি যদি পরীক্ষা শেষ হওয়ার আগে বাতিল করেন তবে আপনি আর পরীক্ষা দিতে পারবেন না।",
  "পরীক্ষা চলাকালীন সময়ে ব্রাউজারের অন্য ট্যাবে গেলে অথবা ব্রাউজার মিনিমাইজ করলে পরীক্ষা বাতিল হয়ে যাবে।",
  "নির্ধারিত সময়ের মধ্যে পরীক্ষা দেওয়া শেষ করতে হবে।",
  "পরীক্ষার জন্য নির্ধারিত সময় শেষ হয়ে গেলে পরীক্ষা শেষ হয়ে যাবে।"
];

/* method */

const closeModal = () => {
  emit("closeModal", false);
};
</script>

<style lang="scss" scoped>
li {
  list-style: disc;
}
</style>
