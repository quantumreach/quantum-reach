import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { blogs } from '@prisma/client';

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

    const blog: blogs | null = await prisma.blogs.findUnique({
      where: { id },
    });

    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error: any) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Props): Promise<NextResponse> {
  try {
    const id: number = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: 'Invalid ID format' }, { status: 400 });
    }

    const {
      title,
      slug,
      content,
      excerpt,
      published,
      meta_title,
      meta_description,
      meta_keywords,
      featured_image,
      og_title,
      og_description,
      og_image,
      twitter_title,
      twitter_description,
      twitter_image
    } = await request.json();
    
    const blog: blogs = await prisma.blogs.update({
      where: { id },
      data: {
        title: title || null,
        slug: slug || null,
        content: content || null,
        excerpt: excerpt || null,
        published: published || null,
        meta_title: meta_title || null,
        meta_description: meta_description || null,
        meta_keywords: meta_keywords || null,
        featured_image: featured_image || null,
        og_title: og_title || null,
        og_description: og_description || null,
        og_image: og_image || null,
        twitter_title: twitter_title || null,
        twitter_description: twitter_description || null,
        twitter_image: twitter_image || null
      },
    });
    return NextResponse.json({ success: true, data: blog });
  } catch (error: any) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props): Promise<NextResponse> {
  try {
    const id: number = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: 'Invalid ID format' }, { status: 400 });
    }

    await prisma.blogs.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
