// types/livescore.ts
export type LiveScoreMatch = {
  id: number
  home_team: string
  away_team: string
  home_score: number
  away_score: number
  start_time: string
  league_id: number | null
  season_id: number | null
  league_name?: string | null
  season_name?: string | null
  minute?: number | null
  status?: string | null
  updated_at?: string
}