<template>
  <footer class="bg-gray-900 text-white mt-20">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- About Section -->
        <div>
          <h3 class="text-xl font-bold mb-4">بوصلة المسار</h3>
          <p class="text-gray-400 leading-relaxed">
            نظام توجيه أكاديمي متطور يساعد الطلاب الأردنيين على اختيار المسار التعليمي الأنسب بناءً على تقييم علمي ثلاثي الأبعاد.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-xl font-bold mb-4">روابط سريعة</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-gray-400 hover:text-white transition-colors">
                الرئيسية
              </router-link>
            </li>
            <li>
              <router-link to="/universities" class="text-gray-400 hover:text-white transition-colors">
                الجامعات
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="text-gray-400 hover:text-white transition-colors">
                عن النظام
              </router-link>
            </li>
            <li>
              <router-link to="/signup" class="text-gray-400 hover:text-white transition-colors">
                إنشاء حساب
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-xl font-bold mb-4">تواصل معنا</h3>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              info@careercompass.jo
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              +962 6 123 4567
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              عمان، الأردن
            </li>
          </ul>
        </div>
      </div>

      <!-- Disclaimer -->
      <div class="mt-8 pt-8 border-t border-gray-800">
        <div class="bg-yellow-900/30 border border-yellow-600/30 rounded-lg p-4 mb-6">
          <p class="text-yellow-200 text-sm leading-relaxed">
            <strong>تنويه أكاديمي:</strong> هذا النظام أداة مساعدة في اتخاذ القرار التعليمي ولا يغني عن الاستشارة الأكاديمية المتخصصة. النتائج المقدمة هي توصيات مبنية على نموذج علمي ثلاثي الأبعاد ويجب أخذها بعين الاعتبار مع عوامل أخرى.
          </p>
        </div>
        
        <p class="text-center text-gray-400 text-sm">
          © {{ currentYear }} بوصلة المسار - CareerCompass. جميع الحقوق محفوظة.
        </p>
        <p class="text-center text-gray-500 text-xs mt-2">
          مشروع أكاديمي لنظام التوجيه التعليمي في الأردن
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
