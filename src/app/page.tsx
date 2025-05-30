import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { POPULAR_CITIES_WITH_WEATHER } from "@/lib/constants";
import { WeatherCardProps } from "@/types";

function WeatherCard({ cityName, weather }: WeatherCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{cityName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold">{weather.temperature}°C</div>
          <div className="text-sm text-muted-foreground">{weather.condition}</div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Humidity: {weather.humidity}%</span>
            <span>Wind: {weather.windSpeed} km/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PopularCitiesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {POPULAR_CITIES_WITH_WEATHER.map((cityData) => (
        <WeatherCard 
          key={cityData.name} 
          cityName={cityData.name} 
          weather={cityData.weather} 
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Weather Forecast</h1>
        <p className="text-muted-foreground">Check the weather in cities around the world</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Popular Cities</CardTitle>
          <CardDescription>Weather conditions in major cities around the world</CardDescription>
        </CardHeader>
        <CardContent>
          <PopularCitiesGrid />
        </CardContent>
      </Card>
    </div>
  );
}