import { Users } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"
import Thilak from "../assets/directors/thilak.jpeg"
import Sapna from "../assets/directors/sapna.jpeg"
import Nataraj from "../assets/directors/nataraj.jpeg"

export default function BoardOfDirectors() {
  const { t } = useLanguage()
  
  // Get directors array from translations based on current language
  const directors = t.boardOfDirectors.directors.map((director, index) => {
    // Map the translated names with the actual images
    const images = [Thilak, Sapna, Nataraj]
    return {
      ...director,
      image: images[index]
    }
  })

  return (
    <div className="bg-background">

      {/* PAGE HERO */}
      <section className="bg-primary/90 text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            {t.boardOfDirectors.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200">
            {t.boardOfDirectors.subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24 space-y-20">

        {/* INTRO SECTION */}
        <section className="max-w-4xl mx-auto text-center">
          <Users className="mx-auto text-secondary mb-6" size={40} />
          <p className="text-charcoal text-lg leading-relaxed">
            {t.boardOfDirectors.intro}
          </p>
        </section>

        {/* DIRECTORS GRID */}
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

            {directors.map((director, index) => (
              <div
                key={index}
                className="bg-white p-12 rounded-3xl shadow-md text-center hover:shadow-xl hover:-translate-y-2 transition duration-300"
              >
                {/* Director Image */}
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-secondary/20">
                  <img 
                    src={director.image} 
                    alt={director.alt}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-heading text-xl text-primary">
                  {director.name}
                </h3>
              </div>
            ))}

          </div>
        </section>

      </div>
    </div>
  )
}