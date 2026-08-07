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
            stateName="agency_state"
            stateLabel="Desired Area State"
            cityName="agency_city"
            cityLabel="Desired Area City"
            required
          />
        </FormSection>

        <FormSection title="Personal Information">
          <FormInput label="First Name" name="first_name" required />
          <FormInput label="Middle Name" name="middle_name" />
          <FormInput label="Last Name" name="last_name" required />
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
          <FormTextarea label="Educational Details" name="educational_details" required />
          
          <FormTextarea label="Current Address" name="current_address" required />
          <StateCityFields
            stateName="current_state"
            stateLabel="Current Address State"
            cityName="current_city"
            cityLabel="Current Address City"
            required
          />
          <FormInput
            label="Pin Code"
            name="current_pincode"
            pattern={PIN_PATTERN}
            title={PIN_TITLE}
            required
          />
        </FormSection>

        <DistributorCompanyAndPartnerFields />

        <FormSection title="Other Business Information">
          <FormInput label="Other Experience" name="other_experience" />
          <FormInput label="Current Business (FMCG and other businesses)" name="current_business" />
          <FormInput label="Size of the business / Business in different companies" name="size_of_business" />
          <FormInput label="Primary contact person and their involvement" name="primary_contact_person" />
          <StorageTransportFields />
          <FormSelect label="Investment Capacity" name="investment_capacity" options={INVESTMENT_CAPACITY_OPTIONS} />
          <FormSelect label="Working Capital" name="working_capital" options={WORKING_CAPITAL_OPTIONS} />
          <FormTextarea label="Current Distributor business details" name="business_details"  />
          <FormTextarea label="Current investment and proposed investment for the new business" name="current_investment"  />
          <FormTextarea label="Infrastructure details, including depot and transportation facilities" name="infrastructure_details"  />

        </FormSection>
      </InquiryFormShell>
    </InquiryPageShell>
  );
}
