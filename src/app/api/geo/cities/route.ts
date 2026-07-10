import { NextRequest, NextResponse } from "next/server";
import { City, Country } from "country-state-city";

const CITY_LIMIT = 3000;

const countryIsoByName = new Map(
  Country.getAllCountries().map((c) => [c.name.toLowerCase(), c.isoCode]),
);

const cityCache = new Map<string, string[]>();

function getCitiesForCountry(isoCode: string) {
  const cached = cityCache.get(isoCode);
  if (cached) return cached;
  const names = Array.from(new Set(City.getCitiesOfCountry(isoCode)?.map((c) => c.name) ?? [])).sort(
    (a, b) => a.localeCompare(b),
  );
  cityCache.set(isoCode, names);
  return names;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const countryName = (searchParams.get("country") ?? "").trim();

  const isoCode = countryIsoByName.get(countryName.toLowerCase());
  if (!isoCode) return NextResponse.json({ cities: [] });

  const cities = getCitiesForCountry(isoCode).slice(0, CITY_LIMIT);
  return NextResponse.json({ cities });
}
