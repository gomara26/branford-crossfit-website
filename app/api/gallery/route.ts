import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/gallery
export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}

// POST /api/gallery
export async function POST(request: Request) {
  try {
    const json = await request.json();
    
    const image = await prisma.galleryImage.create({
      data: {
        url: json.url,
        caption: json.caption,
      },
    });
    
    return NextResponse.json(image);
  } catch (error) {
    console.error('Error creating gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to create gallery image' },
      { status: 500 }
    );
  }
}

// DELETE /api/gallery
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }
    
    await prisma.galleryImage.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to delete gallery image' },
      { status: 500 }
    );
  }
}

// PATCH /api/gallery
export async function PATCH(request: Request) {
  try {
    const json = await request.json();
    const { id, ...data } = json;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }
    
    const image = await prisma.galleryImage.update({
      where: { id },
      data,
    });
    
    return NextResponse.json(image);
  } catch (error) {
    console.error('Error updating gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to update gallery image' },
      { status: 500 }
    );
  }
} 