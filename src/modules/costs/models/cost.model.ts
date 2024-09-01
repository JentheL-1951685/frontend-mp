export interface Cost {
  id: string
  user_id: string
  price: number
  charge_added: number
  started_charging_at: string
  finished_charging_at: string
  charging_time: string
  anomaly_scores: number
  anomaly: number
}