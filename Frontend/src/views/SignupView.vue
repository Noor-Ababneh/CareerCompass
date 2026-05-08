<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F8FAFC] font-sans selection:bg-[#4F46E5] selection:text-white" dir="rtl">

    <div class="absolute inset-0 z-0 opacity-[0.03]" style="background-image: radial-gradient(#1E293B 1.5px, transparent 1.5px); background-size: 32px 32px;"></div>
    
    <div class="absolute w-[500px] h-[500px] bg-[#4F46E5]/10 rounded-full blur-[100px] animate-blob top-[-10%] right-[-10%] pointer-events-none z-0"></div>
    <div class="absolute w-[400px] h-[400px] bg-[#10B981]/10 rounded-full blur-[120px] animate-blob animation-delay-3000 bottom-[-10%] left-[-10%] pointer-events-none z-0"></div>

    <button 
      @click="router.push('/')" 
      class="absolute top-6 right-6 z-50 flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl text-slate-600 font-bold hover:text-[#4F46E5] hover:border-[#4F46E5]/30 transition-all shadow-sm group"
    >
      <span class="group-hover:-translate-x-1 transition-transform">←</span>
      <span>الرئيسية</span>
    </button>

    <div class="relative w-full max-w-md bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_15px_50px_-15px_rgba(79,70,229,0.15)] p-10 animate-fade-in border border-white z-10">

      <button 
        v-if="step === 2"
        type="button"
        @click="step = 1" 
        class="absolute top-8 left-8 text-slate-400 hover:text-[#4F46E5] transition duration-300 flex items-center gap-1 font-bold text-sm"
        title="رجوع"
      >
        <span class="transform rotate-180">➜</span> رجوع
      </button>

      <div class="text-center mb-8">
        <div class="w-12 h-12 mx-auto bg-[#4F46E5]/10 text-[#4F46E5] rounded-xl flex items-center justify-center text-xl mb-4 shadow-sm border border-[#4F46E5]/10">
          ✨
        </div>
        <h1 class="text-3xl font-black text-[#1E293B]">Career<span class="text-[#4F46E5]">Compass</span></h1>
        <p class="text-slate-500 mt-2 text-sm font-medium">
          ابدأ رحلتك الأكاديمية بثقة
        </p>
      </div>

      <div class="flex justify-center mb-8 gap-3">
        <div :class="step === 1 ? activeStep : inactiveStep">1</div>
        <div :class="step === 2 ? activeStep : inactiveStep">2</div>
      </div>

      <form @submit.prevent="nextStep">

        <div v-if="step === 1" class="space-y-6">

          <div class="relative">
            <input v-model="name" type="text" required class="floating-input peer" placeholder=" " />
            <label class="floating-label">الاسم الكامل</label>
          </div>

          <div class="relative">
            <input v-model="email" type="email" required class="floating-input peer" placeholder=" " />
            <label class="floating-label">البريد الإلكتروني</label>
          </div>

          <div class="relative">
            <input v-model="password" type="password" required class="floating-input peer" placeholder=" " />
            <label class="floating-label">كلمة المرور</label>
          </div>

          <button class="primary-btn mt-6">التالي</button>
        </div>

        <div v-if="step === 2" class="space-y-6">

          <h3 class="text-center text-slate-700 font-bold mb-2">
            في أي مرحلة دراسية أنت الآن؟
          </h3>

          <div class="grid grid-cols-2 gap-4">
            <button
              v-for="g in grades"
              :key="g.value"
              type="button"
              @click="selectGrade(g.value)"
              :class="[
                'grade-card',
                grade === g.value ? 'grade-active' : ''
              ]"
            >
              {{ g.label }}
            </button>
          </div>

          <button
            type="submit"
            :disabled="!grade"
            class="primary-btn mt-6"
          >
            إنشاء الحساب
          </button>
        </div>

      </form>

      <div class="text-center mt-8 text-sm text-slate-500 font-medium">
        لديك حساب بالفعل؟
        <router-link to="/login" class="text-[#10B981] font-black hover:text-[#059669] hover:underline transition duration-300 px-1">
          تسجيل الدخول
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

const step = ref(1)
const name = ref("")
const email = ref("")
const password = ref("")
const grade = ref("")

const grades = [
  { value: "9", label: "الصف التاسع" },
  { value: "10", label: "الصف العاشر" },
  { value: "11", label: "الصف الحادي عشر" },
  { value: "12", label: "التوجيهي" }
]

// ألوان الدوائر تبعت الخطوات (Steps)
const activeStep = "w-8 h-8 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-bold shadow-md shadow-[#4F46E5]/30 transition-all duration-300"
const inactiveStep = "w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold transition-all duration-300"

function nextStep() {
  if (step.value === 1) {
    if (name.value && email.value && password.value) {
        step.value = 2
    }
  } else {
    // حفظ البيانات
    authStore.register({
      name: name.value,
      email: email.value,
      gradeLevel: grade.value
    })
    // الانتقال للداشبورد
    router.push("/dashboard")
  }
}

function selectGrade(val) {
  grade.value = val
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
.font-sans { font-family: 'Tajawal', sans-serif; }

/* Floating Input Logic */
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

/* Primary Button */
.primary-btn {
  @apply w-full h-12 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-2xl font-black text-lg transition-all duration-300 shadow-lg shadow-[#4F46E5]/25 hover:-translate-y-1 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0;
}

/* Grade Cards (بطاقات اختيار الصف) */
.grade-card {
  @apply p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] hover:border-[#4F46E5]/30 hover:bg-white hover:shadow-md transition-all duration-300 text-sm text-slate-600 font-bold;
}
.grade-active {
  @apply border-[#4F46E5] bg-[#4F46E5]/5 text-[#4F46E5] ring-2 ring-[#4F46E5]/20 shadow-sm;
}

/* Animations */
@keyframes blob {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}
.animate-blob { animation: blob 15s infinite ease-in-out; }
.animation-delay-3000 { animation-delay: 3s; }

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
</style>