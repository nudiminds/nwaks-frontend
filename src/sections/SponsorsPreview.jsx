import { Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"

import { useEffect, useState } from "react"
import { getSponsors } from "../api/sponsors"

export default function SponsorsPreview() {
  const { t, language } = useLanguage()

  const [sponsors, setSponsors] = useState([])

  const langKey = language?.toLowerCase() === "kn" ? "kn" : "en"

  const getText = (field) => {
    if (!field) return ""
    return field[langKey] || field.en
  }

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await getSponsors()
        setSponsors(res.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchSponsors()
  }, [])

  const previewSponsors = sponsors.slice(0, 3) // show only 3

  return (
    <section className="bg-white rounded-2xl shadow-md p-8 text-center">

      <h2 className="font-heading text-2xl text-primary mb-4">
        {t.sponsorsPreview.title}
      </h2>

      <p className="text-charcoal text-base mb-8 max-w-3xl mx-auto">
        {t.sponsorsPreview.subtitle}
      </p>

      {/* SHOW SPONSORS OR COMING SOON */}
      {previewSponsors.length > 0 ? (

        <div className="grid md:grid-cols-3 gap-4 mb-8">

          {previewSponsors.map((sponsor) => (

            <div
              key={sponsor._id}
              className="bg-background p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >

              {sponsor.logo && (
                <img
                  src={sponsor.logo}
                  alt={getText(sponsor.name)}
                  className="h-12 mx-auto object-contain mb-3"
                />
              )}

              <h3 className="font-heading text-base text-primary">
                {getText(sponsor.name)}
              </h3>

            </div>

          ))}

        </div>

      ) : (

        <div className="mb-8">
          <h3 className="text-lg text-primary font-heading">
            {t.sponsors.comingSoon?.title || "Coming Soon..."}
          </h3>
        </div>

      )}

      <Link
        to="/sponsors"
        className="inline-block bg-secondary text-charcoal px-6 py-2 rounded-lg font-semibold hover:bg-support transition text-sm"
      >
        {t.sponsorsPreview.button}
      </Link>

    </section>
  )
}