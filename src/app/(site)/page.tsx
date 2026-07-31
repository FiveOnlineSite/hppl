import type { Metadata } from "next";
import { InquiryPageShell } from "@/components/form/InquiryPageShell";
import { InquiryFormShell } from "@/components/form/InquiryFormShell";
import { FormInput, FormSection, FormSelect, FormTextarea } from "@/components/form/FormField";
import { StateCityFields } from "@/components/form/GeoFields";
import { StorageTransportFields } from "@/components/form/StorageTransportFields";
import { DistributorCompanyAndPartnerFields } from "@/components/form/DistributorCompanyAndPartnerFields";
import { INVESTMENT_CAPACITY_OPTIONS, WORKING_CAPITAL_OPTIONS } from "@/lib/formOptions";

export const metadata: Metadata = {
  title: "Distributor / Agency Inquiry | Hindustan Pencils",
  description:
    "Become a distribution partner for Hindustan Pencils and join a legacy of quality stationery manufacturing.",
};

const MOBILE_PATTERN = "[6-9][0-9]{9}";
const MOBILE_TITLE = "Enter a valid 10-digit mobile number";
const PIN_PATTERN = "[0-9]{6}";
const PIN_TITLE = "Enter a valid 6-digit PIN code";
const DOB_MAX = new Date().toISOString().split("T")[0];

export default function Home() {
  return (
    <InquiryPageShell description="Join Hindustan Pencils' distribution network and grow your business with one of India's largest stationery manufacturers. Please share your details below.">
      <InquiryFormShell action="/api/distributor-inquiry" submitLabel="Submit Inquiry">
        <FormSection title="Desired Area for Agency">
          <StateCityFields
            stateName="desiredAreaState"
            stateLabel="Desired Area State"
            cityName="desiredAreaCity"
            cityLabel="Desired Area City"
            required
          />
        </FormSection>

        <FormSection title="Personal Information">
          <FormInput label="First Name" name="firstName" required />
          <FormInput label="Middle Name" name="middleName" required />
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
            stateName="currentAddressState"
            stateLabel="Current Address State"
            cityName="currentAddressCity"
            cityLabel="Current Address City"
            required
          />
          <FormInput
            label="Pin Code"
            name="pinCode"
            pattern={PIN_PATTERN}
            title={PIN_TITLE}
            required
          />
        </FormSection>

        <DistributorCompanyAndPartnerFields />

        <FormSection title="Other Business Information">
          <FormInput label="Other Experience" name="otherExperience" />
          <StorageTransportFields />
          <FormSelect label="Investment Capacity" name="investmentCapacity" options={INVESTMENT_CAPACITY_OPTIONS} />
          <FormSelect label="Working Capital" name="workingCapital" options={WORKING_CAPITAL_OPTIONS} />
        </FormSection>
      </InquiryFormShell>
    </InquiryPageShell>
  );
}
