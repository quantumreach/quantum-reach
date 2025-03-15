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
      og_title,
      og_description,
      og_image,
      twitter_title,
      twitter_description,
      twitter_image
    } = await request.json();

    const blog: blogs = await prisma.blogs.create({
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
    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
