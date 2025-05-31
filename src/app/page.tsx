import { Suspense } from "react"
import SearchBar from "@/components/search-bar"
import WeatherCard from "@/components/weather-card"
import { getCurrentWeather } from "@/lib/weather-api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// Popular cities to display on the home page
const POPULAR_CITIES = [
  "Nigeria",
  "Ghana",
  "Chad",
  "Paris",
  "Sydney",
  "Dubai",
  "Singapore",
  "Rome",
  "Cairo",
  "America",
  "New York",
  "Los Angeles",
]

async function PopularCitiesGrid() {
  // Fetch weather data for all popular cities
  const weatherPromises = POPULAR_CITIES.map((city) => getCurrentWeather(city))
  const weatherData = await Promise.all(weatherPromises)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {weatherData.map((data, index) => (
        <WeatherCard key={POPULAR_CITIES[index]} cityName={POPULAR_CITIES[index]} weather={data.current} />
      ))}
    </div>
  )
}

function PopularCitiesSkeleton() {
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

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Weather Forecast</h1>
        <p className="text-muted-foreground">Check the weather in cities around the world</p>
      </div>

      <div className="max-w-md mx-auto">
        <SearchBar />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Popular Cities</CardTitle>
          <CardDescription>Weather conditions in major cities around the world</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<PopularCitiesSkeleton />}>
            <PopularCitiesGrid />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
