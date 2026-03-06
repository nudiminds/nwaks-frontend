import { Image, Video, Play } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"
import { useEffect, useState } from "react"
import API from "../api/axios"

export default function Media() {
  const { t, language } = useLanguage()
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [playingVideo, setPlayingVideo] = useState(null)

  const langKey = language === "KN" ? "kn" : "en"

  const getText = (field) => field?.[langKey] || field?.en || ""

  /* ================= VIDEO HELPERS ================= */

  const getYoutubeId = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?v=))([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[7].length === 11 ? match[7] : null
  }

  const getVimeoId = (url) => {
    const match = url.match(/vimeo\.com\/(\d+)/)
    return match ? match[1] : null
  }

  const isDirectVideo = (url) => {
    return url.match(/\.(mp4|webm|ogg)$/i)
  }

  /* ================= FETCH MEDIA ================= */

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await API.get("/media")
        setMedia(res.data)
      } catch (error) {
        console.error("Media fetch error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMedia()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  const images = media.filter(m => m.type === "image" && m.image)
  const videos = media.filter(m => m.type === "video" && m.videoUrl)

  return (
    <div className="bg-gradient-to-b from-background to-white">
      <section className="bg-primary/90 text-white py-24 text-center">
        <h1 className="text-4xl font-heading">{t.media.title}</h1>
        <p className="text-xl mt-2">{t.media.subtitle}</p>
      </section>

      <div className="container mx-auto px-6 py-20 space-y-20">

        {/* ================= IMAGES ================= */}

        {images.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Image className="text-secondary" size={24} />
              </div>
              <h2 className="text-3xl font-heading text-charcoal">{t.media.photo}</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {images.map(item => (
                <div
                  key={item._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={item.image}
                      alt={getText(item.title)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5">
                    <p className="font-semibold text-charcoal text-lg">
                      {getText(item.title)}
                    </p>
                    <p>{getText(item.description)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        
        {/* ================= VIDEOS ================= */}

        {videos.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Video className="text-secondary" size={24} />
              </div>
              <h2 className="text-3xl font-heading text-charcoal">
                {t.media.video}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {videos.map(item => {

                const youtubeId = getYoutubeId(item.videoUrl)
                const vimeoId = getVimeoId(item.videoUrl)
                const isFile = isDirectVideo(item.videoUrl)

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border"
                  >
                    <div className="relative aspect-video bg-black">

                      {playingVideo === item._id ? (

                        youtubeId ? (
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                          />
                        ) : vimeoId ? (
                          <iframe
                            className="w-full h-full"
                            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
                            allow="autoplay; fullscreen"
                            allowFullScreen
                          />
                        ) : isFile ? (
                          <video controls autoPlay className="w-full h-full">
                            <source src={item.videoUrl} />
                          </video>
                        ) : (
                          <iframe
                            className="w-full h-full"
                            src={item.videoUrl}
                            allow="autoplay; fullscreen"
                            allowFullScreen
                          />
                        )

                      ) : (

                        <div
                          className="flex items-center justify-center w-full h-full cursor-pointer bg-black"
                          onClick={() => setPlayingVideo(item._id)}
                        >
                          <div className="bg-white p-4 rounded-full shadow-lg">
                            <Play size={30} className="text-primary" />
                          </div>
                        </div>

                      )}
                    </div>

                    <div className="p-5">
                      <p className="font-semibold text-charcoal text-lg">
                        {getText(item.title)}
                      </p>
                      <p>{getText(item.description)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}