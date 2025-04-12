"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/ui/image-upload";
import { SuccessModal } from "@/components/ui/success-modal";
import { eventsApi } from "@/lib/api";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  cost: string;
  who: string;
  description: string;
  image?: string;
  registrationLink?: string;
  promoCode?: string;
}

export default function EditEvents() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const data = await eventsApi.getAll();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError('Failed to load events');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEvent = async (event: Omit<Event, 'id'>) => {
    try {
      await eventsApi.create(event);
      await loadEvents();
      setShowSuccess(true);
    } catch (err) {
      setError('Failed to create event');
      console.error(err);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await eventsApi.delete(id);
      await loadEvents();
      setShowSuccess(true);
    } catch (err) {
      setError('Failed to delete event');
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#FF8C00]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/admin"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <IoArrowBack className="mr-2" />
            Back to Admin
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Events</h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              
              handleAddEvent({
                title: formData.get('title') as string,
                date: formData.get('date') as string,
                time: formData.get('time') as string,
                location: formData.get('location') as string,
                cost: formData.get('cost') as string,
                who: formData.get('who') as string,
                description: formData.get('description') as string,
                image: formData.get('image') as string || undefined,
                registrationLink: formData.get('registrationLink') as string || undefined,
                promoCode: formData.get('promoCode') as string || undefined
              });
              
              form.reset();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8C00] focus:ring-[#FF8C00] sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="datetime-local"
                name="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8C00] focus:ring-[#FF8C00] sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="text"
                name="time"
                required
                placeholder="e.g. 9:00 AM - 12:00 PM"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8C00] focus:ring-[#FF8C00] sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8C00] focus:ring-[#FF8C00] sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cost
              </label>
              <input
                type="text"
                name="cost"
                required
                placeholder="e.g. $50 per person"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8C00] focus:ring-[#FF8C00] sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Who Can Attend
              </label>
              <input
                type="text"
                name="who"
                required
                placeholder="e.g. All members"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8C00] focus:ring-[#FF8C00] sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8C00] focus:ring-[#FF8C00] sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <ImageUpload 
                name="image" 
                value=""
                onChange={(value) => {
                  // You can add specific functionality here if needed
                  // For now, we'll just use it for display/upload
                }}
                onRemove={() => {
                  // Handle image removal if needed
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Registration Link (optional)
              </label>
              <input
                type="url"
                name="registrationLink"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8C00] focus:ring-[#FF8C00] sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Promo Code (optional)
              </label>
              <input
                type="text"
                name="promoCode"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8C00] focus:ring-[#FF8C00] sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FF8C00] hover:bg-[#FF7C00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF8C00]"
            >
              Add Event
            </button>
          </form>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Current Events</h2>
          <div className="space-y-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-start justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="text-lg font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </p>
                  <p className="text-sm text-gray-500">
                    Location: {event.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    Cost: {event.cost}
                  </p>
                  <p className="text-sm text-gray-500">
                    Who: {event.who}
                  </p>
                  <p className="mt-2">{event.description}</p>
                  {event.registrationLink && (
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF8C00] hover:text-[#FF7C00] mt-2 inline-block"
                    >
                      Registration Link
                    </a>
                  )}
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="mt-2 h-32 w-auto rounded"
                    />
                  )}
                </div>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SuccessModal
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Event updated successfully!"
      />
    </div>
  );
} 