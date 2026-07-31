import { NextRequest, NextResponse } from "next/server";
import { City, Country, State } from "country-state-city";
import { getCustomCityNames, mergeUniqueSorted } from "@/backend/services/locationMaster";

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

  const hasRealState = Boolean(stateName) && stateName.toLowerCase() !== NOT_LISTED;

  // Admin-added cities are keyed by (country, state); only merge them when a
  // concrete state was chosen.
  let custom: string[] = [];
  if (hasRealState) {
    try {
      custom = await getCustomCityNames(countryName, stateName);
    } catch (error) {
      console.error("[Geo] Failed to load custom cities:", error);
    }
  }

  const countryIso = countryIsoByName.get(countryName.toLowerCase());
  let libraryCities: string[] = [];
  if (countryIso) {
    if (hasRealState) {
      const stateIso = getStateIso(countryIso, stateName);
      libraryCities = stateIso
        ? getCitiesForState(countryIso, stateIso)
        : getCitiesForCountry(countryIso);
    } else {
      libraryCities = getCitiesForCountry(countryIso);
    }
  }

  const cities = mergeUniqueSorted(libraryCities.slice(0, CITY_LIMIT), custom);
  return NextResponse.json({ cities });
}
