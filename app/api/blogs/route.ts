import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { blogs } from '@prisma/client';

export async function GET(): Promise<NextResponse> {
  try {
    const blogs: blogs[] = await prisma.blogs.findMany();
    return NextResponse.json({ success: true, data: blogs });
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
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
    } = await request.json();

    const blog: blogs = await prisma.blogs.create({
      data: {
      title: title || null,
      slug: slug || null,
      content: content || null,
      excerpt: excerpt || null,
      published: published || null,
      metaTitle: meta_title || null,
      metaDescription: meta_description || null,
      metaKeywords: meta_keywords || null,
      featuredImage: featured_image || null,
      },
    });
    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
