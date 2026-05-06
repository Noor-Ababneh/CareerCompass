<template>
  <div id="app" class="min-h-screen flex flex-col" dir="rtl">
    <Navbar />
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/store'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuth()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
