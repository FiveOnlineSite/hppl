import { NextRequest, NextResponse } from "next/server";
import { City, Country, State } from "country-state-city";

const CITY_LIMIT = 3000;
const NOT_LISTED = "not listed";

const countryIsoByName = new Map(
  Country.getAllCountries().map((c) => [c.name.toLowerCase(), c.isoCode]),
);

const stateIsoByCountry = new Map<string, Map<string, string>>();
const cityCache = new Map<string, string[]>();

function getStateIso(countryIso: string, stateName: string) {
  let map = stateIsoByCountry.get(countryIso);
  if (!map) {
    map = new Map(State.getStatesOfCountry(countryIso).map((s) => [s.name.toLowerCase(), s.isoCode]));
    stateIsoByCountry.set(countryIso, map);
  }
  return map.get(stateName.toLowerCase());
}

function getCitiesForCountry(countryIso: string) {
  const cached = cityCache.get(countryIso);
  if (cached) return cached;
  const names = Array.from(new Set(City.getCitiesOfCountry(countryIso)?.map((c) => c.name) ?? [])).sort(
    (a, b) => a.localeCompare(b),
  );
  cityCache.set(countryIso, names);
  return names;
}

function getCitiesForState(countryIso: string, stateIso: string) {
  const key = `${countryIso}|${stateIso}`;
  const cached = cityCache.get(key);
  if (cached) return cached;
  const names = Array.from(
    new Set(City.getCitiesOfState(countryIso, stateIso)?.map((c) => c.name) ?? []),
  ).sort((a, b) => a.localeCompare(b));
  cityCache.set(key, names);
  return names;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const countryName = (searchParams.get("country") ?? "").trim();
  const stateName = (searchParams.get("state") ?? "").trim();

  const countryIso = countryIsoByName.get(countryName.toLowerCase());
  if (!countryIso) return NextResponse.json({ cities: [] });

  if (stateName && stateName.toLowerCase() !== NOT_LISTED) {
    const stateIso = getStateIso(countryIso, stateName);
    if (stateIso) {
      return NextResponse.json({ cities: getCitiesForState(countryIso, stateIso).slice(0, CITY_LIMIT) });
    }
  }

  return NextResponse.json({ cities: getCitiesForCountry(countryIso).slice(0, CITY_LIMIT) });
}
