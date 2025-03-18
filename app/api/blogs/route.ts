import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';

// Schema for blog validation
const BlogSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/),
  content: z.string().optional().nullable(),
  excerpt: z.string().optional().nullable(),
  published: z.boolean().optional().nullable(),
  meta_title: z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
  meta_keywords: z.string().optional().nullable(),
  featured_image: z.string().url().optional().nullable(),
});

export async function GET(): Promise<NextResponse> {
  try {
    // Fetch only necessary fields and order by creation date
    const blogs = await prisma.blogs.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        published: true,
        featuredImage: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    
    // Validate input data
    const validation = BlogSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: validation.error.format() },
        { status: 400 }
      );
    }
    
    // Check if slug already exists
    const existingBlog = await prisma.blogs.findUnique({
      where: { slug: body.slug },
      select: { id: true }
    });
    
    if (existingBlog) {
      return NextResponse.json(
        { success: false, error: "Blog with this slug already exists" },
        { status: 409 }
      );
    }

    // Create blog with validated data
    const blog = await prisma.blogs.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt,
        published: body.published ?? false,
        metaTitle: body.meta_title,
        metaDescription: body.meta_description,
        metaKeywords: body.meta_keywords,
        featuredImage: body.featured_image,
      },
    });
    
    return NextResponse.json(
      { success: true, data: blog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
