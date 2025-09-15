<template>
  <Header />
  <main class="page">
    <router-view />
  </main>
</template>

<script setup>
import Header from './components/Header.vue'
</script>

<style>
body {
  margin: 0;
  font-family: Inter, system-ui, sans-serif;
  background: #0b0f14;
  color: #e9f0f5;
}

/* отступ под фиксированный Header */
.page { 
  padding-top: 72px; /* если хедер выше/ниже — подгони значение */
}
</style>
