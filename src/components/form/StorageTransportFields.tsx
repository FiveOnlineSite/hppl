"use client";

import { useState } from "react";
import { FormInput, FormRadioGroup } from "@/components/form/FormField";

export function StorageTransportFields() {
  const [storageFacility, setStorageFacility] = useState("");
  const [transportFacility, setTransportFacility] = useState("");

  return (
    <>
      <FormRadioGroup
        label="Storage Facility Available"
        name="storage_facility_availability"
        options={["Yes", "No"]}
        onValueChange={setStorageFacility}
      />
      {storageFacility === "Yes" && (
        <FormInput label="Godown Size (Sq.ft.)" name="godown_size" />
      )}

      <FormRadioGroup
        label="Transport Facilities Available"
        name="transport_facility_availability"
        options={["Yes", "No"]}
        onValueChange={setTransportFacility}
      />
      {transportFacility === "Yes" && (
        <>
          <FormInput label="Vehicle's Model" name="vehicle_model" />
          <FormInput label="Number of Vehicles" name=" no_of_vehicles" type="number" min={0} />
        </>
      )}
    </>
  );
}
