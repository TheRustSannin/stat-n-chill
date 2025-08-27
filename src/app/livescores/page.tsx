import { Suspense } from "react"
import LivescoresClient from "./livescores-client"
import { createClient } from "@/lib/supabase-server"

export const dynamic = 'force-dynamic'

async function getLiveMatches() {
  const supabase = await createClient()
  
  const { data: livescores, error } = await supabase
    .from('livescores')
    .select(`
      *,
      home_team:home_team_id (id, name, logo, short_code),
      away_team:away_team_id (id, name, logo, short_code),
      league:league_id (id, name, logo),
      venue:venue_id (id, name, city)
    `)
    .order('starting_at', { ascending: true })
    .eq('deleted', false)
    // Only get active or recently active matches
    .or('status.not.eq.FT,status.not.eq.Canceled,starting_at.gt.2024-01-01')
  
  if (error) {
    console.error('Error fetching livescores:', error)
    // Return empty array instead of throwing error
    return []
  }
  
  if (!livescores || livescores.length === 0) {
    // No matches found - this is normal, not an error
    return []
  }
  
  return livescores.map(match => ({
    id: match.id,
    home_team: match.home_team?.name || 'Unknown',
    away_team: match.away_team?.name || 'Unknown',
    home_team_id: match.home_team_id,
    away_team_id: match.away_team_id,
    home_logo: match.home_team?.logo || null,
    away_logo: match.away_team?.logo || null,
    home_short_code: match.home_team?.short_code || null,
    away_short_code: match.away_team?.short_code || null,
    home_score: match.home_score || 0,
    away_score: match.away_score || 0,
    minute: match.minute,
    status: match.status,
    starting_at: match.starting_at,
    league_name: match.league?.name || null,
    league_logo: match.league?.logo || null,
    venue_name: match.venue?.name || null,
    venue_city: match.venue?.city || null
  }))
}

export default async function LivescoresPage() {
  const liveMatches = await getLiveMatches()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10 animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Live Scores</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Follow live football matches with real-time updates. Scores update automatically as the games progress.
        </p>
      </div>
      
      <Suspense fallback={<LoadingLivescores />}>
        <LivescoresClient initialMatches={liveMatches} />
      </Suspense>
    </div>
  )
}

function LoadingLivescores() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
      <p className="text-muted-foreground">Loading live scores...</p>
    </div>
  )
}