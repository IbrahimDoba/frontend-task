import { searchLocations } from "@/lib/weather-api"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const data = await searchLocations(query)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error searching locations:", error)
    return NextResponse.json({ error: "Failed to search locations" }, { status: 500 })
  }
}
