import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const {
    company,
    phone,
    website,
    address,
    country,
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
    branchOffices,
    branchLocations,
    references,
  } = await req.json();

  if (!company || !phone || !website) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL,
      subject: 'New membership request',
      html: `<p>Company: ${company}</p>
      <p>Phone: ${phone}</p>
      <p>Website: ${website}</p>
      <p>Address: ${address}</p>
      <p>Country: ${country}</p>
      <p>Linkedin: ${linkedin}</p>
      <p>Contact Name: ${contactName}</p>
      <p>Contact Position: ${contactPosition}</p>
      <p>Contact Email: ${contactEmail}</p>
      <p>Contact Number: ${contactNumber}</p>
      <p>Start Business Date: ${startBusinessDate}</p>
      <p>Markets: ${markets}</p>
      <p>Activities: ${activities}</p>
      <p>Services: ${services}</p>
      <p>Profile: ${profile}</p>
      <p>Annual Turnover: ${annualTurnover}</p>
      <p>Employees: ${employees}</p>
      <p>Branch Offices: ${branchOffices}</p>
      <p>Branch Locations: ${branchLocations}</p>
      <p>References: ${references}</p>`,
    });

    return NextResponse.json({ message: 'Data sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ message: 'Failed to send data' }, { status: 500 });
  }
}
