import { NextResponse } from "next/server";
import { getIndianStateNamesWithCustom } from "@/lib/geo";

export async function GET() {
  return NextResponse.json({ states: await getIndianStateNamesWithCustom() });
}
