export function pickStrings<T extends string>(
  data: Record<string, unknown>,
  fields: readonly T[]
): Partial<Record<T, string>> {
  const result: Partial<Record<T, string>> = {};
  for (const field of fields) {
    const value = data[field];
    if (typeof value === "string") {
      result[field] = value;
    }
  }
  return result;
}
