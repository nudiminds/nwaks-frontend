import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"
import API from "../../api/axios"

export default function EventsList() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events")
      setEvents(res.data)
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcoming = events.filter(e => new Date(e.date) >= today)
  const past = events.filter(e => new Date(e.date) < today)

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-charcoal tracking-tight">
              Events Manager
            </h2>
            <p className="text-gray-500 mt-1">
              Manage all your NWAKS events in one place
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/events/create")}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Event
          </button>
        </div>

        {loading ? (
          // Loading Skeleton
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* UPCOMING EVENTS */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  <h3 className="text-xl font-semibold text-charcoal">
                    Upcoming Events
                  </h3>
                </div>
                <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                  {upcoming.length} events
                </span>
              </div>

              {upcoming.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcoming.map(event => (
                    <EventCard
                      key={event._id}
                      event={event}
                      navigate={navigate}
                      type="upcoming"
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-background rounded-xl p-8 text-center border border-gray-100">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-charcoal font-medium mb-2">No upcoming events</p>
                  <p className="text-gray-500 text-sm">Create your first event to get started</p>
                </div>
              )}
            </div>

            {/* PAST EVENTS */}
            {past.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-6 bg-secondary rounded-full"></span>
                    <h3 className="text-xl font-semibold text-charcoal">
                      Past Events
                    </h3>
                  </div>
                  <span className="bg-secondary/10 text-secondary/80 text-sm font-medium px-3 py-1 rounded-full">
                    {past.length} events
                  </span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {past.map(event => (
                    <EventCard
                      key={event._id}
                      event={event}
                      navigate={navigate}
                      type="past"
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  )
}

function EventCard({ event, navigate, type }) {
  const eventDate = new Date(event.date)
  
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 group ${
      type === 'past' ? 'opacity-75 hover:opacity-100' : ''
    }`}>
      <div className="relative">
        <img
          src={event.image || '/api/placeholder/400/200'}
          alt={event.title.en}
          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            e.target.src = '/api/placeholder/400/200'
          }}
        />
        {type === 'upcoming' && (
          <div className="absolute top-3 right-3 bg-primary text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg">
            Upcoming
          </div>
        )}
        {type === 'past' && (
          <div className="absolute top-3 right-3 bg-charcoal/70 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
            Past Event
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-charcoal mb-2 line-clamp-1">
          {event.title.en}
        </h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <svg className="w-4 h-4 mr-1.5 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {eventDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/admin/events/edit/${event._id}`)}
            className="flex-1 bg-primary/5 hover:bg-primary/10 text-primary font-medium py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 border border-primary/10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          
          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors duration-200 border border-gray-200 flex items-center justify-center"
              title="Visit Link"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}

          {type === 'upcoming' && (
            <button
              onClick={() => {/* Add publish functionality */}}
              className="px-3 py-2.5 bg-secondary/10 hover:bg-secondary/20 text-secondary/80 rounded-lg transition-colors duration-200"
              title="Publish event"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}