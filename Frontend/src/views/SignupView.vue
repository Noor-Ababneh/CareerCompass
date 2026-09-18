<template>
  <div 
    :class="[
      'min-h-screen bg-[#F8FAFF] overflow-hidden font-sans selection:bg-indigo-500 selection:text-white relative flex items-center justify-center p-6 transition-all duration-500 ease-in-out',
      isLeaving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    ]" 
    dir="rtl"
  >
    
    <div class="absolute inset-0 z-0 opacity-[0.04]" style="background-image: radial-gradient(#4f46e5 1.5px, transparent 1.5px); background-size: 32px 32px;"></div>
    <div class="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none z-0 animate-blob"></div>
    <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none z-0 animate-blob animation-delay-2000"></div>

    <button @click="goBack" class="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-all duration-300 font-bold group z-50 bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-sm hover:shadow-md border border-white">
      <span class="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
      <span>العودة للرئيسية</span>
    </button>

    <main class="relative z-10 w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 border border-white p-8 md:p-10 anim-fade-up">
      
      <div class="text-center mb-8">
        <div class="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/20 flex items-center justify-center text-3xl mb-4 transform hover:rotate-6 transition-transform border border-white/50 text-white">
          🧭
        </div>
        <h2 class="text-3xl font-black text-slate-800 mb-2 tracking-tight">Career<span class="text-indigo-600">Compass</span></h2>
        <p class="text-slate-500 font-bold text-sm">أدخل بياناتك لنبدأ رحلتك الأكاديمية</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        
        <div class="space-y-2">
          <label class="block text-sm font-black text-slate-700 pr-2">الاسم الكامل</label>
          <div class="relative group">
            <span class="absolute inset-y-0 right-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">👤</span>
            <input 
              v-model="form.name" 
              type="text" 
              required 
              placeholder="مثال: أحمد محمد"
              class="w-full pr-11 pl-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-medium"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-black text-slate-700 pr-2">البريد الإلكتروني <span class="text-[10px] text-slate-400 font-bold">(اختياري)</span></label>
          <div class="relative group">
            <span class="absolute inset-y-0 right-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">📧</span>
            <input 
              v-model="form.email" 
              type="email" 
              placeholder="name@example.com"
              class="w-full pr-11 pl-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-medium"
            />
          </div>
        </div>

        <div class="space-y-3">
          <label class="block text-sm font-black text-slate-700 pr-2">الجنس</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              @click="form.gender = 'male'"
              :class="[ 
                'py-3.5 px-4 rounded-xl font-bold text-sm transition-all border-2 flex items-center justify-center gap-2',
                form.gender === 'male' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/50'
              ]"
            >
              👨 ذكر
            </button>
            <button
              type="button"
              @click="form.gender = 'female'"
              :class="[ 
                'py-3.5 px-4 rounded-xl font-bold text-sm transition-all border-2 flex items-center justify-center gap-2',
                form.gender === 'female' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/50'
              ]"
            >
              👩 أنثى
            </button>
          </div>
        </div>

        <div class="space-y-3">
          <label class="block text-sm font-black text-slate-700 pr-2">المرحلة الدراسية</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="grade in grades"
              :key="grade.value"
              type="button"
              @click="form.gradeLevel = grade.value"
              :class="[ 
                'py-3 px-4 rounded-xl font-bold text-xs md:text-sm transition-all border-2 flex items-center justify-center gap-1.5',
                form.gradeLevel === grade.value 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/50'
              ]"
            >
              <span v-if="grade.value !== '12'" class="font-mono">{{ grade.value }}</span>
              <span>{{ grade.value === '12' ? 'التوجيهي' : 'الصف' }}</span>
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="!isFormValid"
          class="w-full py-4 mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-black text-lg transition-all duration-300 shadow-xl shadow-indigo-500/20 hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none flex items-center justify-center gap-3"
        >
          <span>حفظ ومتابعة الرحلة</span>
          <span class="text-xl">🚀</span>
        </button>

      </form>
    </main>

  </div>
</template>

<script setup>
import { reactive, computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isLeaving = ref(false) // متغير للتحكم بالانتقال السلس (Smooth Transition)

const form = reactive({
  name: '',
  email: '',
  gender: '',
  gradeLevel: ''
})

const grades = [
  { value: "9", label: "الصف 9" },
  { value: "10", label: "الصف 10" },
  { value: "11", label: "الصف 11" },
  { value: "12", label: "التوجيهي" }
]

onMounted(() => {
  if (authStore.user) {
    form.name = authStore.user.name || ''
    form.email = authStore.user.email || ''
    form.gender = authStore.user.gender || ''
    form.gradeLevel = authStore.user.gradeLevel || ''
  }
})

const isFormValid = computed(() => {
  return form.name.trim().length > 0 && form.gender.length > 0 && form.gradeLevel.length > 0
})

// دالة العودة مع انتقال سلس
function goBack() {
  isLeaving.value = true
  setTimeout(() => {
    router.push('/')
  }, 400) // الانتظار حتى ينتهي تأثير الـ Fade-out
}

// دالة الحفظ مع انتقال سلس
function handleSubmit() {
  if (!isFormValid.value) return
  
  authStore.saveUser({
    name: form.name,
    email: form.email,
    gender: form.gender,
    gradeLevel: form.gradeLevel
  })
  
  isLeaving.value = true
  setTimeout(() => {
    const redirectPath = route.query.redirect || '/'
    router.push(redirectPath)
  }, 400)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=IBM+Plex+Mono:wght@400;700&display=swap');

.font-sans { font-family: 'Tajawal', sans-serif; }
.font-mono { font-family: 'IBM Plex Mono', monospace; }

/* حركات الخلفية */
@keyframes blob { 
  0% { transform: translate(0, 0) scale(1); } 
  33% { transform: translate(30px, -50px) scale(1.05); } 
  66% { transform: translate(-20px, 20px) scale(0.95); } 
  100% { transform: translate(0, 0) scale(1); } 
}
.animate-blob { animation: blob 12s infinite alternate; }
.animation-delay-2000 { animation-delay: 2s; }

/* حركة الظهور عند فتح الصفحة (Fade Up) */
.anim-fade-up { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes fadeUp { 
  from { opacity: 0; transform: translateY(30px) scale(0.95); } 
  to { opacity: 1; transform: translateY(0) scale(1); } 
}

/* تخصيص حواف حقول الإدخال */
input::placeholder {
  color: #94a3b8;
  font-weight: 500;
}
</style>