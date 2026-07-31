import "server-only";
import { connectToDatabase } from "@/backend/db";
import {
  LocationCountryModel,
  LocationStateModel,
  LocationCityModel,
} from "@/backend/models/Location";

export const INDIA = "India";

export type LocationRecord = {
  id: string;
  name: string;
  country?: string;
  state?: string;
  createdAt?: string;
};

export type CreateResult =
  | { ok: true; item: LocationRecord }
  | { ok: false; error: string };

function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { code?: number }).code === 11000
  );
}

/**
 * Merge admin-added names into a base (library) list, de-duplicating
 * case-insensitively and keeping a stable alphabetical order. The base
 * spelling wins when the two only differ by case.
 */
export function mergeUniqueSorted(base: string[], extra: string[]): string[] {
  const seen = new Map<string, string>();
  for (const value of [...base, ...extra]) {
    const name = value.trim();
    if (!name) continue;
    const key = name.toLowerCase();
    if (!seen.has(key)) seen.set(key, name);
  }
  return Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
}

// ---------------------------------------------------------------------------
// Admin CRUD
// ---------------------------------------------------------------------------

function toRecord(doc: {
  _id: unknown;
  name: string;
  country?: string;
  state?: string;
  createdAt?: Date;
}): LocationRecord {
  return {
    id: String(doc._id),
    name: doc.name,
    country: doc.country,
    state: doc.state,
    createdAt: doc.createdAt ? doc.createdAt.toISOString() : undefined,
  };
}

export async function listCountries(): Promise<LocationRecord[]> {
  await connectToDatabase();
  const docs = await LocationCountryModel.find().sort({ name: 1 }).lean();
  return docs.map(toRecord);
}

export async function listStates(country?: string): Promise<LocationRecord[]> {
  await connectToDatabase();
  const filter = country ? { country } : {};
  const docs = await LocationStateModel.find(filter)
    .collation({ locale: "en", strength: 2 })
    .sort({ country: 1, name: 1 })
    .lean();
  return docs.map(toRecord);
}

export async function listCities(country?: string, state?: string): Promise<LocationRecord[]> {
  await connectToDatabase();
  const filter: Record<string, string> = {};
  if (country) filter.country = country;
  if (state) filter.state = state;
  const docs = await LocationCityModel.find(filter)
    .collation({ locale: "en", strength: 2 })
    .sort({ country: 1, state: 1, name: 1 })
    .lean();
  return docs.map(toRecord);
}

export async function createCountry(name: string): Promise<CreateResult> {
  await connectToDatabase();
  try {
    const doc = await LocationCountryModel.create({ name });
    return { ok: true, item: toRecord(doc) };
  } catch (error) {
    if (isDuplicateKeyError(error)) return { ok: false, error: "That country already exists." };
    throw error;
  }
}

export async function createState(country: string, name: string): Promise<CreateResult> {
  await connectToDatabase();
  try {
    const doc = await LocationStateModel.create({ country, name });
    return { ok: true, item: toRecord(doc) };
  } catch (error) {
    if (isDuplicateKeyError(error))
      return { ok: false, error: "That state already exists for this country." };
    throw error;
  }
}

export async function createCity(
  country: string,
  state: string,
  name: string
): Promise<CreateResult> {
  await connectToDatabase();
  try {
    const doc = await LocationCityModel.create({ country, state, name });
    return { ok: true, item: toRecord(doc) };
  } catch (error) {
    if (isDuplicateKeyError(error))
      return { ok: false, error: "That city already exists for this state." };
    throw error;
  }
}

export async function deleteCountry(id: string): Promise<boolean> {
  await connectToDatabase();
  const res = await LocationCountryModel.findByIdAndDelete(id);
  return Boolean(res);
}

export async function deleteState(id: string): Promise<boolean> {
  await connectToDatabase();
  const res = await LocationStateModel.findByIdAndDelete(id);
  return Boolean(res);
}

export async function deleteCity(id: string): Promise<boolean> {
  await connectToDatabase();
  const res = await LocationCityModel.findByIdAndDelete(id);
  return Boolean(res);
}

// ---------------------------------------------------------------------------
// Custom name getters (used to merge into the public geo dropdowns)
// ---------------------------------------------------------------------------

export async function getCustomCountryNames(): Promise<string[]> {
  await connectToDatabase();
  const docs = await LocationCountryModel.find().select("name").lean();
  return docs.map((d) => d.name as string);
}

export async function getCustomStateNames(country: string): Promise<string[]> {
  await connectToDatabase();
  const docs = await LocationStateModel.find({ country })
    .collation({ locale: "en", strength: 2 })
    .select("name")
    .lean();
  return docs.map((d) => d.name as string);
}

export async function getCustomCityNames(country: string, state: string): Promise<string[]> {
  await connectToDatabase();
  const docs = await LocationCityModel.find({ country, state })
    .collation({ locale: "en", strength: 2 })
    .select("name")
    .lean();
  return docs.map((d) => d.name as string);
}
