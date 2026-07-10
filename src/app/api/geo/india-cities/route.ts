import { NextRequest, NextResponse } from "next/server";
import { City, State } from "country-state-city";

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
  const rawStateName = (searchParams.get("state") ?? "").trim().toLowerCase();
  const normalized = STATE_NAME_OVERRIDES[rawStateName] ?? rawStateName;

  const isoCode = stateIsoByName.get(normalized);
  if (!isoCode) return NextResponse.json({ cities: [] });

  const cities = getCitiesForState(isoCode).slice(0, CITY_LIMIT);
  return NextResponse.json({ cities });
}
