import { NextRequest, NextResponse } from "next/server";
import { sendInquiryEmails } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    await sendInquiryEmails({
      formName: "Export Inquiry",
      data,
      recipientEmail: typeof data.email === "string" ? data.email : undefined,
      recipientName: typeof data.fullName === "string" ? data.fullName : undefined,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Export Inquiry] Failed to send email:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
