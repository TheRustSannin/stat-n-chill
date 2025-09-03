"use client"

import Image from "next/image"
import { ScheduleMatch } from "@/lib/types"
import { motion, Variants } from "framer-motion"
import { useEffect, useState } from "react"

interface FixturesTableProps {
  matches: ScheduleMatch[]
  isMobile: boolean
  onMatchClick: (id: number) => void
}

// Animation variants with proper TypeScript typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
      when: "beforeChildren"
    }
  }
}

const tableRowVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    transition: {
      duration: 0.3
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      duration: 0.5
    }
  },
  hover: {
    scale: 1.01,
    backgroundColor: "var(--hover-bg)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
      duration: 0.2
    }
  },
  tap: {
    scale: 0.995
  }
}

const mobileCardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 15,
    scale: 0.98
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 22,
      duration: 0.4
    }
  },
  hover: {
    scale: 1.01,
    y: -2,
    backgroundColor: "var(--hover-bg)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
      duration: 0.2
    }
  },
  tap: {
    scale: 0.995
  }
}

const logoVariants: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.15, 
    rotate: [0, -5, 0],
    transition: {
      rotate: {
        repeat: 1,
        duration: 0.4
      },
      scale: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }
}

const viewButtonVariants: Variants = {
  rest: { x: 0 },
  hover: { 
    x: 3,
    color: "var(--gold-hover)"
  }
}

export default function FixturesTable({ matches, isMobile, onMatchClick }: FixturesTableProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Check if dark mode is enabled
    setIsDarkMode(document.documentElement.classList.contains('dark'))
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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="shadow-lg rounded-xl overflow-hidden bg-card text-card-foreground border border-border"
      >
        <div className="animate-pulse">
          <div className="bg-muted h-12"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 border-b border-border"></div>
          ))}
        </div>
      </motion.div>
    )
  }

  if (!matches || matches.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center py-16 bg-card rounded-xl shadow-md border border-border"
      >
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-5xl mb-4"
        >
          📅
        </motion.div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No fixtures found</h3>
        <p className="text-muted-foreground">Try selecting a different filter or check back later.</p>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="shadow-lg rounded-xl overflow-hidden bg-card text-card-foreground border border-border"
      style={{
        // Define CSS variables for theme-aware animations
        '--hover-bg': isDarkMode ? 'rgba(255, 255, 145, 0.1)' : 'rgba(0, 0, 0, 0.03)',
        '--gold-hover': isDarkMode ? 'oklch(95% 0.15 95)' : 'oklch(30% 0.08 95)',
      } as React.CSSProperties}
    >
      {/* Desktop/Tablet View */}
      {!isMobile ? (
        <table className="w-full text-left text-sm">
          <thead className="bg-muted">
            <motion.tr 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">League</th>
              <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">Home</th>
              <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">Away</th>
              <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">Date</th>
              <th className="px-4 py-3 md:px-6 md:py-4 font-semibold">Details</th>
            </motion.tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <motion.tr
                key={match.id}
                variants={tableRowVariants}
                whileHover="hover"
                whileTap="tap"
                className={`border-b border-border cursor-pointer ${
                  index % 2 === 0 ? 'bg-card' : 'bg-muted/20'
                }`}
                onClick={() => onMatchClick(match.id)}
              >
                <td className="px-4 py-3 md:px-6 md:py-4 flex items-center space-x-2 md:space-x-3">
                  {match.league_logo && (
                    <motion.div 
                      variants={logoVariants}
                      whileHover="hover"
                      className="relative h-6 w-6 md:h-8 md:w-8 flex-shrink-0"
                    >
                      <Image
                        src={match.league_logo}
                        alt={match.league_name || "League"}
                        width={32}
                        height={32}
                        className="rounded object-contain"
                      />
                    </motion.div>
                  )}
                  <span className="text-foreground text-sm md:text-base truncate max-w-[120px] md:max-w-none">
                    {match.league_name}
                  </span>
                </td>
                <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-foreground">
                  <div className="flex items-center space-x-2">
                    {match.home_logo && (
                      <motion.div 
                        variants={logoVariants}
                        whileHover="hover"
                        className="relative h-5 w-5 md:h-6 md:w-6"
                      >
                        <Image
                          src={match.home_logo}
                          alt={match.home_team}
                          width={24}
                          height={24}
                          className="rounded object-contain"
                        />
                      </motion.div>
                    )}
                    <span className="text-sm md:text-base truncate max-w-[80px] md:max-w-none">{match.home_team}</span>
                  </div>
                </td>
                <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-foreground">
                  <div className="flex items-center space-x-2">
                    {match.away_logo && (
                      <motion.div 
                        variants={logoVariants}
                        whileHover="hover"
                        className="relative h-5 w-5 md:h-6 md:w-6"
                      >
                        <Image
                          src={match.away_logo}
                          alt={match.away_team}
                          width={24}
                          height={24}
                          className="rounded object-contain"
                        />
                      </motion.div>
                    )}
                    <span className="text-sm md:text-base truncate max-w-[80px] md:max-w-none">{match.away_team}</span>
                  </div>
                </td>
                <td className="px-4 py-3 md:px-6 md:py-4 font-semibold text-foreground text-sm md:text-base">
                  {formatMatchDate(match.start_time)}
                </td>
                <motion.td 
                  variants={viewButtonVariants}
                  whileHover="hover"
                  className="px-4 py-3 md:px-6 md:py-4"
                >
                  <span className="text-primary text-sm md:text-base hover:underline">
                    View
                  </span>
                </motion.td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Mobile View (optimized for small screens)
        <div className="divide-y divide-border">
          {matches.map((match, index) => (
            <motion.div
              key={match.id}
              variants={mobileCardVariants}
              whileHover="hover"
              whileTap="tap"
              className={`p-3 cursor-pointer ${
                index % 2 === 0 ? 'bg-card' : 'bg-muted/20'
              }`}
              onClick={() => onMatchClick(match.id)}
            >
              {/* League info */}
              <div className="flex items-center mb-2">
                {match.league_logo && (
                  <motion.div 
                    variants={logoVariants}
                    whileHover="hover"
                    className="relative h-5 w-5 mr-2 flex-shrink-0"
                  >
                    <Image
                      src={match.league_logo}
                      alt={match.league_name || "League"}
                      width={20}
                      height={20}
                      className="rounded object-contain"
                    />
                  </motion.div>
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
                        <motion.div variants={logoVariants} whileHover="hover">
                          <Image
                            src={match.home_logo}
                            alt={match.home_team}
                            width={24}
                            height={24}
                            className="rounded object-contain"
                          />
                        </motion.div>
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
                        <motion.div variants={logoVariants} whileHover="hover">
                          <Image
                            src={match.away_logo}
                            alt={match.away_team}
                            width={24}
                            height={24}
                            className="rounded object-contain"
                          />
                        </motion.div>
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
                <motion.div 
                  variants={viewButtonVariants}
                  whileHover="hover"
                  className="flex flex-col items-end ml-2"
                >
                  <span className="text-sm font-semibold whitespace-nowrap">
                    {formatMatchDate(match.start_time)}
                  </span>
                  <motion.span 
                    whileHover={{ x: 3 }}
                    className="text-primary text-xs mt-1 whitespace-nowrap"
                  >
                    View →
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}