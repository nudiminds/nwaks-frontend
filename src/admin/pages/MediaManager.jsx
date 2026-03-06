import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../../api/axios"
import AdminLayout from "../layout/AdminLayout"

export default function AdminMedia() {
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const fetchMedia = async () => {
    try {
      setLoading(true)
      const res = await API.get(
        "/media"
      )
      setMedia(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMedia()
  }, [])

  const filteredMedia = media.filter(item => {
    const typeMatch = filter === "all" || item.type === filter
    const categoryMatch = categoryFilter === "all" || item.category === categoryFilter
    return typeMatch && categoryMatch
  })

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this media?")) {
      try {
        const token = localStorage.getItem("token")
        await API.delete(
          `/media/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        fetchMedia()
      } catch (error) {
        console.error(error)
        alert("Error deleting media")
      }
    }
  }

  const getCategoryBadgeColor = (category) => {
    switch(category) {
      case "event": return "bg-blue-100 text-blue-700 border-blue-200"
      case "festival": return "bg-secondary/20 text-secondary/80 border-secondary/30"
      case "community": return "bg-purple-100 text-purple-700 border-purple-200"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getTypeBadgeColor = (type) => {
    return type === "image" 
      ? "bg-primary/10 text-primary border-primary/20" 
      : "bg-charcoal/10 text-charcoal border-charcoal/20"
  }

  const getYoutubeId = (url) => {
    const reg =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?v=))([^#&?]*).*/
    const match = url?.match(reg)
    return match && match[7].length === 11 ? match[7] : null
  }

  const getVimeoId = (url) => {
    const match = url?.match(/vimeo\.com\/(\d+)/)
    return match ? match[1] : null
  }

  const isDirectVideo = (url) => {
    return url?.match(/\.(mp4|webm|ogg)$/i)
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-charcoal tracking-tight">
              Media Gallery
            </h2>
            <p className="text-gray-500 mt-1">
              Manage images and videos for your events
            </p>
          </div>

          <Link
            to="/admin/media/create"
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Upload Media
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
            <p className="mt-3 text-gray-500">Loading media gallery...</p>
          </div>
        )}

        {/* Media Grid */}
        {!loading && (
          <>
            {filteredMedia.length === 0 ? (
              <div className="bg-background rounded-xl p-12 text-center border border-gray-100">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-2">No media found</h3>
                <p className="text-gray-500 mb-6">
                  {filter !== "all" || categoryFilter !== "all" 
                    ? "Try adjusting your filters" 
                    : "Get started by uploading your first media item"}
                </p>
                {(filter !== "all" || categoryFilter !== "all") ? (
                  <button
                    onClick={() => {
                      setFilter("all")
                      setCategoryFilter("all")
                    }}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Clear all filters
                  </button>
                ) : (
                  <Link
                    to="/admin/media/create"
                    className="inline-flex bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Upload Your First Media
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMedia.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 group"
                  >
                    {/* Media Preview */}
                    <div className="h-48 bg-gray-100 relative overflow-hidden">
                      {item.type === "image" ? (
                        <img
                          src={item.image || "/placeholder-image.jpg"}
                          alt={item.title?.en}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-full h-full bg-black">

                          {(() => {
                            const youtubeId = getYoutubeId(item.videoUrl)
                            const vimeoId = getVimeoId(item.videoUrl)
                            const isFile = isDirectVideo(item.videoUrl)

                            if (youtubeId) {
                              return (
                                <iframe
                                  className="w-full h-full"
                                  src={`https://www.youtube.com/embed/${youtubeId}`}
                                  allowFullScreen
                                />
                              )
                            }

                            if (vimeoId) {
                              return (
                                <iframe
                                  className="w-full h-full"
                                  src={`https://player.vimeo.com/video/${vimeoId}`}
                                  allowFullScreen
                                />
                              )
                            }

                            if (isFile) {
                              return (
                                <video controls className="w-full h-full object-cover">
                                  <source src={item.videoUrl} />
                                </video>
                              )
                            }

                            return (
                              <iframe
                                className="w-full h-full"
                                src={item.videoUrl}
                                allowFullScreen
                              />
                            )
                          })()}

                        </div>
                      )}

                      {/* Type Badge */}
                      <span className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full border shadow-sm ${getTypeBadgeColor(item.type)}`}>
                        {item.type === "image" ? "📷 Image" : "🎥 Video"}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="mb-3">
                        <h3 className="font-semibold text-lg text-charcoal mb-1 line-clamp-1">
                          {item.title?.en}
                        </h3>
                        
                        {item.title?.kn && (
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {item.title.kn}
                          </p>
                        )}
                      </div>

                      {/* Category and Date Row */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryBadgeColor(item.category)}`}>
                          {item.category}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(item.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      {/* Description Preview */}
                      {item.description?.en && (
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2 border-l-2 border-primary/20 pl-3">
                          {item.description.en}
                        </p>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <Link
                          to={`/admin/media/edit/${item._id}`}
                          className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  )
}