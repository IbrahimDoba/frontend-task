import { getForecast } from "@/lib/weather-api"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get("location")
  const days = searchParams.get("days") || "3"

  if (!location) {
    return NextResponse.json({ error: "Location parameter is required" }, { status: 400 })
  }

  try {
    const data = await getForecast(location, Number.parseInt(days))
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching forecast data:", error)
    return NextResponse.json({ error: "Failed to fetch forecast data" }, { status: 500 })
  }
}
