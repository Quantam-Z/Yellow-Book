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
              class="w-full md:w-[30%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="pt-6 text-lg font-medium leading-6 text-[#0072BB] text-center"
              >
                {{ text }}
              </DialogTitle>

              <div class="mt-8 flex justify-center gap-8 pb-8">
                <button
                  type="button"
                  class="bg-[#FF0000] text-white rounded-md px-6 py-2"
                  @click="falseAction"
                >
                  No
                </button>
                <CommonShareBtnLoader type="confirm" v-if="isLoading" />
                <button
                  v-else
                  class="bg-[#14AE5C] text-white rounded-md px-6 py-2"
                  @click="trueAction"
                >
                  Yes
                </button>
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
import $api from "~~/src/composables/useRequest";
import { useAuthStore } from "~~/src/stores/auth";

const { setUser } = useAuthStore();
const emit = defineEmits(["falseAction", "trueAction", "profileAction"]);
const errors = ref({});
const isLoading = ref(false);

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: "",
  },
  payLoad: {
    type: Object,
    default: {},
  },
});

/* method */

const falseAction = () => {
  emit("falseAction", false);
};
const trueAction = async () => {
  errors.value = {};
  isLoading.value = true;
  const { data, pending, error, refresh } = await $api.post(
    "user",
    props.payLoad
  );
  if (error && error.value) {
    console.log(error, "error");
    errors.value = error.value.data;
  } else {
    setUser(data?.value.data);
    emit("profileAction", data?.value.data);
  }
  isLoading.value = false;
  emit("trueAction", errors.value);
};
</script>

<style lang="scss" scoped>
li {
  list-style: disc;
}
</style>
