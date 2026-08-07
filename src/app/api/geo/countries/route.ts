import { NextResponse } from "next/server";
import { getAllCountryNames } from "@/lib/geo";

export function GET() {
  return NextResponse.json({ countries: getAllCountryNames() });
}
