import type { Metadata } from "next";
import { InquiryPageShell } from "@/components/form/InquiryPageShell";
import { InquiryFormShell } from "@/components/form/InquiryFormShell";
import { FormInput, FormSection, FormTextarea } from "@/components/form/FormField";
import { CountryStateCityFields } from "@/components/form/GeoFields";

export const metadata: Metadata = {
  title: "Import / Export Inquiry | Hindustan Pencils",
  description:
    "Become an importer or exporter of Hindustan Pencils' stationery products and join a decades-long legacy.",
};

const PHONE_PATTERN = "[0-9+\\s\\(\\)\\-]{7,15}";
const PHONE_TITLE = "Enter a valid phone number";

export default function ImportExportInquiryPage() {
  return (
    <InquiryPageShell description="Join Hindustan Pencils' global network and help take our trusted stationery products to new markets. Please share your business details below.">
      <InquiryFormShell action="/api/import-export-inquiry" submitLabel="Submit Inquiry">
        <FormSection title="Export Inquiry Form">
          <FormInput label="Full Name" name="fullName" required />
          <FormInput label="Company Name" name="companyName" required />
          <FormInput label="Email" name="email" type="email" required />
          <FormInput
            label="Contact No"
            name="contactNo"
            type="tel"
            pattern={PHONE_PATTERN}
            title={PHONE_TITLE}
            required
          />
          <FormInput
            label="Mobile No"
            name="mobileNo"
            type="tel"
            pattern={PHONE_PATTERN}
            title={PHONE_TITLE}
            required
          />
          <CountryStateCityFields
            countryName="country"
            stateName="state"
            cityName="city"
            required
            defaultCountry="India"
          />
          <CountryStateCityFields
            countryName="countryToExport"
            countryLabel="Country to Export"
            stateName="stateToExport"
            stateLabel="State to Export"
            cityName="cityToExport"
            cityLabel="City to Export"
            required
            defaultCountry="India"
          />
          <FormTextarea label="Business Description" name="businessDescription" required />
        </FormSection>
      </InquiryFormShell>
    </InquiryPageShell>
  );
}
