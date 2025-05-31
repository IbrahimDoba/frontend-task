import { getHistory } from "@/lib/weather-api"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get("location")
  const date = searchParams.get("date")

  if (!location || !date) {
    return NextResponse.json({ error: "Location and date parameters are required" }, { status: 400 })
  }

  try {
    const data = await getHistory(location, date)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching historical data:", error)
    return NextResponse.json({ error: "Failed to fetch historical data" }, { status: 500 })
  }
}
