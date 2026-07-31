export const ENQUIRY_STATUSES = ["New", "In Progress", "Contacted", "Closed"] as const;

export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];
