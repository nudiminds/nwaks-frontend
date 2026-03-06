import { useState } from "react"
import API from "../../api/axios"
import { useNavigate } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"

export default function CreateMedia() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("basic") // basic, media

  // Title fields
  const [titleEn, setTitleEn] = useState("")
  const [titleKn, setTitleKn] = useState("")

  // Description fields
  const [descEn, setDescEn] = useState("")
  const [descKn, setDescKn] = useState("")

  // Category
  const [category, setCategory] = useState("other")

  // Type (image/video)
  const [type, setType] = useState("image")

  // Media fields
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [videoUrl, setVideoUrl] = useState("")

  const token = localStorage.getItem("token")

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

  const createMedia = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = ""

      if (type === "image" && image) {
        const formData = new FormData()
        formData.append("image", image)

        const uploadRes = await API.post(
          "/upload",
          formData
        )
        imageUrl = uploadRes.data.imageUrl
      }

      const mediaData = {
        title: {
          en: titleEn,
          kn: titleKn
        },
        description: {
          en: descEn,
          kn: descKn
        },
        category,
        type
      }

      if (type === "image") {
        mediaData.image = imageUrl
      } else {
        mediaData.videoUrl = videoUrl
      }

      await API.post(
        "/media",
        mediaData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate("/admin/media")

    } catch (error) {
      console.error(error)
      alert("Error creating media")
    } finally {
      setLoading(false)
    }
  }

  const categoryIcons = {
    event: "🎪",
    festival: "🎉",
    community: "👥",
    other: "📁"
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header with Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-charcoal tracking-tight">
                Upload New Media
              </h2>
              <p className="text-gray-500 mt-1">
                Add images or videos to your media gallery
              </p>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-2 ${activeTab === 'basic' ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  activeTab === 'basic' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  1
                </div>
                <span className="text-sm font-medium text-charcoal">Details</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-200"></div>
              <div className={`flex items-center gap-2 ${activeTab === 'media' ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  activeTab === 'media' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
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
                activeTab === "basic" 
                  ? "text-primary" 
                  : "text-gray-500 hover:text-gray-700"
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
                activeTab === "media" 
                  ? "text-primary" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Media Upload
              {activeTab === "media" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
              )}
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={createMedia}>
          {/* Basic Information Section - Conditionally shown */}
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
                          placeholder="e.g., Annual Festival 2024"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          value={titleEn}
                          onChange={(e) => setTitleEn(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Description
                      </label>
                      <textarea
                        placeholder="Describe this media item in English..."
                        rows="5"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                        value={descEn}
                        onChange={(e) => setDescEn(e.target.value)}
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
                        Description
                      </label>
                      <textarea
                        placeholder="ಕನ್ನಡದಲ್ಲಿ ವಿವರಣೆ..."
                        rows="5"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                        value={descKn}
                        onChange={(e) => setDescKn(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => navigate("/admin/media")}
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
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Media Upload Section - Conditionally shown */}
          {activeTab === "media" && (
            <div className="space-y-6 animate-fadeIn">
              {/* Category and Type Selection */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-secondary rounded-full"></span>
                  Media Settings
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Category Selection - Card Style */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Category <span className="text-primary">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["event", "festival", "community", "other"].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            category === cat
                              ? "border-primary bg-primary/5"
                              : "border-gray-100 hover:border-gray-200 bg-gray-50"
                          }`}
                        >
                          <div className="text-2xl mb-1">{categoryIcons[cat]}</div>
                          <div className={`text-sm font-medium ${
                            category === cat ? "text-primary" : "text-gray-600"
                          }`}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Media Type Selection - Card Style */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Media Type <span className="text-primary">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setType("image")}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          type === "image"
                            ? "border-primary bg-primary/5"
                            : "border-gray-100 hover:border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="text-2xl mb-1">📷</div>
                        <div className={`text-sm font-medium ${
                          type === "image" ? "text-primary" : "text-gray-600"
                        }`}>
                          Image
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setType("video")}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          type === "video"
                            ? "border-primary bg-primary/5"
                            : "border-gray-100 hover:border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="text-2xl mb-1">🎥</div>
                        <div className={`text-sm font-medium ${
                          type === "video" ? "text-primary" : "text-gray-600"
                        }`}>
                          Video
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conditional Fields based on Type */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                {type === "image" ? (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Image <span className="text-primary">*</span>
                    </label>
                    
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <label className="flex-1 cursor-pointer w-full">
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 hover:border-primary transition-colors text-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            required={type === "image" && !image}
                          />
                          <div className="space-y-3">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                {imagePreview ? 'Click to change image' : 'Drop your image here or browse'}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Supports: PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </label>

                      {imagePreview && (
                        <div className="flex-shrink-0 w-full md:w-48">
                          <p className="text-sm text-gray-500 mb-2">Preview:</p>
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
                ) : (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Video URL <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <input
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        required={type === "video"}
                      />
                    </div>
                    
                    {/* Video URL Tips */}
                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4 border border-primary/10">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary text-xs">ℹ️</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-primary mb-1">Supported Platforms</p>
                          <p className="text-xs text-gray-600">
                            YouTube, Vimeo, or direct video links. Make sure the video is publicly accessible.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("basic")}
                  className="px-6 py-3 border border-gray-200 rounded-lg font-medium text-charcoal hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Back
                </button>
                
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/admin/media")}
                    className="px-6 py-3 border border-gray-200 rounded-lg font-medium text-charcoal hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload Media
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
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </AdminLayout>
  )
}