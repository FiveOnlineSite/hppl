import { Schema, model, models, type InferSchemaType } from "mongoose";
import { ENQUIRY_STATUSES } from "./enquiryStatus";

export const DISTRIBUTOR_ENQUIRY_FIELDS = [
  "desiredAreaState",
  "desiredAreaCity",

  "firstName",
  "middleName",
  "lastName",
  "dob",
  "mobile",
  "email",

  "currentAddress",
  "currentAddressState",
  "currentAddressCity",
  "pinCode",

  "companyName",
  "companyEmail",
  "companyAddress",
  "companyAddressState",
  "companyAddressCity",
  "companyPinCode",
  "education",

  "firmType",
  "partnerFirstName",
  "partnerMiddleName",
  "partnerLastName",
  "partnerDob",
  "partnerMobile",
  "partnerEmail",
  "partnerAddress",
  "partnerAddressState",
  "partnerAddressCity",
  "partnerPinCode",

  "otherExperience",
  "storageFacility",
  "godownSize",
  "transportFacility",
  "vehicleModel",
  "vehicleCount",
  "investmentCapacity",
  "workingCapital",
] as const;

const distributorEnquirySchema = new Schema(
  {
    ...Object.fromEntries(DISTRIBUTOR_ENQUIRY_FIELDS.map((field) => [field, String])),
    status: { type: String, enum: ENQUIRY_STATUSES, default: "New" },
  },
  { timestamps: true }
);

distributorEnquirySchema.index({ createdAt: -1 });
distributorEnquirySchema.index({ status: 1 });

export type DistributorEnquiry = InferSchemaType<typeof distributorEnquirySchema>;

export const DistributorEnquiryModel =
  models.DistributorEnquiry || model("DistributorEnquiry", distributorEnquirySchema);
