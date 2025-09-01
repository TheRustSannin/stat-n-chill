import { Suspense } from "react"
import FixturesClient from "./fixtures-client"
import { createClient } from "@/lib/supabase-server"

// Force dynamic rendering for real-time updates
export const dynamic = 'force-dynamic'

async function getFixtures() {
  const supabase = await createClient()

  const { data: fixtures, error } = await supabase
    .from('fixtures')
    .select(`
      *,
      home_team:home_team_id (id, name, logo),
      away_team:away_team_id (id, name, logo)
    `)
    .order('start_time', { ascending: true })

  if (error) {
    console.error('Error fetching fixtures:', error)
    throw new Error('Failed to fetch fixtures')
  }

  // Transform the data to match the expected format
  return fixtures.map(fixture => ({
    id: fixture.id,
    home_team: fixture.home_team?.name || 'Unknown',
    away_team: fixture.away_team?.name || 'Unknown',
    home_team_id: fixture.home_team_id,
    away_team_id: fixture.away_team_id,
    home_logo: fixture.home_team?.logo || null,
    away_logo: fixture.away_team?.logo || null,
    start_time: fixture.start_time,
    league_name: fixture.league_name,
    league_logo: fixture.league_logo,
    round_name: fixture.round_name,
    state_name: fixture.state_name,
    season_id: fixture.season_id,
    season_name: fixture.season_name || '25/26'
  })) || []
}

export default async function FixturesPage() {
  const fixtures = await getFixtures()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10 animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Fixtures & Schedule</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Stay up to date with all the upcoming matches. Filter by today, tomorrow, or view all upcoming fixtures.
        </p>
      </div>

      <Suspense fallback={<LoadingFixtures />}>
        <FixturesClient initialMatches={fixtures} />
      </Suspense>
    </div>
  )
}

// Loading component for the initial suspense
function LoadingFixtures() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
      <p className="text-muted-foreground">Loading fixtures...</p>
    </div>
  )
}