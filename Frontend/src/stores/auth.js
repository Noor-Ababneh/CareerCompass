import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    gradeLevel: null,
    isLoggedIn: false
  }),
  actions: {
    login(email, password) {
      // كود وهمي حالياً لتسجيل الدخول
      this.isLoggedIn = true
      console.log("Login User:", email)
    },
    
    register(userData) {
      // حفظ البيانات والصف الدراسي
      this.user = { name: userData.name, email: userData.email }
      this.gradeLevel = userData.gradeLevel
      this.isLoggedIn = true
      console.log("New User Registered:", userData)
    },

    logout() {
      this.user = null
      this.gradeLevel = null
      this.isLoggedIn = false
    }
  }
})