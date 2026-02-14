<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-slate-900 text-white flex items-center justify-center py-12 px-4" dir="rtl">
    
    <div class="relative w-full max-w-3xl bg-white/5 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden animate-fade-in-up">
      
      <div class="absolute top-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div class="p-8 md:p-12">
        <div class="text-center mb-10">
          <div class="inline-block p-3 rounded-2xl bg-white/5 mb-4 border border-white/10">
            <span class="text-4xl">📊</span>
          </div>
          <h1 class="text-3xl font-bold mb-3">تحليل القدرات الأكاديمية</h1>
          <p class="text-gray-400 text-sm">أدخل بياناتك بدقة لنرشدك إلى المسار الصحيح.</p>
        </div>

        <div class="mb-10">
          <label class="block text-gray-300 text-sm font-bold mb-4 text-center">اختر مرحلتك الدراسية</label>
          <div class="grid grid-cols-2 gap-6">
            <button 
              @click="academicStage = 'junior'"
              :class="academicStage === 'junior' ? 'bg-blue-600/20 border-blue-500 text-blue-200 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'"
              class="p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-2 group"
            >
              <span class="text-3xl group-hover:scale-110 transition">🌱</span>
              <span class="font-bold">صفوف 9 - 11</span>
            </button>

            <button 
              @click="academicStage = 'senior'"
              :class="academicStage === 'senior' ? 'bg-teal-600/20 border-teal-500 text-teal-200 shadow-[0_0_20px_rgba(20,184,166,0.3)]' : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'"
              class="p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-2 group"
            >
              <span class="text-3xl group-hover:scale-110 transition">🎓</span>
              <span class="font-bold">توجيهي</span>
            </button>
          </div>
        </div>

        <transition name="fade" mode="out-in">
          
          <div v-if="academicStage === 'junior'" key="junior" class="space-y-8">
            <div class="bg-blue-500/10 p-5 rounded-2xl border border-blue-500/20">
              <label class="block text-blue-200 font-bold mb-3">طموحك المستقبلي 🎯</label>
              <select v-model="targetField" class="w-full bg-gray-900/80 text-white border border-white/20 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer">
                <option value="" disabled>اختر الحقل المستهدف...</option>
                <option value="Health">الحقل الطبي والصحي</option>
                <option value="Engineering">الحقل الهندسي</option>
                <option value="IT">حقل العلوم والتكنولوجيا (IT)</option>
                <option value="Business">حقل الأعمال</option>
                <option value="Law">القانون والعلوم الشرعية</option>
                <option value="Languages">اللغات والعلوم الاجتماعية</option>
              </select>
            </div>

            <div v-if="targetField" class="space-y-6">
              <p class="text-sm text-gray-400 border-b border-white/10 pb-2">قيّم مستواك في المواد التالية:</p>
              
              <div v-for="(val, key) in grades" :key="key">
                <div class="flex justify-between mb-2">
                  <label class="text-gray-300 font-bold text-sm">{{ getSubjectLabel(key) }}</label>
                  <span class="font-mono font-bold text-blue-400">{{ val }}%</span>
                </div>
                <input type="range" v-model.number="grades[key]" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all">
              </div>
            </div>
          </div>

          <div v-else key="senior" class="space-y-8">
            <div class="bg-teal-500/10 p-5 rounded-2xl border border-teal-500/20">
              <label class="block text-teal-200 font-bold mb-3">مسارك الحالي 🏫</label>
              <select v-model="currentField" class="w-full bg-gray-900/80 text-white border border-white/20 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none transition cursor-pointer">
                <option value="" disabled>اختر المسار...</option>
                <option value="Health">الحقل الطبي والصحي</option>
                <option value="Engineering">الحقل الهندسي</option>
                <option value="IT">حقل العلوم والتكنولوجيا (IT)</option>
                <option value="Business">حقل الأعمال</option>
                <option value="Law">القانون والعلوم الشرعية</option>
                <option value="Languages">اللغات والعلوم الاجتماعية</option>
              </select>
            </div>

            <div v-if="currentField">
              <div class="flex justify-between mb-2">
                <label class="text-gray-300 font-bold">المعدل العام المتوقع</label>
                <span class="font-mono font-bold text-teal-400">{{ gpa }}%</span>
              </div>
              <input type="range" v-model.number="gpa" min="50" max="100" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-500 hover:accent-teal-400 transition-all">
            </div>
          </div>

        </transition>

        <button 
          @click="submitAnalysis" 
          :disabled="(academicStage === 'junior' && !targetField) || (academicStage === 'senior' && !currentField)"
          class="w-full mt-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-lg font-bold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {{ academicStage === 'junior' ? 'تحليل الخطة 📋' : 'عرض التخصصات 🎓' }}
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const academicStage = ref('junior')

// Data
const targetField = ref('')
const grades = ref({ math: 70, science: 70, tech: 70, lang: 70 })
const currentField = ref('')
const gpa = ref(80)

function getSubjectLabel(key) {
  const map = { math: 'الرياضيات', science: 'العلوم', tech: 'الحاسوب', lang: 'اللغات' }
  return map[key] || key
}

function submitAnalysis() {
  const query = { stage: academicStage.value }

  if (academicStage.value === 'junior') {
    query.targetField = targetField.value
    query.grades = JSON.stringify(grades.value)
  } else {
    query.currentField = currentField.value
    query.gpa = gpa.value
  }

  router.push({ path: '/results', query })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Custom Animation */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}
</style>