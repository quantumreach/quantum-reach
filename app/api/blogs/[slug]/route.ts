import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { blogs } from '@prisma/client';

export async function GET(request: Request, context: { params: { slug: string } }): Promise<NextResponse> {
  try {
    const { slug } = context.params;

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid slug format' }, { status: 400 });
    }

    const blog: blogs | null = await prisma.blogs.findFirst({
      where: { 
        slug: {
          equals: slug,
          mode: 'insensitive',
        },
       },
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

export async function PUT(request: Request, context: { params: { slug: string } }): Promise<NextResponse> {
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
    
    const blog: blogs = await prisma.blogs.update({
      where: { slug: context.params.slug },
      data: {
        title: title || null,
        slug: slug || null, // new slug can be updated
        content: content || null,
        excerpt: excerpt || null,
        published: published || null,
        metaTitle: meta_title || null,
        metaDescription: meta_description || null,
        metaKeywords: meta_keywords || null,
        featuredImage: featured_image || null,
      },
    });
    return NextResponse.json({ success: true, data: blog });
  } catch (error: any) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: { slug: string } }): Promise<NextResponse> {
  try {
    await prisma.blogs.delete({
      where: { slug: context.params.slug },
    });
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
