<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Fleet } from '@/modules/fleets/models/fleet.model'
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  fleets: Fleet[]
  isLoading: boolean
}>(), {
  fleets: [] // provide a default empty array for fleets
})

const router = useRouter()
const itemsPerPage = ref(50)
const currentPage = ref(1)

// Paginated fleets
const paginatedFeets = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return props.fleets.slice(start, end)
})

const navigateToUserOverview = (fleetId: string, month: string) => {
  router.push({ name: 'UserOverview', params: { fleet_id: fleetId, month: month } })
}

// Navigation functions
const nextPage = () => {
  if ((currentPage.value * itemsPerPage.value) < props.fleets.length) {
    currentPage.value += 1
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}
</script>

<template>
  <div class="table-container">
    <div v-if="props.fleets.length > 0">
      <table>
        <thead>
        <tr>
          <th class="theader">ID</th>
          <th class="theader">Country</th>
          <th class="theader">City</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="fleet in paginatedFeets" :key="fleet.id" @click="navigateToUserOverview(fleet.id, '2024-01')" style="cursor: pointer;">
          <td>{{ fleet.id }}</td>
          <td>{{ fleet.country }}</td>
          <td>{{ fleet.city }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No fleets found</p>
    <p v-if="props.isLoading">Loading...</p>
  </div>
  <div class="footer">
    <div class="page-counter">
      <button @click="prevPage" :disabled="currentPage === 1">&lt;</button>
      <span>{{ currentPage }}</span> of <span>{{ Math.ceil(props.fleets.length / itemsPerPage) }}</span>
      <button @click="nextPage" :disabled="(currentPage * itemsPerPage) >= props.fleets.length">&gt;</button>
    </div>
    <span class="results-per-page">Show:
      <select v-model="itemsPerPage">
        <option v-for="n in [10, 20, 50]" :value="n" :key="n">{{ n }}</option>
      </select> results per page
    </span>
    <span class="results-page">Total fleets: {{ props.fleets.length }}</span>
  </div>
</template>

<style scoped>
.table-container {
  background: #2C2C2D;
  width: 100%;
  height: auto;
  border-radius: 4px;
  padding: 11px 22px;
  position: relative;
  max-height: 533px;
  overflow-y: auto;
}

/* Scrollbar styles */
.table-container::-webkit-scrollbar {
  width: 12px;
}

.table-container::-webkit-scrollbar-track {
  background: #2C2C2D; /* Background color of the scrollbar track */
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #888; /* Color of the scrollbar thumb */
  border-radius: 6px;
  border: 3px solid #2C2C2D; /* Gives the thumb a border matching the track */
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: #555; /* Hover color of the scrollbar thumb */
}

.table-container table {
  width: 100%;
  border-collapse: collapse;
}

.theader {
  font-weight: 400;
  line-height: 17.6px;
  text-align: left;
  color: #9D9C9E;
}

tbody tr {
  background: #2C2C2D;
  border-bottom: 1px solid #3B3B3C;
}

tbody tr:hover {
  background: #3B3B3C;
}

tbody td {
  padding: 8px;
  color: #FFFFFF;
}

tbody td:hover {
  cursor: pointer;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  color: #9D9C9E;
  font-weight: 400;
  font-size: 14px;
  position: relative;
  bottom: 0;
  background: #2C2C2D;
  width: 100%;
  height: 65px;
  padding: 8px 16px 8px 16px;
  gap: 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.page-counter {
  width: 103px;
  height: 15px;
  padding: 0 8px 0 8px;
  gap: 16px;
}

.footer button {
  background-color: #2C2C2D;
  border: none;
  color: #FFFFFF;
  cursor: pointer;
}

.footer button:disabled {
  cursor: not-allowed;
  color: #767677;
}

.results-per-page select {
  background-color: #2C2C2D;
  color: #FFFFFF;
  border: 1px solid #3B3B3C;
  width: 61px;
  height: 34.51px;
}
</style>