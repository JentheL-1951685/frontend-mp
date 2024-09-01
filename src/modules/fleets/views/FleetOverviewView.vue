<script setup lang="ts">
import { useFleetIndexQuery } from '@/modules/fleets/services/fleetIndex.query'
import FleetTable from '@/modules/fleets/components/FleetTable.vue'

const { data: fleets, isLoading } = useFleetIndexQuery()
</script>

<template>
  <div class="fleet-table">
    <FleetTable :fleets="fleets" :is-loading="isLoading" />
  </div>
</template>

<style scoped>
.fleet-table {
  background: #2C2C2D;
  width: 100%;
  height: 100%;
}
</style>