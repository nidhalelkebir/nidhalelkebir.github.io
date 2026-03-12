import { NextRequest, NextResponse } from "next/server";

const WEB3FORMS_ACCESS_KEY =
  process.env.WEB3FORMS_KEY ?? "ca995fb6-4f80-404f-bbab-03668c6595e8";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Send via Web3Forms (free email forwarding service)
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Portfolio Contact: ${name}`,
        from_name: name,
        reply_to: email,
        to: "nidhalelkebir@gmail.com",
        name,
        email,
        message,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: data.message || "Failed to send message" },
      { status: response.status || 500 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
