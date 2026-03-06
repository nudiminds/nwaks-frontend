import { Layers } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"
import Srivasthsa from "../assets/directors/srivasthsa.jpeg"
import Adarsh from "../assets/directors/adarsh.jpeg"
import Suprita from "../assets/directors/suprita.jpeg"
import Harish from "../assets/directors/harish.jpeg"
import Sanjay from "../assets/directors/sanjay.jpeg"
import Mahantesh from "../assets/directors/mahantesh.jpeg"
import Avinash from "../assets/directors/avinash.PNG"
import Santhosh from "../assets/directors/santhosh-anand.jpeg"
import Naveen from "../assets/directors/naveen.jpeg"
import Sudhan from "../assets/directors/sudhan.jpeg"

export default function CoreCommittee() {
  const { t } = useLanguage()
  
  // Map committee members with images
  const committeeMembers = t.coreCommittee.members.map((member, index) => {
    // Map the translated data with actual images
    const images = [
      Srivasthsa, Adarsh, Suprita, Harish, Sanjay, 
      Mahantesh, Avinash, Santhosh, Naveen, Sudhan
    ]
    return {
      ...member,
      image: images[index]
    }
  })

  return (
    <div className="bg-background">

      {/* PAGE HERO */}
      <section className="bg-primary/90 text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            {t.coreCommittee.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200">
            {t.coreCommittee.subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24 space-y-20">

        {/* INTRO */}
        <section className="max-w-4xl mx-auto text-center">
          <Layers className="mx-auto text-secondary mb-6" size={40} />
          <p className="text-charcoal text-lg leading-relaxed">
            {t.coreCommittee.intro}
          </p>
        </section>

        {/* MEMBERS GRID */}
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">

            {committeeMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 text-center"
              >
                {/* Member Image */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-secondary/20">
                  <img 
                    src={member.image} 
                    alt={member.alt}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-heading text-lg text-primary">
                  {member.name}
                </h3>

                <p className="text-accent mt-3 text-sm font-medium">
                  {member.position}
                </p>
              </div>
            ))}

          </div>
        </section>

      </div>
    </div>
  )
}
