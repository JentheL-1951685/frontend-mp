import { costService } from '@/modules/costs/services/cost.service'
import { useQuery } from '@tanstack/vue-query'

export function useCostIndexQuery(fleet_id: string, user_id: string, month: string) {
  return useQuery({
    queryKey: ['costs'],
    queryFn: async () => {
      const data = await costService.getAll(fleet_id, user_id, month)
      return data
    },
  })
}