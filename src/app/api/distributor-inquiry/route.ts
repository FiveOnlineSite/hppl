import { NextRequest, NextResponse } from "next/server";
import { sendInquiryEmails } from "@/lib/mailer";
import { connectToDatabase } from "@/backend/db";
import { DistributorEnquiryModel, DISTRIBUTOR_ENQUIRY_FIELDS } from "@/backend/models/DistributorEnquiry";
import { pickStrings } from "@/backend/utils/sanitize";

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    await connectToDatabase();
    await DistributorEnquiryModel.create(pickStrings(data, DISTRIBUTOR_ENQUIRY_FIELDS));
  } catch (error) {
    console.error("[Distributor / Agency Inquiry] Failed to save enquiry:", error);
  }

  try {
    await sendInquiryEmails({
      formName: "Distributor / Agency Inquiry",
      data,
      recipientEmail: typeof data.email === "string" ? data.email : undefined,
      recipientName: [data.firstName, data.middleName, data.lastName].filter(Boolean).join(" "),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Distributor / Agency Inquiry] Failed to send email:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
