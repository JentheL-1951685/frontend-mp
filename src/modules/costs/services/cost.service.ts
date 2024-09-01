import type { Cost } from '@/modules/costs/models/cost.model'
import httpClient from '@/http/httpClient'

interface CostService {
  getAll: (fleet_id: string, user_id: string, month: string) => Promise<Cost[]>
}

export const costService: CostService = {
  getAll: async (fleet_id: string, user_id: string, month: string): Promise<Cost[]> => {
    const response = await httpClient.get(`/fleets/${fleet_id}/anomaly/${month}/${user_id}`)
    return response.data
  },
}