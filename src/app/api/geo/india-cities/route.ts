import { NextRequest, NextResponse } from "next/server";
import { getIndianCityNamesWithCustom } from "@/lib/geo";

export async function GET(request: NextRequest) {
  const state = request.nextUrl.searchParams.get("state");
  if (!state) return NextResponse.json({ cities: [] });

  return NextResponse.json({ cities: await getIndianCityNamesWithCustom(state) });
}
