import { fleetService } from '@/modules/fleets/services/fleet.service'
import { useQuery } from '@tanstack/vue-query'

export function useFleetIndexQuery() {
  return useQuery({
    queryKey: ['fleets'],
    queryFn: async () => {
      const data = await fleetService.getAll()
      return data
    },
  })
}