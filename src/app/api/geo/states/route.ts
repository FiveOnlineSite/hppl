import { NextRequest, NextResponse } from "next/server";
import { Country, State } from "country-state-city";
import { getCustomStateNames, mergeUniqueSorted } from "@/backend/services/locationMaster";

const countryIsoByName = new Map(
  Country.getAllCountries().map((c) => [c.name.toLowerCase(), c.isoCode]),
);

const stateCache = new Map<string, string[]>();

function getStatesForCountry(isoCode: string) {
  const cached = stateCache.get(isoCode);
  if (cached) return cached;
  const names = Array.from(new Set(State.getStatesOfCountry(isoCode)?.map((s) => s.name) ?? [])).sort(
    (a, b) => a.localeCompare(b),
  );
  stateCache.set(isoCode, names);
  return names;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const countryName = (searchParams.get("country") ?? "").trim();
  if (!countryName) return NextResponse.json({ states: [] });

  const isoCode = countryIsoByName.get(countryName.toLowerCase());
  const libraryStates = isoCode ? getStatesForCountry(isoCode) : [];

  // Admin-added states are merged in so a country the library doesn't cover
  // (or a state it's missing) still shows up on the form.
  let custom: string[] = [];
  try {
    custom = await getCustomStateNames(countryName);
  } catch (error) {
    console.error("[Geo] Failed to load custom states:", error);
  }

  return NextResponse.json({ states: mergeUniqueSorted(libraryStates, custom) });
}
