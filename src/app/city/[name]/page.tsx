import { Suspense } from "react";
import { getForecast, getHistory, getCurrentWeather } from "@/lib/weather-api";
import SearchBar from "@/components/search-bar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import ForecastCard from "@/components/forcast-card";

interface CityPageProps {
  params: Promise<{
    name: string;
  }>;
}

export async function generateMetadata({ params }: CityPageProps) {
  const resolvedParams = await params;
  const cityName = decodeURIComponent(resolvedParams.name);

  try {
    const data = await getCurrentWeather(cityName);
    return {
      title: `Weather in ${data.location.name}, ${data.location.country}`,
      description: `Current weather conditions and forecast for ${data.location.name}, ${data.location.country}`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: `Weather in ${cityName}`,
      description: `Weather forecast for ${cityName}`,
    };
  }
}

async function CityForecast({ cityName }: { cityName: string }) {
  try {
    // Get yesterday's date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    // Fetch forecast (includes today and tomorrow)
    const forecastData = await getForecast(cityName, 2);

    // Fetch historical data for yesterday
    const historyData = await getHistory(cityName, yesterdayStr);

    const todayForecast = forecastData.forecast?.forecastday[0];
    const tomorrowForecast = forecastData.forecast?.forecastday[1];
    const yesterdayForecast = historyData.forecast?.forecastday[0];

    if (!todayForecast || !tomorrowForecast || !yesterdayForecast) {
      throw new Error("Failed to fetch complete forecast data");
    }

    return (
      <div>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                {forecastData.location.name}
              </h1>
              <p className="text-muted-foreground">
                {forecastData.location.region}, {forecastData.location.country}
              </p>
            </div>
            <div className="flex items-center">
              <Image
                src={`https:${forecastData.current.condition.icon}`}
                alt={forecastData.current.condition.text}
                width={64}
                height={64}
                className="mr-2"
              />
              <div>
                <p className="text-3xl font-bold">
                  {Math.round(forecastData.current.temp_c)}°C
                </p>
                <p className="text-sm text-muted-foreground">
                  {forecastData.current.condition.text}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div>
              <p className="text-sm text-muted-foreground">Feels Like</p>
              <p className="font-medium">
                {Math.round(forecastData.current.feelslike_c)}°C
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-medium">{forecastData.current.humidity}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="font-medium">
                {forecastData.current.wind_kph} km/h{" "}
                {forecastData.current.wind_dir}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">UV Index</p>
              <p className="font-medium">{forecastData.current.uv}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ForecastCard day={yesterdayForecast} title="Yesterday" />
          <ForecastCard day={todayForecast} title="Today" isToday={true} />
          <ForecastCard day={tomorrowForecast} title="Tomorrow" />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching city forecast:", error);
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Failed to load weather data. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }
}

function CityForecastSkeleton() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-16 w-16 rounded-full mr-2" />
            <div>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-6 w-12" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-24 mb-1" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <Skeleton className="h-16 w-16 rounded-full mr-2" />
                <div>
                  <Skeleton className="h-8 w-16 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j}>
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-5 w-8" />
                  </div>
                ))}
              </div>

              <Skeleton className="h-4 w-32 mt-4 mb-2" />
              <div className="flex gap-3">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="flex flex-col items-center">
                    <Skeleton className="h-3 w-10 mb-1" />
                    <Skeleton className="h-10 w-10 rounded-full mb-1" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default async function CityPage({ params }: CityPageProps) {
  const resolvedParams = await params;
  const cityName = decodeURIComponent(resolvedParams.name);

  return (
    <div className="space-y-6">
      <div className="max-w-md mx-auto">
        <SearchBar />
      </div>

      <Suspense fallback={<CityForecastSkeleton />}>
        <CityForecast cityName={cityName} />
      </Suspense>
    </div>
  );
}
