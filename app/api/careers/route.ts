import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { careers_applications } from '@prisma/client';

export async function GET(): Promise<NextResponse> {
  try {
    const applications: careers_applications[] = await prisma.careers_applications.findMany();
    return NextResponse.json({ success: true, data: applications });
  } catch (error: any) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { name, email, phone, job_title, job_type, experience, education, message } = await request.json();

    const application: careers_applications = await prisma.careers_applications.create({
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
    return NextResponse.json({ success: true, data: application }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating application:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
