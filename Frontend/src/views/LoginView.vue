<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500" dir="rtl">

    <button 
      @click="router.push('/')" 
      class="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 transition shadow-lg"
    >
      <span>🏠</span> الصفحة الرئيسية
    </button>

    <div class="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

    <div class="absolute w-96 h-96 bg-teal-300 rounded-full opacity-20 blur-3xl animate-blob top-[-100px] left-[-100px]"></div>
    <div class="absolute w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl animate-blob animation-delay-3000 bottom-[-100px] right-[-100px]"></div>

    <div class="relative w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 animate-fade-in border border-white/50">

      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-blue-800">أهلاً بعودتك 👋</h1>
        <p class="text-gray-600 mt-2 text-sm">
          سجل دخولك لمتابعة رحلتك الأكاديمية
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">

        <div class="relative">
          <input v-model="email" type="email" required class="floating-input peer" placeholder=" " />
          <label class="floating-label">البريد الإلكتروني</label>
        </div>

        <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            required
            class="floating-input peer"
            placeholder=" "
          />
          <label class="floating-label">كلمة المرور</label>

          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute left-4 top-4 text-gray-500 hover:text-blue-600 transition text-sm"
          >
            {{ showPassword ? 'إخفاء' : 'إظهار' }}
          </button>
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 cursor-pointer text-gray-700">
            <input type="checkbox" v-model="remember" class="accent-teal-500 w-4 h-4" />
            تذكرني
          </label>

          <a href="#" class="text-blue-600 hover:underline font-medium">
            نسيت كلمة المرور؟
          </a>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full h-12 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-semibold shadow-lg hover:scale-[1.03] hover:shadow-xl transition-all duration-300 transform flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span v-if="!loading">تسجيل الدخول</span>
          <span v-else class="loader"></span>
        </button>

      </form>

     <div class="text-center mt-8 text-sm text-gray-600">
        ليس لديك حساب؟
        <router-link 
          to="/signup" 
          class="text-orange-500 font-bold hover:text-orange-600 hover:underline transition duration-300 ease-in-out"
        >
          إنشاء حساب جديد
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"

const router = useRouter()
const authStore = useAuthStore()

const email = ref("")
const password = ref("")
const remember = ref(false)
const showPassword = ref(false)
const loading = ref(false)

function handleLogin() {
  loading.value = true

  // محاكاة عملية تسجيل الدخول
  setTimeout(() => {
    authStore.login({
      email: email.value
    })
    loading.value = false
    router.push("/dashboard")
  }, 1000)
}
</script>

<style scoped>
/* Floating Input Logic */
.floating-input {
  @apply w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition shadow-sm;
}
.floating-label {
  @apply absolute right-4 top-3 text-gray-500 text-sm transition-all pointer-events-none;
}
.floating-input:focus + .floating-label,
.floating-input:not(:placeholder-shown) + .floating-label {
  @apply text-xs text-blue-600 top-1 font-bold;
}

/* Loader Animation */
.loader {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Background Blob Animation */
@keyframes blob {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(40px, -60px) scale(1.1); }
  66% { transform: translate(-30px, 30px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}
.animate-blob {
  animation: blob 15s infinite ease-in-out;
}
.animation-delay-3000 {
  animation-delay: 3s;
}

/* Fade In Animation */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>