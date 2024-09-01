import { userService } from '@/modules/users/services/user.service'
import { useQuery } from '@tanstack/vue-query'

export function useUserIndexQuery(fleet_id: string, month: string) {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const data = await userService.getAll(fleet_id, month)
      return data
    },
  })
}