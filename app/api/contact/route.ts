import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { contact_submissions } from '@prisma/client';

export async function GET(): Promise<NextResponse> {
  try {
    const contacts: contact_submissions[] = await prisma.contact_submissions.findMany();
    return NextResponse.json({ success: true, data: contacts });
  } catch (error: any) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { name, email, subject, message } = await request.json();

    const contact: contact_submissions = await prisma.contact_submissions.create({
      data: { 
        name: name || null,
        email: email || null,
        subject: subject || null,
        message: message || null
      },
    });
    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating contact:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
