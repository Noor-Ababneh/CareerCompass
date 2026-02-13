<template>
  <div class="results-container" dir="rtl">
    <div class="card animate-fade-in">
      
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-white mb-4">نتيجتك المهنية 🎯</h1>
        <p class="text-blue-200 text-lg">
          بناءً على تحليلك وميولك الدقيقة، هذا هو المسار الأمثل لك:
        </p>
      </div>

      <div class="result-box bg-white/10 p-8 rounded-2xl border border-white/20 text-center mb-8">
        <h2 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-teal-200 mb-2">
          {{ fieldName }}
        </h2>
        <div class="text-sm text-gray-400 mt-2">المسار الأكاديمي المقترح</div>
      </div>

      <div class="majors-list">
        <h3 class="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">التخصصات الجامعية الموصى بها:</h3>
        
        <div class="grid gap-3">
          <div 
            v-for="(major, idx) in suggestedMajors" 
            :key="idx"
            class="major-item"
          >
            <span class="text-2xl ml-3">🎓</span>
            <span class="text-lg font-medium text-white">{{ major }}</span>
          </div>
        </div>
      </div>

      <button @click="$router.push('/dashboard')" class="mt-8 w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition">
        العودة للرئيسية
      </button>

    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router"
import { computed } from "vue"

const route = useRoute()
const specificPath = route.query.specificPath || ""
const fieldName = route.query.specificField || "مسار عام"

// 🧠 قاعدة بيانات التخصصات الشاملة (Database of Majors)
const majorsDB = {
  // Investigative
  "Medical": ["الطب البشري", "طب الأسنان", "دكتور صيدلة", "التحاليل الطبية", "الأحياء الدقيقة"],
  "Tech": ["علم الحاسوب", "هندسة البرمجيات", "الذكاء الاصطناعي", "أمن المعلومات", "علم البيانات"],
  "Science_Math": ["الرياضيات", "الفيزياء", "الكيمياء", "الفلك", "الإحصاء"],
  "Social_Science": ["علم الاجتماع", "الأنثروبولوجيا", "التاريخ", "الآثار"],

  // Realistic
  "Civil_Arch": ["الهندسة المدنية", "الهندسة المعمارية", "هندسة المساحة", "هندسة التعدين"],
  "Eng_Mech": ["الهندسة الميكانيكية", "هندسة الميكاترونيكس", "الهندسة الكهربائية", "هندسة الطاقة"],
  "Agri_Env": ["الهندسة الزراعية", "علوم البيئة", "الموارد الطبيعية", "الإنتاج الحيواني"],
  "Vocational": ["فنون الطهي", "التصميم الصناعي", "إدارة الفنادق", "السلامة المهنية"],

  // Artistic
  "Design_Arts": ["التصميم الجرافيكي", "الفنون الجميلة", "الوسائط المتعددة (Multimedia)", "الرسوم المتحركة"],
  "Lang_Lit": ["اللغة العربية وآدابها", "اللغة الإنجليزية وآدابها", "الترجمة", "اللغات الحديثة (إسباني/فرنسي/ألماني)"],
  "Perf_Arts": ["الموسيقى", "الفنون المسرحية", "الإخراج السينمائي"],
  "Architecture": ["هندسة العمارة", "التصميم الداخلي (الديكور)", "تخطيط المدن"],

  // Social
  "Education": ["معلم صف", "التربية الخاصة", "تكنولوجيا التعليم", "الإرشاد التربوي"],
  "Psychology": ["علم النفس", "الإرشاد والصحة النفسية", "علوم النطق والسمع"],
  "Nursing_Care": ["التمريض", "العلاج الطبيعي", "العلاج الوظيفي", "الأشعة", "الإسعاف والطوارئ"],
  "Law_Social": ["الخدمة الاجتماعية", "علم الجريمة", "حقوق الإنسان"],

  // Enterprising
  "Business": ["إدارة الأعمال", "التسويق الإلكتروني", "ريادة الأعمال", "الموارد البشرية"],
  "Law": ["القانون", "القانون الدولي", "الدراسات القانونية"],
  "Politics": ["العلوم السياسية", "العلاقات الدولية", "الدراسات الدبلوماسية"],
  "Media_Mgt": ["الصحافة والإعلام", "العلاقات العامة", "الإذاعة والتلفزيون"],

  // Conventional
  "Finance": ["المحاسبة", "العلوم المالية والمصرفية", "التمويل والاستثمار", "التأمين"],
  "Data_Admin": ["نظم المعلومات الإدارية (MIS)", "إدارة المكتبات والمعلومات", "الأرشفة الرقمية"],
  "Office_Mgt": ["الإدارة المكتبية", "إدارة اللوجستيات وسلاسل الإمداد", "إدارة المستشفيات"],
  "Audit": ["الفقه وأصوله", "الاقتصاد الإسلامي", "المصارف الإسلامية"]
}

const suggestedMajors = computed(() => {
  return majorsDB[specificPath] || ["تخصص عام"]
})
</script>

<style scoped>
.results-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at bottom left, #0f172a, #1e40af);
  padding: 20px;
}

.card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 30px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
}

.major-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s;
}

.major-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(-5px);
}

.animate-fade-in {
  animation: slideUp 0.8s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>