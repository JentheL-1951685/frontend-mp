<script setup lang="ts">
import { defineProps } from 'vue'
import { useUserIndexQuery } from '@/modules/users/services/userIndex.query'
import UserTable from '@/modules/users/components/UserTable.vue'

const props = defineProps<{
  fleet_id: string
  month: string
}>()

const { data: users, isLoading } = useUserIndexQuery(props.fleet_id, props.month)
</script>

<template>
  <div class="user-table">
    <UserTable :users="users" :is-loading="isLoading" />
  </div>
</template>