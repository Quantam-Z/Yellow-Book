<template>
  <Transition name="edit-modal-fade">
    <div
      v-if="open"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/60 p-4 sm:p-6"
      @click.self="handleClose"
    >
      <div class="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl p-6 sm:p-7 font-plus-jakarta-sans">
        <button
          type="button"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-full transition"
          @click="handleClose"
          aria-label="Close edit dialog"
        >
          <X class="w-5 h-5" aria-hidden="true" />
        </button>

        <div class="mb-6">
          <h3 class="text-xl font-semibold text-gray-900 leading-tight">Edit Admin</h3>
          <p class="text-sm text-gray-500 mt-1">
            Update administrator details. Changes will take effect immediately.
          </p>
        </div>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div class="space-y-1.5">
            <label class="text-sm font-medium text-gray-700">Full name</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
              placeholder="e.g., Alex Johnson"
              required
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-sm font-medium text-gray-700">Email address</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
              placeholder="name@company.com"
              required
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-sm font-medium text-gray-700">Role</label>
              <select
                v-model="form.role"
                class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-yellow-400 cursor-pointer"
              >
                <option v-for="role in roleOptions" :key="role" :value="role">
                  {{ role }}
                </option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-medium text-gray-700">Status</label>
              <select
                v-model="form.status"
                class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-yellow-400 cursor-pointer"
              >
                <option v-for="status in statusOptions" :key="status" :value="status">
                  {{ status }}
                </option>
              </select>
            </div>
          </div>

          <label class="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 cursor-pointer select-none">
            <input
              v-model="form.verified"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
            />
            Mark as verified admin
          </label>

          <div class="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              class="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
              @click="handleClose"
              :disabled="submitting"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-5 py-2.5 rounded-lg bg-yellow-400 text-sm font-semibold text-gray-900 hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-400 transition"
              :disabled="!canSubmit || submitting"
            >
              {{ submitting ? 'Saving…' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { X } from 'lucide-vue-next'
import { useStubClient } from '~/services/stubClient'

const DEFAULT_ROLES = ['Super Admin', 'Admin', 'Moderator', 'Support']
const DEFAULT_STATUSES = ['Active', 'Inactive', 'Suspended']

const props = defineProps({
  open: { type: Boolean, default: false },
  admin: { type: Object as () => Record<string, any> | null, default: null },
  roles: { type: Array as () => string[], default: () => [] },
  statuses: { type: Array as () => string[], default: () => [] },
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'saved'): void
}>()

const nuxtApp = useNuxtApp()
const stubClient = useStubClient()
const submitting = ref(false)

const roleOptions = computed(() =>
  props.roles?.length ? props.roles : DEFAULT_ROLES
)
const statusOptions = computed(() =>
  props.statuses?.length ? props.statuses : DEFAULT_STATUSES
)

const createFormState = (admin: Record<string, any> | null) => ({
  name: admin?.name ?? '',
  email: admin?.email ?? '',
  role: roleOptions.value.includes(admin?.role)
    ? admin?.role
    : roleOptions.value[0],
  status: statusOptions.value.includes(admin?.status)
    ? admin?.status
    : statusOptions.value[0],
  verified: Boolean(admin?.verified),
})

const form = ref(createFormState(props.admin))

watch(
  () => props.admin,
  (next) => {
    form.value = createFormState(next)
  },
  { immediate: true }
)

const canSubmit = computed(() => {
  return Boolean(form.value.name.trim() && form.value.email.trim() && props.admin?.id)
})

const notify = (type: 'success' | 'error', message: string) => {
  if (!import.meta.client) return
  try {
    if (type === 'success') nuxtApp.$awn?.success(message)
    else nuxtApp.$awn?.alert(message)
  } catch {}
}

const handleClose = () => {
  if (submitting.value) return
  emit('close')
}

const handleSubmit = async () => {
  if (!props.admin?.id || submitting.value) return

  submitting.value = true
  const payload = {
    name: form.value.name.trim(),
    email: form.value.email.trim(),
    role: form.value.role,
    status: form.value.status,
    verified: form.value.verified,
  }

  try {
    await stubClient.update('admins', props.admin.id, payload, { delay: 200 })
    notify('success', 'Admin updated')
    emit('saved')
  } catch (error) {
    console.error('Failed to update admin', error)
    notify('error', 'Failed to update admin')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.edit-modal-fade-enter-active,
.edit-modal-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.edit-modal-fade-enter-from,
.edit-modal-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
