<template>
  <div class="container mx-auto">
    <div>
      <div v-if="isLoading">
        <CommonShareLoader />
      </div>
      <div class="py-0 px-2 md:py-0 md:px-0" v-else>
        <div v-if="orders && orders.length" class="px-2">
          <div class="pt-0">
            <ProfileHeading  title="My Orders" />
          </div>
          <div class="py-4">
            <table>
            <tr>
              <th class="">Product name</th>
              <th class=""> Total</th>
              <th class="">Status</th>
              <th class="">Order place time</th>
            </tr>
            <tr v-for="(order, i) in orders" :key="i">
              <td class="">{{ order.item_title }}</td>
              <td class="">{{ order.total }}</td>
              <td class="">{{ order.status }}</td>
              <td class="">{{ humanReadableTime(order.created_at) }}</td>
            </tr>
          </table>
          </div>
        </div>
        <div class="pt-8" v-else>
          <ProfileHeading  title="My Orders" />
          <CommonAlert  type="warning">No Orders found</CommonAlert>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import $api from "~~/src/composables/useRequest";
import { useAuthStore } from "~/stores/auth";
import ProfileHeading from "~/components/common/ProfileHeading.vue";

const isLoading = ref(false);
const orders = ref([]);

const authStore = useAuthStore();

onMounted(() => {
  setTimeout(() => {
    init();
  }, 100);
});
const init = async () => {
  isLoading.value = true;
  const { data, pending, error } = await $api.get("/orders");
  if (error && error._value) {
    console.log(error);
    if (error._value.status === 401) {
      await authStore.logout();
    }
  } else {
    orders.value = [...data.value.data].reverse();
  }
  isLoading.value = false;
};

init();
</script>

<style scoped>
.left-border {
  border-left: 3px solid black;
}

table {
  font-family: arial, Lato;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
