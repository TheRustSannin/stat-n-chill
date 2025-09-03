"use client"

import Image from "next/image"
import { ScheduleMatch } from "@/lib/types"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FixturesTableProps {
  matches: ScheduleMatch[]
  isMobile: boolean
  onMatchClick: (id: number) => void
}

export default function FixturesTable({ matches, isMobile, onMatchClick }: FixturesTableProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const formatMatchDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (!isMounted) {
    return (
      <div className="shadow-lg rounded-xl overflow-hidden bg-card text-card-foreground border border-border">
        <div className="animate-pulse">
          <div className="bg-muted h-12"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 border-b border-border"></div>
          ))}
        </div>
      </div>
    )
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="text-center py-16 bg-card rounded-xl shadow-md border border-border">
        <div className="text-5xl mb-4">📅</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No fixtures found</h3>
        <p className="text-muted-foreground">Try selecting a different filter or check back later.</p>
      </div>
    )
  }

  return (
    <div className="shadow-lg rounded-xl overflow-hidden bg-card text-card-foreground border border-border">
      {/* Desktop/Tablet View */}
      {!isMobile ? (
        <table className="w-full text-left text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">League</th>
              <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">Home</th>
              <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">Away</th>
              <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">Date</th>
              <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr
                key={match.id}
                className={`border-b border-border transition-colors duration-200 cursor-pointer hover:bg-accent/30 ${
                  index % 2 === 0 ? 'bg-card' : 'bg-muted/20'
                }`}
                onClick={() => onMatchClick(match.id)}
              >
                <td className="px-4 py-3 md:px-6 md:py-4 flex items-center space-x-2 md:space-x-3">
                  {match.league_logo && (
                    <div className="relative h-6 w-6 md:h-8 md:w-8 flex-shrink-0">
                      <Image
                        src={match.league_logo}
                        alt={match.league_name || "League"}
                        width={32}
                        height={32}
                        className="rounded object-contain"
                      />
                    </div>
                  )}
                  <span className="text-foreground text-sm md:text-base truncate max-w-[120px] md:max-w-none">
                    {match.league_name}
                  </span>
                </td>
                <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-foreground">
                  <div className="flex items-center space-x-2">
                    {match.home_logo && (
                      <div className="relative h-5 w-5 md:h-6 md:w-6">
                        <Image
                          src={match.home_logo}
                          alt={match.home_team}
                          width={24}
                          height={24}
                          className="rounded object-contain"
                        />
                      </div>
                    )}
                    <span className="text-sm md:text-base truncate max-w-[80px] md:max-w-none">{match.home_team}</span>
                  </div>
                </td>
                <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-foreground">
                  <div className="flex items-center space-x-2">
                    {match.away_logo && (
                      <div className="relative h-5 w-5 md:h-6 md:w-6">
                        <Image
                          src={match.away_logo}
                          alt={match.away_team}
                          width={24}
                          height={24}
                          className="rounded object-contain"
                        />
                      </div>
                    )}
                    <span className="text-sm md:text-base truncate max-w-[80px] md:max-w-none">{match.away_team}</span>
                  </div>
                </td>
                <td className="px-4 py-3 md:px-6 md:py-4 font-semibold text-foreground text-sm md:text-base">
                  {formatMatchDate(match.start_time)}
                </td>
                <td className="px-4 py-3 md:px-6 md:py-4">
                  <span className="text-primary text-sm md:text-base hover:underline">
                    View
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Mobile View (optimized for small screens)
        <div className="divide-y divide-border">
          {matches.map((match, index) => (
            <div
              key={match.id}
              className={`p-3 transition-colors duration-200 cursor-pointer hover:bg-accent/30 ${
                index % 2 === 0 ? 'bg-card' : 'bg-muted/20'
              }`}
              onClick={() => onMatchClick(match.id)}
            >
              {/* League info */}
              <div className="flex items-center mb-2">
                {match.league_logo && (
                  <div className="relative h-5 w-5 mr-2 flex-shrink-0">
                    <Image
                      src={match.league_logo}
                      alt={match.league_name || "League"}
                      width={20}
                      height={20}
                      className="rounded object-contain"
                    />
                  </div>
                )}
                <span className="text-xs text-muted-foreground truncate">
                  {match.league_name}
                </span>
              </div>
              
              {/* Match info */}
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  {/* Home team */}
                  <div className="flex items-center mb-1">
                    <div className="relative h-6 w-6 mr-2 flex-shrink-0">
                      {match.home_logo ? (
                        <Image
                          src={match.home_logo}
                          alt={match.home_team}
                          width={24}
                          height={24}
                          className="rounded object-contain"
                        />
                      ) : (
                        <div className="h-6 w-6 bg-muted rounded-full flex items-center justify-center">
                          <span className="text-xs">H</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium truncate">{match.home_team}</span>
                  </div>
                  
                  {/* Away team */}
                  <div className="flex items-center">
                    <div className="relative h-6 w-6 mr-2 flex-shrink-0">
                      {match.away_logo ? (
                        <Image
                          src={match.away_logo}
                          alt={match.away_team}
                          width={24}
                          height={24}
                          className="rounded object-contain"
                        />
                      ) : (
                        <div className="h-6 w-6 bg-muted rounded-full flex items-center justify-center">
                          <span className="text-xs">A</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium truncate">{match.away_team}</span>
                  </div>
                </div>
                
                {/* Date and view button */}
                <div className="flex flex-col items-end ml-2">
                  <span className="text-sm font-semibold whitespace-nowrap">
                    {formatMatchDate(match.start_time)}
                  </span>
                  <span className="text-primary text-xs mt-1 whitespace-nowrap hover:underline">
                    View →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}