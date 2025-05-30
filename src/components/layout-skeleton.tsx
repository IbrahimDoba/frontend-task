import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function PopularCitiesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <Skeleton className="h-6 w-24 mb-2" />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Skeleton className="h-16 w-16 rounded-full mr-2" />
                <div>
                  <Skeleton className="h-8 w-16 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="text-right">
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}