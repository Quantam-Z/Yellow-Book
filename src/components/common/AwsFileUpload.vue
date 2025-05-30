<template>
  <div class="file-upload">
    <div>
      <div>
        <input
            type="file"
            @change="upload"
            :multiple="multiple"
            :accept="accept"
            :placeholder="label"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#F2F7FB] dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
    <div class="w3-light-grey mt-1.5" v-if="imageSelected">
      <div v-if="Math.ceil(uploadPercentage) < 100" style="height: 25px; background: red; text-align: center; display: flex; justify-content: center; align-items: center;">
        <strong class="text-white">{{ Math.ceil(uploadPercentage) }}% Uploading.......</strong>
      </div>
      <div v-else style="height: 25px; background: green; text-align: center; display: flex; justify-content: center; align-items: center;">
        <strong class="text-white">{{ Math.ceil(uploadPercentage) }}%</strong>
      </div>
    </div>
  </div>
</template>

<script setup>

import $api from "~/composables/useRequest";

const complete = ref(false)
const loading = ref(false)
const isDeleting = ref(false)
let images = ref([])
const imageSelected = ref(false)
let uploadPercentage = ref(0)
let downloadPercentage = ref(0)
let uploadedPhoto = ref([])
const emit = defineEmits(['photoUploaded', 'photoDeleted'])

const props = defineProps({
  uploadPath: {type: String, default: 'image'},
  multiple: {type: Boolean, default: false},
  errorMessage: {type: [Array, String]},
  label: {type: String, default: 'Upload File'},
  accept: {type: String, default: 'image/*'},
  oldImage: {type: Object, default: () => {}},
  oldImages: {type: Array, default: () => []},
})


watch(uploadedPhoto, async (newVal, oldVal) => {
  if (newVal) emit('photoUploaded', uploadedPhoto.value)
})

const submitHandler = async () => {
  for (const fileItem of images.value) {
    await upload(fileItem)
  }
}


const upload = async (e) => {
  imageSelected.value = true
  uploadPercentage.value = 0
  const file = e.target?.files[0];
  loading.value = true
  const formData = new FormData()
  const extension = file.name.split('.').pop()

  formData.append('name', props.uploadPath + '/' + randomString(32) + '.' + extension)

  const url = 'aws-upload-url'
  let signedUrl = ''

  const {data, pending, error, refresh} = await $api.post(url, formData)
  signedUrl = data?.value?.url
  const resp = await uploadFile(signedUrl, file)

  if (props.multiple) {
    uploadedPhoto.value.push(resp ? signedUrl : null)
  } else {
    uploadedPhoto = resp ? signedUrl : null
  }

  emit('photoUploaded', uploadedPhoto)
  loading.value = false
}

const uploadFile = async (url, file = file) => {
  const xhr = new XMLHttpRequest()

  return await new Promise((resolve) => {
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        uploadPercentage.value = parseInt(Math.round((event.loaded / event.total) * 100))
      }

    })
    xhr.addEventListener('progress', (event) => {
      if (event.lengthComputable)
        downloadPercentage = parseInt(Math.round((event.loaded / event.total) * 100))
    })
    xhr.addEventListener('loadend', () => {
      resolve(xhr.readyState === 4 && xhr.status === 200)
    })
    xhr.onreadystatechange = function () {
      // if (xhr.readyState === 4 && xhr.status === 200) console.log(xhr.responseXML)
    }
    xhr.onload = function () {
      //
    }
    xhr.open('PUT', url, true)
    xhr.setRequestHeader('Content-Type', 'application/octet-stream')
    xhr.send(file)
  })
}
const randomString = (length) => {
  let result = ''

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

</script>
