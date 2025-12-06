<template>
  <section class="space-y-6">
    <header
      class="rounded-2xl border border-whitesmoke bg-white p-6 sm:p-8 shadow-[0px_0px_15px_rgba(0,0,0,0.04)] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <div>
        <h1 class="text-2xl font-extrabold text-gray-900">Settings</h1>
        <p class="text-sm text-gray-600 mt-1">
          Control notifications, privacy, and connected apps. Every change is synced across devices.
        </p>
      </div>
      <div class="flex flex-wrap gap-3">
        <button
          type="button"
          class="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          @click="restoreDefaults"
          :disabled="isSaving"
        >
          Reset to defaults
        </button>
        <button
          type="button"
          class="rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-gray-900 shadow-md"
          @click="saveSettings"
          :disabled="isSaving || !hasChanges"
        >
          {{ isSaving ? 'Saving…' : 'Save changes' }}
        </button>
      </div>
    </header>

    <div class="grid gap-6 xl:grid-cols-[2fr,1fr]">
      <form class="flex flex-col gap-6" @submit.prevent="saveSettings">
        <section class="rounded-2xl border border-whitesmoke bg-white p-6 sm:p-8 shadow-[0px_0px_15px_rgba(0,0,0,0.04)] space-y-6">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">Notifications</h2>
            <p class="text-sm text-gray-500">Choose how you prefer to stay informed.</p>
          </div>
          <div class="space-y-5">
            <div
              v-for="item in notificationList"
              :key="item.key"
              class="flex flex-col gap-3 border-b border-gray-100 pb-5 last:border-none last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p class="font-semibold text-gray-900">{{ item.title }}</p>
                <p class="text-sm text-gray-500">{{ item.description }}</p>
              </div>
              <button
                type="button"
                class="relative inline-flex h-7 w-12 items-center rounded-full transition"
                :class="notificationSettings[item.key] ? 'bg-gold' : 'bg-gray-200'"
                role="switch"
                :aria-checked="notificationSettings[item.key]"
                @click="toggleNotification(item.key)"
              >
                <span
                  class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition"
                  :class="notificationSettings[item.key] ? 'translate-x-5' : 'translate-x-1'"
                ></span>
              </button>
            </div>
          </div>
        </section>

        <section
          class="rounded-2xl border border-whitesmoke bg-white p-6 sm:p-8 shadow-[0px_0px_15px_rgba(0,0,0,0.04)] grid gap-6 lg:grid-cols-2"
        >
          <div class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-900">Appearance</h2>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <button
                v-for="option in themeOptions"
                :key="option.value"
                type="button"
                class="rounded-2xl border px-4 py-4 text-left transition"
                :class="theme === option.value ? 'border-gray-900 shadow-lg' : 'border-gray-200 hover:border-gray-400'"
                @click="selectTheme(option.value)"
              >
                <p class="font-semibold text-gray-900">{{ option.title }}</p>
                <p class="text-xs text-gray-500">{{ option.description }}</p>
              </button>
            </div>
          </div>

          <div class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-900">Time zone</h2>
            <div>
              <label class="text-sm font-medium text-gray-600">Default time zone</label>
              <select
                v-model="timezone"
                class="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-200/80 focus:border-gray-900"
                @change="markDirty"
              >
                <option v-for="option in timezoneOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              <p class="text-xs text-gray-500 mt-2">Used for reminders, availability, and schedule blocks.</p>
            </div>
          </div>
        </section>

        <section class="rounded-2xl border border-whitesmoke bg-white p-6 sm:p-8 shadow-[0px_0px_15px_rgba(0,0,0,0.04)] space-y-6">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">Privacy</h2>
            <p class="text-sm text-gray-500">Control what others see across the marketplace.</p>
          </div>
          <div class="space-y-5">
            <div
              v-for="item in privacyList"
              :key="item.key"
              class="flex flex-col gap-3 border-b border-gray-100 pb-5 last:border-none last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p class="font-semibold text-gray-900">{{ item.title }}</p>
                <p class="text-sm text-gray-500">{{ item.description }}</p>
              </div>
              <button
                type="button"
                class="relative inline-flex h-7 w-12 items-center rounded-full transition"
                :class="privacySettings[item.key] ? 'bg-gray-900' : 'bg-gray-200'"
                role="switch"
                :aria-checked="privacySettings[item.key]"
                @click="togglePrivacy(item.key)"
              >
                <span
                  class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition"
                  :class="privacySettings[item.key] ? 'translate-x-5' : 'translate-x-1'"
                ></span>
              </button>
            </div>
          </div>
        </section>

        <div
          class="rounded-2xl border border-whitesmoke bg-white p-6 shadow-[0px_0px_15px_rgba(0,0,0,0.04)] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p class="text-sm text-gray-500">Last saved {{ formattedLastSaved }}</p>
            <p class="text-xs text-gray-400">Changes apply everywhere the account is used.</p>
          </div>
          <div class="flex gap-3">
            <button
              type="button"
              class="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
              @click="restoreDefaults"
              :disabled="isSaving"
            >
              Discard
            </button>
            <button
              type="submit"
              class="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-md disabled:opacity-60"
              :disabled="isSaving || !hasChanges"
            >
              {{ isSaving ? 'Saving…' : 'Save settings' }}
            </button>
          </div>
        </div>
      </form>

      <div class="flex flex-col gap-6">
        <section class="rounded-2xl border border-whitesmoke bg-white p-6 sm:p-8 shadow-[0px_0px_15px_rgba(0,0,0,0.04)] space-y-5">
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">Connected apps</h2>
              <button
                type="button"
                class="text-sm font-semibold text-gray-900 hover:underline"
                @click="triggerToast('info', 'App marketplace coming soon.')"
              >
                Explore
              </button>
            </div>
            <p class="text-sm text-gray-500">Manage integrations and revoke access if needed.</p>
          </div>
          <ul class="divide-y divide-gray-100">
            <li
              v-for="app in connectedApps"
              :key="app.id"
              class="py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p class="font-semibold text-gray-900">{{ app.name }}</p>
                <p class="text-sm text-gray-500">{{ app.description }}</p>
                <p class="text-xs text-gray-400 mt-1">Last used {{ app.lastUsed }}</p>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold"
                  :class="app.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'"
                >
                  {{ app.status }}
                </span>
                <button
                  v-if="app.status !== 'Disconnected'"
                  type="button"
                  class="font-semibold text-red-600"
                  @click="disconnectApp(app.id)"
                >
                  Disconnect
                </button>
                <span v-else class="text-xs text-gray-400">Disconnected</span>
              </div>
            </li>
            <li v-if="!connectedApps.length" class="py-8 text-center text-sm text-gray-500">
              No active integrations.
            </li>
          </ul>
        </section>

        <section class="rounded-2xl border border-whitesmoke bg-white p-6 sm:p-8 shadow-[0px_0px_15px_rgba(0,0,0,0.04)] space-y-5">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Login security</h2>
            <p class="text-sm text-gray-500">End sessions you no longer recognize.</p>
          </div>
          <ul class="space-y-4">
            <li
              v-for="session in sessions"
              :key="session.id"
              class="flex flex-col gap-2 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p class="font-semibold text-gray-900">{{ session.device }}</p>
                <p class="text-sm text-gray-500">{{ session.location }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ session.lastActive }}</p>
              </div>
              <div class="flex items-center gap-3">
                <span
                  v-if="session.current"
                  class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
                >
                  Current device
                </span>
                <button
                  v-else
                  type="button"
                  class="text-sm font-semibold text-red-600"
                  @click="signOutSession(session.id)"
                >
                  Sign out
                </button>
              </div>
            </li>
          </ul>
          <button
            type="button"
            class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition"
            @click="triggerToast('success', 'Backup codes sent to your inbox.')"
          >
            Generate backup codes
          </button>
        </section>

        <section class="rounded-2xl border border-red-100 bg-red-50 p-6 sm:p-8 space-y-4">
          <div>
            <h2 class="text-lg font-semibold text-red-900">Danger zone</h2>
            <p class="text-sm text-red-700">Transfer ownership or delete your account permanently.</p>
          </div>
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              class="rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-700 hover:bg-red-100 transition"
              @click="triggerToast('info', 'Export link sent to curtis.weaver@example.com')"
            >
              Export data
            </button>
            <button
              type="button"
              class="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-md"
              @click="deleteAccount"
            >
              Delete account
            </button>
          </div>
        </section>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 z-50 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg"
        :class="toast.type === 'success' ? 'bg-green-600' : toast.type === 'info' ? 'bg-gray-900' : 'bg-red-600'"
      >
        {{ toast.message }}
      </div>
    </transition>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, reactive, ref } from 'vue'

const createNotificationState = () => ({
  product: true,
  reminders: false,
  marketing: false,
  security: true,
})

const createPrivacyState = () => ({
  discoverable: true,
  shareActivity: false,
  directMessages: true,
})

const notificationSettings = reactive(createNotificationState())
const privacySettings = reactive(createPrivacyState())

const notificationList = [
  {
    key: 'product',
    title: 'Product updates',
    description: 'Announcements when we ship new releases or features.',
  },
  {
    key: 'reminders',
    title: 'Reminders',
    description: 'Meeting reminders and task nudges sent to your inbox.',
  },
  {
    key: 'marketing',
    title: 'Tips & marketing',
    description: 'Research-backed playbooks, podcasts, and curated best practices.',
  },
  {
    key: 'security',
    title: 'Security alerts',
    description: 'Be alerted whenever we notice an unusual login attempt.',
  },
]

const privacyList = [
  {
    key: 'discoverable',
    title: 'Profile discoverable',
    description: 'Allow agencies to find your profile in search.',
  },
  {
    key: 'shareActivity',
    title: 'Share activity status',
    description: 'Show when you were last active inside workrooms.',
  },
  {
    key: 'directMessages',
    title: 'Allow direct messages',
    description: 'Companies can message you directly about new projects.',
  },
]

const themeOptions = [
  { value: 'system', title: 'System', description: 'Match device preference' },
  { value: 'light', title: 'Light', description: 'Bright surfaces and shadows' },
  { value: 'dark', title: 'Dark', description: 'Dimmed UI for low light' },
]

const timezoneOptions = [
  'GMT-7 (Pacific Time)',
  'GMT-5 (Eastern Time)',
  'GMT+1 (Central European Time)',
  'GMT+5:30 (India Standard Time)',
]

const theme = ref('system')
const timezone = ref(timezoneOptions[0])
const hasChanges = ref(false)
const isSaving = ref(false)
const lastSavedAt = ref(new Date())

const formattedLastSaved = computed(() =>
  lastSavedAt.value.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }),
)

const connectedApps = ref([
  {
    id: 1,
    name: 'Slack',
    description: 'Send shortlist updates to the #hiring channel.',
    status: 'Active',
    lastUsed: '2 days ago',
  },
  {
    id: 2,
    name: 'HubSpot',
    description: 'Sync qualified leads to your CRM automatically.',
    status: 'Active',
    lastUsed: '5 hours ago',
  },
  {
    id: 3,
    name: 'Google Drive',
    description: 'Store contracts, decks, and collaterals securely.',
    status: 'Paused',
    lastUsed: '14 days ago',
  },
])

const sessions = ref([
  {
    id: 1,
    device: 'Chrome · macOS',
    location: 'Los Angeles, USA',
    lastActive: 'Active now',
    current: true,
  },
  {
    id: 2,
    device: 'Safari · iPhone 15',
    location: 'San Diego, USA',
    lastActive: 'Yesterday · 6:12 PM',
    current: false,
  },
  {
    id: 3,
    device: 'Edge · Windows 11',
    location: 'Chicago, USA',
    lastActive: 'Aug 12 · 09:01 AM',
    current: false,
  },
])

const toast = reactive({
  show: false,
  type: 'success',
  message: '',
})
let toastTimer

const triggerToast = (type, message) => {
  toast.type = type
  toast.message = message
  toast.show = true
  if (toastTimer) {
    clearTimeout(toastTimer)
  }
  toastTimer = setTimeout(() => {
    toast.show = false
  }, 2600)
}

const markDirty = () => {
  hasChanges.value = true
}

const toggleNotification = key => {
  notificationSettings[key] = !notificationSettings[key]
  markDirty()
}

const togglePrivacy = key => {
  privacySettings[key] = !privacySettings[key]
  markDirty()
}

const selectTheme = value => {
  if (theme.value === value) return
  theme.value = value
  markDirty()
}

const saveSettings = () => {
  if (isSaving.value || !hasChanges.value) return
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    hasChanges.value = false
    lastSavedAt.value = new Date()
    triggerToast('success', 'Settings saved successfully!')
  }, 1000)
}

const restoreDefaults = () => {
  Object.assign(notificationSettings, createNotificationState())
  Object.assign(privacySettings, createPrivacyState())
  theme.value = 'system'
  timezone.value = timezoneOptions[0]
  hasChanges.value = false
  triggerToast('success', 'Settings restored to defaults.')
}

const disconnectApp = id => {
  const target = connectedApps.value.find(app => app.id === id)
  if (!target) return
  target.status = 'Disconnected'
  triggerToast('info', `${target.name} disconnected.`)
}

const signOutSession = id => {
  sessions.value = sessions.value.filter(session => session.id !== id)
  triggerToast('info', 'Session signed out successfully.')
}

const deleteAccount = () => {
  triggerToast('danger', 'Account deletion is disabled in this preview.')
}

onBeforeUnmount(() => {
  if (toastTimer) {
    clearTimeout(toastTimer)
  }
})
</script>

<style scoped>
.border-whitesmoke {
  border-color: #f5f5f5;
}

.bg-gold {
  background-color: #ffd700;
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
