<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F8FAFC] font-sans selection:bg-[#4F46E5] selection:text-white" dir="rtl">

    <div class="absolute inset-0 z-0 opacity-[0.03]" style="background-image: radial-gradient(#1E293B 1.5px, transparent 1.5px); background-size: 32px 32px;"></div>
    
    <div class="absolute w-[500px] h-[500px] bg-[#4F46E5]/10 rounded-full blur-[100px] animate-blob top-[-10%] left-[-10%] pointer-events-none z-0"></div>
    <div class="absolute w-[400px] h-[400px] bg-[#10B981]/10 rounded-full blur-[120px] animate-blob animation-delay-3000 bottom-[-10%] right-[-10%] pointer-events-none z-0"></div>

    <button 
      @click="router.push('/')" 
      class="absolute top-6 right-6 z-50 flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl text-slate-600 font-bold hover:text-[#4F46E5] hover:border-[#4F46E5]/30 transition-all shadow-sm group"
    >
      <span class="group-hover:-translate-x-1 transition-transform">←</span>
      <span>الرئيسية</span>
    </button>

    <div class="relative w-full max-w-md bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_15px_50px_-15px_rgba(79,70,229,0.15)] p-10 animate-fade-in border border-white z-10">

      <div class="text-center mb-8">
        <div class="w-12 h-12 mx-auto bg-[#4F46E5]/10 text-[#4F46E5] rounded-xl flex items-center justify-center text-xl mb-4 shadow-sm border border-[#4F46E5]/10">
          👋
        </div>
        <h1 class="text-3xl font-black text-[#1E293B]">أهلاً بعودتك</h1>
        <p class="text-slate-500 mt-2 text-sm font-medium">
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
            class="absolute left-4 top-4 text-slate-400 hover:text-[#4F46E5] transition text-sm font-bold"
          >
            {{ showPassword ? 'إخفاء' : 'إظهار' }}
          </button>
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
            <input type="checkbox" v-model="remember" class="accent-[#4F46E5] w-4 h-4 rounded border-slate-300" />
            تذكرني
          </label>

          <a href="#" class="text-[#4F46E5] hover:text-[#4338CA] hover:underline font-bold transition-colors">
            نسيت كلمة المرور؟
          </a>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full h-12 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-2xl font-black text-lg transition-all duration-300 shadow-lg shadow-[#4F46E5]/25 hover:-translate-y-1 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <span v-if="!loading">تسجيل الدخول</span>
          <span v-else class="loader"></span>
        </button>

      </form>

      <div class="text-center mt-8 text-sm text-slate-500 font-medium">
        ليس لديك حساب؟
        <router-link 
          to="/signup" 
          class="text-[#10B981] font-black hover:text-[#059669] hover:underline transition duration-300 ease-in-out px-1"
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
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
.font-sans { font-family: 'Tajawal', sans-serif; }

/* Floating Input Logic - Updated with new colors */
.floating-input {
  @apply w-full border border-slate-200 rounded-2xl px-4 pt-6 pb-2 bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#4F46E5]/50 focus:ring-4 focus:ring-[#4F46E5]/10 transition-all shadow-sm text-[#1E293B] font-medium;
}
.floating-label {
  @apply absolute right-4 top-3 text-slate-400 text-sm transition-all pointer-events-none font-bold;
}
.floating-input:focus + .floating-label,
.floating-input:not(:placeholder-shown) + .floating-label {
  @apply text-xs text-[#4F46E5] top-1;
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