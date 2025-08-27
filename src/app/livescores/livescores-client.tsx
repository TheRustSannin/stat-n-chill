"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase-client"
import LiveScoreTable from "@/components/livescores-table"
import { LiveMatch } from "@/lib/types"

export default function LivescoresClient({ initialMatches }: { initialMatches: LiveMatch[] }) {
  const [matches, setMatches] = useState<LiveMatch[]>(initialMatches)
  const [isLoading, setIsLoading] = useState(false)

  // Subscribe to realtime updates
  useEffect(() => {
    const supabase = createClient()
    
    const channel = supabase
      .channel("public:livescores")
      .on("postgres_changes", { 
        event: "*", 
        schema: "public", 
        table: "livescores" 
      }, (payload) => {
        if (payload.eventType === "INSERT") {
          const newMatch = payload.new as any
          setMatches(prev => [...prev, newMatch].sort((a, b) => 
            new Date(a.starting_at).getTime() - new Date(b.starting_at).getTime()
          ))
        } else if (payload.eventType === "UPDATE") {
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
          setMatches(prev => prev.filter(m => m.id !== (payload.old as LiveMatch).id))
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Handle empty state
  if (matches.length === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <div className="text-6xl mb-4">⚽</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No Live Matches Right Now
          </h3>
          <p className="text-muted-foreground">
            Check back later for live football action!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Live Matches</h2>
        <p className="text-muted-foreground">
          Real-time updates of ongoing football matches
        </p>
      </div>
      
      <LiveScoreTable matches={matches} isMobile={false} onMatchClick={function (id: number): void {
        throw new Error("Function not implemented.")
      } } />
    </div>
  )
}