<template>
    <div class="pt-[120px] h-full bg-[#f1f6f5]">
        <div class=" container mx-auto">
            <!-- Profile Side Nav Section -->
            <div class="w-full text-center   md:flex justify-center items-center">
                <div v-for="(nav, i) in navLink" :key="i">
                    <div class="px-4 ">
                        <div class="pt-4 md:pt-8">
                            <nuxt-link :to="`/profile/${nav.slug}`"
                            class=" w-full md:py-4 rounded-xl text-[16px] lg:text-[20px] hover:text-[#3b6b53]">
                            <Icon :name="nav.icon" /> {{ nav.title }}
                        </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Profile Content View Section -->
            <div class=" w-full h-full">
                <div class="md:px-4">
                    <NuxtPage />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ["auth"],
});
const navLink = [
    { title: "প্রোফাইল", slug: "", icon: "line-md:account" },
    //   { title: "My Schedules", slug: "Schedules", icon:"line-md:calendar"},
    { title: "আমার কোর্স সমূহ", slug: "my-course", icon: "line-md:grid-3-filled" },
    //   { title: "My E-Books", slug: "my-ebook", icon:"line-md:text-box" },
    { title: "প্রোফাইল এডিট", slug: "edit-profile", icon: "line-md:pencil-twotone-alt" },
    { title: "আমার অর্ডার সমূহ", slug: "order", icon: "line-md:telegram" },
    //   { title: "Schedules", slug: "schedules", icon: "material-symbols:calendar-month-outline-rounded"},
];
const goBack = () => {
    window.history.go(-1)
}
</script>

<style lang="scss" scoped>
.router-link-active {
    color: #3b6b53;
}
</style>