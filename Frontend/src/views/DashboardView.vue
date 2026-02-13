<template>
  <div class="min-h-screen bg-gray-50" dir="rtl">
    
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="text-2xl font-extrabold text-blue-900 flex items-center gap-2">
          <span>🧭</span> CareerCompass
        </div>
        <div class="flex items-center gap-4">
          <span class="text-gray-500 text-sm hidden md:inline">مرحباً بك،اسم الحد يلي دخل + ايموجي هاي</span>
          <button @click="$router.push('/')" class="text-red-500 font-medium hover:bg-red-50 px-4 py-2 rounded-lg transition text-sm">
            تسجيل خروج
          </button>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-6 py-10">

      <div class="mb-10">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">عنوان جذاب ههه + ايموجي </h1>
        <p class="text-gray-600">جاهز لاكتشاف مستقبلك؟ اختر إحدى الأدوات التالية للبدء.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">

        <div class="action-card group" @click="$router.push('/assessment')">
          <div class="h-2 w-full bg-blue-500 rounded-t-2xl"></div>
          <div class="p-8">
            <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">🧠</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">ابدأ اختبار الميول</h3>
            <p class="text-gray-500 text-sm mb-6">قم بالإجابة على الأسئلة لتحليل شخصيتك المهنية بدقة.</p>
            <span class="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              ابدأ الآن <span>←</span>
            </span>
          </div>
        </div>

        <div class="action-card group" @click="$router.push('/grades-input')">
           <div class="h-2 w-full bg-teal-500 rounded-t-2xl"></div>
           <div class="p-8">
            <div class="w-14 h-14 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">📊</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">إدخال العلامات</h3>
            <p class="text-gray-500 text-sm mb-6">أدخل معدلاتك الدراسية لدمجها مع نتائج الاختبار.</p>
            <span class="text-teal-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              إدخال البيانات <span>←</span>
            </span>
           </div>
        </div>

        <div class="action-card group">
           <div class="h-2 w-full bg-orange-500 rounded-t-2xl"></div>
           <div class="p-8">
            <div class="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">🎓</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">تصفح الجامعات</h3>
            <p class="text-gray-500 text-sm mb-6">استعرض التخصصات المتاحة في الجامعات الأردنية.</p>
            <span class="text-orange-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              تصفح الدليل <span>←</span>
            </span>
           </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
</script>

<style scoped>
.action-card {
  @apply bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden;
}
</style>