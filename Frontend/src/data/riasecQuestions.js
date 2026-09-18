// ================================================================
// riasecQuestions.js — النسخة السلسة والذكية والنظيفة (42 سؤالاً)
// ================================================================

export const TYPE_WEIGHTS = {
  interest:  1.0,
  aptitude:  1.5,
  style:     1.2,
};

// ─── المرحلة الأولى: الميول والاهتمامات (18 سؤالاً) ─────────────
export const phase1Questions = [
  // R
  { id: "R_I_1", text_ar: "أُبادر لإصلاح الأجهزة وتفكيكها لمعرفة آلية عملها بدلاً من الاستعانة بغيري.", dimension: "R", type: "interest", phase: 1 },
  { id: "R_I_2", text_ar: "أُفضل أن يكون ناتج عملي شيئاً ملموساً يمكن رؤيته أو استخدامه.", dimension: "R", type: "interest", phase: 1 },
  { id: "R_I_3", text_ar: "أميل للعمل الميداني والتقني أكثر من البقاء في بيئة مكتبية مغلقة.", dimension: "R", type: "interest", phase: 1 },

  // I
  { id: "I_I_1", text_ar: "أبحث دائماً عن الأسباب العلمية والمنطقية وراء الظواهر والمشكلات.", dimension: "I", type: "interest", phase: 1 },
  { id: "I_I_2", text_ar: "أميل لحل المسائل الرياضية أو الخوارزميات البرمجية المعقدة.", dimension: "I", type: "interest", phase: 1 },
  { id: "I_I_3", text_ar: "أفضل المهام التي تتطلب بحثاً مستمراً وتحليلاً دقيقاً للبيانات.", dimension: "I", type: "interest", phase: 1 },

  // A
  { id: "A_I_1", text_ar: "أُعبّر عن أفكاري بطرق إبداعية كالكتابة، التصميم، أو الفنون.", dimension: "A", type: "interest", phase: 1 },
  { id: "A_I_2", text_ar: "ألاحظ تفاصيل التصميم، الألوان، والتنسيق البصري أكثر من غيري.", dimension: "A", type: "interest", phase: 1 },
  { id: "A_I_3", text_ar: "أفضل المهام التي تمنحني حرية الابتكار ولا تقيدني بقوالب جاهزة.", dimension: "A", type: "interest", phase: 1 },

  // S
  { id: "S_I_1", text_ar: "أبادر بتقديم المساعدة للأشخاص الذين يواجهون صعوبات صحية أو نفسية.", dimension: "S", type: "interest", phase: 1 },
  { id: "S_I_2", text_ar: "أفضل شرح المعلومات وتبسيطها للآخرين لضمان فهمهم لها.", dimension: "S", type: "interest", phase: 1 },
  { id: "S_I_3", text_ar: "أهتم بفهم احتياجات الأشخاص من حولي ومراعاة مشاعرهم.", dimension: "S", type: "interest", phase: 1 },

  // E
  { id: "E_I_1", text_ar: "أمتلك القدرة على إقناع الآخرين بوجهة نظري بأسلوب منطقي.", dimension: "E", type: "interest", phase: 1 },
  { id: "E_I_2", text_ar: "أميل لفكرة إدارة المشاريع التجارية واتخاذ القرارات الحاسمة.", dimension: "E", type: "interest", phase: 1 },
  { id: "E_I_3", text_ar: "أُفضل توجيه فريق العمل وتوزيع المهام بدلاً من الاكتفاء بالتنفيذ.", dimension: "E", type: "interest", phase: 1 },

  // C
  { id: "C_I_1", text_ar: "أُفضل ترتيب المعلومات والبيانات في جداول وقوائم دقيقة التصنيف.", dimension: "C", type: "interest", phase: 1 },
  { id: "C_I_2", text_ar: "أعمل بشكل أفضل عندما أتبع خطوات وإجراءات واضحة ومحددة مسبقاً.", dimension: "C", type: "interest", phase: 1 },
  { id: "C_I_3", text_ar: "أحرص على الدقة العالية جداً عند مراجعة الأرقام والحسابات.", dimension: "C", type: "interest", phase: 1 },
];

// ─── المرحلة الثانية: القدرات والكفاءات (12 سؤالاً) ────────────
export const phase2Questions = [
  // R
  { id: "R_A_1", text_ar: "أستطيع تخيّل الأشكال الهندسية ثلاثية الأبعاد بوضوح في ذهني.", dimension: "R", type: "aptitude", phase: 2 },
  { id: "R_A_2", text_ar: "أتميز بالدقة العالية في أداء الأعمال اليدوية، التقنية، أو الميكانيكية.", dimension: "R", type: "aptitude", phase: 2 },
  
  // I
  { id: "I_A_1", text_ar: "أُجيد حل المعادلات الرياضية أو المنطقية باتباع خطوات متسلسلة.", dimension: "I", type: "aptitude", phase: 2 },
  { id: "I_A_2", text_ar: "أستطيع استنتاج العلاقات الخفية والأنماط بين البيانات بسهولة.", dimension: "I", type: "aptitude", phase: 2 },
  
  // A
  { id: "A_A_1", text_ar: "أمتلك مهارة في صياغة النصوص الجذابة أو ابتكار التصاميم المرئية.", dimension: "A", type: "aptitude", phase: 2 },
  { id: "A_A_2", text_ar: "أستطيع تبسيط الأفكار المعقدة بأسلوب إبداعي يسهل فهمه.", dimension: "A", type: "aptitude", phase: 2 },
  
  // S
  { id: "S_A_1", text_ar: "أستطيع قراءة لغة الجسد وفهم مشاعر الآخرين دون أن يتحدثوا.", dimension: "S", type: "aptitude", phase: 2 },
  { id: "S_A_2", text_ar: "أمتلك مهارة في حل النزاعات بين الأفراد والوصول لتسويات هادئة.", dimension: "S", type: "aptitude", phase: 2 },
  
  // E
  { id: "E_A_1", text_ar: "أتحدث أمام مجموعة من الناس بثقة ووضوح دون ارتباك.", dimension: "E", type: "aptitude", phase: 2 },
  { id: "E_A_2", text_ar: "أستطيع تحفيز فريق العمل وتوجيه جهودهم نحو إنجاز الهدف.", dimension: "E", type: "aptitude", phase: 2 },
  
  // C
  { id: "C_A_1", text_ar: "ألاحظ الأخطاء الصغيرة جداً في الجداول والأرقام قبل أي شخص آخر.", dimension: "C", type: "aptitude", phase: 2 },
  { id: "C_A_2", text_ar: "أُدير وقتي بفاعلية وأنجز مهامي بالتزام تام بالمواعيد المحددة.", dimension: "C", type: "aptitude", phase: 2 },
];

// ─── المرحلة الثالثة: نمط الشخصية وبيئة العمل (12 سؤالاً) ────────
export const phase3Questions = [
  // R
  { id: "R_S_1", text_ar: "أُفضل الوظائف التي تقدم نتائج عملية قابلة للقياس المباشر على النظريات.", dimension: "R", type: "style", phase: 3 },
  { id: "R_S_2", text_ar: "أنسجم مع بيئات العمل الميدانية التي تتطلب نشاطاً حركياً مستمراً.", dimension: "R", type: "style", phase: 3 },
  
  // I
  { id: "I_S_1", text_ar: "أنتج بكفاءة أعلى في البيئات التقنية والبحثية التي تتطلب تركيزاً عميقاً.", dimension: "I", type: "style", phase: 3 },
  { id: "I_S_2", text_ar: "أبحث عن مسار مهني يقدم تحديات فكرية وأتجنب المهام الروتينية المتكررة.", dimension: "I", type: "style", phase: 3 },
  
  // A
  { id: "A_S_1", text_ar: "أعمل بفاعلية أكبر عندما أُمنح مرونة عالية في طريقة التنفيذ.", dimension: "A", type: "style", phase: 3 },
  { id: "A_S_2", text_ar: "أُفضل أن يُقيّم عملي بناءً على مستوى الابتكار واللمسة الإبداعية فيه.", dimension: "A", type: "style", phase: 3 },
  
  // S
  { id: "S_S_1", text_ar: "تزداد دافعيتي للعمل حين أرى أثره المباشر في تحسين حياة الناس.", dimension: "S", type: "style", phase: 3 },
  { id: "S_S_2", text_ar: "أُفضل العمل في بيئة اجتماعية متعاونة على العمل الفردي المنعزل.", dimension: "S", type: "style", phase: 3 },
  
  // E
  { id: "E_S_1", text_ar: "أتألق في البيئات التنافسية التي تكافئ الإنجاز السريع وتحقيق الأهداف.", dimension: "E", type: "style", phase: 3 },
  { id: "E_S_2", text_ar: "أفضل المناصب التي تمنحني صلاحية اتخاذ القرارات وإدارة المفاوضات.", dimension: "E", type: "style", phase: 3 },
  
  // C
  { id: "C_S_1", text_ar: "أفضل المؤسسات التي تمتلك هياكل إدارية واضحة وسياسات ثابتة.", dimension: "C", type: "style", phase: 3 },
  { id: "C_S_2", text_ar: "أنجز مهامي براحة أكبر في البيئات المكتبية المنظمة والمعتمدة على البيانات.", dimension: "C", type: "style", phase: 3 },
];

export const riasecQuestions = [
  ...phase1Questions,
  ...phase2Questions,
  ...phase3Questions,
];

// ─── بيانات المراحل ──────────────────────────────────────────────
export const phasesMeta = [
  { phase: 1, title: "الميول والاهتمامات", subtitle: "استكشاف التفضيلات الأكاديمية.", completedMsg: "تم رصد التفضيلات.", encouragement: "أحسنت! المرحلة التالية ستقيس كفاءاتك.", icon: "🎯", color: "blue", questionsCount: phase1Questions.length, weight: "1.0" },
  { phase: 2, title: "القدرات والكفاءات", subtitle: "قياس المهارات الفعلية.", completedMsg: "تم تقييم الكفاءات.", encouragement: "ممتاز! المرحلة الأخيرة ستحدد بيئة عملك.", icon: "🧠", color: "purple", questionsCount: phase2Questions.length, weight: "1.5" },
  { phase: 3, title: "أسلوب وبيئة العمل", subtitle: "تحديد السياق المهني الأمثل.", completedMsg: "اكتمل التقييم.", encouragement: "جارٍ تحليل النتيجة...", icon: "🏢", color: "teal", questionsCount: phase3Questions.length, weight: "1.2" },
];

// ================================================================
// الحقول الأردنية الأربعة وتخصصاتها
// ================================================================
export const JORDANIAN_FIELDS = {
  Health: {
    name: "الحقل الصحي", nameEn: "Health & Medical",
    description: "يسمح هذا الحقل بالالتحاق بكليات الطب، طب الأسنان، الصيدلة، التمريض، والعلوم الطبية المساندة.",
    icon: "🏥", color: "#10b981", colorLight: "#d1fae5", riasecCode: "ISR",
    topMajors: [
      { name: "الطب البشري", minGPA: 85, riasecFit: "ISR", reason: "يجمع بين البحث العلمي (I) وتقديم الرعاية للمرضى (S)." },
      { name: "طب الأسنان", minGPA: 85, riasecFit: "IRS", reason: "يحتاج للدقة التطبيقية العالية (R) والفهم الطبي المتقدم (I)." },
      { name: "الصيدلة", minGPA: 80, riasecFit: "ICR", reason: "يعتمد على التركيز في الكيمياء (I) والدقة في صرف الأدوية (C)." },
      { name: "دكتور صيدلة", minGPA: 85, riasecFit: "ICR", reason: "يحتاج لمهارات تحليلية صيدلانية (I) ودقة منهجية قوية (C)." },
      { name: "الطب البيطري", minGPA: 80, riasecFit: "IRS", reason: "يتطلب حباً لعلوم الأحياء (I) وقدرة على العمل الميداني والعملي (R)." },
      { name: "التمريض", minGPA: 75, riasecFit: "SIR", reason: "يناسب من يملك تعاطفاً وميلاً كبيراً لمساعدة ورعاية الآخرين (S)." },
      { name: "علوم التأهيل (علاج طبيعي)", minGPA: 70, riasecFit: "SIR", reason: "يمزج بين العمل البدني والتطبيقي (R) ودعم المرضى وتأهيلهم (S)." },
      { name: "العلوم الطبية المساندة", minGPA: 70, riasecFit: "IRC", reason: "يعتمد على تشغيل الأجهزة المخبرية (R) وتحليل العينات بدقة (I, C)." },
      { name: "العلوم الصيدلانية", minGPA: 80, riasecFit: "ICR", reason: "يركز بشكل كبير على البحث وتطوير الأدوية مخبرياً (I)." }
    ]
  },
  EngineeringIT: {
    name: "حقل العلوم والتكنولوجيا والهندسة", nameEn: "STEM",
    description: "يسمح بالالتحاق بتخصصات الهندسة، تكنولوجيا المعلومات، الذكاء الاصطناعي، العلوم، والزراعة.",
    icon: "⚙️", color: "#6366f1", colorLight: "#e0e7ff", riasecCode: "RIC",
    topMajors: [
      { name: "هندسة العمارة", minGPA: 80, riasecFit: "RAI", reason: "يحتاج إلى التخيل الهندسي الميداني (R) واللمسة الفنية والإبداعية (A)." },
      { name: "تخصصات الهندسة (بكافة فروعها)", minGPA: 80, riasecFit: "RIC", reason: "يتطلب تفكيراً رياضياً ومنطقياً (I) وحباً للجانب العملي والتنفيذي (R)." },
      { name: "علوم الحاسوب", minGPA: 75, riasecFit: "ICR", reason: "يعتمد على حل المشكلات برمجياً (I) والتعامل مع الأنظمة بدقة عالية (C)." },
      { name: "الذكاء الاصطناعي", minGPA: 75, riasecFit: "IRC", reason: "يتطلب قدرة تحليلية قوية للبيانات (I) وتنظيم الخوارزميات (C)." },
      { name: "نظم المعلومات الحاسوبية", minGPA: 75, riasecFit: "RCI", reason: "يناسب المهتمين بالشبكات والأجهزة (R) وإدارة الأنظمة التقنية (C)." },
      { name: "تخصصات العلوم (الفيزياء، الكيمياء)", minGPA: 65, riasecFit: "IRC", reason: "يعتمد كلياً على الفضول المعرفي، التجريب، والبحث العلمي (I)." },
      { name: "علم الغذاء والتغذية", minGPA: 70, riasecFit: "ISC", reason: "يربط بين الفهم الحيوي لجسم الإنسان (I) وإرشاد المستفيدين صحياً (S)." },
      { name: "الزراعة", minGPA: 65, riasecFit: "RSI", reason: "يناسب عشاق العمل الميداني والتواجد في البيئة (R) مع فهم طبيعة الكائنات (I)." }
    ]
  },
  Humanities: {
    name: "حقل العلوم الإنسانية والاجتماعية", nameEn: "Humanities & Social Sciences",
    description: "يسمح بالالتحاق بالآداب، اللغات، الحقوق، الشريعة، التربية، الإعلام، والفنون.",
    icon: "📚", color: "#0ea5e9", colorLight: "#e0f2fe", riasecCode: "SAE",
    topMajors: [
      { name: "الحقوق (القانون)", minGPA: 65, riasecFit: "ESC", reason: "يتطلب قوة في الإقناع والدفاع (E) ودقة في التعامل مع القوانين والأنظمة (C)." },
      { name: "التربية والتعليم", minGPA: 65, riasecFit: "SAC", reason: "يحتاج لرغبة صادقة في بناء قدرات الأجيال (S) وأسلوب مبتكر في الشرح (A)." },
      { name: "اللغات والترجمة", minGPA: 65, riasecFit: "ASE", reason: "يعتمد على الفصاحة والقدرة التعبيرية (A) والتواصل مع الثقافات (S)." },
      { name: "الصحافة والإعلام", minGPA: 65, riasecFit: "EAS", reason: "يحتاج لشخصية مؤثرة اجتماعياً (E) وقدرة على صياغة المحتوى بذكاء (A)." },
      { name: "الشريعة الإسلامية", minGPA: 65, riasecFit: "SAC", reason: "يرتبط بخدمة وإرشاد المجتمع (S) والاستناد إلى الأحكام والنصوص المنظمة (C)." },
      { name: "الآداب وتخصصاتها", minGPA: 65, riasecFit: "ASE", reason: "يناسب من يقدرون التعبير الفني والأدبي (A) ويفهمون السلوك الإنساني (S)." },
      { name: "الفنون وتصميم الجرافيك", minGPA: 65, riasecFit: "ASE", reason: "مجال خصب للمبدعين بصرياً (A) والقادرين على تنفيذ تصاميم جذابة." },
      { name: "الرياضة (التربية الرياضية)", minGPA: 65, riasecFit: "SRE", reason: "يجمع بين المجهود البدني والمهاري (R) والقدرة على توجيه الرياضيين (E, S)." },
      { name: "فنون الطهي", minGPA: 65, riasecFit: "R AE", reason: "يتطلب سرعة ومهارة يدوية (R) مع تقديم جمالي إبداعي للوجبات (A)." },
      { name: "التربية المهنية والفنية", minGPA: 65, riasecFit: "SRE", reason: "يجمع بين إتقان الحرف (R) ونقل هذا الإتقان للطلاب بصبر (S)." }
    ]
  },
  Business: {
    name: "حقل الأعمال", nameEn: "Business & Management",
    description: "يسمح هذا الحقل بالالتحاق بتخصصات الأعمال، الإدارة، المحاسبة، والعلوم المالية.",
    icon: "📈", color: "#f59e0b", colorLight: "#fef3c7", riasecCode: "ECR",
    topMajors: [
      { name: "المحاسبة", minGPA: 70, riasecFit: "CEI", reason: "لا غنى فيه عن الدقة المتناهية في الأرقام (C) والتحليل المالي الممنهج (I)." },
      { name: "العلوم المالية والمصرفية", minGPA: 65, riasecFit: "CIE", reason: "يجمع بين ضبط الميزانيات (C) والتفكير الاستراتيجي في أسواق المال (E)." },
      { name: "تخصصات الأعمال (الإدارة والتسويق)", minGPA: 65, riasecFit: "ECS", reason: "يحتاج للمبادرة وروح القيادة (E) والتنظيم العالي لفرق العمل (C)." }
    ]
  }
};

// ================================================================
// اللوجيك الذكي لتحديد الحقل بدقة عالية (يمنع تداخل الطب مع الـ IT)
// ================================================================
export function computeFieldFromRIASEC(scores) {
  // حساب المجموع الكلي لمعرفة النسبة المئوية ومنع التضارب
  const totalScore = (scores.R || 0) + (scores.I || 0) + (scores.A || 0) + (scores.S || 0) + (scores.E || 0) + (scores.C || 0) || 1;
  
  const n = {
    R: (scores.R || 0) / totalScore,
    I: (scores.I || 0) / totalScore,
    A: (scores.A || 0) / totalScore,
    S: (scores.S || 0) / totalScore,
    E: (scores.E || 0) / totalScore,
    C: (scores.C || 0) / totalScore,
  };

  // 1. الحقل الصحي
  const healthScore = (n.S * 1.5) + (n.I * 1.2) + (n.R * 0.5);

  // 2. حقل التكنولوجيا والهندسة
  const engITScore  = (n.I * 1.5) + (n.R * 1.3) + (n.C * 0.8);

  // 3. حقل العلوم الإنسانية
  const humScore    = (n.A * 1.5) + (n.S * 1.1) + (n.E * 0.6);

  // 4. حقل الأعمال
  const busScore    = (n.E * 1.5) + (n.C * 1.3) + (n.I * 0.4);

  const fields = [
    { key: 'Health', score: healthScore },
    { key: 'EngineeringIT', score: engITScore },
    { key: 'Humanities', score: humScore },
    { key: 'Business', score: busScore }
  ];

  fields.sort((a, b) => b.score - a.score);
  return fields[0].key; 
}

// ================================================================
// توليد أفضل 3 تخصصات بناءً على أوزان دقيقة
// ================================================================
export function computeTopMajors(scores, fieldKey) {
  const field = JORDANIAN_FIELDS[fieldKey];
  if (!field) return [];

  const WEIGHTS = { interest: 1.0, aptitude: 1.5, style: 1.2 };

  function dimMax(dim) {
    return riasecQuestions
      .filter(q => q.dimension === dim)
      .reduce((s, q) => s + 5 * (WEIGHTS[q.type] ?? 1.0), 0);
  }

  function dimPct(dim) {
    const mx = dimMax(dim);
    return mx > 0 ? (scores[dim] || 0) / mx : 0;
  }

  function majorMatchScore(riasecFit) {
    const dims = riasecFit.split('');
    const weights = [0.55, 0.30, 0.15]; 
    return dims.reduce((sum, d, i) => sum + dimPct(d) * weights[i], 0);
  }

  function normalizeToDisplay(raw) {
    const pct = Math.round(raw * 100);
    if (pct >= 85) return Math.min(98, 85 + Math.round((pct - 85) * 0.60));
    if (pct >= 60) return 65 + Math.round((pct - 60) * 0.80);
    return Math.max(58, 50 + Math.round(pct * 0.30));
  }

  return field.topMajors
    .map(major => ({
      name:     major.name,
      matchPct: normalizeToDisplay(majorMatchScore(major.riasecFit)),
      minGPA:   major.minGPA,
      reason:   major.reason,
    }))
    .sort((a, b) => b.matchPct - a.matchPct)
    .slice(0, 3)
    .map((m, idx) => ({
      ...m,
      matchPct: Math.max(58, m.matchPct - idx * 4),
      rank: idx + 1,
    }));
}

// ================================================================
// أسئلة فك التعادل — موجهة ومباشرة
// ================================================================
export const tieBreakerQuestions = {
  R: {
    question: "لو خُيرت بين هذه المهام العملية، فأيها تفضل إنجازه؟",
    options: [
      { text: "تنفيذ وتطوير مشاريع هندسية وبرمجية.", value: "EngineeringIT", icon: "⚙️" },
      { text: "تشغيل الأجهزة الطبية والرعاية الصحية.", value: "Health", icon: "🏥" },
      { text: "الإشراف الميداني على خطوط الإنتاج.", value: "Business", icon: "📈" }
    ]
  },
  I: {
    question: "في حال طُلب منك إعداد دراسة بحثية، فأي المواضيع تختار؟",
    options: [
      { text: "تحليل الخوارزميات وتطوير الحلول البرمجية.", value: "EngineeringIT", icon: "💻" },
      { text: "دراسة مسببات الأمراض وتطوير الأدوية.", value: "Health", icon: "🔬" },
      { text: "تحليل حركة الأسواق والمؤشرات الاقتصادية.", value: "Business", icon: "📊" }
    ]
  },
  A: {
    question: "كيف توظف إبداعك بشكل يُشعرك بالنجاح؟",
    options: [
      { text: "تصميم واجهات البرمجيات أو المخططات المعمارية.", value: "EngineeringIT", icon: "🏛️" },
      { text: "كتابة النصوص، الفنون، وإتقان اللغات.", value: "Humanities", icon: "✍️" }
    ]
  },
  S: {
    question: "عند التفاعل مع الناس، أي دور تشعر أنك تبدع فيه؟",
    options: [
      { text: "تقديم الرعاية الطبية وتخفيف آلام المرضى.", value: "Health", icon: "🏥" },
      { text: "تعليم الأفراد وتقديم الدعم النفسي والإرشادي.", value: "Humanities", icon: "📚" }
    ]
  },
  E: {
    question: "في حال تسلمت موقعاً قيادياً، ما هو النطاق الذي تفضله؟",
    options: [
      { text: "إدارة الأعمال، التخطيط المالي، وبناء الشركات.", value: "Business", icon: "🚀" },
      { text: "المرافعة، تحقيق العدالة، والعمل القانوني.", value: "Humanities", icon: "⚖️" }
    ]
  },
  C: {
    question: "ما هي البيانات التي تجد سهولة في تنظيمها؟",
    options: [
      { text: "هيكلة قواعد البيانات وإدارة سيرفرات المعلومات.", value: "EngineeringIT", icon: "🗄️" },
      { text: "تدقيق السجلات المحاسبية والميزانيات المالية.", value: "Business", icon: "🧮" },
      { text: "متابعة السجلات الطبية والجرعات الدوائية.", value: "Health", icon: "💊" },
      { text: "أرشفة السجلات القانونية ومراجعة الأنظمة.", value: "Humanities", icon: "📋" }
    ]
  }
}