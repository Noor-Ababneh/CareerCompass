<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50" dir="rtl">

    <div class="absolute w-[500px] h-[500px] bg-blue-300 opacity-20 rounded-full blur-3xl top-[-100px] right-[-100px] animate-blob"></div>
    <div class="absolute w-[400px] h-[400px] bg-teal-300 opacity-20 rounded-full blur-3xl bottom-[-80px] left-[-80px] animate-blob animation-delay-2000"></div>

    <nav class="relative z-50 flex justify-between items-center max-w-6xl mx-auto px-6 py-6">
      <div class="text-2xl font-bold text-blue-900 tracking-tighter">CareerCompass</div>
      <div class="flex gap-4">
        <button @click="$router.push('/login')" class="text-blue-700 font-semibold hover:text-blue-900 transition">تسجيل الدخول</button>
        <button @click="$router.push('/signup')" class="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-md">حساب جديد</button>
      </div>
    </nav>

    <div class="relative z-10 max-w-6xl mx-auto px-6 pt-10 pb-20">

      <div class="text-center mb-16">
        <h1 class="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-teal-600 mb-6 py-2">
          اكتشف مسارك.. اصنع مستقبلك 🚀
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          تخلص من حيرة اختيار التخصص. CareerCompass هو دليلك الذكي القائم على تحليل الميول والقدرات لمساعدتك في اتخاذ أهم قرار في حياتك الدراسية.
        </p>
        
        <div class="mt-8 flex justify-center gap-4">
          <button @click="$router.push('/signup')" class="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:scale-105 transition transform">
            ابدأ رحلتك الآن
          </button>
        </div>
      </div>

      <div class="mt-12 mb-24 flex justify-center">
        <div class="relative w-full max-w-4xl bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border-[8px] border-white/40">
           <div class="aspect-video w-full">
            <iframe 
              class="w-full h-full" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="CareerCompass Intro" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-8">

        <div class="card-premium group" @click="$router.push('/assessment')">
          <div class="icon-box bg-blue-100 text-blue-700">🧠</div>
          <h3 class="card-title">اختبار الميول المهنية</h3>
          <p class="card-desc">
            تحليل دقيق لشخصيتك وقدراتك لتحديد البيئة الدراسية الأنسب لك.
          </p>
          <span class="text-blue-600 font-bold mt-4 block group-hover:translate-x-[-5px] transition-transform">ابدأ الاختبار ←</span>
        </div>

        <div class="card-premium group" @click="$router.push('/signup')">
          <div class="icon-box bg-teal-100 text-teal-700">📊</div>
          <h3 class="card-title">تحليل العلامات</h3>
          <p class="card-desc">
            ندمج تحصيلك الأكاديمي مع ميولك لنعطيك خيارات واقعية ومناسبة.
          </p>
          <span class="text-teal-600 font-bold mt-4 block group-hover:translate-x-[-5px] transition-transform">أدخل علاماتك ←</span>
        </div>

        <div class="card-premium group" @click="$router.push('/signup')">
          <div class="icon-box bg-orange-100 text-orange-600">🎓</div>
          <h3 class="card-title">دليل الجامعات</h3>
          <p class="card-desc">
            قاعدة بيانات شاملة للتخصصات والجامعات الأردنية بين يديك.
          </p>
          <span class="text-orange-600 font-bold mt-4 block group-hover:translate-x-[-5px] transition-transform">تصفح الجامعات ←</span>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
// لا نحتاج كود معقد هنا، الروابط موجودة مباشرة في القالب
</script>

<style scoped>
/* Premium Card */
.card-premium {
  @apply bg-white/80 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer;
}

/* Icon */
.icon-box {
  @apply w-16 h-16 flex items-center justify-center rounded-2xl text-3xl mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3;
}

/* Title */
.card-title {
  @apply text-2xl font-bold text-gray-800 mb-3;
}

/* Description */
.card-desc {
  @apply text-gray-600 leading-relaxed;
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

/* Aspect Ratio for Video */
.aspect-video {
  aspect-ratio: 16 / 9;
}
</style>