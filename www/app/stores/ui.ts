import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiState = defineStore('ui', () => {
  const navDrawerOpen = ref(false)
  const loading = ref(false)
  const notification = ref<{
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
  } | null>(null)

  const setNavDrawerOpen = (value: boolean) => {
    navDrawerOpen.value = value
  }

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const showNotification = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info'
  ) => {
    notification.value = { message, type }
    setTimeout(() => {
      notification.value = null
    }, 5000)
  }

  return {
    navDrawerOpen,
    loading,
    notification,
    setNavDrawerOpen,
    setLoading,
    showNotification,
  }
})

export default useUiState
