import { useState, useEffect } from 'react';
import type { MemberSpotlight } from '@/types';

interface UseMemberSpotlightsReturn {
  spotlights: MemberSpotlight[];
  isLoading: boolean;
  error: string | null;
  createSpotlight: (spotlight: Omit<MemberSpotlight, 'id'>) => Promise<void>;
  updateSpotlight: (id: string, spotlight: Partial<MemberSpotlight>) => Promise<void>;
  deleteSpotlight: (id: string) => Promise<void>;
}

export function useMemberSpotlights(): UseMemberSpotlightsReturn {
  const [spotlights, setSpotlights] = useState<MemberSpotlight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get the base URL for API calls
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_BASE_URL || '';

  useEffect(() => {
    fetchSpotlights();
  }, []);

  async function fetchSpotlights() {
    try {
      const response = await fetch(`${baseUrl}/api/member-spotlights`);
      if (!response.ok) throw new Error('Failed to fetch spotlights');
      const data = await response.json();
      setSpotlights(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  async function createSpotlight(spotlight: Omit<MemberSpotlight, 'id'>) {
    try {
      const response = await fetch(`${baseUrl}/api/member-spotlights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(spotlight),
      });

      if (!response.ok) throw new Error('Failed to create spotlight');
      
      const newSpotlight = await response.json();
      setSpotlights(prev => [newSpotlight, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  async function updateSpotlight(id: string, spotlight: Partial<MemberSpotlight>) {
    try {
      const response = await fetch(`${baseUrl}/api/member-spotlights`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...spotlight }),
      });

      if (!response.ok) throw new Error('Failed to update spotlight');
      
      const updatedSpotlight = await response.json();
      setSpotlights(prev => 
        prev.map(s => s.id === id ? updatedSpotlight : s)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  async function deleteSpotlight(id: string) {
    try {
      const response = await fetch(`${baseUrl}/api/member-spotlights?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete spotlight');
      
      setSpotlights(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  return {
    spotlights,
    isLoading,
    error,
    createSpotlight,
    updateSpotlight,
    deleteSpotlight,
  };
} 