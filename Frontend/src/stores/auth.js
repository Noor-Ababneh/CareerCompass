import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  
  // 1. الحالة (State): نحاول نجيب الاسم من الذاكرة المحلية إذا كان محفوظاً
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const isAuthenticated = ref(!!localStorage.getItem('user'))

  // 2. تسجيل الدخول (Login Action)
  function login(userData) {
    // محاكاة: نحفظ البيانات في المتصفح
    user.value = userData
    isAuthenticated.value = true
    localStorage.setItem('user', JSON.stringify(userData))
    
    // توجيه للداشبورد
    router.push('/dashboard')
  }

  // 3. إنشاء حساب (Register Action)
  function register(userData) {
    // نفس اللوجين، نحفظ البيانات
    user.value = userData
    isAuthenticated.value = true
    localStorage.setItem('user', JSON.stringify(userData))
    
    router.push('/dashboard')
  }

  // 4. تسجيل الخروج (Logout Action) - الجديد! 🔥
  function logout() {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user') // مسح البيانات من المتصفح
    router.push('/') // رجوع للرئيسية
  }

  return { user, isAuthenticated, login, register, logout }
})