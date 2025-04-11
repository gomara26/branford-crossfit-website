import { NextResponse } from "next/server";

// Specify Node.js runtime
export const runtime = 'nodejs';

export async function GET() {
  // Static mock data that doesn't require database access
  const mockData = {
    events: [
      {
        id: "mock-1",
        title: "Mock CrossFit Competition",
        date: new Date().toISOString(),
        time: "9:00 AM - 1:00 PM",
        location: "Branford CrossFit",
        cost: "$25",
        who: "All members",
        description: "A mock event for testing purposes",
        image: "/images/placeholder.jpg",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "mock-2", 
        title: "Mock Workshop",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        time: "10:00 AM - 12:00 PM",
        location: "Branford CrossFit",
        cost: "$15",
        who: "Beginners",
        description: "Another mock event for testing purposes",
        image: "/images/placeholder.jpg",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    memberSpotlights: [
      {
        id: "mock-spotlight-1",
        name: "John Doe",
        memberSince: "January 2022",
        quote: "CrossFit changed my life!",
        recentAchievement: "First muscle-up",
        image: "/images/placeholder.jpg",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    galleryImages: [
      {
        id: "mock-gallery-1",
        url: "/images/placeholder.jpg",
        caption: "Mock gallery image",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  };
  
  return NextResponse.json(mockData);
} 