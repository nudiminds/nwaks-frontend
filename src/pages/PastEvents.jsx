import { Calendar, MapPin } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"
import { useEffect, useState } from "react"
import { getPastEvents } from "../api/events"

export default function PastEvents() {

  const { t, language } = useLanguage()
  const [events, setEvents] = useState([])

  // language resolver
  const langKey = language?.toLowerCase() === "kn" ? "kn" : "en"

  // helper to select correct language
  const getText = (field) => field?.[langKey] || field?.en || ""

  // format date
  const formatDate = (dateString) => {
    // Append T00:00:00 to force parsing in the local timezone and bypass UTC timezone shift
    const date = dateString?.includes?.('T') ? new Date(dateString) : new Date(dateString + 'T00:00:00')

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  useEffect(() => {

    const fetchEvents = async () => {
      try {
        const res = await getPastEvents()
        setEvents(res.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchEvents()

  }, [])

  return (

    <div className="bg-background">

      {/* PAGE HERO */}
      <section className="bg-primary/90 text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            {t.pastEvents.title}
          </h1>

          <p className="text-lg md:text-2xl text-gray-200">
            {t.pastEvents.subtitle}
          </p>
        </div>
      </section>


      <div className="container mx-auto px-6 py-24">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {events.map((event) => (

            <div
              key={`${event._id}-${language}`}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
            >

              {/* Event Image */}
              {event.image && (
                <img
                  src={event.image}
                  alt={getText(event.title)}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-6 flex flex-col flex-grow">

                {/* Title */}
                <h2 className="font-heading text-xl text-primary mb-4">
                  {getText(event.title)}
                </h2>

                {/* Event Info */}
                <div className="space-y-2 text-charcoal text-sm mb-4">

                  <div className="flex items-center gap-2">
                    <Calendar className="text-secondary flex-shrink-0" size={16} />
                    <span>{formatDate(event.date)}</span>
                  </div>

                  {event.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="text-secondary flex-shrink-0" size={16} />
                      <span>{getText(event.location)}</span>
                    </div>
                  )}

                </div>

                {/* Description */}
                <p className="text-charcoal leading-relaxed text-sm flex-grow">
                  {getText(event.description)}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}