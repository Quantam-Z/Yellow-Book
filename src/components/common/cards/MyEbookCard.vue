<template>
    <div class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div v-for="(item, i) in ebooks" :key="i">
            <NuxtLink :to="`/my-ebooks/${item.slug}`">
                <div class="w-[150px] md:w-[240px] rounded-2xl">
                    <div>
                        <img class="rounded-t-2xl h-[150px] w-full" :src=" item?.image?.link ? item.image.link : '/images/no_image.jpg'">
                    </div>
                    <div class="p-2 bg-[#F6F8FC] rounded-b-2xl max-h-[50px] w-[150px] md:w-[240px]">
                        <p class="text-[16px] md:text-[20px] text-center">{{ item.title }}</p>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    ebooks: {
        type: Array,
        default: [],
    },
});
</script>

<style lang="scss" scoped></style>