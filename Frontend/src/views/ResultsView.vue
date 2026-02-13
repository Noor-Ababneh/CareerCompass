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
        <h3 class="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">التخصصات الجامعية الموصى بها في الأردن:</h3>
        
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

// 🇯🇴 قاعدة بيانات التخصصات الجامعية الشاملة في الأردن
const majorsDB = {
  // 1️⃣ الحقل الطبي والصحي
  "Health": [
    "الطب البشري (Medicine)", "طب الأسنان (Dentistry)", "دكتور صيدلة (PharmD)", "الصيدلة (Pharmacy)", 
    "التمريض (Nursing)", "القبالة", "التحاليل الطبية والمخبرية", "الأشعة والتصوير الطبي", 
    "العلاج الطبيعي", "العلاج الوظيفي", "تكنولوجيا صناعة الأسنان", "البصريات", "السمع والنطق", 
    "الإسعاف والطوارئ", "التخدير والإنعاش", "الأطراف الاصطناعية"
  ],
  // 2️⃣ تكنولوجيا المعلومات (IT)
  "IT": [
    "علم الحاسوب (CS)", "هندسة البرمجيات (SE)", "نظم المعلومات الحاسوبية (CIS)", 
    "الذكاء الاصطناعي (AI)", "الأمن السيبراني (Cyber Security)", "علم البيانات (Data Science)", 
    "تكنولوجيا معلومات الأعمال (BIT)", "الواقع الافتراضي (VR/AR)", "إنترنت الأشياء (IoT)"
  ],
  // 3️⃣ العلوم الأساسية
  "Science": [
    "الرياضيات", "الفيزياء", "الكيمياء", "العلوم الحياتية (Biology)", 
    "التكنولوجيا الحيوية (Biotechnology)", "علم التغذية والتصنيع الغذائي", 
    "الجيولوجيا والبيئة", "العلوم الجنائية", "الفيزياء الطبية"
  ],
  // 4️⃣ الهندسة التكنولوجية
  "Engineering": [
    "هندسة الحاسوب", "هندسة الميكاترونيكس", "الهندسة الكهربائية", 
    "هندسة الإلكترونيات", "هندسة الاتصالات", "هندسة الطاقة المتجددة"
  ],
  // 5️⃣ الهندسة المدنية والمعمارية
  "Engineering_Civil": [
    "الهندسة المدنية", "هندسة العمارة", "هندسة المساحة", "هندسة الطرق والجسور", "هندسة المياه والبيئة"
  ],
  // 6️⃣ الهندسة الميكانيكية والصناعية
  "Engineering_Mech": [
    "الهندسة الميكانيكية", "الهندسة الصناعية", "هندسة الطيران", "هندسة السيارات (Autotronics)", "الهندسة الكيميائية"
  ],
  // 7️⃣ اللغات
  "Languages": [
    "اللغة العربية وآدابها", "اللغة الإنجليزية وآدابها", "الترجمة", 
    "اللغات الحديثة (فرنسي/ألماني/إسباني/تركي/صيني)"
  ],
  // 8️⃣ العلوم الاجتماعية والنفسية
  "Social_Work": [
    "علم النفس", "علم الاجتماع", "الخدمة الاجتماعية", "الإرشاد والصحة النفسية", 
    "الجغرافيا", "التاريخ", "الآثار والسياحة"
  ],
  // 9️⃣ التربية
  "Education": [
    "معلم صف", "تربية الطفل", "التربية الخاصة", "تكنولوجيا التعليم", "المكتبات والمعلومات"
  ],
  // 🔟 القانون والشريعة
  "Law": ["الحقوق (Law)", "العلوم الجنائية"],
  "Sharia_Law": ["الفقه وأصوله", "أصول الدين", "المصارف الإسلامية", "القانون الشرعي"],
  
  // 1️⃣1️⃣ السياسة والإعلام
  "Politics_PR": ["العلوم السياسية", "العلاقات الدولية", "فض النزاعات", "حقوق الإنسان"],
  "Media": ["الصحافة والإعلام", "الإذاعة والتلفزيون", "العلاقات العامة", "الإعلام الرقمي"],

  // 1️⃣2️⃣ الأعمال
  "Business": [
    "إدارة الأعمال", "التسويق", "التسويق الإلكتروني", "إدارة الموارد البشرية", 
    "نظم المعلومات الإدارية (MIS)", "إدارة المستشفيات", "إدارة الفنادق", 
    "إدارة اللوجستيات", "ريادة الأعمال", "الاقتصاد", "الإدارة العامة"
  ],
  "Finance": [
    "المحاسبة", "العلوم المالية والمصرفية", "تكنولوجيا المال والأعمال (FinTech)", 
    "العلوم الجمركية والضريبية", "التأمين"
  ],

  // 1️⃣3️⃣ التصميم والفنون
  "Design": [
    "التصميم الجرافيكي", "الوسائط المتعددة (Multimedia)", "التحريك (Animation)", "تصميم الأزياء"
  ],
  "Architecture_Design": ["هندسة العمارة", "التصميم الداخلي (الديكور)", "تصميم المناظر الطبيعية"],
  "Perf_Arts": ["الموسيقى", "الفنون المسرحية", "الفنون التشكيلية"],

  // 1️⃣4️⃣ الزراعة والمهني
  "Agri": ["الإنتاج النباتي", "الإنتاج الحيواني", "وقاية النبات", "الأراضي والمياه والبيئة"],
  "Vocational": ["فنون الطهي", "صيانة المركبات الهجينة", "التكييف والتبريد", "المساحة والطرق"]
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