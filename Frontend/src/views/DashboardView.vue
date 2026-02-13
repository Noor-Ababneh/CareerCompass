<template>
  <div
    class="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50"
    dir="rtl"
  >

    <!-- Animated Background Blobs -->
    <div class="absolute w-[500px] h-[500px] bg-blue-300 opacity-20 rounded-full blur-3xl top-[-100px] right-[-100px] animate-blob"></div>
    <div class="absolute w-[400px] h-[400px] bg-teal-300 opacity-20 rounded-full blur-3xl bottom-[-80px] left-[-80px] animate-blob animation-delay-2000"></div>

    <div class="relative z-10 max-w-6xl mx-auto px-6 py-16">

      <!-- Welcome Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">
          مرحباً بك في CareerCompass ✨
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          منصتك الذكية لاكتشاف تخصصك الجامعي المناسب بناءً على ميولك وقدراتك الأكاديمية.
        </p>
      </div>

      <!-- Feature Cards -->
      <div class="grid md:grid-cols-3 gap-8">

        <!-- Assessment -->
        <div class="card-premium group">
          <div class="icon-box bg-blue-100 text-blue-700">🧠</div>
          <h3 class="card-title">ابدأ الاختبار</h3>
          <p class="card-desc">
            اختبار احترافي مبني على 3 أبعاد لتحليل ميولك وقدراتك بدقة.
          </p>
          <button class="btn-primary mt-6">ابدأ الآن</button>
        </div>

        <!-- Grades -->
        <div class="card-premium group">
          <div class="icon-box bg-teal-100 text-teal-700">📊</div>
          <h3 class="card-title">إدخال العلامات</h3>
          <p class="card-desc">
            أدخل علاماتك الدراسية لتحليل جاهزيتك الأكاديمية.
          </p>
          <button class="btn-primary mt-6">إدخال العلامات</button>
        </div>

        <!-- Universities -->
        <div class="card-premium group">
          <div class="icon-box bg-orange-100 text-orange-600">🎓</div>
          <h3 class="card-title">الجامعات والتخصصات</h3>
          <p class="card-desc">
            استكشف جميع الجامعات الأردنية الحكومية والخاصة وتخصصاتها.
          </p>
          <button class="btn-primary mt-6">استكشف الآن</button>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
// لاحقاً سنربط الأزرار بالـ router.push
</script>

<style scoped>

/* Premium Card */
.card-premium {
  @apply bg-white/70 backdrop-blur-lg border border-white/50 rounded-3xl p-8 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2;
}

/* Icon */
.icon-box {
  @apply w-16 h-16 flex items-center justify-center rounded-2xl text-2xl mb-6 transition group-hover:scale-110;
}

/* Title */
.card-title {
  @apply text-2xl font-bold text-blue-800 mb-3;
}

/* Description */
.card-desc {
  @apply text-gray-600 leading-relaxed;
}

/* Button */
.btn-primary {
  @apply w-full h-12 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-semibold shadow-md hover:scale-[1.03] transition transform;
}

/* Animated blobs */
@keyframes blob {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(40px, -60px) scale(1.1); }
  66% { transform: translate(-30px, 30px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}

.animate-blob {
  animation: blob 18s infinite ease-in-out;
}

.animation-delay-2000 {
  animation-delay: 3s;
}

</style>
