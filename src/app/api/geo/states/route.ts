import { NextRequest, NextResponse } from "next/server";
import { getStateNamesForCountry } from "@/lib/geo";

export function GET(request: NextRequest) {
  const country = request.nextUrl.searchParams.get("country");
  if (!country) return NextResponse.json({ states: [] });

  return NextResponse.json({ states: getStateNamesForCountry(country) });
}
