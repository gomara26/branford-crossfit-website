import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const members = await prisma.memberSpotlight.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(members)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch member spotlights' },
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