import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { blogs } from '@prisma/client';
import { z } from 'zod';

// Schema for blog update validation
const BlogUpdateSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/).optional(),
  content: z.string().optional().nullable(),
  excerpt: z.string().optional().nullable(),
  published: z.boolean().optional(),
  meta_title: z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
  meta_keywords: z.string().optional().nullable(),
  featured_image: z.string().url().optional().nullable(),
});

/**
 * Handle errors in a consistent way
 */
function handleError(error: unknown, message: string): NextResponse {
  console.error(`${message}:`, error);
  return NextResponse.json(
    { success: false, error: message },
    { status: 500 }
  );
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid slug format' },
        { status: 400 }
      );
    }

    const blog = await prisma.blogs.findFirst({
      where: {
        slug: {
          equals: slug,
          mode: 'insensitive',
        },
      },
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return handleError(error, "Error fetching blog by slug");
  }
}

export async function PUT(
  request: Request, 
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
  try {
    const { slug } = params;

    // Check if blog exists
    const existingBlog = await prisma.blogs.findUnique({
      where: { slug },
      select: { id: true }
    });

    if (!existingBlog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    
    // Validate input data
    const validation = BlogUpdateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: validation.error.format() },
        { status: 400 }
      );
    }
    
    // Check if new slug already exists (if slug is being changed)
    if (body.slug && body.slug !== slug) {
      const slugExists = await prisma.blogs.findUnique({
        where: { slug: body.slug },
        select: { id: true }
      });
      
      if (slugExists) {
        return NextResponse.json(
          { success: false, error: "Blog with this slug already exists" },
          { status: 409 }
        );
      }
    }

    // Update blog with validated data
    const updatedBlog = await prisma.blogs.update({
      where: { slug },
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt,
        published: body.published,
        metaTitle: body.meta_title,
        metaDescription: body.meta_description,
        metaKeywords: body.meta_keywords,
        featuredImage: body.featured_image,
      },
    });
    
    return NextResponse.json({ success: true, data: updatedBlog });
  } catch (error) {
    return handleError(error, "Error updating blog");
  }
}

export async function DELETE(
  _: Request, 
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
  try {
    const { slug } = params;
    
    // Check if blog exists before deletion
    const existingBlog = await prisma.blogs.findUnique({
      where: { slug },
      select: { id: true }
    });

    if (!existingBlog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    await prisma.blogs.delete({
      where: { slug }
    });
    
    return NextResponse.json(
      { success: true, message: "Blog successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "Error deleting blog");
  }
}
