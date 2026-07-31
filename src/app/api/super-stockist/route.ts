import { NextRequest, NextResponse } from "next/server";
import { sendInquiryEmails } from "@/lib/mailer";
import { connectToDatabase } from "@/backend/db";
import { SuperStockistEnquiryModel, SUPER_STOCKIST_ENQUIRY_FIELDS } from "@/backend/models/SuperStockistEnquiry";
import { pickStrings } from "@/backend/utils/sanitize";

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    await connectToDatabase();
    await SuperStockistEnquiryModel.create(pickStrings(data, SUPER_STOCKIST_ENQUIRY_FIELDS));
  } catch (error) {
    console.error("[Super Stockist] Failed to save enquiry:", error);
  }

  try {
    await sendInquiryEmails({
      formName: "Super Stockist",
      data,
      recipientEmail: typeof data.email === "string" ? data.email : undefined,
      recipientName: [data.firstName, data.middleName, data.lastName].filter(Boolean).join(" "),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Super Stockist] Failed to send email:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
