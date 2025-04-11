"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack, IoAdd, IoTrash, IoSave } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ImageUpload } from "@/components/ui/image-upload";
import { SuccessModal } from "@/components/ui/success-modal";
import { useEvents } from "@/hooks/useEvents";
import type { UpcomingEvent } from "@/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditUpcomingEvents() {
  const { 
    events, 
    isLoading, 
    error,
    createEvent,
    updateEvent: updateEventData,
    deleteEvent
  } = useEvents();
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "New Event",
    date: new Date().toISOString().split('T')[0],
    time: "TBD",
    location: "TBD",
    cost: "TBD",
    who: "All members",
    description: "Add event description here",
    image: ""
  });
  const [eventDates, setEventDates] = useState<{[key: string]: Date | null}>({});
  const [newEventDate, setNewEventDate] = useState<Date | null>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const adminAuth = Cookies.get("adminAuth");
    if (!adminAuth || adminAuth !== "true") {
      router.push("/admin/login");
      return;
    }
  }, [router]);

  // Initialize event dates when events are loaded
  useEffect(() => {
    if (events.length > 0) {
      const dates: {[key: string]: Date | null} = {};
      events.forEach(event => {
        try {
          // If we have a valid date string, convert it to Date object
          if (event.date) {
            const dateObj = new Date(event.date);
            dates[event.id] = isNaN(dateObj.getTime()) ? null : dateObj;
          } else {
            dates[event.id] = null;
          }
        } catch (e) {
          dates[event.id] = null;
        }
      });
      setEventDates(dates);
    }
  }, [events]);

  // Helper function to safely format dates
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return new Date().toISOString().split('T')[0];
      }
      return date.toISOString().split('T')[0];
    } catch (error) {
      // Return today's date if there's any issue
      return new Date().toISOString().split('T')[0];
    }
  };

  const handleAddEventClick = () => {
    setShowAddEventModal(true);
  };

  const handleAddEvent = async () => {
    try {
      setIsSubmitting(true);
      
      if (!newEventDate) {
        setSuccessMessage("Please select a valid date");
        setShowSuccess(true);
        setIsSubmitting(false);
        return;
      }
      
      // Format the date properly
      const formattedDate = newEventDate.toISOString().split('T')[0];
      
      await createEvent({
        ...newEvent,
        date: formattedDate
      });
      
      setSuccessMessage("New event added successfully!");
      setShowSuccess(true);
      setShowAddEventModal(false);
      
      // Reset the new event form
      setNewEvent({
        title: "New Event",
        date: new Date().toISOString().split('T')[0],
        time: "TBD",
        location: "TBD",
        cost: "TBD",
        who: "All members",
        description: "Add event description here",
        image: ""
      });
      setNewEventDate(new Date());
    } catch (err) {
      setSuccessMessage(err instanceof Error ? err.message : "Failed to add event");
      setShowSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveEvent = async (id: string) => {
    if (events.length > 1) {
      // Add confirmation dialog
      if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
        return; // User canceled the operation
      }

      try {
        setIsSubmitting(true);
        await deleteEvent(id);
        setSuccessMessage("Event removed successfully!");
        setShowSuccess(true);
      } catch (err) {
        setSuccessMessage(err instanceof Error ? err.message : "Failed to remove event");
        setShowSuccess(true);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setSuccessMessage("You must have at least one event");
      setShowSuccess(true);
    }
  };

  const handleUpdateEvent = async (id: string, field: keyof UpcomingEvent, value: string) => {
    try {
      // For date fields, ensure we have a valid date format
      if (field === "date") {
        value = formatDate(value);
      }
      
      await updateEventData(id, { [field]: value });
    } catch (err) {
      setSuccessMessage(err instanceof Error ? err.message : "Failed to update event");
      setShowSuccess(true);
    }
  };

  const handleDateChange = async (id: string, date: Date | null) => {
    try {
      // Don't attempt to update if date is null
      if (!date) return;
      
      // Update the local state first for immediate feedback
      setEventDates(prev => ({
        ...prev,
        [id]: date
      }));
      
      // Format date as ISO string for the API
      const formattedDate = date.toISOString().split('T')[0];
      
      // Update the server data
      await updateEventData(id, { date: formattedDate });
    } catch (err) {
      // Show error message
      setSuccessMessage(err instanceof Error ? err.message : "Failed to update event date");
      setShowSuccess(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 flex items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-[#FF8C00] animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-2 border-l-2 border-[#FF8C00]/50 animate-spin animate-reverse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 flex items-center justify-center">
        <div className="text-white text-center max-w-md p-8 bg-[#1a1a1a] rounded-lg border border-red-500/30">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-zinc-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-20 pb-safe">
      {/* Back Button */}
      <motion.div 
        className="container mx-auto px-4 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link 
          href="/admin"
          className="inline-flex items-center text-[#FF8C00] hover:text-white transition-colors duration-300 group"
        >
          <IoArrowBack className="mr-2 text-xl group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-lg font-medium">Back to Admin</span>
        </Link>
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl sm:text-5xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          EDIT UPCOMING EVENTS
        </motion.h1>

        <div className="space-y-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-[#1a1a1a] rounded-lg p-6 border border-[#FF8C00]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Event {index + 1}</h2>
                <button
                  onClick={() => handleRemoveEvent(event.id)}
                  className="text-red-500 hover:text-red-400 transition-colors"
                  disabled={isSubmitting}
                >
                  <IoTrash className="text-xl" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={event.title}
                    onChange={(e) => handleUpdateEvent(event.id, "title", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <DatePicker
                    selected={eventDates[event.id]}
                    onChange={(date: Date | null) => handleDateChange(event.id, date)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                    isClearable
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input
                    type="text"
                    value={event.time}
                    onChange={(e) => handleUpdateEvent(event.id, "time", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={event.location}
                    onChange={(e) => handleUpdateEvent(event.id, "location", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Cost</label>
                  <input
                    type="text"
                    value={event.cost}
                    onChange={(e) => handleUpdateEvent(event.id, "cost", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Who</label>
                  <input
                    type="text"
                    value={event.who}
                    onChange={(e) => handleUpdateEvent(event.id, "who", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    rows={4}
                    value={event.description}
                    onChange={(e) => handleUpdateEvent(event.id, "description", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Image</label>
                  <ImageUpload
                    name={`event-image-${event.id}`}
                    value={event.image || ''}
                    onChange={(value) => handleUpdateEvent(event.id, "image", value)}
                    onRemove={() => handleUpdateEvent(event.id, "image", "")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Registration Link (Optional)</label>
                  <input
                    type="text"
                    value={event.registrationLink || ''}
                    onChange={(e) => handleUpdateEvent(event.id, "registrationLink", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Promo Code (Optional)</label>
                  <input
                    type="text"
                    value={event.promoCode || ''}
                    onChange={(e) => handleUpdateEvent(event.id, "promoCode", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleAddEventClick}
            className="bg-[#FF8C00] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#FF8C00]/90 transition-colors flex items-center justify-center"
            disabled={isSubmitting}
          >
            <IoAdd className="mr-2" /> Add Event
          </button>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        message={successMessage}
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
      
      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-lg p-6 max-w-md w-full border border-[#FF8C00]/20">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Event</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <DatePicker
                  selected={newEventDate}
                  onChange={(date: Date | null) => setNewEventDate(date)}
                  className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                  isClearable
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="text"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Cost</label>
                <input
                  type="text"
                  value={newEvent.cost}
                  onChange={(e) => setNewEvent({...newEvent, cost: e.target.value})}
                  className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Who</label>
                <input
                  type="text"
                  value={newEvent.who}
                  onChange={(e) => setNewEvent({...newEvent, who: e.target.value})}
                  className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddEventModal(false)}
                className="px-4 py-2 bg-transparent border border-[#FF8C00]/20 rounded-lg text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-[#FF8C00] text-white rounded-lg font-medium hover:bg-[#FF8C00]/90 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Event'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 