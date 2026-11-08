<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-primary-50 to-teal-50">
    <div class="max-w-md w-full">
      <div class="card animate-fade-in">
        <div class="text-center mb-8">
          <div class="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-900">تسجيل الدخول</h2>
          <p class="text-gray-600 mt-2">مرحباً بعودتك إلى بوصلة المسار</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني</label>
            <input 
              v-model="form.email"
              type="email" 
              required
              class="input-field"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">كلمة المرور</label>
            <input 
              v-model="form.password"
              type="password" 
              required
              class="input-field"
              placeholder="••••••••"
            />
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" class="ml-2 rounded border-gray-300 text-primary-600 focus:ring-primary-500">
              <span class="text-sm text-gray-700">تذكرني</span>
            </label>
            <a href="#" class="text-sm text-primary-600 hover:text-primary-700 font-semibold">
              نسيت كلمة المرور؟
            </a>
          </div>

          <button type="submit" class="btn-primary w-full">
            دخول
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600">
            ليس لديك حساب؟
            <router-link to="/signup" class="text-primary-600 hover:text-primary-700 font-semibold">
              سجل الآن
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: '',
})

const handleLogin = () => {
  // Simulate login - in production, this would call an API
  const userData = {
    name: 'محمد أحمد',
    email: form.value.email,
    gradeLevel: 11, // Default for demo
  }
  
  authStore.login(userData)
  router.push('/dashboard')
}
</script>
