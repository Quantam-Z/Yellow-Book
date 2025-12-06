<template>
  <div class="min-h-screen bg-white-50 p-4">
    <div
      class="w-full rounded-xl border border-gray-200 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 p-4 sm:p-6 shadow-lg mb-4 sm:mb-6"
    >
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">My Profile</h1>
          <p class="text-sm text-gray-600 mt-1">
            Manage your personal information, contact details, and account security from one place.
          </p>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <span class="inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
          Profile completeness 82%
        </div>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 sm:gap-4 mb-6">
      <button
        type="button"
        @click="activeSection = 'profile'"
        class="px-3 py-2 sm:px-6 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap border"
        :class="
          activeSection === 'profile'
            ? 'bg-gold text-gray-900 border-gold shadow-md'
            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 shadow-sm'
        "
      >
        Profile Info
      </button>
      <button
        type="button"
        @click="activeSection = 'password'"
        class="px-3 py-2 sm:px-6 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap border"
        :class="
          activeSection === 'password'
            ? 'bg-gold text-gray-900 border-gold shadow-md'
            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 shadow-sm'
        "
      >
        Security
      </button>
    </div>

    <div v-if="activeSection === 'profile'" class="space-y-6">
      <div class="grid gap-6 lg:grid-cols-[minmax(0,320px),1fr]">
        <section
          class="rounded-2xl border border-whitesmoke bg-white p-6 shadow-[0px_0px_15px_rgba(0,0,0,0.04)] flex flex-col gap-6"
        >
          <div class="flex flex-col items-center text-center gap-4">
            <div class="relative">
              <img
                :src="profileForm.avatar"
                alt="Profile avatar"
                class="h-28 w-28 rounded-2xl object-cover shadow-lg"
              />
              <label
                class="absolute -bottom-2 -right-2 flex cursor-pointer items-center rounded-full bg-gold px-3 py-1 text-xs font-semibold text-gray-900 shadow-lg"
              >
                Change
                <input type="file" class="hidden" accept="image/*" @change="onAvatarChange" />
              </label>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900">{{ fullName || 'Your name' }}</h2>
              <p class="text-sm text-gray-500">
                {{ profileForm.jobTitle }}<span v-if="profileForm.company"> • {{ profileForm.company }}</span>
              </p>
            </div>
          </div>

          <dl class="grid grid-cols-1 gap-4 text-sm text-gray-600">
            <div>
              <dt class="font-semibold text-gray-900">Location</dt>
              <dd>{{ profileForm.location }}</dd>
            </div>
            <div>
              <dt class="font-semibold text-gray-900">Time zone</dt>
              <dd>{{ profileForm.timeZone }}</dd>
            </div>
            <div>
              <dt class="font-semibold text-gray-900">Contact</dt>
              <dd>{{ profileForm.phone }}</dd>
            </div>
          </dl>

          <div class="rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
            <p class="font-semibold text-gray-900 mb-1">Account status</p>
            <p>Professional plan • Active since 2019</p>
          </div>
        </section>

        <form
          class="rounded-2xl border border-whitesmoke bg-white p-6 sm:p-8 shadow-[0px_0px_15px_rgba(0,0,0,0.04)] space-y-6"
          @submit.prevent="updateProfile"
        >
          <div class="space-y-6">
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
              <label class="flex flex-col gap-2 text-sm font-medium text-gray-600">
                First name
                <div>
                  <input
                    v-model="profileForm.firstName"
                    type="text"
                    class="w-full rounded-xl border px-4 py-3 text-sm bg-white transition focus:outline-none focus:ring-2"
                    :class="profileErrors.firstName ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-gray-200/80 focus:border-gray-900'"
                    placeholder="Jane"
                    autocomplete="given-name"
                  />
                  <p v-if="profileErrors.firstName" class="mt-1 text-xs text-red-500">{{ profileErrors.firstName }}</p>
                </div>
              </label>
              <label class="flex flex-col gap-2 text-sm font-medium text-gray-600">
                Last name
                <div>
                  <input
                    v-model="profileForm.lastName"
                    type="text"
                    class="w-full rounded-xl border px-4 py-3 text-sm bg-white transition focus:outline-none focus:ring-2"
                    :class="profileErrors.lastName ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-gray-200/80 focus:border-gray-900'"
                    placeholder="Cooper"
                    autocomplete="family-name"
                  />
                  <p v-if="profileErrors.lastName" class="mt-1 text-xs text-red-500">{{ profileErrors.lastName }}</p>
                </div>
              </label>
              <label class="flex flex-col gap-2 text-sm font-medium text-gray-600">
                Email
                <div>
                  <input
                    v-model="profileForm.email"
                    type="email"
                    class="w-full rounded-xl border px-4 py-3 text-sm bg-white transition focus:outline-none focus:ring-2"
                    :class="profileErrors.email ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-gray-200/80 focus:border-gray-900'"
                    placeholder="you@example.com"
                    autocomplete="email"
                  />
                  <p v-if="profileErrors.email" class="mt-1 text-xs text-red-500">{{ profileErrors.email }}</p>
                </div>
              </label>
              <label class="flex flex-col gap-2 text-sm font-medium text-gray-600">
                Phone
                <div>
                  <input
                    v-model="profileForm.phone"
                    type="tel"
                    class="w-full rounded-xl border px-4 py-3 text-sm bg-white transition focus:outline-none focus:ring-2"
                    :class="profileErrors.phone ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-gray-200/80 focus:border-gray-900'"
                    placeholder="+1 (555) 000-0000"
                    autocomplete="tel"
                  />
                  <p v-if="profileErrors.phone" class="mt-1 text-xs text-red-500">{{ profileErrors.phone }}</p>
                </div>
              </label>
              <label class="flex flex-col gap-2 text-sm font-medium text-gray-600">
                Job title
                <input
                  v-model="profileForm.jobTitle"
                  type="text"
                  class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-gray-200/80 focus:border-gray-900"
                  placeholder="Product Designer"
                />
              </label>
              <label class="flex flex-col gap-2 text-sm font-medium text-gray-600">
                Company
                <input
                  v-model="profileForm.company"
                  type="text"
                  class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-gray-200/80 focus:border-gray-900"
                  placeholder="Acme Inc"
                />
              </label>
              <label class="flex flex-col gap-2 text-sm font-medium text-gray-600">
                Location
                <input
                  v-model="profileForm.location"
                  type="text"
                  class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-gray-200/80 focus:border-gray-900"
                  placeholder="Los Angeles, USA"
                />
              </label>
              <label class="flex flex-col gap-2 text-sm font-medium text-gray-600">
                Time zone
                <input
                  v-model="profileForm.timeZone"
                  type="text"
                  class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-gray-200/80 focus:border-gray-900"
                  placeholder="GMT-7"
                />
              </label>
            </div>

            <label class="flex flex-col gap-2 text-sm font-medium text-gray-600">
              Bio
              <textarea
                v-model="profileForm.bio"
                rows="4"
                class="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm resize-y bg-white transition focus:outline-none focus:ring-2 focus:ring-gray-200/80 focus:border-gray-900"
                placeholder="Tell others a little about yourself"
              ></textarea>
            </label>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-sm text-gray-500">Last updated {{ formattedProfileSavedAt }}</p>
            <div class="flex items-center gap-3">
              <button
                type="button"
                class="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                @click="resetProfileForm"
                :disabled="profileSaving"
              >
                Reset
              </button>
              <button
                type="submit"
                class="rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-gray-900 shadow-md flex items-center gap-2 disabled:opacity-70"
                :disabled="profileSaving"
              >
                <svg v-if="profileSaving" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <span>{{ profileSaving ? 'Saving…' : 'Save changes' }}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <form
        class="rounded-2xl border border-whitesmoke bg-white p-6 sm:p-8 shadow-[0px_0px_15px_rgba(0,0,0,0.04)] space-y-6"
        @submit.prevent="savePreferences"
      >
        <div class="flex flex-col gap-5">
          <div
            v-for="item in preferenceList"
            :key="item.key"
            class="flex flex-col gap-4 border-b border-gray-100 pb-5 last:border-none last:pb-0 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p class="font-semibold text-gray-900">{{ item.title }}</p>
              <p class="text-sm text-gray-500">{{ item.description }}</p>
            </div>
            <button
              type="button"
              class="relative inline-flex h-7 w-12 items-center rounded-full transition"
              :class="preferenceForm[item.key] ? 'bg-gold' : 'bg-gray-200'"
              role="switch"
              :aria-checked="preferenceForm[item.key]"
              @click="togglePreference(item.key)"
            >
              <span
                class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition"
                :class="preferenceForm[item.key] ? 'translate-x-5' : 'translate-x-1'"
              ></span>
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-sm text-gray-500">
            {{ preferenceTouched ? 'Unsaved changes' : 'Preferences synced' }}
          </p>
          <div class="flex gap-3">
            <button
              type="button"
              class="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
              @click="resetPreferences"
              :disabled="preferenceSaving"
            >
              Reset
            </button>
            <button
              type="submit"
              class="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-md disabled:opacity-60"
              :disabled="preferenceSaving || !preferenceTouched"
            >
              {{ preferenceSaving ? 'Saving…' : 'Save preferences' }}
            </button>
          </div>
        </div>
      </form>
    </div>

    <div v-else class="space-y-6">
      <form
        class="rounded-2xl border border-whitesmoke bg-white p-6 sm:p-8 shadow-[0px_0px_15px_rgba(0,0,0,0.04)] space-y-6"
        @submit.prevent="updatePassword"
      >
        <div class="space-y-5">
          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label class="flex flex-col gap-2 text-sm font-medium text-gray-600 md:col-span-2">
              Current password
              <div class="relative">
                <input
                  v-model="passwordForm.current"
                  :type="passwordVisibility.current ? 'text' : 'password'"
                  class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-gray-200/80 focus:border-gray-900 pr-16"
                  autocomplete="current-password"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500"
                  @click="passwordVisibility.current = !passwordVisibility.current"
                >
                  {{ passwordVisibility.current ? 'Hide' : 'Show' }}
                </button>
              </div>
            </label>
            <label class="flex flex-col gap-2 text-sm font-medium text-gray-600">
              New password
              <div class="relative">
                <input
                  v-model="passwordForm.next"
                  :type="passwordVisibility.next ? 'text' : 'password'"
                  class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-gray-200/80 focus:border-gray-900 pr-16"
                  autocomplete="new-password"
                  minlength="8"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500"
                  @click="passwordVisibility.next = !passwordVisibility.next"
                >
                  {{ passwordVisibility.next ? 'Hide' : 'Show' }}
                </button>
              </div>
            </label>
            <label class="flex flex-col gap-2 text-sm font-medium text-gray-600">
              Confirm new password
              <div class="relative">
                <input
                  v-model="passwordForm.confirm"
                  :type="passwordVisibility.confirm ? 'text' : 'password'"
                  class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-gray-200/80 focus:border-gray-900 pr-16"
                  autocomplete="new-password"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500"
                  @click="passwordVisibility.confirm = !passwordVisibility.confirm"
                >
                  {{ passwordVisibility.confirm ? 'Hide' : 'Show' }}
                </button>
              </div>
            </label>
          </div>

          <div v-if="passwordError" class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {{ passwordError }}
          </div>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-sm text-gray-500">Passwords must be at least 8 characters long.</p>
          <button
            type="submit"
            class="rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-gray-900 shadow-md disabled:opacity-70"
            :disabled="passwordSaving"
          >
            {{ passwordSaving ? 'Updating…' : 'Update password' }}
          </button>
        </div>
      </form>

      <section
        class="rounded-2xl border border-whitesmoke bg-white p-6 sm:p-8 shadow-[0px_0px_15px_rgba(0,0,0,0.04)]"
      >
        <h3 class="text-lg font-semibold text-gray-900">Security checklist</h3>
        <p class="text-sm text-gray-500 mt-1">Higher scores keep your account safe.</p>
        <ul class="mt-4 space-y-3 text-sm text-gray-700">
          <li v-for="(tip, index) in passwordChecklist" :key="index" class="flex items-start gap-3">
            <span class="mt-1 inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            <span>{{ tip }}</span>
          </li>
        </ul>
      </section>
    </div>

    <transition name="fade">
      <div
        v-if="showMessage"
        class="fixed top-4 right-4 rounded-lg p-4 text-white transition-all duration-300 z-50 shadow-xl"
        :class="messageType === 'success' ? 'bg-green-500' : 'bg-red-500'"
      >
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              v-if="messageType === 'success'"
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            ></path>
            <path
              v-else
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>{{ messageText }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, reactive, ref } from 'vue'

const activeSection = ref('profile')
const showMessage = ref(false)
const messageType = ref('success')
const messageText = ref('')
let toastTimeout

const createProfileState = () => ({
  firstName: 'Wade',
  lastName: 'Warren',
  email: 'curtis.weaver@example.com',
  phone: '+1 (702) 555-0102',
  jobTitle: 'Lead Product Designer',
  company: 'Artemis Studio',
  location: 'Los Angeles, USA',
  timeZone: 'GMT-7 (Pacific Time)',
  bio: 'Multi-disciplinary designer focused on building inclusive, data-informed experiences across web and mobile.',
  avatar:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80',
})

const profileForm = reactive(createProfileState())
const profileErrors = ref({})
const profileSaving = ref(false)
const profileLastSavedAt = ref(new Date())

const fullName = computed(() => `${profileForm.firstName} ${profileForm.lastName}`.trim())
const formattedProfileSavedAt = computed(() =>
  profileLastSavedAt.value.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }),
)

const passwordForm = reactive({
  current: '',
  next: '',
  confirm: '',
})
const passwordVisibility = reactive({
  current: false,
  next: false,
  confirm: false,
})
const passwordSaving = ref(false)
const passwordError = ref('')

const passwordChecklist = [
  'Use at least 8 characters and include unique phrases',
  'Add a mix of uppercase letters, numbers, and symbols',
  'Avoid re-using passwords from other sites',
  'Enable two-factor authentication from account settings',
]

const preferenceList = [
  {
    key: 'productEmails',
    title: 'Product updates via email',
    description: 'Be notified when we ship new features and templates.',
  },
  {
    key: 'smsReminders',
    title: 'SMS reminders',
    description: 'Receive reminders about upcoming calls or demos.',
  },
  {
    key: 'loginAlerts',
    title: 'Login alerts',
    description: 'Get a notification when we detect a new device login.',
  },
  {
    key: 'weeklyDigest',
    title: 'Weekly insights digest',
    description: 'A curated summary with metrics, leads, and best practices.',
  },
]

const createPreferenceState = () => ({
  productEmails: true,
  smsReminders: false,
  loginAlerts: true,
  weeklyDigest: false,
})

const preferenceForm = reactive(createPreferenceState())
const preferenceSaving = ref(false)
const preferenceTouched = ref(false)

const showToast = (type, text) => {
  messageType.value = type
  messageText.value = text
  showMessage.value = true
  if (toastTimeout) {
    clearTimeout(toastTimeout)
  }
  toastTimeout = setTimeout(() => {
    showMessage.value = false
  }, 2600)
}

const validateProfileForm = () => {
  const errors = {}
  if (!profileForm.firstName.trim()) errors.firstName = 'First name is required.'
  if (!profileForm.lastName.trim()) errors.lastName = 'Last name is required.'
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(profileForm.email)) errors.email = 'Enter a valid email address.'
  if (!profileForm.phone.trim()) errors.phone = 'Phone number is required.'
  profileErrors.value = errors
  return Object.keys(errors).length === 0
}

const updateProfile = () => {
  if (profileSaving.value) return
  if (!validateProfileForm()) {
    showToast('error', 'Please fix the highlighted fields.')
    return
  }
  profileSaving.value = true
  setTimeout(() => {
    profileSaving.value = false
    profileLastSavedAt.value = new Date()
    showToast('success', 'Profile updated successfully!')
  }, 1100)
}

const resetProfileForm = () => {
  Object.assign(profileForm, createProfileState())
  profileErrors.value = {}
  showToast('success', 'Profile reverted to the last saved state.')
}

const onAvatarChange = event => {
  const file = event?.target?.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = e => {
    const url = e.target?.result
    if (url) {
      profileForm.avatar = url
    }
  }
  reader.readAsDataURL(file)
  event.target.value = ''
}

const togglePreference = key => {
  preferenceForm[key] = !preferenceForm[key]
  preferenceTouched.value = true
}

const resetPreferences = () => {
  Object.assign(preferenceForm, createPreferenceState())
  preferenceTouched.value = false
}

const savePreferences = () => {
  if (preferenceSaving.value || !preferenceTouched.value) return
  preferenceSaving.value = true
  setTimeout(() => {
    preferenceSaving.value = false
    preferenceTouched.value = false
    showToast('success', 'Preferences saved successfully!')
  }, 900)
}

const updatePassword = () => {
  if (passwordSaving.value) return
  passwordError.value = ''
  if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) {
    passwordError.value = 'All password fields are required.'
    showToast('error', passwordError.value)
    return
  }
  if (passwordForm.next.length < 8) {
    passwordError.value = 'New password must be at least 8 characters.'
    showToast('error', passwordError.value)
    return
  }
  if (passwordForm.next !== passwordForm.confirm) {
    passwordError.value = 'Password confirmation does not match.'
    showToast('error', passwordError.value)
    return
  }
  if (passwordForm.next === passwordForm.current) {
    passwordError.value = 'Choose a password different from your current one.'
    showToast('error', passwordError.value)
    return
  }
  passwordSaving.value = true
  setTimeout(() => {
    passwordSaving.value = false
    passwordForm.current = ''
    passwordForm.next = ''
    passwordForm.confirm = ''
    showToast('success', 'Password updated successfully!')
  }, 1200)
}

onBeforeUnmount(() => {
  if (toastTimeout) {
    clearTimeout(toastTimeout)
  }
})
</script>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.border-whitesmoke {
  border-color: #f5f5f5;
}

.border-silver {
  border-color: #c0c0c0;
}

.text-darkgray {
  color: #a9a9a9;
}

.text-darkslategray {
  color: #2f4f4f;
}

.bg-gold {
  background-color: #ffd700;
}

.bg-whitesmoke {
  background-color: #f5f5f5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
