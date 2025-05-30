<template>
  <div class=" flex items-center justify-end">
    <div class='py-2'>
      <button @click="openModal" class="px-4 py-2 bg-[#17107F] rounded-md text-[16px] text-white font-[600]"><icon name="ep:share" size="20"></icon> Share</button>
    </div>
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
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
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex justify-between items-center">
                <p class="text-[20px]">Share Notice</p>
                <button @click="closeModal" class="text-[#17107F]"><icon name="ep:circle-close-filled" size="24" /></button>
              </div>
              <div class="">
                <hr/>
              </div>
              <div class="mt-2">
                <div class="flex gap-x-2">
                  <div  @click="shareRedirect('facebook')">
                    <img class="cursor-pointer" src="/socialIcon/facebook.svg"/>
                  </div>
                  <div @click="shareRedirect('twitter')">
                    <img class="cursor-pointer" src="/socialIcon/twitter.svg"/>
                  </div>
                  <!--                  <div @click="shareRedirect('')">-->
                  <!--                    <img src="/socialIcon/insta.svg"/>-->
                  <!--                  </div>-->
                  <div @click="shareRedirect('whatsapp')">
                    <img class="cursor-pointer" src="/socialIcon/whatsapp.svg"/>
                  </div>
                  <!--                  <div @click="shareRedirect('')">-->
                  <!--                    <img src="/socialIcon/telegram.svg"/>-->
                  <!--                  </div>-->
                </div>
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
} from '@headlessui/vue'

const props = defineProps({
  title: { type: String, default: "" },
  slug: { type: String, default: "" },
});

const shareRedirect = (type) => {
  let url = "";
  let shareUrl = `/notices/ + props.slug)}&text=${props.slug}/${props.slug}`
  if (type === "linkedin")
    url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.origin + "/notices/" + props.slug)}&title=${props.slug}`;
  else if (type === "twitter")
    url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(window.location.origin + "/notices/"  + props.slug)}&text=${props.slug}`;
  else if (type === "whatsapp")
    url = `https://api.whatsapp.com/send?text="${encodeURIComponent(window.location.origin + "/notices/"  + props.slug)}`;
  else if (type=== "facebook")
    url = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  if (url) window.open(url, "_blank");
};


const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
</script>
