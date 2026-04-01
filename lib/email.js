import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "The Well-Paid Expert <orders@thewellpaidexpert.com>";
const BLUEPRINT_URL = "https://thewellpaidexpert.com/agency-blueprint/guide";
const GLOW_URL = "https://app.glowsocial.com";

// ─── Shared styles ───────────────────────────────────────────────────────────
const base = (body) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Well-Paid Expert</title>
</head>
<body style="margin:0;padding:0;background:#f5f3ef;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ef;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#1a1a2e;padding:32px 40px;text-align:center;">
          <p style="margin:0;font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c8b89a;">The Well-Paid Expert</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:48px 40px;">
          ${body}
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:32px 40px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
            You received this because you made a purchase at thewellpaidexpert.com.<br/>
            Questions? Reply to this email.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

// ─── Templates ────────────────────────────────────────────────────────────────

export function blueprintConfirmationHtml({ name }) {
  const firstName = name?.split(" ")[0] || "there";
  return base(`
    <p style="margin:0 0 8px;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#8b7355;">Order Confirmed</p>
    <h1 style="margin:0 0 24px;font-size:28px;color:#1a1a2e;font-weight:normal;line-height:1.3;">Your Agency Blueprint is ready, ${firstName}.</h1>

    <p style="margin:0 0 32px;font-size:16px;color:#4b5563;line-height:1.7;">
      It lives at the link below — bookmark it, because this is how you come back. No login required.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:40px;">
      <tr><td align="center">
        <a href="${BLUEPRINT_URL}" style="display:inline-block;background:#7c2d3e;color:#ffffff;text-decoration:none;font-family:Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:16px 40px;">
          Open Your Blueprint →
        </a>
      </td></tr>
    </table>

    <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 32px;" />

    <h3 style="margin:0 0 12px;font-size:16px;color:#1a1a2e;">What's inside:</h3>
    <ul style="margin:0 0 32px;padding:0 0 0 20px;color:#4b5563;font-size:15px;line-height:2;">
      <li>Niche selection framework</li>
      <li>Outreach scripts that actually get replies</li>
      <li>Proposal templates &amp; pricing frameworks</li>
      <li>The fulfillment secret (how to deliver without burning out)</li>
    </ul>

    <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.6;">
      — Kathleen<br/>
      <span style="font-style:italic;color:#9ca3af;">Founder, Glow Social</span>
    </p>
  `);
}

export function upsellConfirmationHtml({ name }) {
  const firstName = name?.split(" ")[0] || "there";
  return base(`
    <p style="margin:0 0 8px;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#8b7355;">Lifetime Access Confirmed</p>
    <h1 style="margin:0 0 24px;font-size:28px;color:#1a1a2e;font-weight:normal;line-height:1.3;">You own Glow Social for life, ${firstName}.</h1>

    <p style="margin:0 0 32px;font-size:16px;color:#4b5563;line-height:1.7;">
      Both of your purchases are confirmed. Access them below — bookmark this email.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr><td style="background:#f8f6f2;border:1px solid #e5e0d8;padding:24px 28px;margin-bottom:12px;">
        <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8b7355;font-family:Arial,sans-serif;">① Agency Blueprint</p>
        <p style="margin:0 0 16px;font-size:14px;color:#4b5563;font-family:Arial,sans-serif;">Your step-by-step agency playbook — scripts, templates, pricing, fulfillment.</p>
        <a href="${BLUEPRINT_URL}" style="display:inline-block;background:#7c2d3e;color:#ffffff;text-decoration:none;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:12px 28px;">
          Open Blueprint →
        </a>
      </td></tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:40px;">
      <tr><td style="background:#1a1a2e;padding:24px 28px;">
        <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c8b89a;font-family:Arial,sans-serif;">② Glow Social — Lifetime Access</p>
        <p style="margin:0 0 16px;font-size:14px;color:rgba(255,255,255,0.75);font-family:Arial,sans-serif;">Log in or create your account. Your Boutique plan covers you + 5 client brands.</p>
        <a href="${GLOW_URL}" style="display:inline-block;background:#ffffff;color:#1a1a2e;text-decoration:none;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:12px 28px;">
          Access Dashboard →
        </a>
      </td></tr>
    </table>

    <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.6;">
      — Kathleen<br/>
      <span style="font-style:italic;color:#9ca3af;">Founder, Glow Social</span>
    </p>
  `);
}

// ─── Send helpers ─────────────────────────────────────────────────────────────

export async function sendBlueprintConfirmation({ email, name }) {
  return resend.emails.send({
    from: FROM,
    to: email,
    subject: "Your Agency Blueprint — access it here",
    html: blueprintConfirmationHtml({ name }),
  });
}

export async function sendUpsellConfirmation({ email, name }) {
  return resend.emails.send({
    from: FROM,
    to: email,
    subject: "Your Glow Social lifetime access is confirmed",
    html: upsellConfirmationHtml({ name }),
  });
}
