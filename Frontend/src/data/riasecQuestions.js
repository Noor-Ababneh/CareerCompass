export const riasecQuestions = [
  // =================================================================================
  // الجزء الأول: الميول (Interests) - 5 أسئلة لكل نمط
  // =================================================================================

  // --- R: Realistic (الواقعي) ---
  { id: 1, text_ar: "العمل اليدوي في الهواء الطلق (مثل الزراعة، البناء، المواقع الميدانية).", dimension: "R", type: "interest" },
  { id: 2, text_ar: "فك وتركيب الأجهزة لمعرفة كيف تعمل من الداخل.", dimension: "R", type: "interest" },
  { id: 3, text_ar: "التعامل المباشر مع الحيوانات أو النباتات والعناية بها.", dimension: "R", type: "interest" },
  { id: 4, text_ar: "استخدام الأدوات والمعدات لصنع أشياء ملموسة (خشب، معدن).", dimension: "R", type: "interest" },
  { id: 5, text_ar: "ممارسة أنشطة تتطلب حركة جسدية ولياقة بدنية.", dimension: "R", type: "interest" }, // سؤال إضافي

  // --- I: Investigative (التحليلي) ---
  { id: 6, text_ar: "التفكير في كيفية تصميم وتطوير تطبيقات الهواتف أو ألعاب الفيديو.", dimension: "I", type: "interest" }, // تعديل الصيغة
  { id: 7, text_ar: "إجراء التجارب العلمية واكتشاف حقائق جديدة.", dimension: "I", type: "interest" },
  { id: 8, text_ar: "تحليل الأرقام والبيانات لحل المشاكل المعقدة.", dimension: "I", type: "interest" },
  { id: 9, text_ar: "القراءة عن الاكتشافات الطبية أو التكنولوجية الحديثة.", dimension: "I", type: "interest" },
  { id: 10, text_ar: "حل الألغاز التي تتطلب تفكيراً منطقياً وعميقاً.", dimension: "I", type: "interest" }, // سؤال إضافي

  // --- A: Artistic (الإبداعي) ---
  { id: 11, text_ar: "تصميم أشياء بصرية جميلة (مثل الديكور، الملابس، أو الجرافيك).", dimension: "A", type: "interest" },
  { id: 12, text_ar: "كتابة القصص، السيناريوهات، أو المحتوى الإبداعي.", dimension: "A", type: "interest" },
  { id: 13, text_ar: "تعلم اللغات الأجنبية والتعرف على ثقافات مختلفة.", dimension: "A", type: "interest" },
  { id: 14, text_ar: "الوقوف أمام الجمهور للتمثيل أو تقديم محتوى إبداعي.", dimension: "A", type: "interest" },
  { id: 15, text_ar: "استخدام الخيال لابتكار أفكار غير تقليدية وجديدة.", dimension: "A", type: "interest" }, // سؤال إضافي

  // --- S: Social (الاجتماعي) ---
  { id: 16, text_ar: "مساعدة زملائي في فهم الدروس وشرح المعلومات لهم.", dimension: "S", type: "interest" },
  { id: 17, text_ar: "الاستماع لمشاكل أصدقائي ومحاولة التخفيف عنهم.", dimension: "S", type: "interest" },
  { id: 18, text_ar: "رعاية المرضى أو الأطفال أو كبار السن.", dimension: "S", type: "interest" },
  { id: 19, text_ar: "المشاركة في الأعمال التطوعية وخدمة المجتمع.", dimension: "S", type: "interest" },
  { id: 20, text_ar: "العمل ضمن فريق ومشاركة الأفكار مع الآخرين.", dimension: "S", type: "interest" }, // سؤال إضافي

  // --- E: Enterprising (القيادي) ---
  { id: 21, text_ar: "قيادة مجموعة في مشروع مدرسي أو نشاط اجتماعي.", dimension: "E", type: "interest" },
  { id: 22, text_ar: "إقناع الآخرين بفكرة معينة أو منتج.", dimension: "E", type: "interest" },
  { id: 23, text_ar: "التفكير في مشاريع تجارية صغيرة للربح منها.", dimension: "E", type: "interest" },
  { id: 24, text_ar: "التحدث بجرأة للدفاع عن رأيي أو حقوقي.", dimension: "E", type: "interest" },
  { id: 25, text_ar: "التخطيط وإدارة الفعاليات أو الأنشطة.", dimension: "E", type: "interest" }, // سؤال إضافي

  // --- C: Conventional (التنظيمي) ---
  { id: 26, text_ar: "ترتيب الملفات، الجداول، والمواعيد بدقة.", dimension: "C", type: "interest" },
  { id: 27, text_ar: "اتباع القوانين والخطوات الواضحة لإنجاز العمل.", dimension: "C", type: "interest" },
  { id: 28, text_ar: "التعامل مع الحسابات المالية والأرقام بدقة.", dimension: "C", type: "interest" },
  { id: 29, text_ar: "التدقيق ومراجعة الأعمال للتأكد من خلوها من الأخطاء.", dimension: "C", type: "interest" },
  { id: 30, text_ar: "العمل في بيئة منظمة وروتينية واضحة المعالم.", dimension: "C", type: "interest" }, // سؤال إضافي

  // =================================================================================
  // الجزء الثاني: المهارات (Skills) - 4 أسئلة لكل نمط
  // =================================================================================

  // --- R Skills ---
  { id: 31, text_ar: "أجيد استخدام يديّ لإصلاح الأشياء بمهارة.", dimension: "R", type: "skill" },
  { id: 32, text_ar: "أتحمل الجهد البدني والعمل في الخارج.", dimension: "R", type: "skill" },
  { id: 33, text_ar: "أجيد قراءة الخرائط أو المخططات.", dimension: "R", type: "skill" },
  { id: 34, text_ar: "أستطيع التعامل مع النباتات أو الحيوانات دون خوف.", dimension: "R", type: "skill" },

  // --- I Skills ---
  { id: 35, text_ar: "أجيد حل المسائل الرياضية والمنطقية.", dimension: "I", type: "skill" },
  { id: 36, text_ar: "أستطيع فهم المقالات العلمية المعقدة.", dimension: "I", type: "skill" },
  { id: 37, text_ar: "لدي مهارة في استخدام الحاسوب والبرامج المتقدمة.", dimension: "I", type: "skill" },
  { id: 38, text_ar: "أتميز بدقة الملاحظة والتحليل.", dimension: "I", type: "skill" },

  // --- A Skills ---
  { id: 39, text_ar: "لدي موهبة فنية (رسم، موسيقى، تصميم) واضحة.", dimension: "A", type: "skill" },
  { id: 40, text_ar: "أجيد الكتابة والتعبير عن أفكاري بأسلوب جميل.", dimension: "A", type: "skill" },
  { id: 41, text_ar: "أتعلم نطق اللغات الجديدة بسرعة.", dimension: "A", type: "skill" },
  { id: 42, text_ar: "خيالي واسع وأبتكر أفكاراً جديدة.", dimension: "A", type: "skill" },

  // --- S Skills ---
  { id: 43, text_ar: "الناس يثقون بي ويطلبون نصيحتي.", dimension: "S", type: "skill" },
  { id: 44, text_ar: "أشرح المعلومات بطريقة سهلة ومفهومة.", dimension: "S", type: "skill" },
  { id: 45, text_ar: "لدي صبر في التعامل مع الأطفال أو كبار السن.", dimension: "S", type: "skill" },
  { id: 46, text_ar: "أعمل بانسجام وهدوء مع الفريق.", dimension: "S", type: "skill" },

  // --- E Skills ---
  { id: 47, text_ar: "أستطيع قيادة مجموعة وتوزيع المهام عليهم.", dimension: "E", type: "skill" },
  { id: 48, text_ar: "أجيد التفاوض وإقناع الآخرين برأيي.", dimension: "E", type: "skill" },
  { id: 49, text_ar: "أمتلك الجرأة للحديث أمام الجمهور.", dimension: "E", type: "skill" },
  { id: 50, text_ar: "أتخذ القرارات بسرعة وتحت الضغط.", dimension: "E", type: "skill" },

  // --- C Skills ---
  { id: 51, text_ar: "أنا شخص مرتب جداً ومنظم في أغراضي.", dimension: "C", type: "skill" },
  { id: 52, text_ar: "أجيد التعامل مع برامج الجداول (Excel) والأرقام.", dimension: "C", type: "skill" },
  { id: 53, text_ar: "أركز في التفاصيل الدقيقة لفترات طويلة.", dimension: "C", type: "skill" },
  { id: 54, text_ar: "ألتزم بالمواعيد والقوانين دائماً.", dimension: "C", type: "skill" },
];