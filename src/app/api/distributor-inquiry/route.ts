import { NextRequest, NextResponse } from "next/server";
import { sendInquiryEmails } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  const data = await request.json();

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
