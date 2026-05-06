<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="container-custom">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3">
          <div class="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-primary-700">بوصلة المسار</h1>
            <p class="text-xs text-gray-600">CareerCompass</p>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <router-link 
            to="/" 
            class="text-gray-700 hover:text-primary-600 font-semibold transition-colors"
            active-class="text-primary-600"
          >
            الرئيسية
          </router-link>
          <router-link 
            to="/universities" 
            class="text-gray-700 hover:text-primary-600 font-semibold transition-colors"
            active-class="text-primary-600"
          >
            الجامعات
          </router-link>
          <router-link 
            to="/about" 
            class="text-gray-700 hover:text-primary-600 font-semibold transition-colors"
            active-class="text-primary-600"
          >
            عن النظام
          </router-link>
          
          <div v-if="authStore.isAuthenticated" class="flex items-center gap-4">
            <router-link to="/dashboard" class="btn-primary">
              لوحة التحكم
            </router-link>
            <button @click="handleLogout" class="text-red-600 hover:text-red-700 font-semibold">
              تسجيل الخروج
            </button>
          </div>
          <div v-else class="flex items-center gap-4">
            <router-link to="/login" class="text-primary-600 hover:text-primary-700 font-semibold">
              تسجيل الدخول
            </router-link>
            <router-link to="/signup" class="btn-primary">
              إنشاء حساب
            </router-link>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition name="slide-down">
        <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200">
          <div class="flex flex-col gap-3">
            <router-link to="/" class="px-4 py-2 hover:bg-gray-50 rounded-lg" @click="mobileMenuOpen = false">
              الرئيسية
            </router-link>
            <router-link to="/universities" class="px-4 py-2 hover:bg-gray-50 rounded-lg" @click="mobileMenuOpen = false">
              الجامعات
            </router-link>
            <router-link to="/about" class="px-4 py-2 hover:bg-gray-50 rounded-lg" @click="mobileMenuOpen = false">
              عن النظام
            </router-link>
            
            <div v-if="authStore.isAuthenticated" class="flex flex-col gap-2 px-4 pt-3 border-t border-gray-200">
              <router-link to="/dashboard" class="btn-primary text-center" @click="mobileMenuOpen = false">
                لوحة التحكم
              </router-link>
              <button @click="handleLogout" class="text-red-600 hover:text-red-700 font-semibold py-2">
                تسجيل الخروج
              </button>
            </div>
            <div v-else class="flex flex-col gap-2 px-4 pt-3 border-t border-gray-200">
              <router-link to="/login" class="btn-outline text-center" @click="mobileMenuOpen = false">
                تسجيل الدخول
              </router-link>
              <router-link to="/signup" class="btn-primary text-center" @click="mobileMenuOpen = false">
                إنشاء حساب
              </router-link>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store'

const authStore = useAuthStore()
const router = useRouter()
const mobileMenuOpen = ref(false)

const handleLogout = () => {
  authStore.logout()
  mobileMenuOpen.value = false
  router.push('/')
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
