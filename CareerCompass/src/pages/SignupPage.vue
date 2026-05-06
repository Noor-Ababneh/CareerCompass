<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-primary-50 to-teal-50">
    <div class="max-w-md w-full">
      <div class="card animate-fade-in">
        <div class="text-center mb-8">
          <div class="w-16 h-16 gradient-teal rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-900">إنشاء حساب جديد</h2>
          <p class="text-gray-600 mt-2">ابدأ رحلتك نحو المسار الأكاديمي المثالي</p>
        </div>

        <form @submit.prevent="handleSignup" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">الاسم الكامل</label>
            <input 
              v-model="form.name"
              type="text" 
              required
              class="input-field"
              placeholder="أدخل اسمك الكامل"
            />
          </div>

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
              minlength="6"
              class="input-field"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">تأكيد كلمة المرور</label>
            <input 
              v-model="form.confirmPassword"
              type="password" 
              required
              minlength="6"
              class="input-field"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">الصف الدراسي</label>
            <select 
              v-model="form.gradeLevel"
              required
              class="input-field"
            >
              <option value="" disabled>اختر صفك الدراسي</option>
              <option value="9">الصف التاسع</option>
              <option value="10">الصف العاشر</option>
              <option value="11">الصف الحادي عشر</option>
              <option value="12">الصف الثاني عشر (التوجيهي)</option>
            </select>
            <p class="text-xs text-gray-600 mt-2">
              <span v-if="form.gradeLevel && form.gradeLevel !== '12'">
                ✓ ستحصل على توصية بالمجال الدراسي + خطة تطوير
              </span>
              <span v-else-if="form.gradeLevel === '12'">
                ✓ ستحصل على توصية مباشرة بالتخصصات الجامعية
              </span>
            </p>
          </div>

          <div class="flex items-start">
            <input type="checkbox" required class="ml-2 mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500">
            <span class="text-sm text-gray-700">
              أوافق على <a href="#" class="text-primary-600 hover:underline">شروط الاستخدام</a> و
              <a href="#" class="text-primary-600 hover:underline">سياسة الخصوصية</a>
            </span>
          </div>

          <button type="submit" :disabled="!isFormValid" class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
            إنشاء حساب
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600">
            لديك حساب بالفعل؟
            <router-link to="/login" class="text-primary-600 hover:text-primary-700 font-semibold">
              سجل دخولك
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  gradeLevel: '',
})

const isFormValid = computed(() => {
  return (
    form.value.name &&
    form.value.email &&
    form.value.password &&
    form.value.confirmPassword &&
    form.value.gradeLevel &&
    form.value.password === form.value.confirmPassword
  )
})

const handleSignup = () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('كلمات المرور غير متطابقة')
    return
  }

  const userData = {
    name: form.value.name,
    email: form.value.email,
    gradeLevel: parseInt(form.value.gradeLevel),
  }
  
  authStore.login(userData)
  router.push('/dashboard')
}
</script>
