export interface WeatherLocation {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  localtime: string
}

export interface CurrentWeather {
  temp_c: number
  temp_f: number
  condition: {
    text: string
    icon: string
    code: number
  }
  wind_kph: number
  wind_dir: string
  humidity: number
  feelslike_c: number
  feelslike_f: number
  uv: number
}

export interface ForecastDay {
  date: string
  day: {
    maxtemp_c: number
    maxtemp_f: number
    mintemp_c: number
    mintemp_f: number
    avgtemp_c: number
    avgtemp_f: number
    condition: {
      text: string
      icon: string
      code: number
    }
    daily_chance_of_rain: number
    uv: number
  }
  hour: Array<{
    time: string
    temp_c: number
    temp_f: number
    condition: {
      text: string
      icon: string
      code: number
    }
  }>
}

export interface WeatherData {
  location: WeatherLocation
  current: CurrentWeather
  forecast?: {
    forecastday: ForecastDay[]
  }
}

export interface SearchResult {
  id: number
  name: string
  region: string
  country: string
  lat: number
  lon: number
  url: string
}

