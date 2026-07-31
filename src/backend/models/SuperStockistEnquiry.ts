import { Schema, model, models, type InferSchemaType } from "mongoose";
import { ENQUIRY_STATUSES } from "./enquiryStatus";

export const SUPER_STOCKIST_ENQUIRY_FIELDS = [
  "firstName",
  "middleName",
  "lastName",
  "dob",
  "mobile",
  "email",

  "currentAddress",
  "state",
  "city",
  "pinCode",
  "education",

  "companyName",
  "companyEmail",
  "companyType",
  "experience",
  "yearlyTurnover",
  "yearEstablished",
  "designation",
  "workProfile",

  "productDetails",
  "productionCapacity",
  "productionMethod",
  "storageFacility",
  "godownSize",
  "transportFacility",
  "vehicleModel",
  "vehicleCount",
  "sampleSent",
] as const;

const superStockistEnquirySchema = new Schema(
  {
    ...Object.fromEntries(SUPER_STOCKIST_ENQUIRY_FIELDS.map((field) => [field, String])),
    status: { type: String, enum: ENQUIRY_STATUSES, default: "New" },
  },
  { timestamps: true }
);

superStockistEnquirySchema.index({ createdAt: -1 });
superStockistEnquirySchema.index({ status: 1 });

export type SuperStockistEnquiry = InferSchemaType<typeof superStockistEnquirySchema>;

export const SuperStockistEnquiryModel =
  models.SuperStockistEnquiry || model("SuperStockistEnquiry", superStockistEnquirySchema);
