import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ForecastDay } from "@/types/weather"
import Image from "next/image"

interface ForecastCardProps {
  day: ForecastDay
  title: string
  isToday?: boolean
}

export default function ForecastCard({ day, title, isToday = false }: ForecastCardProps) {
  // Format date to display as "Monday, June 1"
  const formattedDate = new Date(day.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  return (
    <Card className={isToday ? "border-primary" : ""}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{formattedDate}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <Image
            src={`https:${day.day.condition.icon}`}
            alt={day.day.condition.text}
            width={64}
            height={64}
            className="mr-2"
          />
          <div>
            <p className="text-2xl font-bold">{Math.round(day.day.avgtemp_c)}°C</p>
            <p className="text-sm text-muted-foreground">{day.day.condition.text}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">High</p>
            <p className="font-medium">{Math.round(day.day.maxtemp_c)}°C</p>
          </div>
          <div>
            <p className="text-muted-foreground">Low</p>
            <p className="font-medium">{Math.round(day.day.mintemp_c)}°C</p>
          </div>
          <div>
            <p className="text-muted-foreground">Rain Chance</p>
            <p className="font-medium">{day.day.daily_chance_of_rain}%</p>
          </div>
          <div>
            <p className="text-muted-foreground">UV Index</p>
            <p className="font-medium">{day.day.uv}</p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Hourly Forecast</h4>
          <div className="flex overflow-x-auto pb-2 gap-3">
            {day.hour
              .filter((_, index) => index % 3 === 0) // Show every 3 hours
              .map((hour, index) => {
                const hourTime = new Date(hour.time).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  hour12: true,
                })

                return (
                  <div key={index} className="flex flex-col items-center min-w-[60px]">
                    <span className="text-xs text-muted-foreground">{hourTime}</span>
                    <Image src={`https:${hour.condition.icon}`} alt={hour.condition.text} width={40} height={40} />
                    <span className="text-sm font-medium">{Math.round(hour.temp_c)}°C</span>
                  </div>
                )
              })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
