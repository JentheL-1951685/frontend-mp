<script setup lang="ts">
import { defineProps } from 'vue'
import { useCostIndexQuery } from '@/modules/costs/services/costIndex.query'
import CostTable from '@/modules/costs/components/CostTable.vue'

const props = defineProps<{
  fleet_id: string
  user_id: string
  month: string
}>()

const { data: costs, isLoading } = useCostIndexQuery(props.fleet_id, props.user_id, props.month)
</script>

<template>
  <div class="costs-table">
    <CostTable :costs="costs" :is-loading="isLoading" />
  </div>
</template>

<style scoped>
.costs-table {
  position: absolute;
  width: 400px;
  height: 100%;
  background-color: rgb(59, 59, 60, 1);
  overflow: hidden;
  box-shadow: -4px 0px 16px 4px rgba(0, 0, 0, 0.2);
  top: 0;
  right: 0;
}
</style>