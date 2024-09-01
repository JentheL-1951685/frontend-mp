export interface User {
  id: string
  fleetId: string
  monthlyCost: number
  monthlyKWh: number
  pricePerKWh: number
  anomalyScore: number
  anomaly: number
}