<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import FilterBarHeader from '@/components/FilterBarHeader.vue'
import SummaryCards from '@/components/SummaryCards.vue'
</script>

<template>
  <div class="app-container">
    <Sidebar />
    <div class="main-content">
      <FilterBarHeader />
      <div class="content">
        <SummaryCards />
        <div class="data-table">
          <RouterView class="side-panel" name="user"/>
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background: #1C1C1C;
  color: #fff;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 32px;
  height: 100%;
}

.content {
  flex-grow: 1;
  padding-top: 24px;
  overflow-y: auto;
  scrollbar-width: none;
}

.data-table {
  margin-top: 24px;
}
</style>