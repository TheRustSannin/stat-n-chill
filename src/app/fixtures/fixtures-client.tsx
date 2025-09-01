"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase-client"
import FixturesTable from "@/components/fixtures-table"
import FixturesModal from "@/components/fixtures-modal"
import { ScheduleMatch } from "@/lib/types"

type Filter = "today" | "tomorrow" | "upcoming"

export default function FixturesClient({ initialMatches }: { initialMatches: ScheduleMatch[] }) {
  const [matches, setMatches] = useState<ScheduleMatch[]>(initialMatches)
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [filter, setFilter] = useState<Filter>("today")
  const [isLoading, setIsLoading] = useState(false)

  // Resize hook
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768)
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Subscribe to realtime updates and fetch team logos
  useEffect(() => {
    const supabase = createClient()

    // Function to fetch team logos
    const fetchTeamLogos = async (teamIds: number[]) => {
      if (teamIds.length === 0) return

      const { data: teams, error } = await supabase
        .from('teams')
        .select('id, name, logo')
        .in('id', teamIds)

      if (error) {
        console.error('Error fetching team logos:', error)
        return
      }

      // Update matches with logos
      setMatches(prev => prev.map(match => {
        const homeTeam = teams.find(team => team.id === match.home_team_id)
        const awayTeam = teams.find(team => team.id === match.away_team_id)

        return {
          ...match,
          home_logo: homeTeam?.logo || match.home_logo,
          away_logo: awayTeam?.logo || match.away_logo
        }
      }))
    }

    // Get unique team IDs from matches
    const teamIds = [...new Set([
      ...matches.map(m => m.home_team_id).filter(Boolean) as number[],
      ...matches.map(m => m.away_team_id).filter(Boolean) as number[]
    ])]

    fetchTeamLogos(teamIds)

    // Realtime subscription for fixtures
    const channel = supabase
      .channel("public:fixtures")
      .on("postgres_changes", { event: "*", schema: "public", table: "fixtures" }, async (payload) => {
        if (payload.eventType === "INSERT") {
          const newMatch = payload.new as any
          // Fetch team logos for the new match
          const teamIds = [
            newMatch.home_team_id,
            newMatch.away_team_id
          ].filter(Boolean)

          if (teamIds.length > 0) {
            const { data: teams } = await supabase
              .from('teams')
              .select('id, name, logo')
              .in('id', teamIds)

            const homeTeam = teams?.find(team => team.id === newMatch.home_team_id)
            const awayTeam = teams?.find(team => team.id === newMatch.away_team_id)

            setMatches(prev => {
              const updatedMatch = {
                id: newMatch.id,
                home_team: homeTeam?.name || newMatch.home_team || 'Unknown',
                away_team: awayTeam?.name || newMatch.away_team || 'Unknown',
                home_team_id: newMatch.home_team_id,
                away_team_id: newMatch.away_team_id,
                home_logo: homeTeam?.logo || null,
                away_logo: awayTeam?.logo || null,
                start_time: newMatch.start_time,
                league_name: newMatch.league_name,
                league_logo: newMatch.league_logo,
                round_name: newMatch.round_name,
                state_name: newMatch.state_name,
                season_id: newMatch.season_id,
                season_name: newMatch.season_name
              }

              return [...prev, updatedMatch].sort((a, b) =>
                new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
              )
            })
          }
        } else if (payload.eventType === "UPDATE") {
          // Handle updates similarly
          const updatedMatch = payload.new as any
          setMatches(prev => {
            const idx = prev.findIndex(m => m.id === updatedMatch.id)
            if (idx !== -1) {
              const newMatches = [...prev]
              newMatches[idx] = {
                ...newMatches[idx],
                ...updatedMatch
              }
              return newMatches
            }
            return prev
          })
        } else if (payload.eventType === "DELETE") {
          setMatches(prev => prev.filter(m => m.id !== (payload.old as ScheduleMatch).id))
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [matches])

  const handleMatchClick = (id: number) => {
    setSelectedMatch(id)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedMatch(null)
    document.body.style.overflow = "unset"
  }

  // Escape key closes modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && closeModal()
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  // Filtering
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const filteredMatches = matches.filter((m) => {
    const matchDate = new Date(m.start_time)
    if (filter === "today") {
      return matchDate.toDateString() === today.toDateString()
    } else if (filter === "tomorrow") {
      return matchDate.toDateString() === tomorrow.toDateString()
    }
    return matchDate > today // upcoming
  })

  const selectedMatchData = matches.find((m) => m.id === selectedMatch)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Centered Filter Tabs */}
      <div className="flex justify-center space-x-2 md:space-x-4 mb-6 md:mb-8 mt-4 md:mt-6">
        <button
          className={`px-3 py-2 md:px-5 md:py-2.5 rounded-lg transition-all duration-300 text-sm md:text-base ${filter === "today"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          onClick={() => setFilter("today")}
        >
          Today
        </button>
        <button
          className={`px-3 py-2 md:px-5 md:py-2.5 rounded-lg transition-all duration-300 text-sm md:text-base ${filter === "tomorrow"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          onClick={() => setFilter("tomorrow")}
        >
          Tomorrow
        </button>
        <button
          className={`px-3 py-2 md:px-5 md:py-2.5 rounded-lg transition-all duration-300 text-sm md:text-base ${filter === "upcoming"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          onClick={() => setFilter("upcoming")}
        >
          Upcoming
        </button>
      </div>

      {/* Table */}
      <FixturesTable
        matches={filteredMatches}
        isMobile={isMobile}
        onMatchClick={handleMatchClick}
      />

      {/* Modal */}
      {selectedMatch && selectedMatchData && (
        <FixturesModal match={selectedMatchData} onClose={closeModal} />
      )}
    </div>
  )
}