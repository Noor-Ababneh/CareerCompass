<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-md" @click="close"></div>
      
      <!-- Modal Content -->
      <div class="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(79,70,229,0.2)] overflow-hidden border border-white animate-modal-in">
        
        <!-- Decoration Blobs -->
        <div class="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Header -->
        <div class="relative px-8 pt-10 pb-6 text-center">
          <button @click="close" class="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/20 flex items-center justify-center text-3xl mb-6 transform hover:rotate-6 transition-transform">
            ✨
          </div>
          
          <h2 class="text-3xl font-black text-slate-800 mb-2">أهلاً بك في Career<span class="text-indigo-600">Compass</span></h2>
          <p class="text-slate-500 font-medium">أدخل بياناتك لنبدأ رحلتك نحو التخصص الأنسب</p>
        </div>

        <!-- Form -->
        <div class="px-8 pb-10">
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
                  class="w-full pr-11 pl-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-bold text-slate-800"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-black text-slate-700 pr-2">البريد الإلكتروني (اختياري)</label>
              <div class="relative group">
                <span class="absolute inset-y-0 right-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">📧</span>
                <input 
                  v-model="form.email" 
                  type="email" 
                  placeholder="name@example.com"
                  class="w-full pr-11 pl-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-bold text-slate-800"
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
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                      : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/50'
                  ]"
                >
                  <span v-if="form.gender === 'male'">✓</span>
                  👨 ذكر
                </button>
                <button
                  type="button"
                  @click="form.gender = 'female'"
                  :class="[
                    'py-3.5 px-4 rounded-xl font-bold text-sm transition-all border-2 flex items-center justify-center gap-2',
                    form.gender === 'female' 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                      : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/50'
                  ]"
                >
                  <span v-if="form.gender === 'female'">✓</span>
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
                    'py-3.5 px-4 rounded-xl font-bold text-sm transition-all border-2 flex items-center justify-center gap-2',
                    form.gradeLevel === grade.value 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                      : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/50'
                  ]"
                >
                  <span v-if="form.gradeLevel === grade.value">✓</span>
                  {{ grade.label }}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              :disabled="!isFormValid"
              class="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-black text-lg transition-all duration-300 shadow-xl shadow-indigo-500/30 hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none mt-4"
            >
              حفظ ومتابعة الرحلة
            </button>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  isOpen: Boolean,
  initialData: Object
})

const emit = defineEmits(['close', 'saved'])
const authStore = useAuthStore()

const form = reactive({
  name: '',
  email: '',
  gender: '',
  gradeLevel: ''
})

const grades = [
  { value: "9", label: "الصف التاسع" },
  { value: "10", label: "الصف العاشر" },
  { value: "11", label: "الصف الحادي عشر" },
  { value: "12", label: "التوجيهي" }
]

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.initialData) {
      form.name = props.initialData.name || ''
      form.email = props.initialData.email || ''
      form.gender = props.initialData.gender || ''
      form.gradeLevel = props.initialData.gradeLevel || ''
    } else if (authStore.user) {
      form.name = authStore.user.name || ''
      form.email = authStore.user.email || ''
      form.gender = authStore.user.gender || ''
      form.gradeLevel = authStore.user.gradeLevel || ''
    } else {
      form.name = ''
      form.email = ''
      form.gender = ''
      form.gradeLevel = ''
    }
  }
})

const isFormValid = computed(() => {
  return form.name.trim().length > 0 && form.gender.length > 0 && form.gradeLevel.length > 0
})

function close() {
  emit('close')
}

function handleSubmit() {
  if (!isFormValid.value) return
  
  authStore.saveUser({
    name: form.name,
    email: form.email,
    gender: form.gender,
    gradeLevel: form.gradeLevel
  })
  
  emit('saved')
  close()
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-modal-in {
  animation: modal-in 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
