<template>
  <div class="min-h-screen bg-[#fff9e6] flex items-center justify-center px-4 py-12">
    <BuisnessReg
      :isOpen="isModalOpen"
      @close="handleClose"
      @complete="handleRegistration"
      @switchToLogin="goToLogin"
    />

    <transition name="fade">
      <div v-if="submitting" class="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white rounded-xl shadow-2xl px-6 py-5 text-center text-[#424242] max-w-sm w-full">
          <p class="text-lg font-semibold">Creating your workspace…</p>
          <p class="text-sm text-[#616161] mt-1">Simulating API response with stub data.</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BuisnessReg from '~/components/modal/buisnessReg.vue'
import { useStubClient } from '~/services/stubClient'
import { useAuthStore } from '~/stores/auth'
import { normalizeEmail } from '~/utils/authTokens'

const router = useRouter()
const stubClient = useStubClient()
const authStore = useAuthStore()
if (process.client) {
  authStore.hydrateFromStorage()
}
const nuxtApp = useNuxtApp()

const isModalOpen = ref(false)
const submitting = ref(false)

onMounted(() => {
  isModalOpen.value = true
})

const handleClose = () => {
  isModalOpen.value = false
  router.push('/')
}

const goToLogin = () => {
  isModalOpen.value = false
  router.push('/auth/login')
}

const handleRegistration = async (formData) => {
  if (submitting.value) return
  submitting.value = true
  try {
    const { userPayload, companyPayload } = buildPayload(formData)
    await upsertUser(userPayload)
    await stubClient.create('companies', companyPayload, { delay: 260 })
    await authStore.login({ email: userPayload.email })
    try {
      nuxtApp.$awn?.success('Registration completed with stub data')
    } catch {}
    await router.push('/company/dashboard')
  } catch (error) {
    console.error('Business registration failed', error)
    try {
      nuxtApp.$awn?.alert(error?.statusMessage || error?.message || 'Failed to register business')
    } catch {}
  } finally {
    submitting.value = false
  }
}

const buildPayload = (form) => {
  const email = normalizeEmail(form.email)
  if (!email) {
    throw new Error('Please provide a valid work email.')
  }
  if ((form.password || '').length < 6) {
    throw new Error('Password must be at least 6 characters.')
  }
  if (form.password !== form.confirmPassword) {
    throw new Error('Passwords do not match.')
  }
  const fullName = [form.firstName, form.lastName].filter(Boolean).join(' ').trim() || 'Business Owner'
  const today = new Date().toISOString().slice(0, 10)
  const userPayload = {
    name: fullName,
    email,
    signupMethod: 'BusinessRegistration',
    signupDate: today,
    status: 'Pending',
    verified: false,
  }
  const companyPayload = {
    name: form.companyName?.trim() || `${fullName}'s Agency`,
    website: form.website?.trim() || '',
    category: form.category || 'General',
    service: form.service || '',
    destination: form.destination || '',
    employees: form.employees || '',
    revenue: form.revenue || '',
    status: 'Pending',
    verified: false,
    mobile: form.phoneNumber ? `${form.countryCode || ''} ${form.phoneNumber}`.trim() : '',
    ownerName: fullName,
    contactEmail: email,
    signupChannel: 'Business Portal',
  }
  return { userPayload, companyPayload }
}

const upsertUser = async (payload) => {
  const users = await stubClient.list('users', { delay: 0 })
  const match = users.find((entry) => normalizeEmail(entry.email) === payload.email)
  if (match) {
    return stubClient.update('users', match.id, { ...match, ...payload }, { delay: 220 })
  }
  return stubClient.create('users', payload, { delay: 220 })
}
</script>