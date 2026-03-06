import { Users, Heart, BookOpen, Globe } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"

export default function AboutNWAKS() {
  const { t } = useLanguage()

  return (
    <div className="bg-background">

      {/* PAGE HERO */}
      <section className="bg-primary/90 text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            {t.aboutnwaks.title}<sup>®</sup>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200">
            {t.aboutnwaks.description}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24 space-y-28">

        {/* ORGANIZATION INTRO */}
        <section className="max-w-5xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-primary mb-8">
            {t.aboutnwaks.intro}
          </h2>

          <p className="text-charcoal text-lg leading-relaxed mb-6">
            {t.aboutnwaks.introDesc1}
          </p>

          <p className="text-charcoal text-lg leading-relaxed">
            {t.aboutnwaks.introDesc2}
          </p>
        </section>

        {/* CORE VALUES SECTION */}
        <section>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl text-primary mb-4">
              {t.aboutnwaks.values}
            </h2>
            <p className="text-charcoal">
              {t.aboutnwaks.valuesDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Community */}
            <div className="bg-white p-10 rounded-2xl shadow-md text-center hover:shadow-xl hover:-translate-y-2 transition duration-300">
              <Users className="mx-auto text-secondary mb-6" size={40} />
              <h3 className="font-heading text-xl text-accent mb-4">
                {t.aboutnwaks.community}
              </h3>
              <p className="text-charcoal leading-relaxed">
                {t.aboutnwaks.communityDesc}
              </p>
            </div>

            {/* Culture */}
            <div className="bg-white p-10 rounded-2xl shadow-md text-center hover:shadow-xl hover:-translate-y-2 transition duration-300">
              <Heart className="mx-auto text-secondary mb-6" size={40} />
              <h3 className="font-heading text-xl text-accent mb-4">
                {t.aboutnwaks.culture}
              </h3>
              <p className="text-charcoal leading-relaxed">
                {t.aboutnwaks.cultureDesc}
              </p>
            </div>

            {/* Language */}
            <div className="bg-white p-10 rounded-2xl shadow-md text-center hover:shadow-xl hover:-translate-y-2 transition duration-300">
              <BookOpen className="mx-auto text-secondary mb-6" size={40} />
              <h3 className="font-heading text-xl text-accent mb-4">
                {t.aboutnwaks.language}
              </h3>
              <p className="text-charcoal leading-relaxed">
                {t.aboutnwaks.languageDesc}
              </p>
            </div>

            {/* Unity */}
            <div className="bg-white p-10 rounded-2xl shadow-md text-center hover:shadow-xl hover:-translate-y-2 transition duration-300">
              <Globe className="mx-auto text-secondary mb-6" size={40} />
              <h3 className="font-heading text-xl text-accent mb-4">
                {t.aboutnwaks.unity}
              </h3>
              <p className="text-charcoal leading-relaxed">
                {t.aboutnwaks.unityDesc}
              </p>
            </div>

          </div>
        </section>

      </div>
    </div>
  )
}