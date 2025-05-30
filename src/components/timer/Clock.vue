<template>
    <section class="flex flex-col justify-center items-center rounded-md set_bgc w-20 h-20 md:w-32 md:h-32">
        <p class="text-[26px] md:text-[60px] py-0 my-0 font-[100px] font-['Titillium Web' 'Lato'] leading-tight">{{ value }}</p>
        <p class=" py-0 my-0 ">{{ label }}</p>
    </section>
</template>
  
<script>
export default {
    props: {
        label: String,
        value: String,
    },
};
</script>

<style>

.set_bgc{
    background-color: #8eadfa79;
    color: white;
}
</style>