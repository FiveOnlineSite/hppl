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
          <FormTextarea label="Educational Detail" name="educational_details" required />
          <FormInput label="Designation" name="designation" required />
          <FormSelect label="Experience" name="experience" options={EXPERIENCE_OPTIONS} required />
          <FormTextarea label="Work Profile" name="work_profile" required />
        
          <FormTextarea label="Current Address" name="current_address" required />
          <StateCityFields
            stateName="current_state"
            stateLabel="Select State"
            cityName="current_city"
            cityLabel="Select City"
            required
          />
          <FormInput label="Pin Code" name="current_pincode" pattern={PIN_PATTERN} title={PIN_TITLE} />
        </FormSection>

        <FormSection title="Company Information">
          <FormInput label="Company Name" name="company_name" required />
          <FormInput label="Company Email Address" name="company_email" type="email" required />
          <FormRadioGroup label="Type of Company" name="firm_type" options={["Personal", "Partnered"]} />
          <FormInput label="Yearly Turnover" name="yearly_turnover" required />
          <FormInput
            label="Year of Establishment"
            name="year_of_establishment"
            inputMode="numeric"
            pattern={YEAR_PATTERN}
            title={YEAR_TITLE}
            placeholder="e.g. 2015"
            type="number" min="1900" max={new Date().getFullYear()}
            required
          />
         </FormSection>

        <FormSection title="Other Information">
          <FormTextarea label="Product Details" name="product_details" required />
          <FormInput label="Production Capacity" name="production_capacity" required />
          <FormInput label="Production Method" name="production_method" required />
          <StorageTransportFields />
          <FormRadioGroup
            label="Product Sample Sent"
            name="sample_sent"
            options={["Yes", "No"]}
            required
          />
          <FormInput label="Current Business (FMCG and other businesses)" name="current_business" />
          <FormInput label="Size of the business / Business in different companies" name="size_of_business" />
          <FormInput label="Primary contact person and their involvement" name="primary_contact_person" />
          
          <FormTextarea label="Current Super Stockist business details" name="business_details"  />
          <FormTextarea label="Current investment and proposed investment for the new business" name="current_investment"  />
          <FormTextarea label="Infrastructure details, including depot and transportation facilities" name="infrastructure_details"  />

        </FormSection>
      </InquiryFormShell>
    </InquiryPageShell>
  );
}
