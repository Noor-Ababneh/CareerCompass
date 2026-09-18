<template>
  <div class="universities-page min-h-screen bg-gray-50 py-12">
    <div class="container-custom">
      <!-- Header -->
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-4xl font-bold mb-4 text-gray-900">دليل الجامعات الأردنية</h1>
        <p class="text-xl text-gray-600">استكشف الجامعات والتخصصات المتاحة</p>
      </div>

      <!-- Search and Filters -->
      <div class="card mb-8 animate-fade-in">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Search -->
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="ابحث عن جامعة..."
              class="input-field pr-10"
            />
            <svg class="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>

          <!-- Type Filter -->
          <select v-model="typeFilter" class="input-field">
            <option value="">جميع الجامعات</option>
            <option value="public">جامعات حكومية</option>
            <option value="private">جامعات خاصة</option>
          </select>

          <!-- Location Filter -->
          <select v-model="locationFilter" class="input-field">
            <option value="">جميع المواقع</option>
            <option value="عمان">عمان</option>
            <option value="إربد">إربد</option>
            <option value="الزرقاء">الزرقاء</option>
            <option value="الكرك">الكرك</option>
          </select>
        </div>
      </div>

      <!-- Statistics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="card text-center animate-fade-in" style="animation-delay: 0.1s">
          <div class="text-3xl font-bold text-primary-600 mb-2">{{ filteredUniversities.length }}</div>
          <p class="text-gray-600 text-sm">جامعة</p>
        </div>
        <div class="card text-center animate-fade-in" style="animation-delay: 0.2s">
          <div class="text-3xl font-bold text-teal-600 mb-2">{{ publicCount }}</div>
          <p class="text-gray-600 text-sm">حكومية</p>
        </div>
        <div class="card text-center animate-fade-in" style="animation-delay: 0.3s">
          <div class="text-3xl font-bold text-orange-600 mb-2">{{ privateCount }}</div>
          <p class="text-gray-600 text-sm">خاصة</p>
        </div>
        <div class="card text-center animate-fade-in" style="animation-delay: 0.4s">
          <div class="text-3xl font-bold text-purple-600 mb-2">{{ totalMajors }}</div>
          <p class="text-gray-600 text-sm">تخصص</p>
        </div>
      </div>

      <!-- Universities Grid -->
      <div v-if="filteredUniversities.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(uni, index) in filteredUniversities" :key="uni.id" 
             class="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
             :style="{ animationDelay: `${index * 0.1}s` }">
          <!-- Header -->
          <div class="flex items-start gap-4 mb-4 pb-4 border-b border-gray-200">
            <div class="w-14 h-14 rounded-lg flex items-center justify-center text-3xl flex-shrink-0"
                 :class="uni.type === 'public' ? 'gradient-primary' : 'gradient-teal'">
              <span class="text-white">🎓</span>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-1 text-gray-900">{{ uni.name }}</h3>
              <div class="flex items-center gap-2 text-sm">
                <span class="px-2 py-1 rounded-full text-xs font-semibold"
                      :class="uni.type === 'public' ? 'bg-blue-100 text-blue-700' : 'bg-teal-100 text-teal-700'">
                  {{ uni.type === 'public' ? 'حكومية' : 'خاصة' }}
                </span>
                <span class="text-gray-600 flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                  {{ uni.location }}
                </span>
              </div>
            </div>
          </div>

          <!-- Description -->
          <p class="text-gray-700 mb-4 leading-relaxed">{{ uni.description }}</p>

          <!-- Majors -->
          <div class="mb-4">
            <p class="text-sm font-semibold text-gray-700 mb-2">التخصصات المتاحة:</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="(major, mIndex) in uni.majors.slice(0, 4)" :key="mIndex" 
                    class="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full">
                {{ major }}
              </span>
              <span v-if="uni.majors.length > 4" 
                    class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                +{{ uni.majors.length - 4 }}
              </span>
            </div>
          </div>

          <!-- Action Button -->
          <button 
            @click="showUniversityDetails(uni)"
            class="btn-outline w-full text-sm"
          >
            عرض التفاصيل
          </button>
        </div>
      </div>

      <!-- No Results -->
      <div v-else class="card text-center py-16">
        <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold mb-3 text-gray-900">لا توجد نتائج</h3>
        <p class="text-gray-600">جرب تغيير معايير البحث</p>
      </div>
    </div>

    <!-- University Details Modal (Simple Alert for now) -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { universities } from '@/data/mockData.js'

const searchQuery = ref('')
const typeFilter = ref('')
const locationFilter = ref('')

const filteredUniversities = computed(() => {
  let result = universities

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(uni => 
      uni.name.toLowerCase().includes(query) ||
      uni.description.toLowerCase().includes(query) ||
      uni.majors.some(major => major.toLowerCase().includes(query))
    )
  }

  // Type filter
  if (typeFilter.value) {
    result = result.filter(uni => uni.type === typeFilter.value)
  }

  // Location filter
  if (locationFilter.value) {
    result = result.filter(uni => uni.location === locationFilter.value)
  }

  return result
})

const publicCount = computed(() => 
  filteredUniversities.value.filter(uni => uni.type === 'public').length
)

const privateCount = computed(() => 
  filteredUniversities.value.filter(uni => uni.type === 'private').length
)

const totalMajors = computed(() => {
  const allMajors = new Set()
  filteredUniversities.value.forEach(uni => {
    uni.majors.forEach(major => allMajors.add(major))
  })
  return allMajors.size
})

const showUniversityDetails = (uni) => {
  const details = `
الجامعة: ${uni.name}
النوع: ${uni.type === 'public' ? 'حكومية' : 'خاصة'}
الموقع: ${uni.location}

الوصف: ${uni.description}

التخصصات المتاحة:
${uni.majors.map((m, i) => `${i + 1}. ${m}`).join('\n')}
  `
  alert(details)
}
</script>
