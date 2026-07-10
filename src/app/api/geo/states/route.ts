import { NextRequest, NextResponse } from "next/server";
import { Country, State } from "country-state-city";

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

  const isoCode = countryIsoByName.get(countryName.toLowerCase());
  if (!isoCode) return NextResponse.json({ states: [] });

  return NextResponse.json({ states: getStatesForCountry(isoCode) });
}
