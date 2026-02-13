<template>
  <div
    class="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-teal-500 text-white"
    dir="rtl"
  >

    <!-- Background Glow -->
    <div class="absolute w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl top-[-150px] right-[-150px] animate-blob"></div>
    <div class="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl bottom-[-120px] left-[-120px] animate-blob animation-delay-2000"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 py-20">

      <!-- Navbar -->
      <div class="flex justify-between items-center mb-20">
        <h1 class="text-2xl font-bold tracking-wide">
          CareerCompass
        </h1>

        <div class="space-x-4 space-x-reverse">
          <router-link
            to="/login"
            class="px-5 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
          >
            تسجيل الدخول
          </router-link>

          <router-link
            to="/signup"
            class="px-5 py-2 rounded-lg bg-white text-blue-700 font-semibold hover:scale-105 transition transform"
          >
            إنشاء حساب
          </router-link>
        </div>
      </div>

      <!-- Hero Section -->
      <div class="text-center max-w-4xl mx-auto">

        <h2 class="text-4xl md:text-6xl font-extrabold leading-tight mb-8">
          اكتشف تخصصك الجامعي المناسب
          <br />
          بثقة وذكاء 🎓
        </h2>

        <p class="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
          منصة ذكية مخصصة لطلاب الأردن تساعدك في اختيار تخصصك
          بناءً على ميولك، قدراتك، ونتائجك الدراسية.
        </p>

        <router-link
          to="/signup"
          class="inline-block px-10 py-4 bg-white text-blue-700 text-lg font-bold rounded-2xl shadow-lg hover:scale-105 transition transform"
        >
          ابدأ رحلتك الآن
        </router-link>

      </div>

      <!-- Features -->
      <div class="grid md:grid-cols-3 gap-10 mt-32 text-center">

        <div class="feature-card">
          <div class="text-4xl mb-4">🧠</div>
          <h3 class="text-xl font-bold mb-3">تحليل ذكي</h3>
          <p class="text-white/80">
            نظام تقييم يعتمد على 3 أبعاد لتحليل ميولك الأكاديمية.
          </p>
        </div>

        <div class="feature-card">
          <div class="text-4xl mb-4">📊</div>
          <h3 class="text-xl font-bold mb-3">تحليل العلامات</h3>
          <p class="text-white/80">
            تقييم جاهزيتك الجامعية بناءً على أدائك الدراسي.
          </p>
        </div>

        <div class="feature-card">
          <div class="text-4xl mb-4">🎓</div>
          <h3 class="text-xl font-bold mb-3">اقتراح تخصصات</h3>
          <p class="text-white/80">
            توصيات مباشرة للتخصصات والجامعات المناسبة لك.
          </p>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>

.feature-card {
  @apply bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-lg transition-all duration-500 hover:bg-white/20 hover:-translate-y-2;
}

/* Animated blobs */
@keyframes blob {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(50px, -70px) scale(1.1); }
  66% { transform: translate(-40px, 40px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}

.animate-blob {
  animation: blob 20s infinite ease-in-out;
}

.animation-delay-2000 {
  animation-delay: 4s;
}

</style>
