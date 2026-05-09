import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // 1. الحالة (State): نحاول نجيب الاسم من الذاكرة المحلية إذا كان محفوظاً
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const isAuthenticated = ref(!!localStorage.getItem('user'))

  // 2. حفظ بيانات المستخدم (Save User Action)
  function saveUser(userData) {
    user.value = userData
    isAuthenticated.value = true
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // 3. تسجيل الخروج / تبديل المستخدم (Logout Action)
  function logout() {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user')
  }

  return { user, isAuthenticated, saveUser, logout }
})
