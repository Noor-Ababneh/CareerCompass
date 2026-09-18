<template>
  <div class="about-page min-h-screen bg-gray-50 py-12">
    <div class="container-custom max-w-4xl">
      <!-- Hero Section -->
      <div class="card mb-8 gradient-primary text-white text-center animate-fade-in">
        <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
          </svg>
        </div>
        <h1 class="text-4xl font-bold mb-4">عن بوصلة المسار</h1>
        <p class="text-xl text-blue-100">نظام توجيه أكاديمي متطور للطلاب الأردنيين</p>
      </div>

      <!-- Mission -->
      <div class="card mb-8 animate-fade-in" style="animation-delay: 0.1s">
        <h2 class="text-2xl font-bold mb-4 text-gray-900">رسالتنا</h2>
        <p class="text-gray-700 text-lg leading-relaxed">
          نسعى لمساعدة الطلاب الأردنيين في الصفوف (9-12) على اتخاذ قرارات أكاديمية مستنيرة من خلال نظام توجيه علمي يعتمد على نموذج ثلاثي الأبعاد يجمع بين الميول الشخصية، والقدرات الفعلية، وأسلوب العمل المفضل.
        </p>
      </div>

      <!-- 3D Model Explanation -->
      <div class="card mb-8 animate-fade-in" style="animation-delay: 0.2s">
        <h2 class="text-2xl font-bold mb-6 text-gray-900">النموذج الثلاثي الأبعاد</h2>
        <p class="text-gray-700 mb-6 leading-relaxed">
          نستخدم نموذجاً علمياً متقدماً يقيّم الطلاب من ثلاثة أبعاد رئيسية:
        </p>

        <div class="space-y-6">
          <!-- Dimension 1 -->
          <div class="bg-primary-50 border-r-4 border-primary-500 rounded-lg p-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold text-xl">1</span>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold mb-2 text-primary-900">الميول والاهتمامات</h3>
                <p class="text-gray-700 mb-3">ما الذي تستمتع بالعمل عليه؟</p>
                <ul class="text-gray-600 space-y-1 text-sm">
                  <li>• الواقعي (Realistic): العمل اليدوي والتطبيقي</li>
                  <li>• الاستقصائي (Investigative): البحث والتحليل</li>
                  <li>• الاجتماعي (Social): مساعدة الآخرين</li>
                  <li>• التقليدي (Conventional): العمل المنظم</li>
                  <li>• القيادي (Enterprising): القيادة والإقناع</li>
                  <li>• الفني (Artistic): الإبداع والتعبير</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Dimension 2 -->
          <div class="bg-teal-50 border-r-4 border-teal-500 rounded-lg p-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 gradient-teal rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold text-xl">2</span>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold mb-2 text-teal-900">القدرات والمهارات</h3>
                <p class="text-gray-700 mb-3">ما الذي تتقنه فعلياً؟</p>
                <ul class="text-gray-600 space-y-1 text-sm">
                  <li>• الرياضيات (Math): التفكير الرياضي والمنطقي</li>
                  <li>• الأحياء (Biology): العلوم الحيوية</li>
                  <li>• الدقة (Precision): الانتباه للتفاصيل</li>
                  <li>• التواصل (Communication): التعبير والاستماع</li>
                  <li>• التكنولوجيا (Technology): المهارات التقنية</li>
                  <li>• التعامل مع الضغط (Stress Tolerance)</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Dimension 3 -->
          <div class="bg-orange-50 border-r-4 border-orange-500 rounded-lg p-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 gradient-orange rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold text-xl">3</span>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold mb-2 text-orange-900">أسلوب العمل المفضل</h3>
                <p class="text-gray-700 mb-3">كيف تفضل العمل؟</p>
                <ul class="text-gray-600 space-y-1 text-sm">
                  <li>• فريق مقابل فردي</li>
                  <li>• روتيني مقابل ديناميكي</li>
                  <li>• هادئ مقابل نشط</li>
                  <li>• مكتبي مقابل ميداني</li>
                  <li>• استقلالية القرار مقابل التعليمات</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- How It Works -->
      <div class="card mb-8 animate-fade-in" style="animation-delay: 0.3s">
        <h2 class="text-2xl font-bold mb-6 text-gray-900">آلية العمل</h2>
        <div class="space-y-4">
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <div>
              <h4 class="font-bold text-gray-900 mb-1">التسجيل وتحديد الصف</h4>
              <p class="text-gray-600">أنشئ حساباً وحدد صفك الدراسي (9-12)</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <div>
              <h4 class="font-bold text-gray-900 mb-1">إكمال الاختبار</h4>
              <p class="text-gray-600">أجب على 48 سؤالاً تقيّم الأبعاد الثلاثة</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              3
            </div>
            <div>
              <h4 class="font-bold text-gray-900 mb-1">إدخال الدرجات (اختياري)</h4>
              <p class="text-gray-600">أضف درجاتك الأكاديمية لتوصيات أدق</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              4
            </div>
            <div>
              <h4 class="font-bold text-gray-900 mb-1">الحصول على النتائج</h4>
              <p class="text-gray-600">
                <strong>للصفوف 9-11:</strong> توصية بالمجال + خطة تطوير<br>
                <strong>للصف 12:</strong> قائمة بالتخصصات الجامعية المناسبة
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Features -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="card animate-fade-in" style="animation-delay: 0.4s">
          <h3 class="text-xl font-bold mb-4 text-gray-900">المميزات الرئيسية</h3>
          <ul class="space-y-3 text-gray-700">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>تقييم علمي ثلاثي الأبعاد</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>توصيات مخصصة حسب الصف الدراسي</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>خطة تطوير شخصية</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>دليل شامل للجامعات الأردنية</span>
            </li>
          </ul>
        </div>

        <div class="card animate-fade-in" style="animation-delay: 0.5s">
          <h3 class="text-xl font-bold mb-4 text-gray-900">فئات الطلاب</h3>
          <div class="space-y-3">
            <div class="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <h4 class="font-bold text-teal-900 mb-1">الصفوف 9-11</h4>
              <p class="text-sm text-teal-700">
                توصية بالمجال الدراسي + خطة تطوير لتحسين المهارات قبل التوجيهي
              </p>
            </div>
            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 class="font-bold text-purple-900 mb-1">الصف 12 (التوجيهي)</h4>
              <p class="text-sm text-purple-700">
                توصية مباشرة بالتخصصات الجامعية المناسبة
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Disclaimer -->
      <div class="card bg-yellow-50 border-2 border-yellow-300 animate-fade-in" style="animation-delay: 0.6s">
        <div class="flex items-start gap-4">
          <svg class="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <div>
            <h3 class="font-bold text-yellow-900 mb-2">تنويه مهم</h3>
            <p class="text-yellow-800 leading-relaxed">
              هذا النظام هو أداة مساعدة في اتخاذ القرار التعليمي ولا يغني عن الاستشارة الأكاديمية المتخصصة. النتائج المقدمة هي توصيات مبنية على نموذج علمي ويجب أخذها بعين الاعتبار مع عوامل أخرى مثل الظروف الشخصية والأسرية والفرص المتاحة.
            </p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-8 animate-fade-in" style="animation-delay: 0.7s">
        <router-link to="/signup" class="btn-primary text-lg px-10 py-4 inline-block">
          ابدأ رحلتك الآن
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// This page is purely informational, no complex logic needed
</script>
