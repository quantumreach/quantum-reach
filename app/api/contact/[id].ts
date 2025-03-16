import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { contact_submissions } from '@prisma/client';

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

export async function GET(request: Request, { params }: Props): Promise<NextResponse> {
  try {
    const id: number = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: 'Invalid ID format' }, { status: 400 });
    }

    const contact: contact_submissions | null = await prisma.contact_submissions.findUnique({
      where: { id: params.id },
    });

    if (!contact) {
      return NextResponse.json({ success: false, error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: contact });
  } catch (error: any) {
    console.error("Error fetching contact:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Props): Promise<NextResponse> {
  try {
    const id: number = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: 'Invalid ID format' }, { status: 400 });
    }

    const { name, email, subject, message } = await request.json();

    const contact: contact_submissions = await prisma.contact_submissions.update({
      where: { id: params.id },
      data: { 
        name: name || null,
        email: email || null,
        subject: subject || null,
        message: message || null
      },
    });
    return NextResponse.json({ success: true, data: contact });
  } catch (error: any) {
    console.error("Error updating contact:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props): Promise<NextResponse> {
  try {
    const id: number = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: 'Invalid ID format' }, { status: 400 });
    }

    await prisma.contact_submissions.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    console.error("Error deleting contact:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}