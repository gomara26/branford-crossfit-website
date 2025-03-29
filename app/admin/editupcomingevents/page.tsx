"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ImageUpload } from "@/components/ui/image-upload";
import { SuccessModal } from "@/components/ui/success-modal";

interface UpcomingEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  cost: string;
  who: string;
  description: string;
  image: string;
  registrationLink?: string;
  promoCode?: string;
}

export default function EditUpcomingEvents() {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const adminAuth = Cookies.get("adminAuth");
    if (!adminAuth || adminAuth !== "true") {
      router.push("/admin/login");
      return;
    }

    // Load events from localStorage
    const savedEvents = localStorage.getItem("upcomingEvents");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
    setIsLoading(false);
  }, [router]);

  const saveEvents = () => {
    localStorage.setItem("upcomingEvents", JSON.stringify(events));
    setSuccessMessage("Events saved successfully!");
    setShowSuccess(true);
  };

  const addEvent = () => {
    const newEvent: UpcomingEvent = {
      title: "New Event",
      date: "2024",
      time: "TBD",
      location: "TBD",
      cost: "TBD",
      who: "All members",
      description: "Add event description here",
      image: ""
    };
    setEvents([...events, newEvent]);
  };

  const removeEvent = (index: number) => {
    if (events.length > 1) {
      const newEvents = events.filter((_, i) => i !== index);
      setEvents(newEvents);
    } else {
      setSuccessMessage("You must have at least one event");
      setShowSuccess(true);
    }
  };

  const updateEvent = (index: number, field: keyof UpcomingEvent, value: string) => {
    const newEvents = [...events];
    newEvents[index] = { ...newEvents[index], [field]: value };
    setEvents(newEvents);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
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
              key={index}
              className="bg-[#1a1a1a] rounded-lg p-6 border border-[#FF8C00]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Event {index + 1}</h2>
                <button
                  onClick={() => removeEvent(index)}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={event.title}
                    onChange={(e) => updateEvent(index, "title", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="text"
                    value={event.date}
                    onChange={(e) => updateEvent(index, "date", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input
                    type="text"
                    value={event.time}
                    onChange={(e) => updateEvent(index, "time", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={event.location}
                    onChange={(e) => updateEvent(index, "location", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Cost</label>
                  <input
                    type="text"
                    value={event.cost}
                    onChange={(e) => updateEvent(index, "cost", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Who</label>
                  <input
                    type="text"
                    value={event.who}
                    onChange={(e) => updateEvent(index, "who", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={event.description}
                    onChange={(e) => updateEvent(index, "description", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Registration Link</label>
                  <input
                    type="text"
                    value={event.registrationLink || ""}
                    onChange={(e) => updateEvent(index, "registrationLink", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Promo Code</label>
                  <input
                    type="text"
                    value={event.promoCode || ""}
                    onChange={(e) => updateEvent(index, "promoCode", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Image</label>
                  <ImageUpload
                    value={event.image}
                    onChange={(value) => updateEvent(index, "image", value)}
                    onRemove={() => updateEvent(index, "image", "")}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={addEvent}
            className="bg-[#FF8C00] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#FF8C00]/90 transition-colors"
          >
            Add Event
          </button>
          <button
            onClick={saveEvents}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      <SuccessModal
        message={successMessage}
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </main>
  );
} 