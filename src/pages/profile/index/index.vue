<template>
    <div>
        <div class="py-0 md:py-0 px-2 md:px-0">
            <CommonCardsProfile />
        </div>
    </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});

</script>

<style lang="scss" scoped></style>