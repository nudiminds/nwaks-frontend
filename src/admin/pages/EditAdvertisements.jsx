import { useEffect, useState } from "react"
import API from "../../api/axios"
import { useNavigate, useParams } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"

export default function EditAdvertisement() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  const [titleEn, setTitleEn] = useState("")
  const [titleKn, setTitleKn] = useState("")
  const [descriptionEn, setDescriptionEn] = useState("")
  const [descriptionKn, setDescriptionKn] = useState("")
  const [link, setLink] = useState("")
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [currentImage, setCurrentImage] = useState("")
  const [active, setActive] = useState(true)

  const token = localStorage.getItem("token")

  // Fetch advertisement data
  useEffect(() => {
    const fetchAdvertisement = async () => {
      try {
        const res = await API.get(`/advertisements/${id}`)
        const ad = res.data

        setTitleEn(ad.title?.en || "")
        setTitleKn(ad.title?.kn || "")
        setDescriptionEn(ad.description?.en || "")
        setDescriptionKn(ad.description?.kn || "")
        setLink(ad.link || "")
        setCurrentImage(ad.image || "")
        setActive(ad.active)
      } catch (error) {
        console.error(error)
        alert("Error fetching advertisement")
      } finally {
        setLoading(false)
      }
    }

    fetchAdvertisement()
  }, [id])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  // Update advertisement
  const updateAdvertisement = async (e) => {
    e.preventDefault()
    setUpdating(true)

    try {
      let imageUrl = currentImage

      if (image) {
        const formData = new FormData()
        formData.append("image", image)

        const uploadRes = await API.post("/upload", formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        imageUrl = uploadRes.data.imageUrl
      }

      await API.put(
        `/advertisements/${id}`,
        {
          title: {
            en: titleEn,
            kn: titleKn
          },
          description: {
            en: descriptionEn,
            kn: descriptionKn
          },
          link,
          image: imageUrl,
          active
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate("/admin/advertisements")
    } catch (error) {
      console.error(error)
      alert("Error updating advertisement")
    } finally {
      setUpdating(false)
    }
  }

  // Delete advertisement
  const deleteAdvertisement = async () => {
    if (!window.confirm("Are you sure you want to delete this advertisement? This action cannot be undone."))
      return

    setDeleting(true)
    try {
      await API.delete(`/advertisements/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      navigate("/admin/advertisements")
    } catch (error) {
      console.error(error)
      alert("Error deleting advertisement")
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header with Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-charcoal tracking-tight">
                Edit Advertisement
              </h2>
              <p className="text-gray-500 mt-1">
                Update your advertisement details
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 ${
                  activeTab === "basic" ? "opacity-100" : "opacity-50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    activeTab === "basic"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  1
                </div>
                <span className="text-sm font-medium text-charcoal">Details</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-200"></div>
              <div
                className={`flex items-center gap-2 ${
                  activeTab === "media" ? "opacity-100" : "opacity-50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    activeTab === "media"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  2
                </div>
                <span className="text-sm font-medium text-charcoal">Media</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-gray-200">
            <button
              type="button"
              onClick={() => setActiveTab("basic")}
              className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                activeTab === "basic" ? "text-primary" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Basic Information
              {activeTab === "basic" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("media")}
              className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                activeTab === "media" ? "text-primary" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Media & Settings
              {activeTab === "media" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
              )}
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={updateAdvertisement}>
          {/* Basic Information Section */}
          {activeTab === "basic" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fadeIn">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - English */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold">EN</span>
                    </div>
                    <h3 className="font-semibold text-charcoal">English</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Title <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          📝
                        </span>
                        <input
                          placeholder="e.g., Summer Sale 2024"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          value={titleEn}
                          onChange={(e) => setTitleEn(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Description <span className="text-primary">*</span>
                      </label>
                      <textarea
                        placeholder="Describe your advertisement in English..."
                        rows="5"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                        value={descriptionEn}
                        onChange={(e) => setDescriptionEn(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Kannada */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <span className="text-secondary font-bold">ಕ</span>
                    </div>
                    <h3 className="font-semibold text-charcoal">Kannada</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Title <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          📝
                        </span>
                        <input
                          placeholder="ಕನ್ನಡದಲ್ಲಿ ಶೀರ್ಷಿಕೆ"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          value={titleKn}
                          onChange={(e) => setTitleKn(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Description <span className="text-primary">*</span>
                      </label>
                      <textarea
                        placeholder="ಕನ್ನಡದಲ್ಲಿ ವಿವರಣೆ..."
                        rows="5"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                        value={descriptionKn}
                        onChange={(e) => setDescriptionKn(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => navigate("/admin/advertisements")}
                  className="px-6 py-2.5 border border-gray-200 rounded-lg font-medium text-charcoal hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("media")}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  Continue to Media
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Media & Settings Section */}
          {activeTab === "media" && (
            <div className="space-y-6 animate-fadeIn">
              {/* Link and Status Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-secondary rounded-full"></span>
                  Link & Status
                </h3>

                <div className="space-y-4">
                  {/* Link Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Link URL (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                      </span>
                      <input
                        placeholder="https://example.com/your-ad-page"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <svg
                        className="w-3 h-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Users will be redirected to this link when they click the advertisement
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-secondary rounded-full"></span>
                  Advertisement Image
                </h3>

                <div className="space-y-4">
                  {/* Current Image Display */}
                  {currentImage && !imagePreview && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Image
                      </label>
                      <div className="relative w-64 h-36 rounded-xl overflow-hidden border border-gray-200">
                        <img
                          src={currentImage}
                          alt="Current advertisement"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Upload New Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {currentImage ? "Change Image (Optional)" : "Upload Image"}
                      {!currentImage && <span className="text-primary ml-1">*</span>}
                    </label>

                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <label className="flex-1 cursor-pointer w-full">
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-primary transition-colors text-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          <div className="space-y-2">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                              <svg
                                className="w-6 h-6 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                {imagePreview
                                  ? "Click to change image"
                                  : currentImage
                                  ? "Click to upload new image"
                                  : "Drop your image here or browse"}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </label>

                      {imagePreview && (
                        <div className="flex-shrink-0 w-full md:w-48">
                          <p className="text-sm text-gray-500 mb-2">New preview:</p>
                          <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-background aspect-square">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImage(null)
                                setImagePreview(null)
                              }}
                              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Image Guidelines */}
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4 border border-primary/10 mt-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs">ℹ️</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-primary mb-1">
                          Image Guidelines
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                          <li>Recommended size: 1200×630 pixels for best display</li>
                          <li>Square format (1:1) also works well</li>
                          <li>Keep important content within the center for mobile views</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("basic")}
                  className="px-6 py-3 border border-gray-200 rounded-lg font-medium text-charcoal hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                  Back
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/admin/advertisements")}
                    className="px-6 py-3 border border-gray-200 rounded-lg font-medium text-charcoal hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={updating}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {updating ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Updating...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                        Update Advertisement
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={deleteAdvertisement}
                    disabled={deleting}
                    className="bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 rounded-lg font-medium transition-all border border-red-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {deleting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-red-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </AdminLayout>
  )
}