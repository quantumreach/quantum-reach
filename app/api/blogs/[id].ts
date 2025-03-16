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
    const id: string = params.id;

    const blog: blogs | null = await prisma.blogs.findUnique({
      where: { id: params.id },
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
    const id: string = params.id;

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
      where: { id: params.id },
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
        ogTitle: og_title || null,
        ogDescription: og_description || null,
        ogImage: og_image || null,
        twitterTitle: twitter_title || null,
        twitterDescription: twitter_description || null,
        twitterImage: twitter_image || null
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
    const id: string = params.id;

    await prisma.blogs.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
