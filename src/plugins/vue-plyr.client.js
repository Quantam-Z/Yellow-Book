import {defineNuxtPlugin} from '#app';
import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VuePlyr, {
        plyr: {}, // Add Plyr options if needed
    });
});