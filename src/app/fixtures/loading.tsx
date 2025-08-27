export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <div className="h-10 bg-muted rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
        <div className="h-5 bg-muted rounded-lg w-96 mx-auto animate-pulse"></div>
      </div>
      
      <div className="max-w-6xl mx-auto">
        {/* Filter tabs loading */}
        <div className="flex justify-center space-x-4 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-11 bg-muted rounded-lg w-28 animate-pulse"></div>
          ))}
        </div>
        
        {/* Stats bar loading */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-card rounded-xl border border-border animate-pulse"></div>
          ))}
        </div>
        
        {/* Table loading */}
        <div className="shadow-lg rounded-xl overflow-hidden bg-card border border-border">
          <div className="min-h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading fixtures...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}