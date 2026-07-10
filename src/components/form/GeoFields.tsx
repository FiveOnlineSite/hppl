"use client";

import { useEffect, useState } from "react";
import { Combobox } from "@/components/form/Combobox";
import { FormSelect } from "@/components/form/FormField";
import { COUNTRIES, INDIAN_STATES } from "@/lib/formOptions";
import { INDIA_DISTRICTS_BY_STATE } from "@/lib/indiaDistricts";

const NOT_LISTED = "Not Listed";

export function StateDistrictFields({
  stateName,
  stateLabel = "State",
  districtName,
  districtLabel = "District",
  required,
}: {
  stateName: string;
  stateLabel?: string;
  districtName: string;
  districtLabel?: string;
  required?: boolean;
}) {
  const [state, setState] = useState("");

  return (
    <>
      <FormSelect
        label={stateLabel}
        name={stateName}
        required={required}
        options={[...INDIAN_STATES, NOT_LISTED]}
        placeholder="Select a state"
        onChange={(e) => setState(e.target.value)}
      />
      <Combobox
        key={state}
        label={districtLabel}
        name={districtName}
        required={required}
        disabled={!state}
        disabledPlaceholder="Select a state first"
        options={INDIA_DISTRICTS_BY_STATE[state] ?? []}
        placeholder="Select or type a district"
      />
    </>
  );
}

export function StateDistrictCityFields({
  stateName,
  stateLabel = "State",
  districtName,
  districtLabel = "District",
  cityName,
  cityLabel = "City",
  required,
}: {
  stateName: string;
  stateLabel?: string;
  districtName: string;
  districtLabel?: string;
  cityName: string;
  cityLabel?: string;
  required?: boolean;
}) {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function handleStateChange(value: string) {
    setState(value);
    setDistrict("");
    setLoading(Boolean(value));
  }

  useEffect(() => {
    if (!state) return;
    let cancelled = false;
    fetch(`/api/geo/india-cities?${new URLSearchParams({ state }).toString()}`)
      .then((res) => (res.ok ? res.json() : { cities: [] }))
      .then((data) => {
        if (!cancelled) setCities(data.cities ?? []);
      })
      .catch(() => {
        if (!cancelled) setCities([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [state]);

  return (
    <>
      <FormSelect
        label={stateLabel}
        name={stateName}
        required={required}
        options={[...INDIAN_STATES, NOT_LISTED]}
        placeholder="Select a state"
        onChange={(e) => handleStateChange(e.target.value)}
      />
      <Combobox
        key={`district-${state}`}
        label={districtLabel}
        name={districtName}
        required={required}
        disabled={!state}
        disabledPlaceholder="Select a state first"
        options={INDIA_DISTRICTS_BY_STATE[state] ?? []}
        placeholder="Select or type a district"
        onValueChange={setDistrict}
      />
      <FormSelect
        key={`city-${district}`}
        label={cityLabel}
        name={cityName}
        required={required}
        disabled={!district || loading}
        options={district ? [...cities, NOT_LISTED] : []}
        placeholder={!district ? "Select a district first" : loading ? "Loading cities…" : "Select a city"}
      />
    </>
  );
}

export function CountryCityFields({
  countryName,
  countryLabel = "Country",
  cityName,
  cityLabel = "City",
  required,
  defaultCountry,
}: {
  countryName: string;
  countryLabel?: string;
  cityName: string;
  cityLabel?: string;
  required?: boolean;
  defaultCountry?: string;
}) {
  const [country, setCountry] = useState(defaultCountry ?? "");
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(Boolean(defaultCountry));

  function handleCountryChange(value: string) {
    setCountry(value);
    setLoading(Boolean(value));
  }

  useEffect(() => {
    if (!country) return;
    let cancelled = false;
    fetch(`/api/geo/cities?${new URLSearchParams({ country }).toString()}`)
      .then((res) => (res.ok ? res.json() : { cities: [] }))
      .then((data) => {
        if (!cancelled) setCities(data.cities ?? []);
      })
      .catch(() => {
        if (!cancelled) setCities([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [country]);

  return (
    <>
      <FormSelect
        label={countryLabel}
        name={countryName}
        required={required}
        defaultValue={defaultCountry}
        options={[...COUNTRIES, NOT_LISTED]}
        placeholder="Select a country"
        onChange={(e) => handleCountryChange(e.target.value)}
      />
      <FormSelect
        key={country}
        label={cityLabel}
        name={cityName}
        required={required}
        disabled={!country || loading}
        options={country ? [...cities, NOT_LISTED] : []}
        placeholder={!country ? "Select a country first" : loading ? "Loading cities…" : "Select a city"}
      />
    </>
  );
}
