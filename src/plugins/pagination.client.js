import { TailwindPagination } from "laravel-vue-pagination";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("TailwindPagination", TailwindPagination);
});