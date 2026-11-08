// src/data/mockData.js

export const questions = [
  // INTERESTS (20 questions)
  { id: 1, text_ar: "أستمتع بالعمل على الأجهزة أو الأدوات التقنية.", dimension: "interest", sub_scale: "realistic" },
  { id: 2, text_ar: "أفضل حل المشكلات العملية بيدي بدل النقاش النظري.", dimension: "interest", sub_scale: "realistic" },
  { id: 3, text_ar: "أشعر بالراحة في المختبرات أو الورش.", dimension: "interest", sub_scale: "realistic" },

  { id: 4, text_ar: "أحب تحليل الأسباب والنتائج.", dimension: "interest", sub_scale: "investigative" },
  { id: 5, text_ar: "أستمتع بدراسة الأحياء أو الكيمياء لفهم جسم الإنسان.", dimension: "interest", sub_scale: "investigative" },
  { id: 6, text_ar: "أبحث عن تفسير علمي لأي ظاهرة.", dimension: "interest", sub_scale: "investigative" },

  { id: 7, text_ar: "أشعر بالرضا عندما أساعد الآخرين صحيًا أو نفسيًا.", dimension: "interest", sub_scale: "social" },
  { id: 8, text_ar: "أستطيع التعامل بهدوء مع أشخاص مرضى أو متوترين.", dimension: "interest", sub_scale: "social" },
  { id: 9, text_ar: "العمل في فريق صحي يناسبني.", dimension: "interest", sub_scale: "social" },

  { id: 10, text_ar: "أفضل العمل المنظم ذو الخطوات الواضحة.", dimension: "interest", sub_scale: "conventional" },
  { id: 11, text_ar: "الدقة والالتزام مهمان جدًا بالنسبة لي.", dimension: "interest", sub_scale: "conventional" },
  { id: 12, text_ar: "أرتاح مع الأعمال التي تتطلب تركيزًا طويلًا.", dimension: "interest", sub_scale: "conventional" },

  { id: 13, text_ar: "أحب اتخاذ القرار وتحمل المسؤولية.", dimension: "interest", sub_scale: "enterprising" },
  { id: 14, text_ar: "أستطيع إقناع الآخرين بوجهة نظري.", dimension: "interest", sub_scale: "enterprising" },
  { id: 15, text_ar: "أستمتع بقيادة مجموعة.", dimension: "interest", sub_scale: "enterprising" },

  { id: 16, text_ar: "أفضل الإبداع على القواعد الصارمة.", dimension: "interest", sub_scale: "artistic" },
  { id: 17, text_ar: "أجد نفسي في التصميم أو التعبير الفني.", dimension: "interest", sub_scale: "artistic" },
  { id: 18, text_ar: "أملّ من الأعمال الروتينية.", dimension: "interest", sub_scale: "artistic" },

  { id: 19, text_ar: "أفضل العمل مع الناس أكثر من الأجهزة.", dimension: "interest", sub_scale: "special" },
  { id: 20, text_ar: "أفضل التعامل مع البيانات والأنظمة على التعامل المباشر مع الناس.", dimension: "interest", sub_scale: "special" },

  // APTITUDES (16 questions)
  { id: 21, text_ar: "أفهم المفاهيم الرياضية بسرعة.", dimension: "aptitude", sub_scale: "math" },
  { id: 22, text_ar: "أستطيع حل مسائل منطقية معقدة.", dimension: "aptitude", sub_scale: "math" },

  { id: 23, text_ar: "أفهم موضوعات الأحياء بسهولة.", dimension: "aptitude", sub_scale: "biology" },
  { id: 24, text_ar: "حفظ المصطلحات الطبية لا يشكل صعوبة لي.", dimension: "aptitude", sub_scale: "biology" },

  { id: 25, text_ar: "ألاحظ التفاصيل الصغيرة.", dimension: "aptitude", sub_scale: "precision" },
  { id: 26, text_ar: "أرتكب أخطاء قليلة في العمل الدقيق.", dimension: "aptitude", sub_scale: "precision" },

  { id: 27, text_ar: "أشرح أفكاري بوضوح.", dimension: "aptitude", sub_scale: "communication" },
  { id: 28, text_ar: "أستطيع الاستماع وفهم مشكلات الآخرين.", dimension: "aptitude", sub_scale: "communication" },

  { id: 29, text_ar: "أتعلم البرامج الجديدة بسرعة.", dimension: "aptitude", sub_scale: "technology" },
  { id: 30, text_ar: "أفهم كيف تعمل الأنظمة الرقمية.", dimension: "aptitude", sub_scale: "technology" },

  { id: 31, text_ar: "أستطيع العمل تحت الضغط.", dimension: "aptitude", sub_scale: "stress" },
  { id: 32, text_ar: "لا أتأثر بسهولة بالمواقف الصعبة.", dimension: "aptitude", sub_scale: "stress" },

  { id: 33, text_ar: "أحل مسائل تحليلية بسرعة.", dimension: "aptitude", sub_scale: "analytical" },
  { id: 34, text_ar: "أستطيع التركيز لساعات طويلة على مهمة واحدة.", dimension: "aptitude", sub_scale: "analytical" },

  { id: 35, text_ar: "أستطيع تنظيم عملي بدقة عالية.", dimension: "aptitude", sub_scale: "organization" },
  { id: 36, text_ar: "أتعامل مع البيانات المعقدة بسهولة.", dimension: "aptitude", sub_scale: "organization" },

  // WORK STYLE (12 questions)
  { id: 37, text_ar: "أفضل العمل مع فريق.", dimension: "work_style", sub_scale: "team" },
  { id: 38, text_ar: "أفضل العمل الفردي.", dimension: "work_style", sub_scale: "solo" },
  { id: 39, text_ar: "أرتاح مع الروتين.", dimension: "work_style", sub_scale: "routine" },
  { id: 40, text_ar: "أحب التغيير والتنوع.", dimension: "work_style", sub_scale: "dynamic" },
  { id: 41, text_ar: "أحب بيئة العمل الهادئة.", dimension: "work_style", sub_scale: "quiet" },
  { id: 42, text_ar: "أستطيع العمل في بيئة مليئة بالحركة.", dimension: "work_style", sub_scale: "active" },
  { id: 43, text_ar: "أتحمل العمل لساعات طويلة.", dimension: "work_style", sub_scale: "stamina" },
  { id: 44, text_ar: "أحب الوظائف ذات المسؤولية المباشرة.", dimension: "work_style", sub_scale: "responsibility" },
  { id: 45, text_ar: "أفضل العمل داخل مكاتب.", dimension: "work_style", sub_scale: "indoor" },
  { id: 46, text_ar: "أفضل العمل في مستشفيات أو مختبرات.", dimension: "work_style", sub_scale: "field" },
  { id: 47, text_ar: "أفضل اتخاذ القرار بنفسي.", dimension: "work_style", sub_scale: "decision" },
  { id: 48, text_ar: "أفضل وجود تعليمات واضحة.", dimension: "work_style", sub_scale: "instructions" },
];

export const universities = [
  // Public Universities
  {
    id: 1,
    name: "الجامعة الأردنية",
    type: "public",
    location: "عمان",
    description: "أقدم وأعرق جامعة في الأردن",
    majors: ["طب", "هندسة", "علوم حاسوب", "صيدلة", "إدارة أعمال"]
  },
  {
    id: 2,
    name: "جامعة العلوم والتكنولوجيا الأردنية",
    type: "public",
    location: "إربد",
    description: "متخصصة في العلوم والهندسة",
    majors: ["هندسة معمارية", "هندسة كهربائية", "طب", "تمريض", "علوم حاسوب"]
  },
  {
    id: 3,
    name: "جامعة مؤتة",
    type: "public",
    location: "الكرك",
    description: "جامعة وطنية شاملة",
    majors: ["طب", "هندسة", "تربية", "حقوق", "آداب"]
  },
  {
    id: 4,
    name: "جامعة اليرموك",
    type: "public",
    location: "إربد",
    description: "تميز في العلوم الإنسانية والطبيعية",
    majors: ["آداب", "علوم", "تكنولوجيا معلومات", "اقتصاد", "إعلام"]
  },
  
  // Private Universities
  {
    id: 5,
    name: "الجامعة الألمانية الأردنية",
    type: "private",
    location: "عمان",
    description: "تعاون أكاديمي ألماني أردني",
    majors: ["هندسة ميكاترونكس", "طاقة متجددة", "لوجستيات", "إدارة"]
  },
  {
    id: 6,
    name: "جامعة الأميرة سمية للتكنولوجيا",
    type: "private",
    location: "عمان",
    description: "متخصصة في تكنولوجيا المعلومات",
    majors: ["علوم حاسوب", "هندسة برمجيات", "أمن سيبراني", "ذكاء اصطناعي"]
  },
  {
    id: 7,
    name: "جامعة عمان الأهلية",
    type: "private",
    location: "عمان",
    description: "أول جامعة خاصة في الأردن",
    majors: ["صيدلة", "قانون", "تمريض", "إدارة أعمال", "تصميم جرافيكي"]
  },
  {
    id: 8,
    name: "الجامعة الهاشمية",
    type: "public",
    location: "الزرقاء",
    description: "جامعة حديثة متطورة",
    majors: ["طب", "هندسة", "علوم", "تربية", "آداب"]
  },
];

export const majors = [
  // Health Field
  {
    id: 1,
    name: "الطب البشري",
    field: "health",
    description: "دراسة الأمراض وعلاج المرضى",
    duration: "7 سنوات",
    career_options: ["طبيب عام", "جراح", "طبيب مختص"]
  },
  {
    id: 2,
    name: "طب الأسنان",
    field: "health",
    description: "تشخيص وعلاج أمراض الفم والأسنان",
    duration: "6 سنوات",
    career_options: ["طبيب أسنان عام", "أخصائي تقويم", "جراح فم"]
  },
  {
    id: 3,
    name: "الصيدلة",
    field: "health",
    description: "علم الأدوية وتركيبها وتوزيعها",
    duration: "5 سنوات",
    career_options: ["صيدلي", "باحث دوائي", "مدير صيدلية"]
  },
  {
    id: 4,
    name: "التمريض",
    field: "health",
    description: "رعاية المرضى والعناية الصحية",
    duration: "4 سنوات",
    career_options: ["ممرض", "ممرض مختص", "مدير تمريض"]
  },
  
  // Engineering Field
  {
    id: 5,
    name: "الهندسة الكهربائية",
    field: "engineering",
    description: "تصميم الأنظمة الكهربائية والإلكترونية",
    duration: "5 سنوات",
    career_options: ["مهندس كهرباء", "مهندس طاقة", "مهندس اتصالات"]
  },
  {
    id: 6,
    name: "الهندسة المدنية",
    field: "engineering",
    description: "تصميم وتنفيذ المشاريع الإنشائية",
    duration: "5 سنوات",
    career_options: ["مهندس مدني", "مهندس إنشائي", "مدير مشاريع"]
  },
  {
    id: 7,
    name: "الهندسة الميكانيكية",
    field: "engineering",
    description: "تصميم الآلات والأنظمة الميكانيكية",
    duration: "5 سنوات",
    career_options: ["مهندس ميكانيكي", "مهندس صيانة", "مصمم صناعي"]
  },
  {
    id: 8,
    name: "الهندسة المعمارية",
    field: "engineering",
    description: "تصميم المباني والفراغات المعمارية",
    duration: "5 سنوات",
    career_options: ["مهندس معماري", "مصمم داخلي", "مخطط عمراني"]
  },
  
  // IT Field
  {
    id: 9,
    name: "علوم الحاسوب",
    field: "it",
    description: "البرمجة وتطوير الأنظمة الحاسوبية",
    duration: "4 سنوات",
    career_options: ["مبرمج", "محلل نظم", "مهندس برمجيات"]
  },
  {
    id: 10,
    name: "هندسة البرمجيات",
    field: "it",
    description: "تصميم وتطوير البرمجيات",
    duration: "4 سنوات",
    career_options: ["مطور برمجيات", "مهندس برمجيات", "مدير مشاريع تقنية"]
  },
  {
    id: 11,
    name: "الأمن السيبراني",
    field: "it",
    description: "حماية الأنظمة والشبكات من الهجمات",
    duration: "4 سنوات",
    career_options: ["محلل أمن معلومات", "مختبر اختراق", "مستشار أمن"]
  },
  {
    id: 12,
    name: "تكنولوجيا المعلومات",
    field: "it",
    description: "إدارة وصيانة الأنظمة التقنية",
    duration: "4 سنوات",
    career_options: ["مدير شبكات", "مسؤول أنظمة", "دعم فني"]
  },
  
  // Business Field
  {
    id: 13,
    name: "إدارة الأعمال",
    field: "business",
    description: "إدارة المؤسسات والشركات",
    duration: "4 سنوات",
    career_options: ["مدير أعمال", "مستشار إداري", "مدير موارد بشرية"]
  },
  {
    id: 14,
    name: "المحاسبة",
    field: "business",
    description: "إدارة الحسابات والتقارير المالية",
    duration: "4 سنوات",
    career_options: ["محاسب", "مدقق حسابات", "محلل مالي"]
  },
  {
    id: 15,
    name: "التسويق",
    field: "business",
    description: "استراتيجيات الترويج والمبيعات",
    duration: "4 سنوات",
    career_options: ["مدير تسويق", "مستشار علامات", "محلل سوق"]
  },
  
  // Arts & Humanities
  {
    id: 16,
    name: "التصميم الجرافيكي",
    field: "arts",
    description: "تصميم المحتوى البصري",
    duration: "4 سنوات",
    career_options: ["مصمم جرافيك", "مصمم واجهات", "مخرج فني"]
  },
  {
    id: 17,
    name: "الإعلام",
    field: "humanities",
    description: "الصحافة والإعلام الرقمي",
    duration: "4 سنوات",
    career_options: ["صحفي", "مذيع", "منتج إعلامي"]
  },
  {
    id: 18,
    name: "اللغة الإنجليزية",
    field: "humanities",
    description: "دراسة الأدب والترجمة",
    duration: "4 سنوات",
    career_options: ["مترجم", "مدرس لغة", "محرر"]
  },
];
