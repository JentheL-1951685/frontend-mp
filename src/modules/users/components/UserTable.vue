<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { User } from '@/modules/users/models/user.model'
import { computed, ref } from 'vue'
import redAnomalyImage from '@/assets/red_exclamation.svg'
import orangeAnomalyImage from '@/assets/orange_exclamation.svg'
import yellowAnomalyImage from '@/assets/yellow_exclamation.svg'

const props = withDefaults(defineProps<{
  users: User[]
  isLoading: boolean
}>(), {
  users: [] // provide a default empty array for users
})

const router = useRouter()
const itemsPerPage = ref(50)
const currentPage = ref(1)
const showTooltip = ref(false)
const tooltipPosition = ref({ x: 0, y: 0 })
const tooltipText = ref('') // New state to hold the tooltip text

// Create a new computed property to get unique users based on their ID
const uniqueUsers = computed(() => {
  const uniqueIds = new Set()
  return props.users.filter(user => {
    if (!uniqueIds.has(user.id)) {
      uniqueIds.add(user.id)
      return true
    }
    return false
  })
})

// Paginated users
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return uniqueUsers.value.slice(start, end)
})

// Function to format numbers to two decimal places
const formatNumber = (number: number) => {
  return new Intl.NumberFormat('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number)
}

const navigateToCostOverview = (fleetId: string, userId: string, month: string) => {
  router.push({ name: 'CostOverview', params: { fleet_id: fleetId, user_id: userId, month: month } })
}

// Navigation functions
const nextPage = () => {
  if ((currentPage.value * itemsPerPage.value) < uniqueUsers.value.length) {
    currentPage.value += 1
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}

const getAnomalyImage = (anomalyScore: number) => {
  if (anomalyScore < -0.3 && anomalyScore >= -0.5) {
    return redAnomalyImage;
  } else if (anomalyScore < -0.1 && anomalyScore >= -0.3) {
    return orangeAnomalyImage;
  } else if (anomalyScore < 0 && anomalyScore >= -0.1) {
    return yellowAnomalyImage;
  } else {
    return ''; // Default image or no image
  }
}

const handleMouseOver = (event, anomalyScore) => {
  tooltipPosition.value = { x: event.clientX + 10, y: event.clientY + 10 }
  showTooltip.value = true

  // Set the tooltip text based on the anomaly score
  if (anomalyScore < -0.3 && anomalyScore >= -0.5) {
    tooltipText.value = "Red: Severe anomaly, score between -0.3 and -0.5. For a more detailed explanation, press the 'help' button on the bottom left."
  } else if (anomalyScore < -0.1 && anomalyScore >= -0.3) {
    tooltipText.value = "Orange: Moderate anomaly, score between -0.3 and -0.1. For a more detailed explanation, press the 'help' button on the bottom left."
  } else if (anomalyScore < 0 && anomalyScore >= -0.1) {
    tooltipText.value = "Yellow: Minor anomaly, score between -0.1 and 0. For a more detailed explanation, press the 'help' button on the bottom left."
  }
}

const handleMouseOut = () => {
  showTooltip.value = false
}
</script>

<template>
  <div class="table-container">
    <div v-if="uniqueUsers.length > 0">
      <table>
        <thead class="header">
        <tr>
          <th class="theader">User ID</th>
          <th class="total-cost">Total cost</th>
          <th class="theader">Total kWh</th>
          <th class="theader">Price per kWh</th>
          <th class="theader"></th> <!-- Add empty header for the arrow column -->
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id" @click="navigateToCostOverview(user.fleetId, user.id, $route.params.month)" style="cursor: pointer;">
          <td class="row">{{ user.id }}</td>
          <td class="row">
            <img @mouseover="handleMouseOver($event, user.anomalyScore)"
                 @mousemove="handleMouseOver($event, user.anomalyScore)"
                 @mouseout="handleMouseOut"
                 v-if="user.anomaly === -1" :src="getAnomalyImage(user.anomalyScore)"
                 alt="Anomaly Image"
                 class="anomaly-image"
            />
            €{{ formatNumber(user.monthlyCost) }}
          </td>
          <td class="total-kwh">{{ formatNumber(user.monthlyKWh) }} kWh</td>
          <td class="row">€{{ formatNumber(user.pricePerKWh) }}</td>
          <td @click.stop="navigateToCostOverview(user.fleetId, user.id)" style="text-align: right;">
            <img class="cost-button" src="@/assets/chevron-right.svg" alt="cost-button">
          </td>
        </tr>
        </tbody>
      </table>
      <div v-if="showTooltip" class="tooltip" :style="{ top: `${tooltipPosition.y}px`, left: `${tooltipPosition.x}px` }">
        {{ tooltipText }}
      </div>
    </div>
    <p v-else>No users found</p>
    <p v-if="props.isLoading">Loading...</p>
  </div>
  <div class="footer">
    <div class="page-counter">
      <button @click="prevPage" :disabled="currentPage === 1">&lt;</button>
      <span>{{ currentPage }}</span> of <span>{{ Math.ceil(uniqueUsers.length / itemsPerPage) }}</span>
      <button @click="nextPage" :disabled="(currentPage * itemsPerPage) >= uniqueUsers.length">&gt;</button>
    </div>
    <span class="results-per-page">Show:
      <select v-model="itemsPerPage">
        <option v-for="n in [10, 20, 50]" :value="n" :key="n">{{ n }}</option>
      </select> results per page
    </span>
    <span class="results-page">Total drivers: {{ uniqueUsers.length }}</span>
  </div>
</template>

<style scoped>
.table-container {
  background: #2C2C2D;
  width: 100%;
  height: auto;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 11px 22px 0px;
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

.total-cost {
  font-weight: 700;
  line-height: 17.6px;
  text-align: left;
  color: #FFFFFF;
}

.row {
  width: 928px;
  height: 35px;
  justify-content: space-between;
  background: #2C2C2D;
  border-bottom: 1px solid #3B3B3C;
}

.total-kwh {
  width: 928px;
  height: 35px;
  justify-content: space-between;
  background: #2C2C2D;
  border-bottom: 1px solid #3B3B3C;
  color: #9D9C9E;
}

.anomaly-image {
  width: 20px; /* Adjust size as needed */
  height: 20px; /* Adjust size as needed */
  margin-right: 5px; /* Space between the image and the cost */
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

.cost-button {
  width: 16px;
  height: 16px;
  gap: 8px;
}

tbody tr:hover {
  background: #3B3B3C;
}

.tooltip {
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  pointer-events: none;
  z-index: 1000;
  font-size: 12px;
}
</style>