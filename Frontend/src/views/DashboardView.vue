<template>
  <div class="dashboard-root" dir="rtl">

    <!-- Animated background -->
    <div class="bg-layer" aria-hidden="true">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <svg class="bg-grid" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#4B6CB715" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>

    <!-- Nav -->
    <nav class="nav">
      <div class="nav-inner">
        <div class="logo">
          <div class="logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" stroke-width="2.2" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2.2" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2.2" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="logo-text">
            <span class="logo-name">CareerCompass</span>
            <span class="logo-sub">بوصلة المسار الأكاديمي</span>
          </div>
        </div>

        <div class="nav-right">
          <div class="user-pill">
            <div class="user-avatar">{{ (authStore.user?.name || 'ط').charAt(0) }}</div>
            <div class="user-info">
              <span class="user-name">{{ authStore.user?.name || 'الطالب' }}</span>
              <span class="user-label">مرحباً بك 👋</span>
            </div>
          </div>
          <button @click="handleLogout" class="logout-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            خروج
          </button>
        </div>
      </div>
    </nav>

    <!-- Main -->
    <main class="main">

      <!-- Hero text -->
      <div class="hero">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          لوحة التحكم الرئيسية
        </div>
        <h1 class="hero-title">
          مرحباً بك في<br/>
          <span class="hero-accent">منصتك الأكاديمية</span>
        </h1>
        <p class="hero-desc">اختر الأداة المناسبة وابدأ رحلتك نحو قرار أكاديمي مدروس.</p>
      </div>

      <!-- Cards -->
      <div class="cards">

        <div class="card card--blue" @click="$router.push('/assessment')">
          <div class="card-glow card-glow--blue"></div>
          <div class="card-inner">
            <div class="card-icon-wrap icon-wrap--blue">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <div class="card-body">
              <div class="card-tag">اختبار الميول</div>
              <h3 class="card-title">تقييم الميول المهنية</h3>
              <p class="card-desc">اكتشف شخصيتك المهنية عبر اختبار RIASEC المعتمد وتعرّف على مساراتك الأنسب.</p>
            </div>
            <div class="card-footer">
              <span class="card-cta card-cta--blue">
                ابدأ الاختبار
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>
          </div>
          <div class="card-number">01</div>
        </div>

        <div class="card card--green" @click="$router.push('/grades-input')">
          <div class="card-glow card-glow--green"></div>
          <div class="card-inner">
            <div class="card-icon-wrap icon-wrap--green">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <div class="card-body">
              <div class="card-tag">تحليل العلامات</div>
              <h3 class="card-title">تحليل النتائج الأكاديمية</h3>
              <p class="card-desc">أدخل علاماتك ليقارنها النظام مع متطلبات التخصصات ويوصيك بالخيار الأمثل.</p>
            </div>
            <div class="card-footer">
              <span class="card-cta card-cta--green">
                إدخال البيانات
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>
          </div>
          <div class="card-number">02</div>
        </div>

        <div class="card card--purple" @click="$router.push('/universities')">
          <div class="card-glow card-glow--purple"></div>
          <div class="card-inner">
            <div class="card-icon-wrap icon-wrap--purple">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div class="card-body">
              <div class="card-tag">دليل الجامعات</div>
              <h3 class="card-title">قاعدة بيانات الجامعات</h3>
              <p class="card-desc">تصفّح دليلاً شاملاً للجامعات والتخصصات ومعدلات القبول في مكان واحد.</p>
            </div>
            <div class="card-footer">
              <span class="card-cta card-cta--purple">
                استعراض الدليل
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>
          </div>
          <div class="card-number">03</div>
        </div>

      </div>

      <p class="footer-note">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
        النتائج المعروضة للإرشاد الأكاديمي فقط ولا تُعدّ قراراً قبولياً رسمياً.
      </p>
    </main>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
}
</script>

<style scoped>
.dashboard-root {
  min-height: 100vh;
  background: #F0F4FF;
  font-family: 'Segoe UI', 'Tajawal', sans-serif;
  color: #1a2340;
  overflow: hidden;
  position: relative;
}

/* Background */
.bg-layer { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
.bg-grid { position: absolute; inset: 0; width: 100%; height: 100%; }
.orb { position: absolute; border-radius: 50%; filter: blur(80px); animation: floatOrb 14s ease-in-out infinite; }
.orb-1 { width: 520px; height: 520px; background: radial-gradient(circle, #4B6CB728, transparent 70%); top: -160px; right: -160px; animation-delay: 0s; }
.orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, #2A8C6E1E, transparent 70%); bottom: -120px; left: -120px; animation-delay: 5s; }
.orb-3 { width: 280px; height: 280px; background: radial-gradient(circle, #8B4A9C16, transparent 70%); top: 40%; left: 35%; animation-delay: 10s; }
@keyframes floatOrb {
  0%,100% { transform: translate(0,0) scale(1); }
  33% { transform: translate(20px,-28px) scale(1.05); }
  66% { transform: translate(-14px,16px) scale(0.96); }
}

/* Nav */
.nav {
  position: relative; z-index: 50;
  background: rgba(255,255,255,0.88);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(75,108,183,0.1);
  box-shadow: 0 1px 20px rgba(75,108,183,0.06);
}
.nav-inner {
  max-width: 1160px; margin: 0 auto; padding: 0 2rem;
  height: 68px; display: flex; align-items: center; justify-content: space-between;
}
.logo { display: flex; align-items: center; gap: 12px; }
.logo-icon {
  width: 40px; height: 40px;
  background: linear-gradient(135deg, #4B6CB7, #3B5EA6);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 14px rgba(75,108,183,0.28);
}
.logo-text { display: flex; flex-direction: column; }
.logo-name { font-size: 17px; font-weight: 800; color: #1a2340; line-height: 1.2; }
.logo-sub { font-size: 10px; color: #8096BD; letter-spacing: 0.08em; text-transform: uppercase; }
.nav-right { display: flex; align-items: center; gap: 12px; }
.user-pill {
  display: flex; align-items: center; gap: 10px;
  background: #EEF2FB; border: 1px solid rgba(75,108,183,0.15);
  padding: 6px 14px 6px 8px; border-radius: 100px;
}
.user-avatar {
  width: 30px; height: 30px;
  background: linear-gradient(135deg, #4B6CB7, #8B4A9C);
  border-radius: 50%; color: white; font-weight: 700; font-size: 13px;
  display: flex; align-items: center; justify-content: center;
}
.user-info { display: flex; flex-direction: column; }
.user-name { font-size: 13px; font-weight: 700; color: #1a2340; line-height: 1.2; }
.user-label { font-size: 10px; color: #8096BD; }
.logout-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 16px; background: white;
  border: 1px solid rgba(75,108,183,0.18); border-radius: 10px;
  color: #6B7FA3; font-size: 13px; font-weight: 600; cursor: pointer;
  transition: all 0.2s;
}
.logout-btn:hover { background: #FEF2F2; color: #DC2626; border-color: #FCA5A5; }

/* Main */
.main { position: relative; z-index: 10; max-width: 1100px; margin: 0 auto; padding: 4rem 2rem 3rem; }

/* Hero */
.hero { text-align: center; margin-bottom: 3.5rem; animation: heroIn 0.7s cubic-bezier(.22,.68,0,1.2) both; }
@keyframes heroIn { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
.hero-badge {
  display: inline-flex; align-items: center; gap: 7px;
  background: white; border: 1px solid rgba(75,108,183,0.18); color: #4B6CB7;
  font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  padding: 6px 16px; border-radius: 100px; margin-bottom: 1.2rem;
  box-shadow: 0 2px 12px rgba(75,108,183,0.08);
}
.badge-dot { width: 7px; height: 7px; background: #4B6CB7; border-radius: 50%; animation: blink 2s infinite; }
@keyframes blink { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.4;transform:scale(.7);} }
.hero-title { font-size: clamp(2rem,4vw,3rem); font-weight: 900; color: #1a2340; line-height: 1.2; margin-bottom: 1rem; }
.hero-accent {
  background: linear-gradient(135deg, #4B6CB7, #8B4A9C);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.hero-desc { color: #6B7FA3; font-size: 15px; max-width: 420px; margin: 0 auto; line-height: 1.7; }

/* Cards */
.cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
.card {
  position: relative; background: white; border-radius: 24px; overflow: hidden;
  cursor: pointer; border: 1px solid rgba(75,108,183,0.09);
  box-shadow: 0 4px 24px rgba(75,108,183,0.05);
  transition: transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s ease;
  animation: cardIn 0.6s cubic-bezier(.22,.68,0,1.2) both;
}
.card:nth-child(1){animation-delay:.15s}
.card:nth-child(2){animation-delay:.25s}
.card:nth-child(3){animation-delay:.35s}
@keyframes cardIn { from{opacity:0;transform:translateY(32px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
.card:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 20px 50px rgba(75,108,183,0.13); }

.card-glow { position:absolute; inset:0; opacity:0; transition:opacity .4s; pointer-events:none; border-radius:24px; }
.card:hover .card-glow{opacity:1}
.card-glow--blue   { background: linear-gradient(135deg,rgba(75,108,183,.06),transparent 60%); }
.card-glow--green  { background: linear-gradient(135deg,rgba(42,140,110,.06),transparent 60%); }
.card-glow--purple { background: linear-gradient(135deg,rgba(139,74,156,.06),transparent 60%); }

.card--blue::before   { content:''; display:block; height:3px; background:linear-gradient(90deg,#4B6CB7,#6B8FD6); }
.card--green::before  { content:''; display:block; height:3px; background:linear-gradient(90deg,#2A8C6E,#3DB38A); }
.card--purple::before { content:''; display:block; height:3px; background:linear-gradient(90deg,#8B4A9C,#B06BC0); }

.card-inner { padding:2rem 2rem 1.6rem; display:flex; flex-direction:column; gap:1.2rem; min-height:280px; }
.card-icon-wrap {
  width:52px; height:52px; border-radius:16px;
  display:flex; align-items:center; justify-content:center;
  transition: transform 0.3s cubic-bezier(.22,.68,0,1.2);
}
.card:hover .card-icon-wrap { transform: scale(1.12) rotate(-4deg); }
.icon-wrap--blue   { background:#EEF2FB; color:#4B6CB7; }
.icon-wrap--green  { background:#EAF6F0; color:#2A8C6E; }
.icon-wrap--purple { background:#F5EEF8; color:#8B4A9C; }

.card-body { flex:1; }
.card-tag { font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; margin-bottom:6px; }
.card--blue   .card-tag { color:#4B6CB7; }
.card--green  .card-tag { color:#2A8C6E; }
.card--purple .card-tag { color:#8B4A9C; }
.card-title { font-size:18px; font-weight:800; color:#1a2340; margin-bottom:8px; line-height:1.3; }
.card-desc { font-size:13px; color:#6B7FA3; line-height:1.65; }

.card-footer { border-top:1px solid #EEF2FB; padding-top:1rem; }
.card-number {
  position:absolute; bottom:1.4rem; left:1.8rem;
  font-size:56px; font-weight:900; line-height:1; opacity:.04;
  color:#1a2340; user-select:none; pointer-events:none;
}
.card-cta {
  display:inline-flex; align-items:center; gap:6px; font-size:13px; font-weight:700;
  padding:7px 14px; border-radius:10px; transition: all 0.25s ease;
}
.card:hover .card-cta { gap:10px; }
.card-cta--blue   { background:#EEF2FB; color:#4B6CB7; }
.card-cta--green  { background:#EAF6F0; color:#2A8C6E; }
.card-cta--purple { background:#F5EEF8; color:#8B4A9C; }
.card--blue:hover   .card-cta--blue   { background:#4B6CB7; color:white; }
.card--green:hover  .card-cta--green  { background:#2A8C6E; color:white; }
.card--purple:hover .card-cta--purple { background:#8B4A9C; color:white; }

.footer-note { display:flex; align-items:center; gap:6px; margin-top:2.5rem; font-size:11px; color:#9DAAC2; justify-content:center; }

@media(max-width:768px){ .cards{grid-template-columns:1fr;} .user-info{display:none;} }
</style>