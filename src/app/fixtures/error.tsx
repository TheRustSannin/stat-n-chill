'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-destructive/10 text-destructive p-6 rounded-xl mb-8">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
          <p className="mb-4">We couldn't load the fixtures. This might be a temporary issue.</p>
          <details className="text-left bg-background p-4 rounded-lg mb-4">
            <summary className="cursor-pointer font-medium">Error details</summary>
            <pre className="mt-2 text-sm overflow-auto">{error.message}</pre>
          </details>
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Need immediate help?</h3>
          <p className="text-muted-foreground mb-4">
            Contact our support team or check our status page for ongoing issues.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent transition-colors">
              Contact Support
            </button>
            <button className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent transition-colors">
              Status Page
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}