"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { motion, Variants } from "framer-motion"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/livescores", label: "Livescores" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/simulations", label: "Simulations" },
  { href: "/profile", label: "Profile" },
]

// Animation variants with proper TypeScript types
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { y: -10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
}

const logoVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
}

const mobileItemVariants: Variants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div variants={logoVariants} whileHover="hover">
            <Link href="/" className="flex items-center space-x-2">
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 dark:from-[oklch(94%_0.04_95)] dark:via-[oklch(88%_0.07_95)] dark:to-[oklch(82%_0.10_95)] bg-clip-text text-transparent"
              >
                Stat & Chill
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center space-x-6"
          >
            {navLinks.map((link) => (
              <motion.div key={link.href} variants={itemVariants}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {link.label}
                  <motion.span 
                    className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
            <motion.div variants={itemVariants}>
              <ThemeSwitcher />
            </motion.div>
          </motion.div>

          {/* Mobile Navigation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2 md:hidden"
          >
            <ThemeSwitcher />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="flex flex-col space-y-4 mt-8"
                >
                  {navLinks.map((link, index) => (
                    <motion.div 
                      key={link.href} 
                      variants={mobileItemVariants}
                      custom={index}
                    >
                      <Link
                        href={link.href}
                        className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2 px-4 rounded-lg hover:bg-accent"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}