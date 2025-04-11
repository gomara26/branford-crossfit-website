import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/member-spotlights
export async function GET() {
  try {
    const spotlights = await prisma.memberSpotlight.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(spotlights);
  } catch (error) {
    console.error('Error fetching member spotlights:', error);
    return NextResponse.json(
      { error: 'Failed to fetch member spotlights' },
      { status: 500 }
    );
  }
}

// POST /api/member-spotlights
export async function POST(request: Request) {
  try {
    const json = await request.json();
    
    const spotlight = await prisma.memberSpotlight.create({
      data: {
        name: json.name,
        memberSince: json.memberSince,
        quote: json.quote,
        recentAchievement: json.recentAchievement,
        image: json.image,
      },
    });
    
    return NextResponse.json(spotlight);
  } catch (error) {
    console.error('Error creating member spotlight:', error);
    return NextResponse.json(
      { error: 'Failed to create member spotlight' },
      { status: 500 }
    );
  }
}

// DELETE /api/member-spotlights
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
    
    await prisma.memberSpotlight.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting member spotlight:', error);
    return NextResponse.json(
      { error: 'Failed to delete member spotlight' },
      { status: 500 }
    );
  }
}

// PATCH /api/member-spotlights
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
    
    const spotlight = await prisma.memberSpotlight.update({
      where: { id },
      data,
    });
    
    return NextResponse.json(spotlight);
  } catch (error) {
    console.error('Error updating member spotlight:', error);
    return NextResponse.json(
      { error: 'Failed to update member spotlight' },
      { status: 500 }
    );
  }
} 