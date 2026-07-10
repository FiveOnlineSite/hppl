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
        name="storageFacility"
        options={["Yes", "No"]}
        onValueChange={setStorageFacility}
      />
      {storageFacility === "Yes" && (
        <FormInput label="Godown Size (Sq.ft.)" name="godownSize" />
      )}

      <FormRadioGroup
        label="Transport Facilities Available"
        name="transportFacility"
        options={["Yes", "No"]}
        onValueChange={setTransportFacility}
      />
      {transportFacility === "Yes" && (
        <>
          <FormInput label="Vehicle's Model" name="vehicleModel" />
          <FormInput label="Number of Vehicles" name="vehicleCount" type="number" min={0} />
        </>
      )}
    </>
  );
}
