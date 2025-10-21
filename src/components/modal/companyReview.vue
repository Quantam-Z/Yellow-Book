<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    @click.self="closeModal"
  >
    <div
      class="bg-white rounded-lg shadow-lg border border-gray-300 w-full max-w-lg mx-4 p-6 space-y-6 transform transition-all duration-300"
    >
      <div class="text-center mb-5">
        <h2 class="text-xl font-semibold text-gray-800 capitalize mb-4">
          {{ addReviewTitle }}
        </h2>
        <StarRatingBox v-model="newReviewRating" />
      </div>

      <div class="mt-4 flex flex-col gap-4">
        <textarea
          v-model="newReviewText"
          :placeholder="reviewPlaceholder"
          class="w-full h-24 p-4 bg-gray-100 border border-gray-200 rounded-lg resize-none outline-none text-base text-gray-700 leading-relaxed focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        ></textarea>

        <button
          @click="submitReview"
          class="w-full py-3 bg-amber-500 text-white font-semibold rounded-md capitalize cursor-pointer transition-colors hover:bg-amber-600"
        >
          {{ submitText }}
        </button>

        <button
          @click="closeModal"
          class="w-full py-2 text-gray-600 font-medium rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";
// CORRECTED IMPORT: Assuming the path should be relative to common or an alias like @/components/common/StarRatingBox.vue
// Using a common relative path here, adjust if your project structure is different
import StarRatingBox from "../common/StarRatingBox.vue"; 

const emit = defineEmits(["close", "submit"]);

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  addReviewTitle: { type: String, default: "Add Your Review" },
  reviewPlaceholder: { type: String, default: "Write your review here..." },
  submitText: { type: String, default: "Submit Review" },
});

const newReviewRating = ref(0);
const newReviewText = ref("");

const closeModal = () => {
  emit("close");
};

const submitReview = () => {
  if (!newReviewText.value.trim() || newReviewRating.value === 0) {
    alert("Please provide a rating and review text!");
    return;
  }
  emit("submit", {
    rating: newReviewRating.value,
    text: newReviewText.value,
  });
  // Reset state after successful submission
  newReviewText.value = "";
  newReviewRating.value = 0;
  closeModal();
};
</script>