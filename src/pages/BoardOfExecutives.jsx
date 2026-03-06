import { Briefcase } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"
import Shashidhara from "../assets/directors/shashidhara.jpg"
import Rakesh from "../assets/directors/rakesh.jpeg"
import Santhosh from "../assets/directors/santhosh-kumar.jpeg"
import Bhagawan from "../assets/directors/bhagawan.jpeg"

export default function BoardOfExecutives() {
  const { t } = useLanguage()
  
  // Map executives data with translations
  const executives = t.boardOfExecutives.executives.map((exec, index) => {
    // Map the translated data with actual images
    const images = [Shashidhara, Rakesh, Santhosh, Bhagawan]
    return {
      ...exec,
      image: images[index]
    }
  })

  return (
    <div className="bg-background">

      {/* PAGE HERO */}
      <section className="bg-primary/90 text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            {t.boardOfExecutives.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200">
            {t.boardOfExecutives.subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24 space-y-20">

        {/* INTRO */}
        <section className="max-w-4xl mx-auto text-center">
          <Briefcase className="mx-auto text-secondary mb-6" size={40} />
          <p className="text-charcoal text-lg leading-relaxed">
            {t.boardOfExecutives.intro}
          </p>
        </section>

        {/* EXECUTIVES GRID */}
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">

            {executives.map((executive, index) => (
              <div
                key={index}
                className="bg-white p-10 rounded-3xl shadow-md text-center hover:shadow-xl hover:-translate-y-2 transition duration-300"
              >
                {/* Executive Image */}
                <div className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden border-4 border-secondary/20">
                  <img 
                    src={executive.image} 
                    alt={executive.alt}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-heading text-lg text-primary">
                  {executive.name}
                </h3>

                <p className="text-accent mt-3 font-semibold">
                  {executive.position}
                </p>
              </div>
            ))}

          </div>
        </section>

      </div>
    </div>
  )
}