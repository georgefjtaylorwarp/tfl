import { NextResponse } from "next/server";
import { getStations } from "./helper";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const line = searchParams.get("line");
  if (!line) {
    return NextResponse.json({ error: "Line is required" }, { status: 400 });
  }

  const stations = await getStations(line);
  return NextResponse.json(stations);
}
