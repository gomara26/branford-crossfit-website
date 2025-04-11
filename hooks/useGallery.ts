import { useState, useEffect } from 'react';
import type { GalleryImage } from '@/types';

interface UseGalleryReturn {
  images: GalleryImage[];
  isLoading: boolean;
  error: string | null;
  createImage: (image: Omit<GalleryImage, 'id'>) => Promise<void>;
  updateImage: (id: string, image: Partial<GalleryImage>) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
}

export function useGallery(): UseGalleryReturn {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const response = await fetch('/api/gallery');
      if (!response.ok) throw new Error('Failed to fetch gallery images');
      const data = await response.json();
      setImages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  async function createImage(image: Omit<GalleryImage, 'id'>) {
    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(image),
      });

      if (!response.ok) throw new Error('Failed to create gallery image');
      
      const newImage = await response.json();
      setImages(prev => [newImage, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  async function updateImage(id: string, image: Partial<GalleryImage>) {
    try {
      const response = await fetch('/api/gallery', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...image }),
      });

      if (!response.ok) throw new Error('Failed to update gallery image');
      
      const updatedImage = await response.json();
      setImages(prev => 
        prev.map(img => img.id === id ? updatedImage : img)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  async function deleteImage(id: string) {
    try {
      const response = await fetch(`/api/gallery?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete gallery image');
      
      setImages(prev => prev.filter(img => img.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  return {
    images,
    isLoading,
    error,
    createImage,
    updateImage,
    deleteImage,
  };
} 