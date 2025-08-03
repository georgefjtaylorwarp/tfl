import { NextResponse } from "next/server";
import { getDepartures } from "./helper";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stationId = searchParams.get("stationId");
  const line = searchParams.get("line");
  console.log(stationId);
  console.log(line);

  if (!stationId || !line) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  const departures = await getDepartures(stationId);
  return NextResponse.json(departures);
}
