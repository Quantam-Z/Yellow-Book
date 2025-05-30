<template>
  <div class="pt-[100px] md:pt-[130px] container fluid mx-auto">
    <div>
      <p class="text-center text-[24px] text-[#3b6b53] md:text-[32px] font-[600]  ">যোগাযোগ করুন</p>
      <hr/>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:items-start items-center">
      <div class="flex flex-col justify-start pt-6">
        <p class="text-[20px] md:text-[26px] text-center font-[600]  text-[#2b2b2b]">আমাদের একটি বার্তা পাঠান</p>
        <img class="lg:h-[500px]" src="/contact.svg" />
      </div>
      <div class="md:px-0 px-3 md:pt-20 pt-4">
        <div>
          <FormKit v-model="contactInfo.name" type="text" name="name" placeholder="Enter Your Name"
                   validation="required|name" help="" />
          <p v-if="errors.name && errors.name.length">
            <small class="text-red-500">{{ errors.name[0] }}</small>
          </p>
        </div>
        <div>
          <FormKit v-model="contactInfo.phone" type="tel" name="phone"
                   placeholder="Enter Your Mobile Number" validation="required|text|matches:/^01[3-9]\d{8}$/" help="" />
          <p v-if="errors.phone && errors.phone.length">
            <small class="text-red-500">{{ errors.phone[0] }}</small>
          </p>
        </div>
        <div>
          <FormKit v-model="contactInfo.subject" type="text" name="subject" placeholder="Enter Subject"
                   validation="required|text" help="" />
          <p v-if="errors.subject && errors.subject.length">
            <small class="text-red-500">{{ errors.subject[0] }}</small>
          </p>
        </div>
        <div>
          <FormKit v-model="contactInfo.message" type="textarea" rows="5" name="message"
                   placeholder="Type Your Message"  validation="required|text" />
          <p v-if="errors.message && errors.message.length">
            <small class="text-red-500">{{ errors.message[0] }}</small>
          </p>
        </div>
        <div class=" py-8">
          <button  class="bg-[#3b6b53] rounded-md text-[#ffffff] px-5 py-2 text-[18px] font-[600] "  @click="submitContactData()">যোগাযোগ করুন</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import $api from '~~/src/composables/useRequest';


const isLoading = ref(false);
const errors = ref({});
const contactInfo = ref({
  name: null,
  phone: null,
  subject: null,
  message: ''
})

const submitContactData = async ()=> {
  isLoading.value = true;
  const info = {
    name: contactInfo.value.name,
    phone: contactInfo.value.phone,
    subject: contactInfo.value.subject,
    message: contactInfo.value.message
  };
  const { data, pending, error } = await $api.post('contact-us', info)
  if(error && error._value){
    if (error._value?.statusCode === 422) {
      errors.value = error.value.data
    }
  } else {
    console.log(error.value)
    alert('Your contact information send to company profile');
    location.reload()
  }
}




</script>

<style lang="scss" scoped></style>