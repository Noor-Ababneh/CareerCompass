<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="gradient-primary py-20 md:py-32">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="text-white animate-fade-in">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              اكتشف مسارك الأكاديمي المثالي
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              نظام توجيه علمي ثلاثي الأبعاد يساعدك على اختيار التخصص الجامعي الأنسب لميولك وقدراتك
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link to="/signup" class="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl text-center">
                ابدأ الآن مجاناً
              </router-link>
              <router-link to="/about" class="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 text-center">
                تعرف على النظام
              </router-link>
            </div>
          </div>
          
          <div class="hidden md:block animate-slide-in">
            <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div class="aspect-video bg-gray-800/50 rounded-xl flex items-center justify-center">
                <div class="text-center">
                  <svg class="w-20 h-20 text-white/70 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <p class="text-white/70">شاهد الفيديو التعريفي</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-16 animate-fade-in">
          <h2 class="text-4xl font-bold mb-4 text-gray-900">كيف نساعدك؟</h2>
          <p class="text-xl text-gray-600">نظام شامل لاختيار المسار الأكاديمي المناسب</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="card text-center transform hover:scale-105 transition-transform duration-300 animate-fade-in" style="animation-delay: 0.1s">
            <div class="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">اختبار شامل</h3>
            <p class="text-gray-600">48 سؤالاً علمياً لتقييم ميولك وقدراتك وأسلوب عملك</p>
          </div>

          <div class="card text-center transform hover:scale-105 transition-transform duration-300 animate-fade-in" style="animation-delay: 0.2s">
            <div class="w-16 h-16 gradient-teal rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">تحليل الدرجات</h3>
            <p class="text-gray-600">مقارنة أدائك الأكاديمي مع متطلبات التخصصات</p>
          </div>

          <div class="card text-center transform hover:scale-105 transition-transform duration-300 animate-fade-in" style="animation-delay: 0.3s">
            <div class="w-16 h-16 gradient-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">خطة تطوير</h3>
            <p class="text-gray-600">نصائح شخصية لتحسين نقاط الضعف قبل الجامعة</p>
          </div>

          <div class="card text-center transform hover:scale-105 transition-transform duration-300 animate-fade-in" style="animation-delay: 0.4s">
            <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">دليل الجامعات</h3>
            <p class="text-gray-600">معلومات شاملة عن الجامعات والتخصصات المتاحة</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-20">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 text-gray-900">آلية العمل</h2>
          <p class="text-xl text-gray-600">ثلاث خطوات بسيطة لاكتشاف مسارك</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-primary-600">
              1
            </div>
            <h3 class="text-2xl font-bold mb-3">أنشئ حساباً</h3>
            <p class="text-gray-600 leading-relaxed">سجل بياناتك الأساسية وحدد صفك الدراسي</p>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-teal-600">
              2
            </div>
            <h3 class="text-2xl font-bold mb-3">أجب على الاختبار</h3>
            <p class="text-gray-600 leading-relaxed">48 سؤالاً لتقييم ميولك وقدراتك بدقة</p>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-orange-600">
              3
            </div>
            <h3 class="text-2xl font-bold mb-3">احصل على النتائج</h3>
            <p class="text-gray-600 leading-relaxed">توصيات مخصصة للمجال أو التخصص المناسب</p>
          </div>
        </div>

        <div class="text-center mt-12">
          <router-link to="/signup" class="btn-primary text-lg px-10 py-4 inline-block">
            ابدأ رحلتك الآن
          </router-link>
        </div>
      </div>
    </section>

    <!-- Universities Preview -->
    <section class="py-20 bg-gray-50">
      <div class="container-custom">
        <div class="flex justify-between items-center mb-12">
          <div>
            <h2 class="text-4xl font-bold mb-2 text-gray-900">الجامعات الأردنية</h2>
            <p class="text-xl text-gray-600">اكتشف الجامعات والتخصصات المتاحة</p>
          </div>
          <router-link to="/universities" class="btn-outline hidden md:inline-block">
            عرض الكل
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="uni in previewUniversities" :key="uni.id" class="card transform hover:scale-105 transition-transform duration-300">
            <div class="flex items-start gap-4 mb-4">
              <div class="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" 
                   :class="uni.type === 'public' ? 'gradient-primary' : 'gradient-teal'">
                <span class="text-white">🎓</span>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold mb-1">{{ uni.name }}</h3>
                <p class="text-sm text-gray-600">{{ uni.location }}</p>
              </div>
            </div>
            <p class="text-gray-700 mb-4">{{ uni.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="major in uni.majors.slice(0, 3)" :key="major" 
                    class="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full">
                {{ major }}
              </span>
              <span v-if="uni.majors.length > 3" class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                +{{ uni.majors.length - 3 }}
              </span>
            </div>
          </div>
        </div>

        <div class="text-center mt-8 md:hidden">
          <router-link to="/universities" class="btn-outline">
            عرض جميع الجامعات
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 gradient-primary">
      <div class="container-custom text-center text-white">
        <h2 class="text-4xl font-bold mb-6">مستعد لاكتشاف مسارك الأكاديمي؟</h2>
        <p class="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          انضم الآن إلى آلاف الطلاب الذين اكتشفوا شغفهم وقدراتهم الحقيقية
        </p>
        <router-link to="/signup" class="bg-white text-primary-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl inline-block">
          ابدأ مجاناً
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { universities } from '@/data/mockData.js'

const previewUniversities = computed(() => universities.slice(0, 6))
</script>
