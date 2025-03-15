import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { blogs } from '@prisma/client';

interface Params {
  slug: string;
}

interface Props {
  params: Params;
}

export async function GET(request: Request, { params }: Props): Promise<NextResponse> {
  try {
    const { slug } = params;

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid slug format' }, { status: 400 });
    }

    const blog: blogs | null = await prisma.blogs.findFirst({
      where: { slug },
    });

    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error: any) {
    console.error("Error fetching blog by slug:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
