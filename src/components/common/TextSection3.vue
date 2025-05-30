<template>
    <div>
        <div v-if="loading">
            <CommonShareLoader />
        </div>
        <div v-else class="bg-[#F9F9F9]">
            <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 p-8 rounded-3xl">
                <h1 class="text-[24px] md:text-[30px]  flex items-center  font-[600]  text-black ">{{
                    item.title }}</h1>
                <div class="md:pt-0 pt-8">
                    <h3 class="text-black text-[20px] hidden md:block ">কোর্স ইন্সট্রাক্টর</h3>
                    <div class="set_border">
                        <div v-if="item.instructors && item.instructors.length"
                            class="px-4 py-6 flex justify-between items-center text-black">
                            <div v-for="(ins, i) in item.instructors.slice(0, 1)" :key="i" class="flex items-center">
                                <img class="h-[70px] rounded-[40px]" :src="ins.image ? ins.image.link : '/author/user.png'">
                                <div class="pl-2">
                                    <p class="text-[16px] md:text-[22px] font-[400] ">{{ ins.name }}</p>
                                    <p class="text-[14px] md:text-[18px] font-[300] ">{{ ins.designation }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
const props = defineProps({
    item: {
        type: Object,
        default: {},
    },
    loading: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: "",
    },
});

const linkTo = () => {
    return props.item;
};
</script>
  
<style lang="scss" scoped>
.set_border {
    border: 1px solid #0C8CE9;
}

.paybtn {
    background-color: #2563eb;
    color: white !important;
    padding: 4.5px 10px;
    margin: 0px;
    border-radius: 5px;
    text-decoration: none;
}

.designation {
    line-break: anywhere;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
}

a {
    color: blue;
    text-decoration: underline;
}

@media only screen and (max-width: 600px) {
    .designation {
        line-break: anywhere;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /* number of lines to show */
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }
}
</style>
  