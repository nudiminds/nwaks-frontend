import { Calendar, MapPin } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"
import { useEffect, useState } from "react"
import { getUpcomingEvents } from "../api/events"
import API from "../api/axios"

export default function UpcomingEvents() {

  const { t, language } = useLanguage()
  console.log("Current language: ", language)

  const [events, setEvents] = useState([])

  const langKey = language === "KN" ? "kn" : "en"

  const getText = (field) => {
    if (!field) return ""
    return field[langKey] ? field[langKey] : field.en
  }

  const formatDate = (dateString) => {
    // Append T00:00:00 to force parsing in the local timezone and bypass UTC timezone shift
    const date = dateString.includes('T') ? new Date(dateString) : new Date(dateString + 'T00:00:00')

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  useEffect(() => {

    const fetchEvents = async () => {
      try {
        const res = await getUpcomingEvents()
        setEvents(res.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchEvents()

  }, [language])

  return (

    <div className="bg-background">

      {/* PAGE HERO */}
      <section className="bg-primary/90 text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            {t.upcomingEvents.title}
          </h1>

          <p className="text-lg md:text-2xl text-gray-200">
            {t.upcomingEvents.subtitle}
          </p>
        </div>
      </section>


      <div className="container mx-auto px-6 py-24">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {events.map((event) => (

            <div
              key={event._id + language}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >

              {/* Event Image */}
              {event.image && (
                <div className="w-full h-56 bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={event.image}
                    alt={getText(event.title)}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}

              <div className="p-8">

                {/* Title */}
                <h2 className="font-heading text-2xl text-primary mb-5">
                  {getText(event.title)}
                </h2>

                {/* Date */}
                <div className="flex items-center gap-3 text-charcoal mb-3">
                  <Calendar className="text-secondary flex-shrink-0" size={20} />
                  <span>{formatDate(event.date)}</span>
                </div>

                {/* Location */}
                {event.location && (
                  <div className="flex items-center gap-3 text-charcoal mb-5">
                    <MapPin className="text-secondary flex-shrink-0" size={20} />
                    <span>{getText(event.location)}</span>
                  </div>
                )}

                {/* Description */}
                <p className="text-charcoal leading-relaxed mb-6">
                  {getText(event.description)}
                </p>

                {/* Event Link */}
                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-secondary hover:bg-secondary/90 text-white font-medium rounded-xl shadow-sm transition duration-300"
                  >
                    {t.upcomingEvents.link}
                  </a>
                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>


  )
}