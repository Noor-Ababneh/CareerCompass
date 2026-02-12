<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-8" dir="rtl">

    <!-- HEADER -->
    <div class="max-w-6xl mx-auto">

      <!-- Welcome Section -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 to-teal-600 text-white p-10 shadow-xl">

        <div class="relative z-10">
          <h1 class="text-3xl md:text-4xl font-bold mb-3">
            أهلاً {{ authStore.user?.name }} 👋
          </h1>

          <p class="text-white/90 text-lg max-w-xl leading-relaxed">
            مستعدة تكتشفي مسارك الأكاديمي المناسب ؟ السؤال كرنجي بعدين بنغيره وبرضو التصميم بدائي لكن ذس از وت اي كان دو كرنتلي ههههه
            نظام CareerCompass مبني خصيصاً لدعم طلاب الأردن في اختيار تخصصهم بثقة.
          </p>

          <button
            @click="$router.push('/assessment')"
            class="mt-6 bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-xl transition duration-300"
          >
            ابدأ الاختبار الآن اختبار الرائعون وإلى التخصص الخاطئ ذاهبون
          </button>
        </div>

        <!-- Decorative Glow -->
        <div class="absolute -top-10 -left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-10 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

      </div>

      <!-- Quick Access Section -->
      <div class="mt-12">

        <h2 class="text-2xl font-bold text-blue-900 mb-6">
          خياراتك المتاحة
        </h2>

        <div class="grid md:grid-cols-3 gap-6">

          <!-- Card 1 -->
          <div
            class="premium-card"
            @click="$router.push('/assessment')"
          >
            <div class="icon-circle bg-blue-100 text-blue-700">
              📊
            </div>
            <h3>اختبار الميول والقدرات</h3>
            <p>
              تحليل احترافي يعتمد على 3 أبعاد لاكتشاف أفضل مسار لك.
            </p>
          </div>

          <!-- Conditional Cards -->
          <template v-if="authStore.user?.gradeLevel !== '12'">

            <div
              class="premium-card"
              @click="$router.push('/improvement-plan')"
            >
              <div class="icon-circle bg-teal-100 text-teal-700">
                📈
              </div>
              <h3>خطة التحسين هاي الالغو تبعتها والكود تبعها ضضععييففففف بعدين بغيره </h3>
              <p>
                خطوات عملية لتطوير مهاراتك قبل التوجيهي.
              </p>
            </div>

            <div
              class="premium-card"
              @click="$router.push('/progress')"
            >
              <div class="icon-circle bg-orange-100 text-orange-600">
                🎯
              </div>
              <h3>تتبع التقدم</h3>
              <p>
                راقبي تطور نتائجك (السلبي) بمرور الوقت.
              </p>
            </div>

          </template>

          <template v-else>

            <div
              class="premium-card"
              @click="$router.push('/majors')"
            >
              <div class="icon-circle bg-teal-100 text-teal-700">
                🎓
              </div>
              <h3>التخصصات المقترحة</h3>
              <p>
                توصيات مباشرة للتخصصات الجامعية المناسبة لك.
              </p>
            </div>

            <div
              class="premium-card"
              @click="$router.push('/universities')"
            >
              <div class="icon-circle bg-orange-100 text-orange-600">
                🏛
              </div>
              <h3>الجامعات في الأردن</h3>
              <p>
                استكشف/ي بحس كرنج نعمل هيك وبرضو ليه نكتب بصيغة المذكر يعني بالله الجامعات الحكومية والخاصة حسب موقعك.
              </p>
            </div>

          </template>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth"

const authStore = useAuthStore()
</script>

<style scoped>
.premium-card {
  @apply bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer border border-gray-100;
}

.premium-card h3 {
  @apply text-lg font-bold text-blue-900 mt-4 mb-2;
}

.premium-card p {
  @apply text-gray-600 text-sm leading-relaxed;
}

.icon-circle {
  @apply w-12 h-12 rounded-xl flex items-center justify-center text-xl;
}
</style>