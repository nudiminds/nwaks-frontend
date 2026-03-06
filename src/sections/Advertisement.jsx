import { useEffect, useState } from "react"
import { getAdvertisements } from "../api/advertisements"
import { useLanguage } from "../context/LanguageContext"

export default function Advertisement() {
  const { t, language } = useLanguage()
  const [ads, setAds] = useState([])

  const langKey = language === "KN" ? "kn" : "en"

  const getText = (field) => {
    if (!field) return ""
    return field[langKey] ? field[langKey] : field.en
  }

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await getAdvertisements()
        const activeAds = res.data.filter(ad => ad.active === true)
        setAds(activeAds)
      } catch (error) {
        console.error(error)
      }
    }

    fetchAds()
  }, [])

  if (ads.length === 0) return null

  return (
    <div className="sticky top-24 space-y-4">
      {ads.map((ad) => (
        <a
          key={ad._id}
          href={ad.link || "#"}
          target={ad.link ? "_blank" : "_self"}
          rel={ad.link ? "noopener noreferrer" : ""}
          className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 group"
        >
          {/* Conditional Image */}
          {ad.image && (
            <img
              src={ad.image}
              alt={getText(ad.title)}
              className="w-full h-40 object-cover"
              loading="lazy"
            />
          )}

          {/* Content */}
          <div className={`p-4 ${!ad.image ? 'border-l-4 border-secondary' : ''}`}>
            <h3 className="font-semibold text-primary mb-1 line-clamp-1">
              {getText(ad.title) || "Advertisement"}
            </h3>
            
            {getText(ad.description) && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {getText(ad.description)}
              </p>
            )}

            {ad.link ? (
              <span className="text-xs font-medium text-secondary hover:text-secondary/80 transition-colors">
                {t.advertisement.link} →
              </span>
            ) : (
              <span className="text-xs text-gray-400">{t.advertisement.ads}</span>
            )}
          </div>
        </a>
      ))}
    </div>
  )
}