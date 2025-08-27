"use client"

import Image from "next/image"
import { LiveMatch } from "@/lib/types"

interface LiveScoreModalProps {
  match: LiveMatch
  onClose: () => void
}

export default function LiveScoreModal({ match, onClose }: LiveScoreModalProps) {
  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
        <div 
          className="bg-card text-card-foreground rounded-xl shadow-2xl p-4 md:p-6 border border-border"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-4 md:mb-6">
            <div className="flex items-center space-x-2 md:space-x-3">
              {match.league_logo && (
                <div className="relative h-8 w-8 md:h-10 md:w-10">
                  <Image
                    src={match.league_logo}
                    alt={match.league_name || "League"}
                    fill
                    className="rounded object-contain"
                  />
                </div>
              )}
              <h2 className="text-xl md:text-2xl font-bold">{match.league_name}</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1 md:p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Teams Section with Live Score */}
          <div className="flex justify-between items-center mb-6 md:mb-8 p-4 md:p-5 bg-muted rounded-lg">
            {/* Home Team - Left side */}
            <div className="flex flex-col items-center text-center w-2/5 md:w-1/3">
              {match.home_logo && (
                <div className="relative h-12 w-12 md:h-16 md:w-16 mb-2">
                  <Image
                    src={match.home_logo}
                    alt={match.home_team}
                    fill
                    className="rounded object-contain"
                  />
                </div>
              )}
              <div className="font-bold text-base md:text-xl lg:text-2xl break-words">
                {match.home_team}
              </div>
            </div>
            
            {/* Score Section - Center */}
            <div className="flex flex-col items-center justify-center w-1/5 md:w-1/3 px-2">
              <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-2">
                <span className="text-2xl md:text-4xl font-bold">{match.home_score}</span>
                <span className="text-xl md:text-2xl font-bold">-</span>
                <span className="text-2xl md:text-4xl font-bold">{match.away_score}</span>
              </div>
              
              {match.status === "LIVE" ? (
                <div className="flex items-center bg-red-100 px-2 py-1 rounded-full">
                  <span className="flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span className="text-red-600 font-semibold text-sm">
                    LIVE {match.minute ? `${match.minute}'` : ''}
                  </span>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  {match.status}
                </div>
              )}
            </div>
            
            {/* Away Team - Right side */}
            <div className="flex flex-col items-center text-center w-2/5 md:w-1/3">
              {match.away_logo && (
                <div className="relative h-12 w-12 md:h-16 md:w-16 mb-2">
                  <Image
                    src={match.away_logo}
                    alt={match.away_team}
                    fill
                    className="rounded object-contain"
                  />
                </div>
              )}
              <div className="font-bold text-base md:text-xl lg:text-2xl break-words">
                {match.away_team}
              </div>
            </div>
          </div>

          {/* Match Details */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm mb-4 md:mb-6">
            <div className="p-3 md:p-4 bg-muted rounded-lg">
              <p className="font-semibold text-foreground mb-1 md:mb-2">Status</p>
              <p className="text-muted-foreground">{match.status}</p>
            </div>
            
            {match.start_time && (
              <div className="p-3 md:p-4 bg-muted rounded-lg">
                <p className="font-semibold text-foreground mb-1 md:mb-2">Kick-off</p>
                <p className="text-muted-foreground">
                  {new Date(match.start_time).toLocaleTimeString([], { 
                    hour: "2-digit", 
                    minute: "2-digit",
                    hour12: true 
                  })}
                </p>
              </div>
            )}
            
            <div className="p-3 md:p-4 bg-muted rounded-lg">
              <p className="font-semibold text-foreground mb-1 md:mb-2">League</p>
              <p className="text-muted-foreground">{match.league_name}</p>
            </div>
            
            <div className="p-3 md:p-4 bg-muted rounded-lg">
              <p className="font-semibold text-foreground mb-1 md:mb-2">Match ID</p>
              <p className="text-muted-foreground">#{match.id}</p>
            </div>
          </div>

          {/* Match Events Section (if available in API) */}
          {match.events && match.events.length > 0 && (
            <div className="mb-4 md:mb-6">
              <h3 className="font-semibold text-lg mb-3">Match Events</h3>
              <div className="space-y-2">
                {match.events.map((event, index) => (
                  <div key={index} className="flex items-center p-2 bg-muted rounded-lg">
                    <span className="text-sm font-medium mr-2">{event.time}'</span>
                    <span className="text-sm">{event.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Match Statistics Section (if available in API) */}
          {match.statistics && (
            <div className="mb-4 md:mb-6">
              <h3 className="font-semibold text-lg mb-3">Statistics</h3>
              <div className="space-y-3">
                {Object.entries(match.statistics).map(([statName, statValue]) => (
                  <div key={statName}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{statValue.home}</span>
                      <span className="font-medium">{statName}</span>
                      <span>{statValue.away}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${statValue.homePercent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col-reverse md:flex-row justify-end space-y-reverse space-y-2 md:space-y-0 md:space-x-3">
            <button 
              className="px-4 py-2 md:px-5 md:py-2.5 rounded-lg transition-colors bg-muted text-muted-foreground hover:bg-accent text-sm md:text-base"
              onClick={onClose}
            >
              Close
            </button>
            <button className="px-4 py-2 md:px-5 md:py-2.5 rounded-lg transition-colors bg-primary text-primary-foreground hover:bg-primary/90 text-sm md:text-base">
              Follow Match
            </button>
          </div>
        </div>
      </div>
    </>
  )
}