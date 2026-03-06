import { HeartHandshake, Users, Home, GraduationCap } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"

export default function CommunitySupport() {
  const { t } = useLanguage()

  return (
    <div className="bg-background">

      {/* PAGE HERO */}
      <section className="bg-primary/90 text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            {t.communitySupport.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200">
            {t.communitySupport.subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24 space-y-20">

        {/* INTRO */}
        <section className="max-w-4xl mx-auto text-center">
          <p className="text-charcoal text-lg leading-relaxed">
            {t.communitySupport.coming}
          </p>
        </section>

        

      </div>
    </div>
  )
}