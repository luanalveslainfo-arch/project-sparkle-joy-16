export function Skeleton({ className }: { className?: string }) {
  return (
    <div 
      className={`animate-pulse bg-zinc-900 rounded-sm ${className}`} 
    />
  );
}

export function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}
