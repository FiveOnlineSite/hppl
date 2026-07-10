"use client";

import { useState } from "react";
import { FormInput, FormRadioGroup, FormSection, FormTextarea } from "@/components/form/FormField";
import { StateDistrictCityFields } from "@/components/form/GeoFields";
import { FIRM_TYPE_OPTIONS } from "@/lib/formOptions";

const DOB_MAX = new Date().toISOString().split("T")[0];

export function DistributorCompanyAndPartnerFields() {
  const [firmType, setFirmType] = useState("");

  return (
    <>
      <FormSection title="Company Information">
        <FormInput label="Company Name" name="companyName" required />
        <FormInput label="Company Email Address" name="companyEmail" type="email" required />
        <FormTextarea label="Company Address" name="companyAddress" required />
        <StateDistrictCityFields
          stateName="companyAddressState"
          stateLabel="Company Address State"
          districtName="companyAddressDistrict"
          districtLabel="Company Address District"
          cityName="companyAddressCity"
          cityLabel="Company Address City"
          required
        />
        <FormInput
          label="Company Pin Code"
          name="companyPinCode"
          pattern="[0-9]{6}"
          title="Enter a valid 6-digit PIN code"
        />
        <FormTextarea label="Educational Details" name="education" required />
        <FormRadioGroup
          label="Firm Type"
          name="firmType"
          options={FIRM_TYPE_OPTIONS}
          onValueChange={setFirmType}
        />
      </FormSection>

      {firmType === "Partnership" && (
        <FormSection title="Partner Information (Optional)">
          <FormInput label="Partner First Name" name="partnerFirstName" />
          <FormInput label="Partner Middle Name" name="partnerMiddleName" />
          <FormInput label="Partner Last Name" name="partnerLastName" />
          <FormInput label="Partner Date of Birth" name="partnerDob" type="date" max={DOB_MAX} />
          <FormInput
            label="Partner Mobile Number"
            name="partnerMobile"
            type="tel"
            pattern="[6-9][0-9]{9}"
            title="Enter a valid 10-digit mobile number"
          />
          <FormInput label="Partner Email Address" name="partnerEmail" type="email" />
          <FormTextarea label="Partner Current Address" name="partnerAddress" />
          <StateDistrictCityFields
            stateName="partnerAddressState"
            stateLabel="Partner Address State"
            districtName="partnerAddressDistrict"
            districtLabel="Partner Address District"
            cityName="partnerAddressCity"
            cityLabel="Partner Address City"
          />
          <FormInput
            label="Partner Pin Code"
            name="partnerPinCode"
            pattern="[0-9]{6}"
            title="Enter a valid 6-digit PIN code"
          />
        </FormSection>
      )}
    </>
  );
}
