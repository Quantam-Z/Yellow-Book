<template>
    <section class="h-screen flex justify-center items-center">
        <div class="">
            <section class="timer-container">
                <p class="text-[40px] text-center text-white mb-4 leading-3">Brain-buzz</p>
                <p class="text-[40px] text-center text-white mb-4">ব্রেনবাজ আসছে...</p>
                <section class="timer flex justify-center items-center md:justify-end">
                    <div class="flex gap-4 md:gap-12">
                        <Clock label="Days" :value="days" />
                        <Clock label="Hours" :value="hours" />
                        <Clock label="Minutes" :value="minutes" />
                        <Clock label="Seconds" :value="seconds" />
                    </div>
                </section>
            </section>
        </div>
    </section>
</template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Clock from './Clock.vue';

const days = ref('00');
const hours = ref('00');
const minutes = ref('00');
const seconds = ref('00');
let interval;

const startTimer = () => {
    const countDownDate = new Date('December 20, 2023 00:00:00').getTime();

    interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const day = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const second = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            clearInterval(interval);
        } else {
            days.value = day;
            hours.value = hour;
            minutes.value = minute;
            seconds.value = second;
        }
    }, 1000);
};

onMounted(() => {
    startTimer();
});

onBeforeUnmount(() => {
    clearInterval(interval);
});
</script>
<style></style>
  