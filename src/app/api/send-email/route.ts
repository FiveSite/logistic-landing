import { sendEmail } from '@/utils/brevo';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      message,
      form,
      phone,
      website,
      address,
      country,
      city,
      company,
      linkedin,
      contactName,
      contactPosition,
      contactEmail,
      contactNumber,
      startBusinessDate,
      markets,
      activities,
      services,
      profile,
      annualTurnover,
      employees,
      branchLocations,
      branchOffices,
      references,
    } = body;

    const recipientEmail = process.env.REPLY_TO_EMAIL;
    const senderEmail = process.env.SENDER_EMAIL;
    if (!recipientEmail || !senderEmail) {
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    let htmlContent = '';
    let subject = '';
    let replyTo: { email: string; name?: string } | undefined;

    switch (form) {
      case 'Support':
        if (!name || !email || !message) {
          return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        htmlContent = `
          <h2>Message from Support Form</h2>
          <p><strong>Sender:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="border: 1px solid #ccc; padding: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        `;
        subject = `New message from Support Form from ${name}`;
        replyTo = { email, name };
        break;

      case 'Member':
        if (!company) {
          return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        htmlContent = `
          <h2>Membership request</h2>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Website:</strong> ${website}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Linkedin:</strong> ${linkedin}</p>
          <p><strong>Contact Name:</strong> ${contactName}</p>
          <p><strong>Contact Position:</strong> ${contactPosition}</p>
          <p><strong>Contact Email:</strong> ${contactEmail}</p>
          <p><strong>Contact Number:</strong> ${contactNumber}</p>
          <p><strong>Start Business Date:</strong> ${startBusinessDate}</p>
          <p><strong>Markets:</strong> ${markets}</p>
          <p><strong>Activities:</strong> ${activities}</p>
          <p><strong>Services:</strong> ${services}</p>
          <p><strong>Profile:</strong> ${profile}</p>
          <p><strong>Annual Turnover:</strong> ${annualTurnover}</p>
          <p><strong>Employees:</strong> ${employees}</p>
          <p><strong>Branch Offices:</strong> ${branchOffices}</p>
          <p><strong>Branch Locations:</strong> ${branchLocations}</p>
          <p><strong>References:</strong> ${references}</p>`;

        subject = `Membership request from  ${name}`;
        replyTo = { email, name };
        break;

      case 'Deleting':
        if (!email || !company || !message) {
          return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        htmlContent = `<p>Company: <strong>${company}</strong></p>
        <p>Email: <strong>${email}</strong></p>
        <p>Message: <strong>${message}</strong></p>`;

        subject = `Deleting request from ${company}`;
        replyTo = { email, name };
        break;

      default:
        return NextResponse.json({ message: 'Invalid form type' }, { status: 400 });
    }

    await sendEmail({
      senderEmail,
      senderName: 'AALN Website',
      recipientEmail,
      subject,
      htmlContent,
      replyTo,
    });

    return NextResponse.json({ message: '✅ Email successfully sent via Brevo API!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email via Brevo API:', error);
    return NextResponse.json({ message: 'Internal server error', error: String(error) }, { status: 500 });
  }
}
