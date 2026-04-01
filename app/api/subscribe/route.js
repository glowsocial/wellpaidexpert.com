import { NextResponse } from "next/server";

// Kit (ConvertKit) REST API v4
// Set KIT_API_KEY and KIT_FORM_ID in your environment variables.
const KIT_API_KEY = process.env.KIT_API_KEY;
const KIT_FORM_ID = process.env.KIT_FORM_ID;

export async function POST(request) {
  try {
    const { email, firstName } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    // If Kit isn't configured yet, still return success so the UI works during testing
    if (!KIT_API_KEY || !KIT_FORM_ID) {
      console.warn("KIT_API_KEY or KIT_FORM_ID not set — subscription skipped");
      return NextResponse.json({ success: true, skipped: true });
    }

    // Kit API v4: subscribe to a form
    const res = await fetch(
      `https://api.kit.com/v4/forms/${KIT_FORM_ID}/subscribers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": KIT_API_KEY,
        },
        body: JSON.stringify({
          email_address: email,
          ...(firstName ? { first_name: firstName } : {}),
        }),
      }
    );

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Kit API error:", res.status, errBody);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
