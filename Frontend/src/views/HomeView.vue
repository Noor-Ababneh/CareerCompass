<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50 to-white" dir="rtl">

    <div class="absolute w-[600px] h-[600px] bg-blue-200 opacity-30 rounded-full blur-3xl top-[-150px] right-[-150px] animate-blob"></div>
    <div class="absolute w-[500px] h-[500px] bg-teal-200 opacity-30 rounded-full blur-3xl bottom-[-100px] left-[-100px] animate-blob animation-delay-2000"></div>

    <nav class="relative z-50 flex justify-between items-center max-w-7xl mx-auto px-6 py-6">
      <div class="text-3xl font-extrabold text-blue-900 tracking-tighter flex items-center gap-2">
        <span>🧭</span> CareerCompass
      </div>
      <div class="flex gap-4">
        <button @click="$router.push('/login')" class="text-gray-600 font-bold hover:text-blue-700 transition px-4">دخول</button>
        <button @click="$router.push('/signup')" class="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition transform shadow-md">
          ابدأ مجاناً
        </button>
      </div>
    </nav>

    <div class="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24">

      <div class="text-center mb-20">
        <span class="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-4 border border-blue-200">
          ✨ دليلك الأول نحو الجامعة
        </span>
        <h1 class="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
          اكتشف مسارك.. <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
            واصنع مستقبلك 🚀
          </span>
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
          منصتك الذكية التي تدمج بين تحليل شخصيتك وأدائك الأكاديمي، لنرشدك إلى التخصص الجامعي الأنسب لك في الجامعات الأردنية.
        </p>
        
        <div class="flex justify-center gap-4">
          <button @click="$router.push('/signup')" class="px-10 py-4 bg-blue-600 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ring-4 ring-blue-100">
            انشئ حسابك وابدأ الاختبار
          </button>
          <button @click="$router.push('/login')" class="px-10 py-4 bg-white text-blue-700 border-2 border-blue-100 text-lg font-bold rounded-2xl hover:bg-blue-50 transition-all duration-300">
            لديك حساب؟
          </button>
        </div>
      </div>

      <div class="relative max-w-3xl mx-auto mb-24 group">
        <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-400 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        
        <div class="relative bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-video">
           <iframe 
             class="w-full h-full" 
             src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
             title="CareerCompass Intro" 
             frameborder="0" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
             allowfullscreen>
           </iframe>
        </div>
        <p class="text-center text-gray-500 mt-4 text-sm font-medium">شاهد كيف يساعدك CareerCompass في دقيقتين 🎥</p>
      </div>

      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">خدماتنا المتميزة 🌟</h2>
        <p class="text-gray-500 max-w-xl mx-auto">نقدم لك مجموعة أدوات متكاملة لمساعدتك في اتخاذ القرار الصحيح، متاحة حصرياً لمستخدمينا.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">

        <div class="service-card group" @click="$router.push('/signup')">
          <div class="icon-bg bg-purple-100 text-purple-600">🧠</div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">اختبار الميول الذكي</h3>
          <p class="text-gray-500 leading-relaxed text-sm">
            اختبار عالمي (RIASEC) معدل ليناسب البيئة المحلية، يكشف جوانب شخصيتك المهنية بدقة.
          </p>
        </div>

        <div class="service-card group" @click="$router.push('/signup')">
          <div class="icon-bg bg-teal-100 text-teal-600">📊</div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">تحليل العلامات والقدرات</h3>
          <p class="text-gray-500 leading-relaxed text-sm">
            خوارزمية هجينة تربط بين معدلك الدراسي وميولك لتعطيك خيارات واقعية ومناسبة لقدراتك.
          </p>
        </div>

        <div class="service-card group" @click="$router.push('/signup')">
          <div class="icon-bg bg-orange-100 text-orange-600">🎓</div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">دليل الجامعات الأردنية</h3>
          <p class="text-gray-500 leading-relaxed text-sm">
            قاعدة بيانات شاملة لكافة التخصصات في الجامعات الحكومية والخاصة، مفصلة حسب الحقول.
          </p>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
</script>

<style scoped>
.service-card {
  @apply bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer text-center;
}

.icon-bg {
  @apply w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6;
}

/* Animations */
@keyframes blob {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}
.animate-blob {
  animation: blob 10s infinite ease-in-out;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>