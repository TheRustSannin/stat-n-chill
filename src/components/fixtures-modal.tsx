"use client"

import Image from "next/image"
import { ScheduleMatch } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"

interface FixturesModalProps {
  match: ScheduleMatch
  onClose: () => void
}

export default function FixturesModal({ match, onClose }: FixturesModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      ></motion.div>
      
      <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl">
        <motion.div
          key="modal-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-card text-card-foreground rounded-xl shadow-2xl p-4 md:p-6 border border-border"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-4 md:mb-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-2 md:space-x-3"
            >
              {match.league_logo && (
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative h-8 w-8 md:h-10 md:w-10"
                >
                  <Image
                    src={match.league_logo}
                    alt={match.league_name || "League"}
                    fill
                    className="rounded object-contain"
                  />
                </motion.div>
              )}
              <h2 className="text-xl md:text-2xl font-bold">{match.league_name}</h2>
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1 md:p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* Teams Section - Fixed layout */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-between items-center mb-6 md:mb-8 p-4 md:p-5 bg-muted rounded-lg"
          >
            {/* Home Team - Left side */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center w-2/5 md:w-1/3"
            >
              {match.home_logo && (
                <motion.div 
                  whileHover={{ rotate: 5 }}
                  className="relative h-12 w-12 md:h-16 md:w-16 mb-2"
                >
                  <Image
                    src={match.home_logo}
                    alt={match.home_team}
                    fill
                    className="rounded object-contain"
                  />
                </motion.div>
              )}
              <div className="font-bold text-base md:text-xl lg:text-2xl break-words">
                {match.home_team}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Home Team</div>
            </motion.div>
            
            {/* VS Section - Center */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="flex flex-col items-center justify-center w-1/5 md:w-1/3 px-2"
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  color: ["var(--primary)", "var(--accent)", "var(--primary)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-lg md:text-2xl lg:text-3xl font-bold"
              >
                VS
              </motion.div>
              <div className="text-xs md:text-sm text-muted-foreground mt-2 text-center">
                {new Date(match.start_time).toLocaleDateString()}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground text-center">
                {new Date(match.start_time).toLocaleTimeString([], { 
                  hour: "2-digit", 
                  minute: "2-digit",
                  hour12: true 
                })}
              </div>
            </motion.div>
            
            {/* Away Team - Right side */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center w-2/5 md:w-1/3"
            >
              {match.away_logo && (
                <motion.div 
                  whileHover={{ rotate: -5 }}
                  className="relative h-12 w-12 md:h-16 md:w-16 mb-2"
                >
                  <Image
                    src={match.away_logo}
                    alt={match.away_team}
                    fill
                    className="rounded object-contain"
                  />
                </motion.div>
              )}
              <div className="font-bold text-base md:text-xl lg:text-2xl break-words">
                {match.away_team}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Away Team</div>
            </motion.div>
          </motion.div>

          {/* Match Details - Side by side layout */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm mb-4 md:mb-6"
          >
            {/* First row */}
            <motion.div 
              whileHover={{ y: -3 }}
              className="p-3 md:p-4 bg-muted rounded-lg"
            >
              <p className="font-semibold text-foreground mb-1 md:mb-2">Round</p>
              <p className="text-muted-foreground">{match.round_name || "N/A"}</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -3 }}
              className="p-3 md:p-4 bg-muted rounded-lg"
            >
              <p className="font-semibold text-foreground mb-1 md:mb-2">Status</p>
              <p className="text-muted-foreground">{match.state_name || "Scheduled"}</p>
            </motion.div>
            
            {/* Second row */}
            <motion.div 
              whileHover={{ y: -3 }}
              className="p-3 md:p-4 bg-muted rounded-lg"
            >
              <p className="font-semibold text-foreground mb-1 md:mb-2">Season</p>
              <p className="text-muted-foreground">{match.season_name || "N/A"}</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -3 }}
              className="p-3 md:p-4 bg-muted rounded-lg"
            >
              <p className="font-semibold text-foreground mb-1 md:mb-2">Match ID</p>
              <p className="text-muted-foreground">#{match.id}</p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col-reverse md:flex-row justify-end space-y-reverse space-y-2 md:space-y-0 md:space-x-3"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 md:px-5 md:py-2.5 rounded-lg transition-colors bg-muted text-muted-foreground hover:bg-accent text-sm md:text-base"
              onClick={onClose}
            >
              Close
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 md:px-5 md:py-2.5 rounded-lg transition-colors bg-primary text-primary-foreground hover:bg-primary/90 text-sm md:text-base"
            >
              Set Reminder
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}