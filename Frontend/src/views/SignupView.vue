<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 via-white to-teal-100" dir="rtl">

    <!-- Animated Background Shapes -->
    <div class="absolute w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-3xl animate-blob top-10 right-10"></div>
    <div class="absolute w-72 h-72 bg-teal-300 rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000 bottom-10 left-10"></div>

    <!-- Glass Card -->
    <div class="relative w-full max-w-md backdrop-blur-lg bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-10 transition-all duration-500">

      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-blue-800">CareerCompass</h1>
        <p class="text-gray-600 mt-2 text-sm">
          ابدأ رحلتك الأكاديمية بثقة ✨
        </p>
      </div>

      <!-- Step Indicator -->
      <div class="flex justify-center mb-6 space-x-4 space-x-reverse">
        <div :class="step === 1 ? activeStep : inactiveStep">1</div>
        <div :class="step === 2 ? activeStep : inactiveStep">2</div>
      </div>

      <!-- FORM -->
      <form @submit.prevent="nextStep">

        <!-- STEP 1 -->
        <div v-if="step === 1" class="space-y-6">

          <!-- Name -->
          <div class="relative">
            <input v-model="name" type="text" required class="floating-input peer" />
            <label class="floating-label">الاسم الكامل</label>
          </div>

          <!-- Email -->
          <div class="relative">
            <input v-model="email" type="email" required class="floating-input peer" />
            <label class="floating-label">البريد الإلكتروني</label>
          </div>

          <!-- Password -->
          <div class="relative">
            <input v-model="password" type="password" required class="floating-input peer" />
            <label class="floating-label">كلمة المرور</label>
          </div>

          <button class="primary-btn mt-6">التالي</button>
        </div>

        <!-- STEP 2 -->
        <div v-if="step === 2" class="space-y-6">

          <h3 class="text-center text-gray-700 font-medium">
            اختر صفك الدراسي
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

          <button
            type="button"
            @click="step = 1"
            class="text-sm text-gray-500 hover:text-blue-600 transition"
          >
            رجوع
          </button>

        </div>

      </form>

      <!-- Login Link -->
      <div class="text-center mt-8 text-sm">
        لديك حساب؟
        <router-link to="/login" class="text-teal-600 font-semibold hover:underline">
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

const activeStep =
  "w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center"

const inactiveStep =
  "w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center"

function nextStep() {
  if (step.value === 1) {
    step.value = 2
  } else {
    authStore.register({
      name: name.value,
      email: email.value,
      gradeLevel: grade.value
    })
    router.push("/dashboard")
  }
}

function selectGrade(val) {
  grade.value = val
}
</script>

<style scoped>
/* Floating Input */
.floating-input {
  @apply w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-teal-400 transition;
}
.floating-label {
  @apply absolute right-4 top-2 text-gray-500 text-sm transition-all;
}
.floating-input:focus + .floating-label,
.floating-input:not(:placeholder-shown) + .floating-label {
  @apply text-xs text-blue-600 top-1;
}

/* Button */
.primary-btn {
  @apply w-full h-12 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-semibold shadow-md hover:scale-[1.03] transition transform disabled:opacity-50;
}

/* Grade Cards */
.grade-card {
  @apply p-4 rounded-xl border border-gray-300 bg-white hover:shadow-md transition text-sm;
}
.grade-active {
  @apply border-blue-600 bg-blue-50 text-blue-700 font-semibold;
}

/* Animated blobs */
@keyframes blob {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}
.animate-blob {
  animation: blob 12s infinite ease-in-out;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>