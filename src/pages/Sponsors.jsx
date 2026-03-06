import { Crown, Star, Medal } from "lucide-react"
import { Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import { useEffect, useState } from "react"
import { getSponsors } from "../api/sponsors"

export default function Sponsors() {

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

  const platinum = sponsors.filter(s => s.category === "platinum")
  const gold = sponsors.filter(s => s.category === "gold")
  const silver = sponsors.filter(s => s.category === "silver")

  const noSponsors =
    platinum.length === 0 &&
    gold.length === 0 &&
    silver.length === 0

  const SponsorCard = ({ sponsor, large }) => (

    <div className={`bg-white ${large ? "p-10 rounded-3xl shadow-lg" : "p-6 rounded-xl shadow-sm"} text-center hover:shadow-xl transition`}>

      {sponsor.logo && (

        <img
          src={sponsor.logo}
          alt={getText(sponsor.name)}
          className="h-20 mx-auto object-contain mb-4"
        />

      )}

      <h3 className={`font-heading ${large ? "text-2xl text-accent" : "text-lg text-primary"}`}>
        {getText(sponsor.name)}
      </h3>

      {sponsor.website && (

        <a
          href={sponsor.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary text-sm block mt-2 hover:underline"
        >
          {t.sponsors.visit}
        </a>

      )}

    </div>

  )

  return (

    <div className="bg-background">

      {/* PAGE HERO */}
      <section className="bg-primary/90 text-white py-24 text-center">

        <div className="container mx-auto px-6">

          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            {t.sponsors.title}
          </h1>

          <p className="text-lg md:text-2xl text-gray-200">
            {t.sponsors.subtitle}
          </p>

        </div>

      </section>


      <div className="container mx-auto px-6 py-24 space-y-24">

        {noSponsors && (
          <div className="text-center py-20">
            <h2 className="font-heading text-3xl text-primary mb-4">
              {t.sponsors.coming}
            </h2>
            <p className="text-charcoal text-lg">
              {t.sponsors.des}
            </p>
          </div>
        )}

        {/* PLATINUM */}
        {platinum.length > 0 && (

          <section>

            <div className="text-center mb-12">

              <Crown className="mx-auto text-secondary mb-4" size={40} />

              <h2 className="font-heading text-3xl text-primary">
                {t.sponsors.platinum.title}
              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

              {platinum.map((sponsor) => (

                <SponsorCard key={sponsor._id} sponsor={sponsor} large />

              ))}

            </div>

          </section>

        )}


        {/* GOLD */}
        {gold.length > 0 && (

          <section>

            <div className="text-center mb-12">

              <Star className="mx-auto text-secondary mb-4" size={40} />

              <h2 className="font-heading text-3xl text-primary">
                {t.sponsors.gold.title}
              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

              {gold.map((sponsor) => (

                <SponsorCard key={sponsor._id} sponsor={sponsor} />

              ))}

            </div>

          </section>

        )}


        {/* SILVER */}
        {silver.length > 0 && (

          <section>

            <div className="text-center mb-12">

              <Medal className="mx-auto text-secondary mb-4" size={40} />

              <h2 className="font-heading text-3xl text-primary">
                {t.sponsors.silver.title}
              </h2>

            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

              {silver.map((sponsor) => (

                <SponsorCard key={sponsor._id} sponsor={sponsor} />

              ))}

            </div>

          </section>

        )}


        {/* CTA */}
        <section className="bg-white rounded-3xl shadow-lg p-12 text-center max-w-4xl mx-auto">

          <h2 className="font-heading text-3xl text-primary mb-6">
            {t.sponsors.cta.title}
          </h2>

          <p className="text-charcoal text-lg leading-relaxed mb-8">
            {t.sponsors.cta.description}
          </p>

          <Link
            to="/contact"
            className="inline-block bg-secondary text-charcoal px-8 py-3 rounded-lg font-semibold hover:bg-support transition"
          >
            {t.sponsors.cta.button}
          </Link>

        </section>

      </div>

    </div>

  )

}