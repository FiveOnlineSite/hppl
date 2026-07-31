import { NextResponse } from "next/server";
import { COUNTRIES } from "@/lib/formOptions";
import { getCustomCountryNames, mergeUniqueSorted } from "@/backend/services/locationMaster";

export async function GET() {
  let custom: string[] = [];
  try {
    custom = await getCustomCountryNames();
  } catch (error) {
    console.error("[Geo] Failed to load custom countries:", error);
  }
  return NextResponse.json({ countries: mergeUniqueSorted(COUNTRIES, custom) });
}
