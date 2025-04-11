import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from 'zod';

// Validation schema for event data
const eventSchema = z.object({
  title: z.string().min(1),
  date: z.string().transform(str => new Date(str)),
  time: z.string().min(1),
  location: z.string().min(1),
  cost: z.string().min(1),
  who: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional(),
  registrationLink: z.string().optional(),
  promoCode: z.string().optional()
});

// GET /api/events
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' }
    });
    
    // Format the date for frontend display
    const formattedEvents = events.map(event => ({
      ...event,
      date: event.date.toISOString()
    }));
    
    return NextResponse.json(formattedEvents);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST /api/events
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = eventSchema.safeParse(json);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid event data', details: result.error },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title: result.data.title,
        date: result.data.date,
        time: result.data.time,
        location: result.data.location,
        cost: result.data.cost,
        who: result.data.who,
        description: result.data.description,
        image: result.data.image || null,
        registrationLink: result.data.registrationLink || null,
        promoCode: result.data.promoCode || null
      }
    });
    
    return NextResponse.json(event);
  } catch (error) {
    console.error('Failed to create event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

// DELETE /api/events
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
    
    await prisma.event.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}

// PATCH /api/events
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
    
    // Handle date transformation if it exists in the data
    if (data.date) {
      try {
        // Validate and transform the date string
        data.date = new Date(data.date);
        
        // Check if date is valid
        if (isNaN(data.date.getTime())) {
          return NextResponse.json(
            { error: 'Invalid date format' },
            { status: 400 }
          );
        }
      } catch (error) {
        return NextResponse.json(
          { error: 'Invalid date format' },
          { status: 400 }
        );
      }
    }
    
    const event = await prisma.event.update({
      where: { id },
      data,
    });
    
    // Format date for client
    return NextResponse.json({
      ...event,
      date: event.date.toISOString()
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
} 