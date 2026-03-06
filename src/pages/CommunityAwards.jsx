import { Award } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"
import award20251 from "../assets/awards/2025-1.png"
import award20252 from "../assets/awards/2025-2.png"
import award2024 from "../assets/awards/2024.png"
import award2023 from "../assets/awards/2023.png"
import award2022 from "../assets/awards/2022.png"

export default function CommunityAwards() {
  const { t } = useLanguage()

  return (
    <div className="bg-background min-h-screen">
      {/* PAGE HERO */}
      <section className="bg-primary/90 text-white py-24 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            {t.communityAwards.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200">
            {t.communityAwards.subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-8xl py-16 md:py-24 space-y-16 md:space-y-24">
        
        {/* 2025 AWARDS */}
        <section className="bg-white rounded-3xl shadow-lg p-6 md:p-12">
          <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12">
            <Award className="text-secondary flex-shrink-0" size={36} />
            <h2 className="font-heading text-2xl md:text-3xl text-primary">
              {t.communityAwards.awards[2025].title}
            </h2>
          </div>

          {/* 2025 Award Images - Alternating Layout */}
          <div className="space-y-12 md:space-y-16">
            {/* Women in Technology - Image Left */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="md:w-2/5 w-full space-y-2">
                <div className="aspect-video overflow-hidden rounded-xl shadow-md bg-gray-50 flex items-center justify-center">
                  <img 
                    src={award20251} 
                    alt={t.communityAwards.awards[2025].womenInTech.imageCaption}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm text-gray-500 text-center">
                  {t.communityAwards.awards[2025].womenInTech.imageCaption}
                </p>
              </div>
              <div className="md:w-3/5 w-full space-y-4">
                <h3 className="font-heading text-xl md:text-2xl text-accent">
                  {t.communityAwards.awards[2025].womenInTech.title}
                </h3>
                <div className="space-y-4 text-charcoal text-base md:text-lg leading-relaxed">
                  <p>{t.communityAwards.awards[2025].womenInTech.description1}</p>
                  <p>{t.communityAwards.awards[2025].womenInTech.description2}</p>
                  <p>{t.communityAwards.awards[2025].womenInTech.description3}</p>
                </div>
              </div>
            </div>

            {/* Chinmaya Mission - Image Right */}
            <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-start">
              <div className="md:w-2/5 w-full space-y-2">
                <div className="aspect-video overflow-hidden rounded-xl shadow-md bg-gray-50 flex items-center justify-center">
                  <img 
                    src={award20252} 
                    alt={t.communityAwards.awards[2025].volunteerExcellence.imageCaption}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm text-gray-500 text-center">
                  {t.communityAwards.awards[2025].volunteerExcellence.imageCaption}
                </p>
              </div>
              <div className="md:w-3/5 w-full space-y-4">
                <h3 className="font-heading text-xl md:text-2xl text-accent">
                  {t.communityAwards.awards[2025].volunteerExcellence.title}
                </h3>
                <div className="space-y-4 text-charcoal text-base md:text-lg leading-relaxed">
                  <p>{t.communityAwards.awards[2025].volunteerExcellence.description1}</p>
                  <p>{t.communityAwards.awards[2025].volunteerExcellence.description2}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2024 AWARD - Image Left */}
        <section className="bg-white rounded-3xl shadow-lg p-6 md:p-12">
          <h2 className="font-heading text-2xl md:text-3xl text-primary mb-6 md:mb-8">
            {t.communityAwards.awards[2024].title}
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="md:w-2/5 w-full space-y-2">
              <div className="aspect-video overflow-hidden rounded-xl shadow-md bg-gray-50 flex items-center justify-center">
                <img 
                  src={award2024} 
                  alt="NWA Food Bank Award Ceremony 2024" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="md:w-3/5 w-full space-y-4">
              <h3 className="font-heading text-xl md:text-2xl text-accent">
                {t.communityAwards.awards[2024].award.title}
              </h3>
              <div className="space-y-4 text-charcoal text-base md:text-lg leading-relaxed">
                <p>{t.communityAwards.awards[2024].award.description1}</p>
                <p>{t.communityAwards.awards[2024].award.description2}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2023 AWARD - Image Right */}
        <section className="bg-white rounded-3xl shadow-lg p-6 md:p-12">
          <h2 className="font-heading text-2xl md:text-3xl text-primary mb-6 md:mb-8">
            {t.communityAwards.awards[2023].title}
          </h2>
          
          <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-start">
            <div className="md:w-2/5 w-full space-y-2">
              <div className="aspect-video overflow-hidden rounded-xl shadow-md bg-gray-50 flex items-center justify-center">
                <img 
                  src={award2023} 
                  alt="Helping Hands Award Ceremony 2023" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="md:w-3/5 w-full space-y-4">
              <h3 className="font-heading text-xl md:text-2xl text-accent">
                {t.communityAwards.awards[2023].award.title}
              </h3>
              <div className="space-y-4 text-charcoal text-base md:text-lg leading-relaxed">
                <p>{t.communityAwards.awards[2023].award.description1}</p>
                <p>{t.communityAwards.awards[2023].award.description2}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2022 AWARD - Image Left */}
        <section className="bg-white rounded-3xl shadow-lg p-6 md:p-12">
          <h2 className="font-heading text-2xl md:text-3xl text-primary mb-6 md:mb-8">
            {t.communityAwards.awards[2022].title}
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="md:w-2/5 w-full space-y-2">
              <div className="aspect-video overflow-hidden rounded-xl shadow-md bg-gray-50 flex items-center justify-center">
                <img 
                  src={award2022} 
                  alt="Raj Yarlagadda Award Ceremony 2022" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="md:w-3/5 w-full space-y-4">
              <h3 className="font-heading text-xl md:text-2xl text-accent">
                {t.communityAwards.awards[2022].award.title}
              </h3>
              <div className="space-y-4 text-charcoal text-base md:text-lg leading-relaxed">
                <p>{t.communityAwards.awards[2022].award.description1}</p>
                <p>{t.communityAwards.awards[2022].award.description2}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}