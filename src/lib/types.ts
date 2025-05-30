export interface WeatherCardProps {
  cityName: string;
  weather: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
  };
}