"use client";

import { useState } from "react";
import { FormInput, FormRadioGroup, FormSection, FormTextarea } from "@/components/form/FormField";
import { StateCityFields } from "@/components/form/GeoFields";
import { FIRM_TYPE_OPTIONS } from "@/lib/formOptions";

const DOB_MAX = new Date().toISOString().split("T")[0];
const YEAR_PATTERN = "[0-9]{4}";
const YEAR_TITLE = "Enter a 4-digit year";

export function DistributorCompanyAndPartnerFields() {
  const [firmType, setFirmType] = useState("");
  return (
    <>
      <FormSection title="Company Information">
        <FormInput label="Company Name" name="company_name" required />
        <FormInput label="Company Email Address" name="company_email" type="email" required />
          <FormInput label="Firm establishment year" name="year_of_establishment" inputMode="numeric"
            pattern={YEAR_PATTERN}
            title={YEAR_TITLE}
            placeholder="e.g. 2015"
            type="number" min="1900" max={new Date().getFullYear()}
            required />
<FormRadioGroup
          label="Firm Type"
          name="firm_type"
          options={FIRM_TYPE_OPTIONS}
          onValueChange={setFirmType}
        />
        <FormTextarea label="Company Address" name="company_address" required />
        <StateCityFields
          stateName="company_state"
          stateLabel="Company Address State"
          cityName="company_city"
          cityLabel="Company Address City"
          required
        />
        <FormInput
          label="Company Pin Code"
          name="company_pincode"
          pattern="[0-9]{6}"
          title="Enter a valid 6-digit PIN code"
        />

        
      </FormSection>

      {firmType === "Partnership" && (
        <FormSection title="Partner Information (Optional)">
          <FormInput label="Partner First Name" name="partner_first_name" />
          <FormInput label="Partner Middle Name" name="partner_middle_name" />
          <FormInput label="Partner Last Name" name="partner_last_name" />
          <FormInput label="Partner Date of Birth" name="partner_dob" type="date" max={DOB_MAX} />
          <FormInput
            label="Partner Mobile Number"
            name="partner_mobile"
            type="tel"
            pattern="[6-9][0-9]{9}"
            title="Enter a valid 10-digit mobile number"
          />
          <FormInput label="Partner Email Address" name="partner_email" type="email" />
          <FormTextarea label="Partner Current Address" name="partner_address" />
          <StateCityFields
            stateName="partner_state"
            stateLabel="Partner Address State"
            cityName="partner_city"
            cityLabel="Partner Address City"
          />
          <FormInput
            label="Partner Pin Code"
            name="partner_pincode"
            pattern="[0-9]{6}"
            title="Enter a valid 6-digit PIN code"
          />
        </FormSection>
      )}
    </>
  );
}
