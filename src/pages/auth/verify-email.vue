<template>
  <div class="container mx-auto pt-[120px]">
    <div v-if="loading">
      <LazyCommonShareLoader/>
      <p>Your Email is being verified. Please wait!</p>
    </div>
    <div class="flex justify-center">
      <div v-if="!loading">
        <Alert v-if="status === 'success' || status === 'error'" :type="status === 'success' ? 'success' : 'danger'">
          {{ message }}
        </Alert>
      </div>
    </div>
  </div>
</template>

<script setup>
import $api from "~~/src/composables/useRequest";
import Alert from "~/components/common/Alert.vue";
import {useAuthStore} from "~/stores/auth";

const route = useRoute()
const _token = route.query.token
const message = ref('')
const status = ref('')
const loading = ref(true);

const authStore = useAuthStore();

const {data, pending, error, refresh} = await $api.post('verify-email', {token: _token});
if (error && error._value) {
  console.log(error);
} else {
  if (data.value.status === 'success') {
    message.value = data.value.message
    status.value = data.value.status
    authStore.setEmailVerified()
  } else {
    status.value = data.value.status
    message.value = data.value.message
  }

}
loading.value = false;
// refresh();
</script>

<style lang="scss" scoped></style>