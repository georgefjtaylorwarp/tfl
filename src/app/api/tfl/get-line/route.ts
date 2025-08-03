import { NextResponse } from "next/server";
import { getLine } from "./helper";

export async function GET() {
  const line = await getLine();
  return NextResponse.json(line);
}
