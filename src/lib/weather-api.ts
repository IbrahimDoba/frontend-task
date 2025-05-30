import { SearchResult, WeatherData } from "../types/weather"

const API_KEY = process.env.WEATHERAPI_KEY
const BASE_URL = "https://api.weatherapi.com/v1"

export async function getCurrentWeather(location: string): Promise<WeatherData> {
  const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=no`)

  if (!response.ok) {
    throw new Error("Failed to fetch weather data")
  }

  return response.json()
}

export async function getForecast(location: string, days = 3): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=${days}&aqi=no&alerts=no`,
  )

  if (!response.ok) {
    throw new Error("Failed to fetch forecast data")
  }

  return response.json()
}

export async function getHistory(location: string, date: string): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/history.json?key=${API_KEY}&q=${encodeURIComponent(location)}&dt=${date}&aqi=no`,
  )

  if (!response.ok) {
    throw new Error("Failed to fetch historical data")
  }

  return response.json()
}

export async function searchLocations(query: string): Promise<SearchResult[]> {
  if (!query || query.length < 3) return []

  const response = await fetch(`${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`)

  if (!response.ok) {
    throw new Error("Failed to search locations")
  }

  return response.json()
}
