import type { Metadata } from "next";
import { InquiryPageShell } from "@/components/form/InquiryPageShell";
import { InquiryFormShell } from "@/components/form/InquiryFormShell";
import {
  FormInput,
  FormRadioGroup,
  FormSection,
  FormSelect,
  FormTextarea,
} from "@/components/form/FormField";
import { StateCityFields } from "@/components/form/GeoFields";
import { StorageTransportFields } from "@/components/form/StorageTransportFields";
import { EXPERIENCE_OPTIONS } from "@/lib/formOptions";

export const metadata: Metadata = {
  title: "Super Stockist | Hindustan Pencils",
  description:
    "Become a super stockist for Hindustan Pencils, one of India's largest stationery manufacturers, and join a decades-long legacy.",
};

const MOBILE_PATTERN = "[6-9][0-9]{9}";
const MOBILE_TITLE = "Enter a valid 10-digit mobile number";
const PIN_PATTERN = "[0-9]{6}";
const PIN_TITLE = "Enter a valid 6-digit PIN code";
const YEAR_PATTERN = "[0-9]{4}";
const YEAR_TITLE = "Enter a 4-digit year";
const DOB_MAX = new Date().toISOString().split("T")[0];

export default function SuperStockistPage() {
  return (
    <InquiryPageShell description="Become a super stockist for Hindustan Pencils and join a decades-long legacy of trusted stationery manufacturing. Please share your details below.">
      <InquiryFormShell action="/api/super-stockist" submitLabel="Submit Application">
        <FormSection title="Personal Information">
          <FormInput label="First Name" name="firstName" required />
          <FormInput label="Middle Name" name="middleName" />
          <FormInput label="Last Name" name="lastName" required />
          <FormInput label="Date of Birth" name="dob" type="date" max={DOB_MAX} required />
          <FormInput
            label="Mobile Number"
            name="mobile"
            type="tel"
            pattern={MOBILE_PATTERN}
            title={MOBILE_TITLE}
            required
          />
          <FormInput label="Email Address" name="email" type="email" required />
          <FormTextarea label="Current Address" name="currentAddress" required />
          <StateCityFields
            stateName="state"
            stateLabel="Select State"
            cityName="city"
            cityLabel="Select City"
            required
          />
          <FormInput label="Pin Code" name="pinCode" pattern={PIN_PATTERN} title={PIN_TITLE} />
          <FormTextarea label="Educational Detail" name="education" required />
        </FormSection>

        <FormSection title="Company Information">
          <FormInput label="Company Name" name="companyName" required />
          <FormInput label="Company Email Address" name="companyEmail" type="email" required />
          <FormRadioGroup label="Type of Company" name="companyType" options={["Personal", "Partnered"]} />
          <FormSelect label="Experience" name="experience" options={EXPERIENCE_OPTIONS} required />
          <FormInput label="Yearly Turnover" name="yearlyTurnover" required />
          <FormInput
            label="Year of Establishment"
            name="yearEstablished"
            type="text"
            inputMode="numeric"
            maxLength={4}
            pattern={YEAR_PATTERN}
            title={YEAR_TITLE}
            placeholder="e.g. 2015"
            required
          />
          <FormInput label="Designation" name="designation" required />
          <FormTextarea label="Work Profile" name="workProfile" required />
        </FormSection>

        <FormSection title="Other Information">
          <FormTextarea label="Product Details" name="productDetails" required />
          <FormInput label="Production Capacity" name="productionCapacity" required />
          <FormInput label="Production Method" name="productionMethod" required />
          <StorageTransportFields />
          <FormRadioGroup
            label="Product Sample Sent"
            name="sampleSent"
            options={["Yes", "No"]}
            required
          />
        </FormSection>
      </InquiryFormShell>
    </InquiryPageShell>
  );
}
