export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="fixed w-full bg-card/80 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="w-32 h-8 bg-muted/20 animate-pulse rounded" />
            <div className="flex items-center gap-4">
              <div className="w-24 h-6 bg-muted/20 animate-pulse rounded" />
              <div className="w-24 h-6 bg-muted/20 animate-pulse rounded" />
              <div className="w-24 h-6 bg-muted/20 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-32 pb-20 text-center">
          <div className="w-2/3 h-16 bg-muted/20 animate-pulse rounded mx-auto mb-6" />
          <div className="w-1/2 h-8 bg-muted/20 animate-pulse rounded mx-auto mb-8" />
          <div className="flex justify-center gap-4">
            <div className="w-32 h-12 bg-muted/20 animate-pulse rounded" />
            <div className="w-32 h-12 bg-muted/20 animate-pulse rounded" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-card rounded-lg p-6">
              <div className="w-12 h-12 bg-muted/20 animate-pulse rounded-lg mb-4" />
              <div className="w-2/3 h-6 bg-muted/20 animate-pulse rounded mb-2" />
              <div className="w-full h-4 bg-muted/20 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
