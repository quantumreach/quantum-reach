import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { careers_applications } from '@prisma/client';

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

export async function GET(request: Request, { params }: Props): Promise<NextResponse> {
  try {
    const id: string = params.id;

    const application: careers_applications | null = await prisma.careers_applications.findUnique({
      where: { id: params.id },
    });

    if (!application) {
      return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: application });
  } catch (error: any) {
    console.error("Error fetching application:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Props): Promise<NextResponse> {
  try {
    const id: string = params.id;

    const { name, email, phone, job_title, job_type, experience, education, message } = await request.json();

    const application: careers_applications = await prisma.careers_applications.update({
      where: { id: params.id },
      data: {
        name: name || null,
        email: email || null,
        phone: phone || null,
        jobTitle: job_title || null,
        jobType: job_type || null,
        experience: experience || null,
        education: education || null,
        message: message || null
      },
    });
    return NextResponse.json({ success: true, data: application });
  } catch (error: any) {
    console.error("Error updating application:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props): Promise<NextResponse> {
  try {
    const id: string = params.id;

    await prisma.careers_applications.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    console.error("Error deleting application:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
