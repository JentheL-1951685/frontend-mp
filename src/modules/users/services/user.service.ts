import type { User } from '@/modules/users/models/user.model'
import httpClient from '@/http/httpClient'

interface UserService {
  getAll: (fleet_id: string, month: string) => Promise<User[]>
}

export const userService: UserService = {
  getAll: async (fleet_id: string, month: string): Promise<User[]> => {
    const response = await httpClient.get(`/fleets/${fleet_id}/anomaly/${month}`)
    return response.data.map((item: any) => ({
      id: item.user_id,
      fleetId: item.fleet_id,
      monthlyCost: item.monthly_cost,
      monthlyKWh: item.monthly_kWh,
      pricePerKWh: item.price_per_kWh,
      anomalyScore: item.anomaly_scores,
      anomaly: item.anomaly
    }))
  },
}