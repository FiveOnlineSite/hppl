import { City, Country, State } from "country-state-city";

const INDIA = "IN";

function byName<T extends { name: string }>(entries: T[], name: string) {
  return entries.find((entry) => entry.name.toLowerCase() === name.toLowerCase());
}

function sortedNames<T extends { name: string }>(entries: T[]) {
  return entries.map((entry) => entry.name).sort((a, b) => a.localeCompare(b));
}

// Merge admin-added names (from the backend master data) into a base
// (library) list, de-duplicating case-insensitively and keeping a stable
// alphabetical order. The base spelling wins when the two only differ by case.
function mergeUniqueSorted(base: string[], extra: string[]): string[] {
  const seen = new Map<string, string>();
  for (const value of [...base, ...extra]) {
    const name = value.trim();
    if (!name) continue;
    const key = name.toLowerCase();
    if (!seen.has(key)) seen.set(key, name);
  }
  return Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
}

async function fetchPublicNames(path: string): Promise<string[]> {
  if (!process.env.API_URL) return [];

  try {
    const res = await fetch(`${process.env.API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return [];
    const body = await res.json();
    return Array.isArray(body.data) ? body.data : [];
  } catch (error) {
    console.error(`[geo] Failed to fetch ${path}:`, error);
    return [];
  }
}

export async function getCustomIndianStateNames(): Promise<string[]> {
  return fetchPublicNames("/api/states/public");
}

export async function getCustomIndianCityNames(stateName: string): Promise<string[]> {
  const params = new URLSearchParams({ state: stateName });
  return fetchPublicNames(`/api/cities/public?${params.toString()}`);
}

export function getAllCountryNames() {
  return sortedNames(Country.getAllCountries());
}

export function getIndianStateNames() {
  return sortedNames(State.getStatesOfCountry(INDIA));
}

export function getIndianCityNames(stateName: string) {
  const state = byName(State.getStatesOfCountry(INDIA), stateName);
  return state ? sortedNames(City.getCitiesOfState(INDIA, state.isoCode)) : [];
}

// Combines the static country-state-city package data with any states/cities
// an admin has added in the backend master data.
export async function getIndianStateNamesWithCustom(): Promise<string[]> {
  const custom = await getCustomIndianStateNames();
  return mergeUniqueSorted(getIndianStateNames(), custom);
}

export async function getIndianCityNamesWithCustom(stateName: string): Promise<string[]> {
  const custom = await getCustomIndianCityNames(stateName);
  return mergeUniqueSorted(getIndianCityNames(stateName), custom);
}

export function getStateNamesForCountry(countryName: string) {
  const country = byName(Country.getAllCountries(), countryName);
  return country ? sortedNames(State.getStatesOfCountry(country.isoCode)) : [];
}

export function getCityNamesForCountry(countryName: string, stateName?: string) {
  const country = byName(Country.getAllCountries(), countryName);
  if (!country) return [];

  if (!stateName) {
    return sortedNames(City.getCitiesOfCountry(country.isoCode) ?? []);
  }

  const state = byName(State.getStatesOfCountry(country.isoCode), stateName);
  return state ? sortedNames(City.getCitiesOfState(country.isoCode, state.isoCode)) : [];
}
