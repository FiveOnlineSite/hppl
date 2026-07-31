import { Schema, model, models, type InferSchemaType } from "mongoose";

// Case-insensitive uniqueness: the collation on each unique index makes
// "Mumbai" and "mumbai" collide, so an admin can't add the same place twice
// with a different casing.
const CI_COLLATION = { locale: "en", strength: 2 } as const;

const countrySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);
countrySchema.index({ name: 1 }, { unique: true, collation: CI_COLLATION });

const stateSchema = new Schema(
  {
    country: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);
stateSchema.index({ country: 1, name: 1 }, { unique: true, collation: CI_COLLATION });

const citySchema = new Schema(
  {
    country: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);
citySchema.index({ country: 1, state: 1, name: 1 }, { unique: true, collation: CI_COLLATION });

export type LocationCountry = InferSchemaType<typeof countrySchema>;
export type LocationState = InferSchemaType<typeof stateSchema>;
export type LocationCity = InferSchemaType<typeof citySchema>;

export const LocationCountryModel =
  models.LocationCountry || model("LocationCountry", countrySchema);
export const LocationStateModel = models.LocationState || model("LocationState", stateSchema);
export const LocationCityModel = models.LocationCity || model("LocationCity", citySchema);
