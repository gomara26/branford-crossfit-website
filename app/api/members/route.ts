import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Specify Node.js runtime
export const runtime = 'nodejs';

export async function GET() {
  try {
    const members = await prisma.memberSpotlight.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(members)
  } catch (error) {
    // Improved error logging
    console.error('Error fetching members:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    return NextResponse.json(
      { error: 'Failed to fetch member spotlights', details: process.env.NODE_ENV === 'development' ? error : 'See server logs' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const member = await prisma.memberSpotlight.create({
      data: {
        name: data.name,
        memberSince: data.memberSince,
        quote: data.quote,
        recentAchievement: data.recentAchievement,
        image: data.image
      }
    })
    return NextResponse.json(member)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create member spotlight' },
      { status: 500 }
    )
  }
} 