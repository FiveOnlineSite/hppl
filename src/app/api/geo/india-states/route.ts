import { NextResponse } from "next/server";
import { INDIAN_STATES } from "@/lib/formOptions";
import { getCustomStateNames, INDIA, mergeUniqueSorted } from "@/backend/services/locationMaster";

export async function GET() {
  let custom: string[] = [];
  try {
    custom = await getCustomStateNames(INDIA);
  } catch (error) {
    console.error("[Geo] Failed to load custom India states:", error);
  }
  return NextResponse.json({ states: mergeUniqueSorted(INDIAN_STATES, custom) });
}
