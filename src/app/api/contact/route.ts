import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { siteConfig } from '@/lib/config';

interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  message: string;
  service?: string;
  direction?: string;
  locale?: string;
}

// Label map so the email shows a readable service name
const serviceLabels: Record<string, string> = {
  residential: 'Residential Junk Removal',
  commercial: 'Commercial Cleanout',
  construction: 'Construction Debris',
  yard: 'Yard Waste Removal',
  furniture: 'Furniture Removal',
  cleanout: 'Estate / Property Cleanout',
  appliances: 'Appliance Removal',
  recycling: 'Recycling & Donation Services',
  other: 'Other',
};

function buildEmailHtml(data: ContactPayload): string {
  const { name, phone, email, message, service, direction } = data;
  const serviceLabel = service ? (serviceLabels[service] ?? service) : null;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Lead — Julio Junk Removal</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#013e37;border-radius:12px 12px 0 0;padding:32px;text-align:center;">
              <p style="margin:0 0 4px;color:#88deb1;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">New Estimate Request</p>
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:800;">Julio Junk Removal</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:32px;">

              <p style="margin:0 0 24px;color:#374151;font-size:16px;">
                A new lead came in through the website. Here are the details:
              </p>

              <!-- Data rows -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:12px 16px;background:#f9fafb;border-radius:8px 8px 0 0;border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:11px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Name</p>
                    <p style="margin:4px 0 0;font-size:17px;font-weight:700;color:#013e37;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;background:#ffffff;border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:11px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Phone</p>
                    <p style="margin:4px 0 0;font-size:17px;font-weight:700;color:#013e37;">
                      <a href="tel:${phone}" style="color:#013e37;text-decoration:none;">${phone}</a>
                    </p>
                  </td>
                </tr>
                ${email ? `
                <tr>
                  <td style="padding:12px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:11px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Email</p>
                    <p style="margin:4px 0 0;font-size:17px;font-weight:700;color:#013e37;">
                      <a href="mailto:${email}" style="color:#013e37;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>` : ''}
                ${serviceLabel ? `
                <tr>
                  <td style="padding:12px 16px;background:${email ? '#ffffff' : '#f9fafb'};border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:11px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Service</p>
                    <p style="margin:4px 0 0;font-size:17px;font-weight:700;color:#013e37;">${serviceLabel}</p>
                  </td>
                </tr>` : ''}
                ${direction ? `
                <tr>
                  <td style="padding:12px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:11px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Address</p>
                    <p style="margin:4px 0 0;font-size:17px;font-weight:700;color:#013e37;">${direction}</p>
                  </td>
                </tr>` : ''}
                <tr>
                  <td style="padding:12px 16px;background:#f9fafb;border-radius:0 0 8px 8px;">
                    <p style="margin:0;font-size:11px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Message</p>
                    <p style="margin:4px 0 0;font-size:15px;color:#374151;line-height:1.6;">${message}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA buttons -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                <tr>
                  <td align="center" style="padding:0 6px 0 0;">
                    <a href="tel:${phone}"
                      style="display:inline-block;background:#013e37;color:#ffffff;font-size:15px;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;">
                      📞 Call Back
                    </a>
                  </td>
                  <td align="center" style="padding:0 0 0 6px;">
                    <a href="https://wa.me/1${phone.replace(/\D/g, '')}"
                      style="display:inline-block;background:#25D366;color:#ffffff;font-size:15px;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;">
                      💬 WhatsApp
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#013e37;border-radius:0 0 12px 12px;padding:20px;text-align:center;">
              <p style="margin:0;color:#88deb1;font-size:12px;">
                juliojunkremoval.com · Los Angeles, CA
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      // from must use a verified domain configured in Resend
      from: `Julio Junk Removal <leads@juliojunkremoval.com>`,
      to: siteConfig.email,
      subject: `New estimate request from ${name}`,
      html: buildEmailHtml(body),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Resend error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
