import { useState, useEffect } from 'react';
import type { UpcomingEvent } from '@/types';

interface UseEventsReturn {
  events: UpcomingEvent[];
  isLoading: boolean;
  error: string | null;
  createEvent: (event: Omit<UpcomingEvent, 'id'>) => Promise<void>;
  updateEvent: (id: string, event: Partial<UpcomingEvent>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  async function createEvent(event: Omit<UpcomingEvent, 'id'>) {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) throw new Error('Failed to create event');
      
      const newEvent = await response.json();
      setEvents(prev => [newEvent, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  async function updateEvent(id: string, event: Partial<UpcomingEvent>) {
    try {
      // Create a copy of the event data to avoid modifying the original
      const eventData = { ...event };
      
      // Ensure date is in the correct format if it exists
      if (eventData.date) {
        try {
          // Convert to a Date object to validate
          const dateObj = new Date(eventData.date);
          
          // Check if it's a valid date
          if (!isNaN(dateObj.getTime())) {
            // Format as yyyy-MM-dd for consistency
            eventData.date = dateObj.toISOString().split('T')[0];
          } else {
            throw new Error('Invalid date format');
          }
        } catch (err) {
          throw new Error('Invalid date format');
        }
      }

      const response = await fetch('/api/events', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...eventData }),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }
      
      const updatedEvent = await response.json();
      setEvents(prev => 
        prev.map(e => e.id === id ? updatedEvent : e)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  async function deleteEvent(id: string) {
    try {
      const response = await fetch(`/api/events?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete event');
      
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  return {
    events,
    isLoading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
  };
} 