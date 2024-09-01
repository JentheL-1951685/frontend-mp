import type { Fleet } from '@/modules/fleets/models/fleet.model'
import httpClient from '@/http/httpClient'

interface FleetService {
  getAll: () => Promise<Fleet[]>
}

export const fleetService: FleetService = {
  getAll: async (): Promise<Fleet[]> => {
    const response = await httpClient.get('/fleets')
    return response.data
  },
}