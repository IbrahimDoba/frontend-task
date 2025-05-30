import { getCurrentWeather } from "@/lib/weather-api"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get("location")

  if (!location) {
    return NextResponse.json({ error: "Location parameter is required" }, { status: 400 })
  }

  try {
    const data = await getCurrentWeather(location)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching current weather data:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}
