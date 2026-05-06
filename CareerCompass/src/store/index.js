import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    gradeLevel: null,
  }),
  
  actions: {
    login(userData) {
      this.user = userData
      this.isAuthenticated = true
      this.gradeLevel = userData.gradeLevel
      localStorage.setItem('user', JSON.stringify(userData))
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
      this.gradeLevel = null
      localStorage.removeItem('user')
    },
    
    checkAuth() {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        this.user = userData
        this.isAuthenticated = true
        this.gradeLevel = userData.gradeLevel
      }
    },
  },
  
  getters: {
    isGrade12: (state) => state.gradeLevel === 12,
    isGrade9to11: (state) => state.gradeLevel >= 9 && state.gradeLevel <= 11,
  },
})

export const useAssessmentStore = defineStore('assessment', {
  state: () => ({
    currentQuestionIndex: 0,
    answers: {}, // { questionId: score }
    grades: {
      math: null,
      science: null,
      arabic: null,
      english: null,
    },
    results: null,
    isCompleted: false,
    isAnalyzing: false,
  }),
  
  actions: {
    setAnswer(questionId, score) {
      this.answers[questionId] = score
    },
    
    nextQuestion() {
      this.currentQuestionIndex++
    },
    
    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--
      }
    },
    
    setGrades(gradesData) {
      this.grades = { ...gradesData }
    },
    
    async calculateResults() {
      this.isAnalyzing = true
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Calculate subscale scores
      const scores = this.calculateSubscaleScores()
      
      // Calculate field scores
      const fieldScores = this.calculateFieldScores(scores)
      
      // Get recommended field/major
      const recommendation = this.getRecommendation(fieldScores)
      
      this.results = {
        scores,
        fieldScores,
        recommendation,
        improvementPlan: this.generateImprovementPlan(scores),
      }
      
      this.isCompleted = true
      this.isAnalyzing = false
      
      return this.results
    },
    
    calculateSubscaleScores() {
      const scores = {
        // Interests
        realistic: 0,
        investigative: 0,
        social: 0,
        conventional: 0,
        enterprising: 0,
        artistic: 0,
        
        // Aptitudes
        math: 0,
        biology: 0,
        precision: 0,
        communication: 0,
        technology: 0,
        stress: 0,
        analytical: 0,
        organization: 0,
        
        // Work Style
        team: 0,
        solo: 0,
        routine: 0,
        dynamic: 0,
        quiet: 0,
        active: 0,
      }
      
      // Count questions per subscale for averaging
      const counts = {}
      
      Object.keys(this.answers).forEach(qId => {
        const question = this.getQuestionById(parseInt(qId))
        if (question) {
          const subscale = question.sub_scale
          if (!scores.hasOwnProperty(subscale)) {
            scores[subscale] = 0
          }
          if (!counts[subscale]) {
            counts[subscale] = 0
          }
          scores[subscale] += this.answers[qId]
          counts[subscale]++
        }
      })
      
      // Average the scores
      Object.keys(scores).forEach(key => {
        if (counts[key] > 0) {
          scores[key] = Math.round((scores[key] / counts[key]) * 20) // Scale to 100
        }
      })
      
      return scores
    },
    
    calculateFieldScores(scores) {
      const authStore = useAuthStore()
      
      // Field formulas based on 3D model
      const fieldScores = {
        health: Math.round(
          (scores.social * 0.3) + 
          (scores.biology * 0.25) + 
          (scores.precision * 0.2) + 
          (scores.stress * 0.15) +
          (scores.communication * 0.1)
        ),
        
        engineering: Math.round(
          (scores.realistic * 0.3) + 
          (scores.math * 0.3) + 
          (scores.technology * 0.2) + 
          (scores.analytical * 0.2)
        ),
        
        it: Math.round(
          (scores.investigative * 0.25) + 
          (scores.math * 0.25) + 
          (scores.technology * 0.3) + 
          (scores.organization * 0.2)
        ),
        
        business: Math.round(
          (scores.enterprising * 0.3) + 
          (scores.communication * 0.25) + 
          (scores.organization * 0.25) + 
          (scores.conventional * 0.2)
        ),
        
        arts: Math.round(
          (scores.artistic * 0.4) + 
          (scores.investigative * 0.2) + 
          (scores.dynamic * 0.2) + 
          (scores.communication * 0.2)
        ),
      }
      
      // Factor in grades if available
      if (this.grades.math && this.grades.science) {
        const gradeBonus = {
          health: (this.grades.science * 0.4 + this.grades.arabic * 0.3) * 0.2,
          engineering: (this.grades.math * 0.5 + this.grades.science * 0.3) * 0.2,
          it: (this.grades.math * 0.4 + this.grades.english * 0.3) * 0.2,
          business: (this.grades.arabic * 0.4 + this.grades.english * 0.3) * 0.2,
          arts: (this.grades.arabic * 0.3 + this.grades.english * 0.3) * 0.2,
        }
        
        Object.keys(fieldScores).forEach(field => {
          fieldScores[field] = Math.round(fieldScores[field] * 0.7 + gradeBonus[field])
        })
      }
      
      return fieldScores
    },
    
    getRecommendation(fieldScores) {
      const authStore = useAuthStore()
      
      // Sort fields by score
      const sortedFields = Object.entries(fieldScores)
        .sort((a, b) => b[1] - a[1])
      
      const topField = sortedFields[0][0]
      const topScore = sortedFields[0][1]
      
      const fieldNames = {
        health: 'المجال الصحي',
        engineering: 'الهندسة',
        it: 'تكنولوجيا المعلومات',
        business: 'إدارة الأعمال',
        arts: 'الفنون والتصميم',
      }
      
      if (authStore.isGrade12) {
        // Recommend specific majors for grade 12
        const majorsByField = {
          health: ['الطب البشري', 'طب الأسنان', 'الصيدلة', 'التمريض'],
          engineering: ['الهندسة الكهربائية', 'الهندسة المدنية', 'الهندسة الميكانيكية', 'الهندسة المعمارية'],
          it: ['علوم الحاسوب', 'هندسة البرمجيات', 'الأمن السيبراني', 'تكنولوجيا المعلومات'],
          business: ['إدارة الأعمال', 'المحاسبة', 'التسويق'],
          arts: ['التصميم الجرافيكي', 'الإعلام', 'الفنون الجميلة'],
        }
        
        return {
          type: 'major',
          field: fieldNames[topField],
          majors: majorsByField[topField],
          score: topScore,
          topFields: sortedFields.slice(0, 3).map(([field, score]) => ({
            name: fieldNames[field],
            score,
          })),
        }
      } else {
        // Recommend field for grades 9-11
        return {
          type: 'field',
          field: fieldNames[topField],
          score: topScore,
          topFields: sortedFields.slice(0, 3).map(([field, score]) => ({
            name: fieldNames[field],
            score,
          })),
        }
      }
    },
    
    generateImprovementPlan(scores) {
      const weakAreas = []
      
      // Find weak aptitudes (below 60)
      const aptitudeKeys = ['math', 'biology', 'communication', 'technology', 'analytical', 'organization']
      aptitudeKeys.forEach(key => {
        if (scores[key] < 60) {
          weakAreas.push({
            area: this.getArabicName(key),
            score: scores[key],
            suggestions: this.getSuggestions(key),
          })
        }
      })
      
      return weakAreas
    },
    
    getArabicName(key) {
      const names = {
        math: 'الرياضيات',
        biology: 'الأحياء',
        communication: 'التواصل',
        technology: 'التكنولوجيا',
        analytical: 'التحليل',
        organization: 'التنظيم',
        precision: 'الدقة',
        stress: 'التعامل مع الضغط',
      }
      return names[key] || key
    },
    
    getSuggestions(key) {
      const suggestions = {
        math: [
          'حل تمارين إضافية يومياً',
          'مشاهدة فيديوهات تعليمية',
          'الانضمام لمجموعة دراسية',
          'استشارة المعلم للمساعدة الإضافية',
        ],
        biology: [
          'قراءة مواضيع علمية بانتظام',
          'مشاهدة وثائقيات علمية',
          'حفظ المصطلحات بطريقة منظمة',
          'الربط بين النظري والعملي',
        ],
        communication: [
          'المشاركة في النقاشات الصفية',
          'تطوير مهارات العرض والتقديم',
          'القراءة المستمرة',
          'الكتابة المنتظمة',
        ],
        technology: [
          'تعلم البرمجة الأساسية',
          'استكشاف البرامج الحديثة',
          'متابعة قنوات التكنولوجيا',
          'الممارسة اليومية',
        ],
        analytical: [
          'حل الألغاز المنطقية',
          'تحليل الأخبار والأحداث',
          'ممارسة الشطرنج',
          'حل مسائل منطقية معقدة',
        ],
        organization: [
          'استخدام أجندة يومية',
          'تنظيم المهام حسب الأولوية',
          'إنشاء قوائم مهام',
          'تطوير عادات دراسية منتظمة',
        ],
      }
      
      return suggestions[key] || ['التدريب المستمر', 'طلب المساعدة من المختصين']
    },
    
    getQuestionById(id) {
      // This will be imported from mockData
      const { questions } = await import('@/data/mockData.js')
      return questions.find(q => q.id === id)
    },
    
    resetAssessment() {
      this.currentQuestionIndex = 0
      this.answers = {}
      this.results = null
      this.isCompleted = false
      this.isAnalyzing = false
    },
  },
  
  getters: {
    totalQuestions: () => 48,
    progress: (state) => Math.round((state.currentQuestionIndex / 48) * 100),
    currentAnswer: (state) => {
      return state.answers[state.currentQuestionIndex + 1] || null
    },
  },
})
