"use client"

import Image from "next/image"
import { LiveMatch } from "@/lib/types"

interface LiveScoreTableProps {
  matches: LiveMatch[]
  isMobile: boolean
  onMatchClick: (id: number) => void
}

export default function LiveScoreTable({ matches, isMobile, onMatchClick }: LiveScoreTableProps) {
  if (!matches.length) {
    return (
      <div className="text-center py-16 bg-card rounded-xl shadow-md border border-border">
        <div className="text-5xl mb-4">⚽</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No live matches</h3>
        <p className="text-muted-foreground">Check back later for ongoing matches.</p>
      </div>
    )
  }

  return (
    <div className="shadow-lg rounded-xl overflow-hidden bg-card text-card-foreground border border-border">
      {/* Desktop/Tablet View */}
      {!isMobile ? (
        <table className="min-w-full text-left text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">League</th>
              <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">Match</th>
              <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">Status</th>
              <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">Score</th>
              <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr
                key={match.id}
                className={`border-b border-border transition-all duration-300 cursor-pointer hover:bg-accent/30 ${
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
                        fill
                        className="rounded object-contain"
                      />
                    </div>
                  )}
                  <span className="text-foreground text-sm md:text-base truncate max-w-[120px] md:max-w-none">
                    {match.league_name}
                  </span>
                </td>
                <td className="px-4 py-3 md:px-6 md:py-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      {match.home_logo && (
                        <div className="relative h-5 w-5 md:h-6 md:w-6">
                          <Image
                            src={match.home_logo}
                            alt={match.home_team}
                            fill
                            className="rounded object-contain"
                          />
                        </div>
                      )}
                      <span className="text-sm md:text-base truncate max-w-[120px] md:max-w-none">{match.home_team}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {match.away_logo && (
                        <div className="relative h-5 w-5 md:h-6 md:w-6">
                          <Image
                            src={match.away_logo}
                            alt={match.away_team}
                            fill
                            className="rounded object-contain"
                          />
                        </div>
                      )}
                      <span className="text-sm md:text-base truncate max-w-[120px] md:max-w-none">{match.away_team}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 md:px-6 md:py-4">
                  {match.status === "LIVE" ? (
                    <div className="flex items-center">
                      <span className="flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      <span className="text-red-600 font-semibold text-sm md:text-base">LIVE</span>
                      {match.minute && (
                        <span className="ml-1 text-sm md:text-base">{match.minute}'</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-sm md:text-base">{match.status}</span>
                  )}
                </td>
                <td className="px-4 py-3 md:px-6 md:py-4">
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-lg font-bold">{match.home_score}</span>
                    <span className="text-lg font-bold">{match.away_score}</span>
                  </div>
                </td>
                <td className="px-4 py-3 md:px-6 md:py-4">
                  <span className="text-primary hover:underline text-sm md:text-base">View</span>
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
              className={`p-3 transition-all duration-300 cursor-pointer hover:bg-accent/30 ${
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
                      fill
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
                          fill
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
                          fill
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
                
                {/* Score and status */}
                <div className="flex flex-col items-end ml-2">
                  <div className="flex items-center mb-1">
                    {match.status === "LIVE" && (
                      <span className="flex h-2 w-2 mr-1">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                    <span className={`text-xs font-semibold ${match.status === "LIVE" ? "text-red-600" : ""}`}>
                      {match.status === "LIVE" ? `LIVE ${match.minute || ''}` : match.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">{match.home_score}</span>
                    <span className="text-muted-foreground">-</span>
                    <span className="text-lg font-bold">{match.away_score}</span>
                  </div>
                  <span className="text-primary text-xs mt-1 whitespace-nowrap">View →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}