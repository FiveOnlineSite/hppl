"use client";

import { useEffect, useState } from "react";
import { FormSelect } from "@/components/form/FormField";
import { COUNTRIES, INDIAN_STATES } from "@/lib/formOptions";

const NOT_LISTED = "Not Listed";

export function StateCityFields({
  stateName,
  stateLabel = "State",
  cityName,
  cityLabel = "City",
  required,
}: {
  stateName: string;
  stateLabel?: string;
  cityName: string;
  cityLabel?: string;
  required?: boolean;
}) {
  const [state, setState] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function handleStateChange(value: string) {
    setState(value);
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
      <FormSelect
        key={`city-${state}`}
        label={cityLabel}
        name={cityName}
        required={required}
        disabled={!state || loading}
        options={state ? [...cities, NOT_LISTED] : []}
        placeholder={!state ? "Select a state first" : loading ? "Loading cities…" : "Select a city"}
      />
    </>
  );
}

export function CountryStateCityFields({
  countryName,
  countryLabel = "Country",
  stateName,
  stateLabel = "State",
  cityName,
  cityLabel = "City",
  required,
  defaultCountry,
}: {
  countryName: string;
  countryLabel?: string;
  stateName: string;
  stateLabel?: string;
  cityName: string;
  cityLabel?: string;
  required?: boolean;
  defaultCountry?: string;
}) {
  const [country, setCountry] = useState(defaultCountry ?? "");
  const [state, setState] = useState("");
  const [states, setStates] = useState<string[]>([]);
  const [statesLoading, setStatesLoading] = useState(Boolean(defaultCountry));
  const [cities, setCities] = useState<string[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);

  function handleCountryChange(value: string) {
    setCountry(value);
    setState("");
    setStatesLoading(Boolean(value));
  }

  function handleStateChange(value: string) {
    setState(value);
    setCitiesLoading(Boolean(value));
  }

  useEffect(() => {
    if (!country) return;
    let cancelled = false;
    fetch(`/api/geo/states?${new URLSearchParams({ country }).toString()}`)
      .then((res) => (res.ok ? res.json() : { states: [] }))
      .then((data) => {
        if (!cancelled) setStates(data.states ?? []);
      })
      .catch(() => {
        if (!cancelled) setStates([]);
      })
      .finally(() => {
        if (!cancelled) setStatesLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [country]);

  useEffect(() => {
    if (!country || !state) return;
    let cancelled = false;
    const params = new URLSearchParams({ country });
    if (state !== NOT_LISTED) params.set("state", state);
    fetch(`/api/geo/cities?${params.toString()}`)
      .then((res) => (res.ok ? res.json() : { cities: [] }))
      .then((data) => {
        if (!cancelled) setCities(data.cities ?? []);
      })
      .catch(() => {
        if (!cancelled) setCities([]);
      })
      .finally(() => {
        if (!cancelled) setCitiesLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [country, state]);

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
        key={`state-${country}`}
        label={stateLabel}
        name={stateName}
        required={required}
        disabled={!country || statesLoading}
        options={country ? [...states, NOT_LISTED] : []}
        placeholder={!country ? "Select a country first" : statesLoading ? "Loading states…" : "Select a state"}
        onChange={(e) => handleStateChange(e.target.value)}
      />
      <FormSelect
        key={`city-${state}`}
        label={cityLabel}
        name={cityName}
        required={required}
        disabled={!state || citiesLoading}
        options={state ? [...cities, NOT_LISTED] : []}
        placeholder={!state ? "Select a state first" : citiesLoading ? "Loading cities…" : "Select a city"}
      />
    </>
  );
}
