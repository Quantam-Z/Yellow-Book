<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <label class="text-sm font-semibold text-[#424242]">Work email</label>
      <input
        v-model="email"
        type="email"
        inputmode="email"
        autocomplete="email"
        placeholder="you@example.com"
        :disabled="sendingCode || verifyingCode"
        class="w-full h-12 px-4 rounded-lg border border-[#dbe7ff] focus:outline-none focus:ring-2 focus:ring-[#fcc207] text-sm placeholder:text-[#9e9e9e]"
      />
    </div>

    <button
      type="button"
      class="w-full h-12 rounded-lg bg-[#fcc207] text-[#212121] font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
      :disabled="sendingCode || !isEmailValid"
      @click="sendCode"
    >
      <span>{{ sendingCode ? 'Sending...' : 'Send Code' }}</span>
    </button>

    <div v-if="step === 'code'" class="flex flex-col gap-2">
      <label class="text-sm font-semibold text-[#424242]">Verification code</label>
      <input
        v-model="verificationCode"
        type="text"
        inputmode="numeric"
        maxlength="6"
        placeholder="Enter 6-digit code"
        :disabled="verifyingCode"
        class="w-full h-12 px-4 rounded-lg border border-[#dbe7ff] focus:outline-none focus:ring-2 focus:ring-[#fcc207] tracking-[0.4em] text-center text-lg"
        @keyup.enter.prevent="verifyCode"
      />
      <button
        type="button"
        class="w-full h-12 rounded-lg bg-[#212121] text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
        :disabled="verifyingCode || !isCodeValid"
        @click="verifyCode"
      >
        <span>{{ verifyingCode ? 'Verifying...' : 'Verify & Login' }}</span>
      </button>
      <p v-if="debugCode" class="text-xs text-[#616161] text-center">
        Test code: <span class="font-mono font-semibold">{{ debugCode }}</span>
      </p>
    </div>

    <p
      v-if="statusMessage"
      :class="[
        statusMessage.type === 'error' ? 'text-red-500' : 'text-green-600',
        'text-sm text-center',
      ]"
    >
      {{ statusMessage.text }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { storeToRefs } from 'pinia'

const props = defineProps({
  initialEmail: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['authenticated'])

const authStore = useAuthStore()
const { pendingChallenge, isAuthenticated, user } = storeToRefs(authStore)

const email = ref('')
const verificationCode = ref('')
const sendingCode = ref(false)
const verifyingCode = ref(false)
const statusMessage = ref(null)
const debugCode = ref(null)
const step = ref('email')

const isEmailValid = computed(() => /\S+@\S+\.\S+/.test(email.value.trim()))
const isCodeValid = computed(() => verificationCode.value.trim().length === 6)

const resetStatus = () => {
  statusMessage.value = null
}

const sendCode = async () => {
  if (!isEmailValid.value) return
  sendingCode.value = true
  resetStatus()
  debugCode.value = null
  try {
    const response = await authStore.requestEmailCode({ email: email.value })
    step.value = 'code'
    verificationCode.value = ''
    debugCode.value = response?.debug?.code ?? null
  } catch (error) {
    statusMessage.value = {
      type: 'error',
      text: error?.statusMessage || error?.message || 'Failed to send code',
    }
  } finally {
    sendingCode.value = false
  }
}

const verifyCode = async () => {
  if (!isCodeValid.value) return
  verifyingCode.value = true
  resetStatus()
  try {
    await authStore.verifyEmailCode({
      email: email.value,
      code: verificationCode.value,
    })
    emit('authenticated', user.value)
  } catch (error) {
    statusMessage.value = {
      type: 'error',
      text: error?.statusMessage || error?.message || 'Invalid verification code',
    }
  } finally {
    verifyingCode.value = false
  }
}

watch(
  () => props.initialEmail,
  (value) => {
    if (value && !email.value) {
      email.value = value
    }
  },
  { immediate: true },
)

watch(
  pendingChallenge,
  (challenge) => {
    if (challenge?.email) {
      email.value = challenge.email
      step.value = 'code'
    } else if (!verifyingCode.value) {
      step.value = 'email'
    }
  },
  { immediate: true },
)

watch(isAuthenticated, (authed) => {
  if (authed) {
    statusMessage.value = {
      type: 'success',
      text: 'You are signed in!',
    }
  }
})
</script>
