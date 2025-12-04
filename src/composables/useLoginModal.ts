import type { Ref } from 'vue'

const LOGIN_MODAL_STATE_KEY = 'login-modal-open'
const LOGIN_MODAL_SOURCE_KEY = 'login-modal-source'

export type LoginModalSource = 'navbar' | 'info-nav' | 'unknown' | null | string

export function useLoginModal() {
  const isLoginModalOpen = useState<boolean>(LOGIN_MODAL_STATE_KEY, () => false)
  const loginModalSource = useState<LoginModalSource>(LOGIN_MODAL_SOURCE_KEY, () => null)

  const openLoginModal = (source: LoginModalSource = 'unknown') => {
    loginModalSource.value = source
    isLoginModalOpen.value = true
  }

  const closeLoginModal = () => {
    isLoginModalOpen.value = false
    loginModalSource.value = null
  }

  return {
    isLoginModalOpen: isLoginModalOpen as Ref<boolean>,
    loginModalSource: loginModalSource as Ref<LoginModalSource>,
    openLoginModal,
    closeLoginModal,
  }
}
