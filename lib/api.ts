// API client for events
export const eventsApi = {
  getAll: async () => {
    const response = await fetch('/api/events')
    if (!response.ok) {
      throw new Error('Failed to fetch events')
    }
    return response.json()
  },

  create: async (eventData: {
    title: string
    date: string
    time: string
    location: string
    cost: string
    who: string
    description: string
    image?: string
    registrationLink?: string
    promoCode?: string
  }) => {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create event')
    }

    return response.json()
  },

  delete: async (id: string) => {
    const response = await fetch(`/api/events/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to delete event')
    }

    return response.json()
  }
} 