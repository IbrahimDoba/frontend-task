import { Card, CardContent } from "@/components/ui/card"
import type { CurrentWeather } from "@/types/weather"
import Image from "next/image"
import Link from "next/link"

interface WeatherCardProps {
  cityName: string
  weather: CurrentWeather
  className?: string
}

export default function WeatherCard({ cityName, weather, className = "" }: WeatherCardProps) {
  return (
    <Link href={`/city/${encodeURIComponent(cityName)}`}>
      <Card className={`overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
        <CardContent className="p-0">
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1">{cityName}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src={`https:${weather.condition.icon}`}
                  alt={weather.condition.text}
                  width={64}
                  height={64}
                  className="mr-2"
                />
                <div>
                  <p className="text-2xl font-bold">{Math.round(weather.temp_c)}°C</p>
                  <p className="text-sm text-muted-foreground">{weather.condition.text}</p>
                </div>
              </div>
              <div className="text-right text-sm">
                <p>Humidity: {weather.humidity}%</p>
                <p>Wind: {weather.wind_kph} km/h</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
