import { NextRequest, NextResponse } from "next/server";

// Thin proxy to the separate backend so the browser only ever talks to this
// app's own origin (avoids CORS) and the API URL doesn't need to ship to the client.
export async function POST(request: NextRequest) {
  if (!process.env.API_URL) {
    console.error("[Super Stockist Inquiry] API_URL is not set");
    return NextResponse.json({ success: false, message: "API_URL is not configured" }, { status: 500 });
  }

  const data = await request.json();
  const target = `${process.env.API_URL}/api/super-stockists`;

  let res: Response;
  try {
    res = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(`[Super Stockist Inquiry] Failed to reach ${target}:`, error);
    return NextResponse.json({ success: false, message: "Backend unreachable" }, { status: 502 });
  }

  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") ?? "application/json" },
  });
}
