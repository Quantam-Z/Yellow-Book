<template>
  <div class="min-h-screen bg-white-50 p-4">
    <div
      class="w-full rounded-xl bg-gradient-to-br from-indigo-500/10 to-pink-500/10 p-4 sm:p-6 border border-gray-200 shadow-lg mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <p class="text-xs uppercase tracking-wide text-gray-500">Agent workspace</p>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">Hi {{ profileHeadline }}</h1>
        <p class="text-sm text-gray-600">Keep your contact details and credentials up to date.</p>
      </div>
      <div class="text-right">
        <p class="text-xs text-gray-600 flex items-center justify-end gap-2">
          <span
            class="inline-flex h-2.5 w-2.5 rounded-full"
            :class="isProfileBusy ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'"
          ></span>
          Last saved {{ lastSavedLabel }}
        </p>
        <p class="text-xs text-gray-500">Password updated {{ lastPasswordChangeLabel }}</p>
      </div>
    </div>

    <div class="flex gap-2 sm:gap-4 mb-6">
      <button
        type="button"
        @click="activeSection = 'profile'"
        class="px-3 py-2 sm:px-6 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap border-none outline-none"
        :class="
          activeSection === 'profile'
            ? 'bg-gold text-black shadow-md'
            : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm hover:shadow-md'
        "
      >
        Profile Info
      </button>
      <button
        type="button"
        @click="activeSection = 'password'"
        class="px-3 py-2 sm:px-6 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap border-none outline-none"
        :class="
          activeSection === 'password'
            ? 'bg-gold text-black shadow-md'
            : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm hover:shadow-md'
        "
      >
        Change Password
      </button>
    </div>

    <form
      v-if="activeSection === 'profile'"
      class="w-full lg:w-[60%] relative shadow-[0px_0px_9px_rgba(0,_0,_0,_0.05)] rounded-2xl bg-white border-whitesmoke border-solid border-[1px] box-border flex flex-col items-center p-6 sm:p-8 lg:p-12 gap-6 sm:gap-8 text-left text-gray font-plus-jakarta-sans"
      @submit.prevent="updateProfile"
    >
      <div class="self-stretch flex flex-col items-start justify-center gap-2">
        <b class="self-stretch relative leading-[130%] capitalize text-xl sm:text-2xl">Profile Information</b>
        <p class="self-stretch text-sm sm:text-base text-gray-600 leading-relaxed">
          Update your personal information and contact details
        </p>
      </div>

      <div class="self-stretch h-px relative border-whitesmoke border-dashed border-t-[1px] box-border" />

      <div class="self-stretch grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-base sm:text-lg text-darkslategray">
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-700">Full Name</label>
          <input
            v-model.trim="profileForm.fullName"
            type="text"
            class="self-stretch h-12 rounded border-silver border-[1px] box-border flex items-center p-3 text-sm text-darkslategray bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-500 transition-colors disabled:bg-gray-50"
            :class="profileErrors.fullName ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : ''"
            :disabled="isProfileBusy"
            placeholder="Wade Warren"
            autocomplete="name"
          />
          <p v-if="profileErrors.fullName" class="text-xs text-red-500">{{ profileErrors.fullName }}</p>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-700">Email</label>
          <input
            v-model.trim="profileForm.email"
            type="email"
            class="self-stretch h-12 rounded border-silver border-[1px] box-border flex items-center p-3 text-sm text-darkslategray bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-500 transition-colors disabled:bg-gray-50"
            :class="profileErrors.email ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : ''"
            :disabled="isProfileBusy"
            placeholder="curtis.weaver@example.com"
            autocomplete="email"
          />
          <p v-if="profileErrors.email" class="text-xs text-red-500">{{ profileErrors.email }}</p>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-700">Mobile</label>
          <input
            v-model.trim="profileForm.mobile"
            type="tel"
            class="self-stretch h-12 rounded border-silver border-[1px] box-border flex items-center p-3 text-sm text-darkslategray bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-500 transition-colors disabled:bg-gray-50"
            :class="profileErrors.mobile ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : ''"
            :disabled="isProfileBusy"
            placeholder="+52 4164532"
            autocomplete="tel"
          />
          <p v-if="profileErrors.mobile" class="text-xs text-red-500">{{ profileErrors.mobile }}</p>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-700">Role / Title</label>
          <select
            v-model="profileForm.role"
            class="self-stretch h-12 rounded border-silver border-[1px] box-border flex items-center p-3 text-sm text-darkslategray bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-500 transition-colors disabled:bg-gray-50 appearance-none"
            :class="profileErrors.role ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : ''"
            :disabled="isProfileBusy"
          >
            <option v-for="option in roleOptions" :key="option" :value="option">{{ option }}</option>
          </select>
          <p v-if="profileErrors.role" class="text-xs text-red-500">{{ profileErrors.role }}</p>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-700">Location</label>
          <select
            v-model="profileForm.location"
            class="self-stretch h-12 rounded border-silver border-[1px] box-border flex items-center p-3 text-sm text-darkslategray bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-500 transition-colors disabled:bg-gray-50 appearance-none"
            :disabled="isProfileBusy"
          >
            <option v-for="option in locationOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-700">Timezone</label>
          <select
            v-model="profileForm.timezone"
            class="self-stretch h-12 rounded border-silver border-[1px] box-border flex items-center p-3 text-sm text-darkslategray bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-500 transition-colors disabled:bg-gray-50 appearance-none"
            :disabled="isProfileBusy"
          >
            <option v-for="option in timezoneOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
      </div>

      <div class="self-stretch flex flex-col gap-2">
        <label class="text-sm font-medium text-gray-700">About you</label>
        <textarea
          v-model.trim="profileForm.bio"
          class="self-stretch rounded border-silver border-[1px] box-border p-3 text-sm text-darkslategray bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-500 transition-colors disabled:bg-gray-50 min-h-[96px]"
          :disabled="isProfileBusy"
          maxlength="240"
          placeholder="Write about yourself in 24 words"
        ></textarea>
        <p class="text-xs text-gray-500 text-right">{{ profileForm.bio.length }}/240 characters</p>
      </div>

      <div class="self-stretch flex flex-col sm:flex-row gap-3 sm:gap-4">
        <label class="flex items-center gap-3 text-sm text-gray-700 font-medium cursor-pointer">
          <input
            type="checkbox"
            class="h-4 w-4 text-amber-500 focus:ring-amber-400 rounded border-gray-300"
            v-model="profileForm.preferences.notifications"
            :disabled="isProfileBusy"
          />
          Enable task notifications
        </label>
        <label class="flex items-center gap-3 text-sm text-gray-700 font-medium cursor-pointer">
          <input
            type="checkbox"
            class="h-4 w-4 text-amber-500 focus:ring-amber-400 rounded border-gray-300"
            v-model="profileForm.preferences.weeklyDigest"
            :disabled="isProfileBusy"
          />
          Send weekly digest
        </label>
      </div>

      <button
        type="submit"
        class="self-stretch sm:self-end sm:w-[220px] h-12 rounded bg-gold hover:bg-yellow-600 flex items-center justify-center py-[18px] px-9 box-border text-center text-gray cursor-pointer transition-colors font-semibold"
        :disabled="isProfileBusy"
      >
        <span>{{ isProfileBusy ? 'Saving…' : 'Update Profile' }}</span>
      </button>
    </form>

    <form
      v-if="activeSection === 'password'"
      class="w-full lg:w-[60%] relative shadow-[0px_0px_9px_rgba(0,_0,_0,_0.05)] rounded-2xl bg-white border-whitesmoke border-solid border-[1px] box-border flex flex-col items-center p-6 sm:p-8 lg:p-12 gap-6 sm:gap-8 text-left text-gray font-plus-jakarta-sans"
      @submit.prevent="updatePassword"
    >
      <div class="self-stretch flex flex-col items-start justify-center gap-2">
        <b class="self-stretch relative leading-[130%] capitalize text-xl sm:text-2xl">Change Password</b>
        <p class="self-stretch text-sm sm:text-base text-gray-600 leading-relaxed">
          Secure your account by updating your password regularly
        </p>
      </div>

      <div class="self-stretch h-px relative border-whitesmoke border-dashed border-t-[1px] box-border" />

      <div class="self-stretch flex flex-col gap-4 text-darkslategray">
        <div class="grid grid-cols-1 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700">Current Password</label>
            <input
              v-model.trim="passwordForm.current"
              type="password"
              autocomplete="current-password"
              class="self-stretch h-12 rounded border-silver border-[1px] box-border flex items-center p-3 text-sm text-darkslategray bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-500 transition-colors"
              :class="passwordErrors.current ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : ''"
              :disabled="isPasswordBusy"
              placeholder="••••••••"
            />
            <p v-if="passwordErrors.current" class="text-xs text-red-500">{{ passwordErrors.current }}</p>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700">New Password</label>
            <input
              v-model.trim="passwordForm.next"
              type="password"
              autocomplete="new-password"
              class="self-stretch h-12 rounded border-silver border-[1px] box-border flex items-center p-3 text-sm text-darkslategray bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-500 transition-colors"
              :class="passwordErrors.next ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : ''"
              :disabled="isPasswordBusy"
              placeholder="Create a strong password"
            />
            <p v-if="passwordErrors.next" class="text-xs text-red-500">{{ passwordErrors.next }}</p>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              v-model.trim="passwordForm.confirm"
              type="password"
              autocomplete="new-password"
              class="self-stretch h-12 rounded border-silver border-[1px] box-border flex items-center p-3 text-sm text-darkslategray bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-500 transition-colors"
              :class="passwordErrors.confirm ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : ''"
              :disabled="isPasswordBusy"
              placeholder="Repeat your new password"
            />
            <p v-if="passwordErrors.confirm" class="text-xs text-red-500">{{ passwordErrors.confirm }}</p>
          </div>
        </div>

        <div>
          <p class="text-sm font-semibold text-gray-700 mb-2">Password tips</p>
          <ul class="list-disc list-inside text-xs text-gray-500 space-y-1">
            <li v-for="tip in passwordTips" :key="tip">{{ tip }}</li>
          </ul>
        </div>
      </div>

      <button
        type="submit"
        class="self-stretch sm:self-end sm:w-[220px] h-12 rounded bg-gold hover:bg-yellow-600 flex items-center justify-center py-[18px] px-9 box-border text-center text-gray cursor-pointer transition-colors font-semibold"
        :disabled="isPasswordBusy"
      >
        <span>{{ isPasswordBusy ? 'Updating…' : 'Update Password' }}</span>
      </button>
    </form>

    <transition name="fade">
      <div
        v-if="banner.visible"
        class="fixed top-4 right-4 rounded-lg p-4 text-white transition-all duration-300 z-50 flex items-start gap-3 shadow-lg"
        :class="banner.type === 'success' ? 'bg-green-600' : 'bg-red-500'"
      >
        <div class="flex-1">
          <p class="font-semibold text-sm mb-0.5">{{ banner.type === 'success' ? 'Success' : 'Heads up' }}</p>
          <p class="text-xs leading-snug">{{ banner.text }}</p>
        </div>
        <button type="button" class="text-white/80 hover:text-white text-lg leading-none" @click="dismissBanner" aria-label="Dismiss notification">
          ×
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useStubResource } from '~/composables/useStubResource';
import { useStubClient } from '~/services/stubClient';

type BannerType = 'success' | 'error';

const defaultPreferences = () => ({
  notifications: true,
  weeklyDigest: true,
});

const defaultProfileState = () => ({
  fullName: '',
  email: '',
  mobile: '',
  role: 'Senior Verification Specialist',
  location: 'San Francisco, CA',
  timezone: 'UTC-8 (PST)',
  bio: '',
  preferences: defaultPreferences(),
});

const defaultPasswordState = () => ({
  current: '',
  next: '',
  confirm: '',
});

const locationOptions = ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Chicago, IL', 'Remote / Hybrid'];
const timezoneOptions = ['UTC-8 (PST)', 'UTC-5 (EST)', 'UTC+1 (CET)', 'UTC+5:30 (IST)', 'UTC+8 (CST)'];
const roleOptions = ['Senior Verification Specialist', 'Compliance Lead', 'Quality Analyst', 'Support Lead', 'Account Manager'];
const passwordTips = [
  'Use at least 8 characters',
  'Combine upper & lower case letters',
  'Add a number or special character',
];

const activeSection = ref<'profile' | 'password'>('profile');
const profileForm = reactive(defaultProfileState());
const passwordForm = reactive(defaultPasswordState());
const profileErrors = ref<Record<string, string>>({});
const passwordErrors = ref<Record<string, string>>({});
const savingProfile = ref(false);
const savingPassword = ref(false);
const lastSavedAt = ref<string | null>(null);

const banner = reactive({
  visible: false,
  type: 'success' as BannerType,
  text: '',
});

let bannerTimer: ReturnType<typeof setTimeout> | null = null;

const showBanner = (type: BannerType, text: string) => {
  banner.type = type;
  banner.text = text;
  banner.visible = true;
  if (bannerTimer) {
    clearTimeout(bannerTimer);
  }
  bannerTimer = setTimeout(() => {
    banner.visible = false;
    bannerTimer = null;
  }, 3800);
};

const dismissBanner = () => {
  banner.visible = false;
  if (bannerTimer) {
    clearTimeout(bannerTimer);
    bannerTimer = null;
  }
};

const stubClient = useStubClient();
const nuxtApp = useNuxtApp();

const {
  data: profileStubData,
  pending: profilePending,
  error: profileError,
  refresh: refreshProfile,
} = await useStubResource('subadminProfile', {
  default: () => defaultProfileState(),
});

const formatDateLabel = (iso?: string | null) => {
  if (!iso) return 'moments ago';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return 'moments ago';
  }
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

watch(
  () => profileStubData.value,
  (payload) => {
    const defaults = defaultProfileState();
    const source = payload ?? defaults;
    profileForm.fullName = source.fullName ?? source.name ?? defaults.fullName;
    profileForm.email = source.email ?? defaults.email;
    profileForm.mobile = source.mobile ?? source.phone ?? defaults.mobile;
    profileForm.role = source.role ?? source.title ?? defaults.role;
    profileForm.location = source.location ?? defaults.location;
    profileForm.timezone = source.timezone ?? defaults.timezone;
    profileForm.bio = source.bio ?? source.about ?? defaults.bio;
    profileForm.preferences.notifications =
      source.preferences?.notifications ?? defaults.preferences.notifications;
    profileForm.preferences.weeklyDigest =
      source.preferences?.weeklyDigest ?? defaults.preferences.weeklyDigest;
    lastSavedAt.value = source.updatedAt ?? lastSavedAt.value;
  },
  { immediate: true },
);

watch(
  () => profileError.value,
  (err) => {
    if (!err) return;
    console.error('Failed to load agent profile', err);
    showBanner('error', 'Unable to load profile data right now.');
  },
);

const profileHeadline = computed(() => profileForm.fullName || 'Agent');
const isProfileBusy = computed(() => savingProfile.value || profilePending.value);
const isPasswordBusy = computed(() => savingPassword.value);
const lastSavedLabel = computed(() =>
  formatDateLabel(lastSavedAt.value ?? profileStubData.value?.updatedAt ?? null),
);
const lastPasswordChangeLabel = computed(() =>
  formatDateLabel(profileStubData.value?.security?.lastPasswordChange ?? null),
);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const updateProfile = async () => {
  if (isProfileBusy.value) return;
  const errors: Record<string, string> = {};
  if (!profileForm.fullName.trim()) errors.fullName = 'Full name is required.';
  if (!profileForm.email.trim() || !emailPattern.test(profileForm.email)) {
    errors.email = 'Provide a valid email.';
  }
  if (!profileForm.mobile.trim()) errors.mobile = 'Phone number is required.';
  if (!profileForm.role.trim()) errors.role = 'Role / Title is required.';
  profileErrors.value = errors;

  if (Object.keys(errors).length) {
    showBanner('error', 'Please fix the highlighted fields.');
    return;
  }

  savingProfile.value = true;
  try {
    const timestamp = new Date().toISOString();
    const payload = {
      fullName: profileForm.fullName.trim(),
      email: profileForm.email.trim(),
      mobile: profileForm.mobile.trim(),
      phone: profileForm.mobile.trim(),
      role: profileForm.role.trim(),
      location: profileForm.location,
      timezone: profileForm.timezone,
      bio: profileForm.bio.trim(),
      preferences: { ...profileForm.preferences },
      updatedAt: timestamp,
    };
    await stubClient.update('subadminProfile', undefined, payload, {
      delay: 220,
      transport: 'remote-only',
    });
    profileErrors.value = {};
    lastSavedAt.value = timestamp;
    await refreshProfile();
    showBanner('success', 'Profile updated successfully.');
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.success('Profile updated successfully.');
      } catch {}
    }
  } catch (error) {
    console.error('Failed to update profile', error);
    showBanner('error', 'Failed to update profile. Try again.');
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.alert('Unable to update profile right now.');
      } catch {}
    }
  } finally {
    savingProfile.value = false;
  }
};

const updatePassword = async () => {
  if (isPasswordBusy.value) return;

  const errors: Record<string, string> = {};
  if (!passwordForm.current.trim()) errors.current = 'Current password is required.';
  if (!passwordForm.next.trim()) {
    errors.next = 'Enter a new password.';
  } else if (passwordForm.next.trim().length < 8) {
    errors.next = 'Password must be at least 8 characters.';
  } else if (passwordForm.next.trim() === passwordForm.current.trim()) {
    errors.next = 'New password must be different.';
  }
  if (!passwordForm.confirm.trim()) {
    errors.confirm = 'Confirm your new password.';
  } else if (passwordForm.confirm.trim() !== passwordForm.next.trim()) {
    errors.confirm = 'Passwords do not match.';
  }
  passwordErrors.value = errors;

  if (Object.keys(errors).length) {
    showBanner('error', 'Please fix the highlighted fields.');
    return;
  }

  savingPassword.value = true;
  try {
    const timestamp = new Date().toISOString();
    await stubClient.update(
      'subadminProfile',
      undefined,
      {
        security: {
          ...(profileStubData.value?.security ?? {}),
          lastPasswordChange: timestamp,
        },
        updatedAt: timestamp,
      },
      {
        delay: 220,
        transport: 'remote-only',
      },
    );
    passwordErrors.value = {};
    passwordForm.current = '';
    passwordForm.next = '';
    passwordForm.confirm = '';
    lastSavedAt.value = timestamp;
    await refreshProfile();
    showBanner('success', 'Password updated successfully.');
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.success('Password updated successfully.');
      } catch {}
    }
  } catch (error) {
    console.error('Failed to update password', error);
    showBanner('error', 'Unable to update password. Try again.');
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.alert('Unable to update password.');
      } catch {}
    }
  } finally {
    savingPassword.value = false;
  }
};
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

.text-darkslategray {
  color: #2f4f4f;
}

.bg-gold {
  background-color: #ffd700;
}

.bg-whitesmoke {
  background-color: #f5f5f5;
}

.transition-all {
  transition: all 0.3s ease-in-out;
}

button:hover {
  transform: translateY(-1px);
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.8;
}

button:disabled:hover {
  transform: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
