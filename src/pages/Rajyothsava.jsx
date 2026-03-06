import { Flag, Music, Users, Award } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"

export default function Rajyothsava() {
  const { t } = useLanguage()

  // Map icons to components
  const iconMap = {
    Flag: Flag,
    Music: Music,
    Users: Users,
    Award: Award
  }

  const highlights = t.rajyothsava.highlights
  const stats = t.rajyothsava["2024"].stats

  return (
    <div className="bg-background">

      {/* PAGE HERO */}
      <section className="bg-primary/90 text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            {t.rajyothsava.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200">
            {t.rajyothsava.subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24 space-y-28">

        {/* INTRO SECTION */}
        <section className="max-w-4xl mx-auto text-center">
          <p className="text-charcoal text-lg leading-relaxed">
            {t.rajyothsava.intro}
          </p>
        </section>

        {/* EVENT HIGHLIGHTS */}
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {highlights.map((item, index) => {
              const IconComponent = iconMap[item.icon]
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition">
                  <IconComponent className="mx-auto text-secondary mb-6" size={40} />
                  <h3 className="font-heading text-xl text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-charcoal">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* 2024 SECTION */}
        <section className="bg-white rounded-3xl shadow-lg p-12 space-y-10">
          <h2 className="font-heading text-3xl text-primary text-center">
            {t.rajyothsava["2024"].title}
          </h2>

          <p className="text-charcoal text-lg leading-relaxed text-center max-w-4xl mx-auto">
            {t.rajyothsava["2024"].description}
          </p>

          {/* STATISTICS */}
          <div className="grid md:grid-cols-3 gap-8 text-center mt-10">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="font-heading text-4xl text-accent mb-2">
                  {stat.value}
                </p>
                <p className="text-charcoal">{stat.label}</p>
              </div>
            ))}
          </div>

        </section>

      </div>
    </div>
  )
}