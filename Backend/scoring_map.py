from typing import Dict, List


def _p(s: str) -> Dict[str, int]:
    t = s.split()
    return {t[i]: int(t[i + 1]) for i in range(0, len(t), 2)}


def _M(id, name, field, gpa, holland, reason):
    return {"id": id, "name": name, "field": field, "minGPA": gpa, "holland": holland, "reason": reason}


MAJORS: List[dict] = [
    _M("medicine", "الطب البشري", "Health", 85, "ISR", "يجمع بين الفضول العلمي، قوة الحفظ، وتحمّل مسؤولية صحة الناس."),
    _M("dentistry", "طب الأسنان", "Health", 85, "IRS", "يحتاج يدين دقيقتين وتخيّلاً مكانياً مع فهم طبي."),
    _M("pharmacy", "الصيدلة ودكتور صيدلة", "Health", 80, "ICS", "يعتمد على الكيمياء والحفظ والدقة العالية في الأدوية."),
    _M("vet", "الطب البيطري", "Health", 80, "IRS", "علم أحياء مع حب العمل الميداني والعناية بالحيوانات."),
    _M("nursing", "التمريض", "Health", 75, "SIR", "رعاية مباشرة للمرضى بهدوء وتعاون وتحمّل للمسؤولية."),
    _M("rehab", "علوم التأهيل (العلاج الطبيعي)", "Health", 70, "SRI", "مساعدة المصابين على التعافي بالحركة واليد."),
    _M("med_lab", "العلوم الطبية المخبرية", "Health", 70, "IRC", "تحليل العينات بدقة وتشغيل أجهزة المختبر."),
    _M("nutrition", "التغذية وعلوم الغذاء", "Health", 70, "ISC", "فهم الغذاء والجسم مع إرشاد الناس لعادات صحية."),
    _M("civil", "الهندسة المدنية", "EngineeringIT", 80, "RIC", "تصميم وتنفيذ المباني والطرق بتخيّل مكاني وتخطيط."),
    _M("electrical", "الهندسة الكهربائية", "EngineeringIT", 80, "IRC", "أنظمة الكهرباء والإلكترونيات تعتمد على رياضيات وتفكير منطقي."),
    _M("mechanical", "الهندسة الميكانيكية والميكاترونكس", "EngineeringIT", 80, "RIC", "آلات ومحركات وروبوتات مع تخيّل مكاني وتجريب عملي."),
    _M("chemical_eng", "الهندسة الكيميائية", "EngineeringIT", 80, "IRC", "كيمياء وفيزياء في المصانع والعمليات الإنتاجية."),
    _M("comp_eng", "هندسة الحاسوب", "EngineeringIT", 80, "IRC", "يربط بين الأجهزة الإلكترونية والبرمجة."),
    _M("architecture", "الهندسة المعمارية", "EngineeringIT", 80, "AIR", "تصميم مبانٍ جميلة بخيال مكاني وإبداع."),
    _M("cs_sw", "علوم الحاسوب وهندسة البرمجيات", "EngineeringIT", 75, "ICR", "برمجة وبناء تطبيقات بمنطق وتفكير مبتكر."),
    _M("ai_data", "الذكاء الاصطناعي وعلم البيانات", "EngineeringIT", 75, "ICR", "اكتشاف الأنماط في البيانات وبناء نماذج ذكية."),
    _M("cyber", "الأمن السيبراني", "EngineeringIT", 75, "ICR", "حماية الأنظمة بملاحظة الثغرات الصغيرة والمثابرة."),
    _M("info_systems", "نظم المعلومات الحاسوبية", "EngineeringIT", 75, "CIE", "تنظيم البيانات وإدارة الأنظمة التقنية للمؤسسات."),
    _M("math_stats", "الرياضيات والإحصاء", "EngineeringIT", 65, "ICR", "تفكير رياضي مجرد وعمل بالأرقام."),
    _M("phys_chem", "الفيزياء والكيمياء", "EngineeringIT", 65, "IRC", "فضول علمي وتجريب وبحث في المختبر."),
    _M("bio_biotech", "الأحياء والتقنية الحيوية", "EngineeringIT", 70, "IRC", "بحث في الكائنات الحية والخلايا والوراثة."),
    _M("env_geo", "علوم البيئة والأرض", "EngineeringIT", 65, "RIC", "دراسة الطبيعة والموارد بعمل ميداني."),
    _M("agriculture", "الزراعة", "EngineeringIT", 65, "RIC", "عمل ميداني مع النبات والتربة وفهم علمي لها."),
    _M("law", "الحقوق (القانون)", "Humanities", 65, "ESC", "حفظ وإقناع ودفاع عن الحق مع التزام بالقوانين."),
    _M("education", "التربية والتعليم", "Humanities", 65, "SAC", "حب الشرح وبناء قدرات الطلاب."),
    _M("languages", "اللغات والترجمة", "Humanities", 65, "ASE", "كتابة وتعلّم لغات ودقة في الصياغة."),
    _M("media", "الصحافة والإعلام", "Humanities", 65, "AES", "كتابة وظهور أمام الجمهور وأفكار مؤثرة."),
    _M("sharia", "الشريعة الإسلامية", "Humanities", 65, "SCI", "دراسة الأحكام والنصوص وإرشاد الناس."),
    _M("psychology", "علم النفس والإرشاد", "Humanities", 70, "SIA", "فهم السلوك والمشاعر ومساعدة الناس نفسياً."),
    _M("social_work", "الخدمة الاجتماعية", "Humanities", 65, "SEA", "مساعدة الأسر والأفراد وحل النزاعات بهدوء."),
    _M("graphic_design", "التصميم الجرافيكي والفنون", "Humanities", 65, "ARE", "إبداع بصري واستقلالية وظهور للأعمال."),
    _M("sports", "التربية الرياضية", "Humanities", 65, "SRE", "جهد بدني وتحفيز الآخرين وروح المنافسة."),
    _M("hospitality", "الضيافة وفنون الطهي", "Humanities", 65, "ESR", "طبخ وخدمة الضيوف بسرعة وتعاون."),
    _M("political_sci", "العلوم السياسية والعلاقات الدولية", "Humanities", 65, "EIS", "قضايا عامة ونقاش وتفاوض."),
    _M("accounting", "المحاسبة", "Business", 70, "CEI", "دقة في الأرقام وتنظيم الحسابات."),
    _M("finance", "العلوم المالية والمصرفية", "Business", 67, "CEI", "قرارات مالية وأسواق ومنافسة."),
    _M("business_admin", "إدارة الأعمال", "Business", 65, "ECS", "قيادة وقرارات وتنظيم فرق العمل."),
    _M("marketing", "التسويق", "Business", 65, "EAS", "إقناع وأفكار إبداعية لفهم الجمهور."),
    _M("economics", "الاقتصاد", "Business", 67, "IEC", "تحليل الأسواق والبيانات والظواهر المالية."),
    _M("supply_chain", "إدارة سلاسل التوريد واللوجستيات", "Business", 65, "CER", "تخطيط وتنسيق حركة البضائع والموارد."),
]
MAJOR_BY_ID = {m["id"]: m for m in MAJORS}


QUESTION_POINTS: Dict[str, Dict[str, int]] = {
    "R_I_1": _p("mechanical 3 electrical 3 comp_eng 3 chemical_eng 1 med_lab 1 cyber 1 agriculture 1"),
    "R_I_2": _p("agriculture 3 vet 3 env_geo 3 bio_biotech 1 sports 1"),
    "R_I_3": _p("civil 3 architecture 2 env_geo 1 mechanical 1"),
    "I_I_1": _p("medicine 3 bio_biotech 3 pharmacy 3 med_lab 3 vet 3 nutrition 2 dentistry 2 nursing 1 rehab 1 agriculture 1 psychology 1"),
    "I_I_2": _p("phys_chem 3 chemical_eng 3 env_geo 2 pharmacy 2 electrical 1 mechanical 1 bio_biotech 1"),
    "I_I_3": _p("cs_sw 3 ai_data 3 cyber 3 comp_eng 2 math_stats 2 info_systems 1"),
    "A_I_1": _p("graphic_design 3 architecture 3 media 1 marketing 1"),
    "A_I_2": _p("languages 3 media 3 political_sci 1 law 1 education 1 marketing 1"),
    "A_I_3": _p("hospitality 3 nutrition 3"),
    "S_I_1": _p("nursing 3 rehab 3 medicine 2 vet 2 dentistry 1 pharmacy 1 nutrition 1"),
    "S_I_2": _p("education 3 sharia 2 nutrition 2 sports 1 psychology 1 languages 1 social_work 1 rehab 1"),
    "S_I_3": _p("social_work 3 psychology 3 sharia 2 education 1 nursing 1"),
    "E_I_1": _p("marketing 3 business_admin 2 supply_chain 1 finance 1 hospitality 1"),
    "E_I_2": _p("economics 3 finance 3 political_sci 2 business_admin 1 accounting 1 math_stats 1 marketing 1"),
    "E_I_3": _p("law 3 political_sci 3 social_work 1 sharia 1 media 1"),
    "C_I_1": _p("info_systems 3 supply_chain 2 accounting 2 ai_data 1 med_lab 1"),
    "C_I_2": _p("accounting 3 finance 2 economics 1 business_admin 1 supply_chain 1"),
    "C_I_3": _p("sharia 3 education 1 social_work 1 law 1 languages 1"),

    "R_A_1": _p("architecture 3 civil 2 mechanical 2 dentistry 2 graphic_design 1 medicine 1"),
    "R_A_2": _p("dentistry 3 med_lab 2 medicine 1 nursing 1 electrical 1 comp_eng 1 hospitality 1 rehab 1 graphic_design 1 architecture 1 bio_biotech 1"),
    "I_A_1": _p("math_stats 3 electrical 3 phys_chem 2 mechanical 2 ai_data 2 comp_eng 2 cs_sw 2 economics 2 civil 1 chemical_eng 1"),
    "I_A_2": _p("medicine 3 pharmacy 3 law 3 sharia 3 dentistry 2 bio_biotech 1 nursing 1 med_lab 1 languages 1 political_sci 1 nutrition 1"),
    "A_A_1": _p("marketing 3 graphic_design 2 architecture 2 media 2 cs_sw 2 business_admin 1 ai_data 1 hospitality 1"),
    "A_A_2": _p("languages 3 hospitality 2 political_sci 1 media 1 education 1 sharia 1"),
    "S_A_1": _p("psychology 3 education 2 marketing 2 hospitality 1 social_work 1 nursing 1 political_sci 1 media 1 business_admin 1"),
    "S_A_2": _p("social_work 3 law 2 political_sci 2 psychology 1 education 1 business_admin 1 sharia 1"),
    "E_A_1": _p("media 3 education 3 marketing 2 sharia 2 business_admin 2 political_sci 1 law 1 sports 1"),
    "E_A_2": _p("business_admin 3 supply_chain 2 sports 2 hospitality 2 civil 1 education 1 political_sci 1 marketing 1"),
    "C_A_1": _p("ai_data 3 economics 3 math_stats 2 accounting 2 finance 2 env_geo 1 info_systems 1 nutrition 1"),
    "C_A_2": _p("supply_chain 3 business_admin 2 civil 2 info_systems 2 hospitality 1 accounting 1 medicine 1 education 1"),

    "R_S_1": _p("sports 3 rehab 3 nursing 2 agriculture 2 hospitality 2 vet 1 civil 1 env_geo 1 info_systems -1 accounting -1"),
    "R_S_2": _p("chemical_eng 3 civil 2 mechanical 2 env_geo 2 agriculture 1 med_lab 1 phys_chem 1 electrical 1"),
    "I_S_1": _p("medicine 2 cs_sw 2 ai_data 2 cyber 2 math_stats 2 phys_chem 2 electrical 2 bio_biotech 2 architecture 1 comp_eng 1 economics 1 psychology 1"),
    "I_S_2": _p("medicine 3 pharmacy 3 nursing 3 dentistry 2 civil 2 med_lab 2 vet 1 rehab 1 chemical_eng 1"),
    "A_S_1": _p("graphic_design 2 media 2 phys_chem 2 cs_sw 2 architecture 1 math_stats 1 ai_data 1 bio_biotech 1 nursing -1 pharmacy -1"),
    "A_S_2": _p("media 3 graphic_design 2 marketing 2 political_sci 2 sports 2 architecture 1 law 1"),
    "S_S_1": _p("nursing 3 social_work 3 medicine 2 hospitality 2 rehab 2 dentistry 1 law 1 psychology 1 pharmacy 1 vet 1"),
    "S_S_2": _p("nursing 2 hospitality 2 sports 2 civil 1 business_admin 1 education 1 cs_sw 1 medicine 1 rehab 1 supply_chain 1 marketing 1 math_stats -2 phys_chem -1 ai_data -1"),
    "E_S_1": _p("sports 3 marketing 2 finance 2 business_admin 2 law 2 political_sci 1"),
    "E_S_2": _p("business_admin 3 finance 3 marketing 1 political_sci 1 medicine 1 supply_chain 1 economics 1"),
    "C_S_1": _p("accounting 3 pharmacy 3 med_lab 3 cyber 3 languages 1 info_systems 1 dentistry 1 electrical 1 finance 1"),
    "C_S_2": _p("law 2 accounting 2 pharmacy 2 supply_chain 2 info_systems 2 cyber 1 nursing 1 med_lab 1 finance 1 graphic_design -1 media -1"),
}

for _q, _pts in QUESTION_POINTS.items():
    for _m in _pts:
        assert _m in MAJOR_BY_ID, f"{_q} -> unknown major {_m}"
assert len(QUESTION_POINTS) == 42