import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Brain, Play, Calendar, Target, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 md:py-24 lg:py-32"
        style={{
          background: "var(--background)",
        }}
      >
        <div className="pattern-bg"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl animate-fade-in-up"
              style={{
                color: "var(--foreground)",
              }}
            >
              Your Chill Companion for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Live Football Stats</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-8 text-foreground animate-fade-in-up animation-delay-200 max-w-2xl mx-auto">
              Blend live football data with chill insights. Get real-time stats, AI-powered analysis, and simulation tools all in one place.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-400">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 dark:from-[oklch(85%_0.08_95)] dark:via-[oklch(90%_0.06_95)] dark:to-[oklch(85%_0.08_95)] border-2 border-amber-600 dark:border-[oklch(80%_0.07_95)] hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 dark:hover:from-[oklch(82%_0.08_95)] dark:hover:via-[oklch(88%_0.06_95)] dark:hover:to-[oklch(82%_0.08_95)] text-white dark:text-background font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Link href="/livescores">Get Started</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Link href="/features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              style={{
                color: "var(--foreground)",
              }}
            >
              Everything you need for football analysis
            </h2>
            <p className="mt-4 text-lg md:text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools for the modern football enthusiast
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-7xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Live Stats Card */}
              <div className="flex flex-col animate-fade-in-up">
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-blue-100 dark:hover:border-blue-900/20">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 animate-bounce-gentle">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Live Stats</CardTitle>
                    <CardDescription className="mt-2 text-base">
                      Real-time football data with live scores, player statistics, and match analytics updated every second.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* Schedule Card */}
              <Link href="/schedule" className="flex flex-col animate-fade-in-up animation-delay-100 group">
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-blue-100 dark:hover:border-blue-900/20 group-hover:scale-[1.02]">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 animate-bounce-gentle animation-delay-75">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Match Schedule</CardTitle>
                    <CardDescription className="mt-2 text-base">
                      View upcoming matches, set reminders, and never miss a game with our comprehensive schedule.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              {/* Simulation Mode Card */}
              <div className="flex flex-col animate-fade-in-up animation-delay-200">
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-purple-100 dark:hover:border-purple-900/20">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 animate-bounce-gentle animation-delay-150">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Simulation Mode</CardTitle>
                    <CardDescription className="mt-2 text-base">
                      Replay matches, test different strategies, and explore what-if scenarios with our advanced simulation engine.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* AI Predictions Card */}
              <div className="flex flex-col animate-fade-in-up animation-delay-300">
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/20">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 animate-bounce-gentle animation-delay-225">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">AI Predictions</CardTitle>
                    <CardDescription className="mt-2 text-base">
                      Get accurate match predictions powered by advanced machine learning algorithms and historical data analysis.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* Performance Analytics Card */}
              <div className="flex flex-col animate-fade-in-up animation-delay-400">
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-amber-100 dark:hover:border-amber-900/20">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 animate-bounce-gentle animation-delay-300">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Performance Analytics</CardTitle>
                    <CardDescription className="mt-2 text-base">
                      Deep dive into team and player performance metrics with customizable dashboards and visualizations.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* Chill Insights Card */}
              <div className="flex flex-col animate-fade-in-up animation-delay-500">
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-pink-100 dark:hover:border-pink-900/20">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 animate-bounce-gentle animation-delay-375">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Chill Insights</CardTitle>
                    <CardDescription className="mt-2 text-base">
                      AI-powered summaries and insights that break down complex match data into digestible, actionable information.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 md:py-24 lg:py-32"
        style={{
          background: "var(--background)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to elevate your football experience?
            </h2>
            <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600 animate-fade-in-up animation-delay-200 max-w-2xl mx-auto">
              Join thousands of football enthusiasts who use our platform to stay ahead of the game.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 dark:from-[oklch(85%_0.08_95)] dark:via-[oklch(90%_0.06_95)] dark:to-[oklch(85%_0.08_95)] border-2 border-amber-600 dark:border-[oklch(80%_0.07_95)] hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 dark:hover:from-[oklch(82%_0.08_95)] dark:hover:via-[oklch(88%_0.06_95)] dark:hover:to-[oklch(82%_0.08_95)] text-white dark:text-background font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Link href="/signup">Create Free Account</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 dark:from-[oklch(85%_0.08_95)] dark:via-[oklch(90%_0.06_95)] dark:to-[oklch(85%_0.08_95)] border-2 border-amber-600 dark:border-[oklch(80%_0.07_95)] hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 dark:hover:from-[oklch(82%_0.08_95)] dark:hover:via-[oklch(88%_0.06_95)] dark:hover:to-[oklch(82%_0.08_95)] text-white dark:text-background font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Link href="/demo">Watch Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}