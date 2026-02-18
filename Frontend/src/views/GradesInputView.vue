<template>
  <div class="min-h-screen bg-[#F3F4F6] flex items-center justify-center py-12 px-4 font-sans text-slate-700" dir="rtl">
    <div class="w-full max-w-3xl bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden animate-fade-in-up">
      <div class="px-8 pt-8">
        <button @click="$router.push('/dashboard')" class="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition font-bold text-sm">
          <span class="text-xl">➜</span> عودة للرئيسية
        </button>
      </div>
      <div class="text-center px-10 pb-8 pt-2">
        <div class="inline-block p-4 rounded-3xl bg-indigo-50 text-indigo-600 shadow-sm mb-4 text-4xl">📊</div>
        <h1 class="text-3xl font-black text-slate-800 mb-2">إدخال العلامات الأكاديمية</h1>
        <p class="text-slate-500 font-medium">أدخل علاماتك بدقة لنتمكن من تحليل مسارك وحساب معدلك.</p>
      </div>
      <div class="p-8 md:p-12 bg-slate-50/50">
        <transition name="fade">
          <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 font-bold text-sm">
            <span>⚠️</span> {{ errorMessage }}
          </div>
        </transition>
        <div class="grid grid-cols-2 gap-4 mb-10">
          <button @click="academicStage = 'junior'" :class="academicStage === 'junior' ? 'bg-white text-indigo-700 border-indigo-200 shadow-md ring-1 ring-indigo-100' : 'bg-slate-100 text-slate-500 border-transparent hover:bg-white'" class="p-5 rounded-2xl border transition-all flex flex-col items-center gap-2">
            <span class="text-2xl">🌱</span> <span class="font-bold">تأسيس (9-11)</span>
          </button>
          <button @click="academicStage = 'senior'" :class="academicStage === 'senior' ? 'bg-white text-purple-700 border-purple-200 shadow-md ring-1 ring-purple-100' : 'bg-slate-100 text-slate-500 border-transparent hover:bg-white'" class="p-5 rounded-2xl border transition-all flex flex-col items-center gap-2">
            <span class="text-2xl">🎓</span> <span class="font-bold">توجيهي (12)</span>
          </button>
        </div>
        <div class="mb-8">
          <label class="block text-slate-700 font-bold mb-3 text-lg">اختر الحقل الأكاديمي:</label>
          <div class="relative">
            <select v-model="selectedField" @change="resetGrades" class="w-full p-4 pl-10 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition appearance-none cursor-pointer shadow-sm">
              <option value="" disabled>اختر المسار...</option>
              <option value="Health">الحقل الطبي والصحي</option>
              <option value="Engineering">الحقل الهندسي</option>
              <option value="IT">حقل العلوم والتكنولوجيا (IT)</option>
              <option value="Languages">حقل اللغات والعلوم الاجتماعية</option>
              <option value="Law">حقل القانون والعلوم الشرعية</option>
              <option value="Business">حقل الأعمال</option>
            </select>
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">▼</div>
          </div>
        </div>
        <transition name="fade">
          <div v-if="selectedField" class="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 mb-8">
            <div class="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
              <span class="bg-blue-100 text-blue-600 p-2 rounded-xl text-lg">📝</span>
              <h3 class="font-bold text-slate-700 text-lg">علامات المواد الأساسية</h3>
            </div>
            <div class="space-y-8">
              <div v-for="(label, key) in currentSubjects" :key="key">
                <div class="flex justify-between mb-3 items-end">
                  <label class="font-bold text-slate-700 text-lg">{{ label }}</label>
                  <div :class="getScoreColorClass(grades[key])" class="px-3 py-1 rounded-lg font-mono font-bold text-sm">
                    {{ grades[key] || 0 }}%
                  </div>
                </div>
                <input type="range" v-model.number="grades[key]" min="0" max="100" class="w-full h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 transition-all">
                <div class="flex justify-between text-xs font-medium text-slate-400 mt-2">
                  <span>راسب</span>
                  <span>ضعيف</span>
                  <span>جيد</span>
                  <span>ممتاز</span>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <button @click="submit" :disabled="!selectedField" class="w-full py-5 bg-slate-900 hover:bg-black text-white text-xl font-bold rounded-2xl shadow-xl shadow-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          {{ academicStage === 'junior' ? 'تحليل نقاط الضعف 🛠️' : 'حساب المعدل والنتيجة 🎓' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const academicStage = ref('junior')
const selectedField = ref('')
const grades = ref({})
const errorMessage = ref('') 

const curriculum = {
  Health: { chem: 'الكيمياء', bio: 'الأحياء', eng_adv: 'إنجليزي متقدم' },
  Engineering: { math: 'الرياضيات', physics: 'الفيزياء' },
  IT: { math_adv: 'رياضيات متقدم' },
  Languages: { eng_adv: 'إنجليزي متقدم', arabic_spec: 'عربي تخصص' },
  Law: { arabic_spec: 'عربي تخصص', islamic_spec: 'تربية إسلامية تخصص' },
  Business: { finance: 'ثقافة مالية', math_biz: 'رياضيات أعمال', eng_adv: 'إنجليزي متقدم' }
}

const currentSubjects = computed(() => {
  return selectedField.value ? curriculum[selectedField.value] : {}
})

function resetGrades() {
  grades.value = {}
  errorMessage.value = ''
}

function getScoreColorClass(score) {
  if (!score && score !== 0) return 'bg-slate-100 text-slate-500'
  if (score >= 85) return 'bg-green-100 text-green-700'
  if (score >= 70) return 'bg-blue-100 text-blue-700'
  if (score >= 50) return 'bg-orange-100 text-orange-700'
  return 'bg-red-100 text-red-700'
}

function calculateGPA() {
  const scores = Object.values(grades.value).map(Number).filter(n => !isNaN(n))
  if (!scores.length) return 0
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
}

function submit() {
  errorMessage.value = ''
  if (!selectedField.value) { errorMessage.value = 'الرجاء اختيار الحقل الأكاديمي أولاً.'; return }
  const requiredSubjects = Object.keys(currentSubjects.value)
  const missingSubjects = requiredSubjects.filter(sub => grades.value[sub] === undefined || grades.value[sub] === '')
  if (missingSubjects.length > 0) { errorMessage.value = 'يرجى إدخال العلامات لجميع المواد المطلوبة.'; return }
  const gpa = calculateGPA()
  router.push({ path: '/results', query: { source: 'grades', stage: academicStage.value, field: selectedField.value, grades: JSON.stringify(grades.value), gpa } })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.animate-fade-in-up { animation: fadeInUp 0.6s ease-out; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>