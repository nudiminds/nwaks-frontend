/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"
import { getUpcomingEvents } from "../api/events"
import { Link } from "react-router-dom"

export default function UpcomingEvents() {

  const { t, language } = useLanguage()

  const langKey = language?.toLowerCase() === "kn" ? "kn" : "en"

  const getText = (field) => {
    if (!field) return ""
    return field[langKey] || field.en
  }

  const formatDate = (dateString) => {
    // Append T00:00:00 to force parsing in the local timezone and bypass UTC timezone shift
    const date = dateString?.includes?.('T') ? new Date(dateString) : new Date(dateString + 'T00:00:00')

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }

  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const [events, setEvents] = useState([])

  useEffect(() => {

    const fetchEvents = async () => {
      try {

        const res = await getUpcomingEvents()

        // only show 3 events on homepage
        setEvents(res.data.slice(0,3))

      } catch (error) {
        console.error(error)
      }
    }

    fetchEvents()

  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.1
      }
    })
  }

  return (

    <section className="py-12 bg-background relative overflow-hidden" ref={ref}>

      {/* background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #E1AD01 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }}
      />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          variants={headerVariants}
          initial="hidden"
          animate={controls}
        >

          <h2 className="font-heading text-3xl md:text-4xl text-primary mb-2">
            {t.upcomingEventsSection.title}
          </h2>

          <motion.div
            className="w-12 h-0.5 bg-secondary mx-auto mb-3"
            initial={{ width: 0 }}
            animate={isInView ? { width: 48 } : { width: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          />

          <motion.p className="text-charcoal text-sm max-w-2xl mx-auto">
            {t.upcomingEventsSection.subtitle}
          </motion.p>

        </motion.div>


        {/* Event Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >

          {events.map((event, index) => (

            <motion.div
              key={event._id}
              custom={index}
              variants={cardVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 20px 25px rgba(0,0,0,0.1)"
              }}
              className="bg-white rounded-xl shadow-sm overflow-hidden group"
            >

              {/* Image */}
              <div className="overflow-hidden relative">

                <motion.img
                  src={event.image}
                  alt={getText(event.title)}
                  className="h-48 w-full object-cover"
                  whileHover={{ scale: 1.05 }}
                />

                {/* date badge */}
                <div className="absolute top-3 right-3 bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {formatDate(event.date)}
                </div>

              </div>

              {/* content */}
              <div className="p-4">

                <h3 className="font-heading text-xl text-accent mb-2 group-hover:text-primary transition-colors">
                  {getText(event.title)}
                </h3>

                <p className="text-charcoal text-sm leading-relaxed line-clamp-3">
                  {getText(event.description)}
                </p>

                <div className="h-0.5 bg-secondary mt-3 w-0 group-hover:w-full transition-all duration-300" />

                <p className="text-secondary text-xs font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link to="/upcoming-events">
                    {t.upcomingEventsSection.learnMore}
                  </Link>
                </p>

              </div>

            </motion.div>

          ))}

        </motion.div>


        {/* View All Button */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >

          <Link to="/upcoming-events">
            <button className="bg-secondary/10 text-secondary px-6 py-2 rounded-full text-sm font-semibold border border-secondary/30 hover:bg-secondary/20">
              {t.upcomingEventsSection.button}
            </button>
          </Link>

        </motion.div>

      </div>

    </section>
  )
}