export type ScheduleMatch = {
  id: number
  home_team: string
  away_team: string
  home_team_id?: number
  away_team_id?: number
  start_time: string
  league_name: string
  league_logo?: string
  home_logo?: string
  away_logo?: string
  round_name?: string
  state_name?: string
  season_id?: number
}

export interface LiveMatch {
  id: number
  league_name: string
  league_logo?: string
  home_team: string
  home_logo?: string
  away_team: string
  away_logo?: string
  home_score: number
  away_score: number
  status: "LIVE" | "HT" | "FT" | "POSTPONED" | "CANCELLED" | string
  minute?: number
  start_time?: string
  events?: MatchEvent[]
  statistics?: MatchStatistics
}

export interface MatchEvent {
  time: number
  description: string
  type: string
}

export interface MatchStatistics {
  [key: string]: {
    home: number | string
    away: number | string
    homePercent?: number
  }
}