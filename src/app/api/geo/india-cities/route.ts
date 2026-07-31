import { NextRequest, NextResponse } from "next/server";
import { City, State } from "country-state-city";
import { getCustomCityNames, INDIA, mergeUniqueSorted } from "@/backend/services/locationMaster";

const CITY_LIMIT = 2000;

const STATE_NAME_OVERRIDES: Record<string, string> = {
  "delhi (nct)": "delhi",
  "jammu & kashmir": "jammu and kashmir",
};

const stateIsoByName = new Map(
  State.getStatesOfCountry("IN").map((s) => [s.name.toLowerCase(), s.isoCode]),
);

const cityCache = new Map<string, string[]>();

function getCitiesForState(isoCode: string) {
  const cached = cityCache.get(isoCode);
  if (cached) return cached;
  const names = Array.from(
    new Set(City.getCitiesOfState("IN", isoCode)?.map((c) => c.name) ?? []),
  ).sort((a, b) => a.localeCompare(b));
  cityCache.set(isoCode, names);
  return names;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const stateName = (searchParams.get("state") ?? "").trim();
  if (!stateName) return NextResponse.json({ cities: [] });

  const normalized = STATE_NAME_OVERRIDES[stateName.toLowerCase()] ?? stateName.toLowerCase();
  const isoCode = stateIsoByName.get(normalized);
  const libraryCities = isoCode ? getCitiesForState(isoCode).slice(0, CITY_LIMIT) : [];

  // Merge admin-added cities for this state (keyed by the state's display name).
  let custom: string[] = [];
  try {
    custom = await getCustomCityNames(INDIA, stateName);
  } catch (error) {
    console.error("[Geo] Failed to load custom India cities:", error);
  }

  return NextResponse.json({ cities: mergeUniqueSorted(libraryCities, custom) });
}
