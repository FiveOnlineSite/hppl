import { NextRequest, NextResponse } from "next/server";
import { getCityNamesForCountry } from "@/lib/geo";

export function GET(request: NextRequest) {
  const country = request.nextUrl.searchParams.get("country");
  if (!country) return NextResponse.json({ cities: [] });

  const state = request.nextUrl.searchParams.get("state") ?? undefined;
  return NextResponse.json({ cities: getCityNamesForCountry(country, state) });
}
