import { useState } from "react"
import API from "../../api/axios"
import { useNavigate } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"

export default function CreateAdvertisement() {
  const navigate = useNavigate()

  const [titleEn, setTitleEn] = useState("")
  const [titleKn, setTitleKn] = useState("")
  const [descriptionEn, setDescriptionEn] = useState("")
  const [descriptionKn, setDescriptionKn] = useState("")
  const [link, setLink] = useState("")
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [active] = useState(true)
  const [loading, setLoading] = useState(false)

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

  const createAdvertisement = async (e) => {

  e.preventDefault()

  if (!token) {
    alert("Session expired. Please login again.")
    navigate("/admin/login")
    return
  }

  setLoading(true)

  try {

    let imageUrl = ""

    if (image) {

      const formData = new FormData()
      formData.append("image", image)

      const uploadRes = await API.post(
        "/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      )

      imageUrl = uploadRes.data.imageUrl

    }

    await API.post(
      "/advertisements",
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

    alert("Advertisement created successfully!")
    navigate("/admin/advertisements")

  } catch (error) {

    console.error(error)

    alert(
      "Error creating advertisement: " +
      (error.response?.data?.message || error.message)
    )

  } finally {
    setLoading(false)
  }

}

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-charcoal tracking-tight">
            Create New Advertisement
          </h2>
          <p className="text-gray-500 mt-2">
            Create a promotional ad for your website
          </p>
        </div>

        {/* Form */}
        <form onSubmit={createAdvertisement} className="space-y-8">
          {/* Basic Information Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Advertisement Details
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* English Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title (English) <span className="text-primary">*</span>
                  </label>
                  <input
                    placeholder="e.g., Summer Sale 2024"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (English) <span className="text-primary">*</span>
                  </label>
                  <textarea
                    placeholder="Enter advertisement description in English"
                    rows="4"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Kannada Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title (Kannada) <span className="text-primary">*</span>
                  </label>
                  <input
                    placeholder="ಕನ್ನಡದಲ್ಲಿ ಶೀರ್ಷಿಕೆ"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={titleKn}
                    onChange={(e) => setTitleKn(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Kannada) <span className="text-primary">*</span>
                  </label>
                  <textarea
                    placeholder="ಕನ್ನಡದಲ್ಲಿ ವಿವರಣೆ"
                    rows="4"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    value={descriptionKn}
                    onChange={(e) => setDescriptionKn(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Link and Status Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-secondary rounded-full"></span>
              Link & Status
            </h3>

            <div className="space-y-4">
              {/* Link Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link URL (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </span>
                  <input
                    placeholder="https://example.com/your-ad-page"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Users will be redirected to this link when they click the advertisement
                </p>
              </div>

            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-secondary rounded-full"></span>
              Advertisement Image
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image <span className="text-primary"></span>
                </label>
                
                <div className="flex items-start gap-6">
                  <label className="flex-1 cursor-pointer">
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 hover:border-primary transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm font-medium text-gray-700 mt-2">
                          {imagePreview ? 'Click to change image' : 'Click to upload image'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </label>

                  {imagePreview && (
                    <div className="flex-shrink-0">
                      <p className="text-sm text-gray-500 mb-2">Preview:</p>
                      <div className="relative w-40 h-32 rounded-lg overflow-hidden border border-gray-200 bg-background">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {image && (
                <button
                  type="button"
                  onClick={() => {
                    setImage(null)
                    setImagePreview(null)
                  }}
                  className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove image
                </button>
              )}

              {/* Image Guidelines */}
              <div className="bg-primary/5 rounded-lg p-3 border border-primary/10 mt-4">
                <h4 className="text-xs font-semibold text-primary flex items-center gap-1 mb-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Image Guidelines
                </h4>
                <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                  <li>Recommended size: 1200×630 pixels for best display</li>
                  <li>Square format (1:1) also works well</li>
                  <li>Keep important content within the center for mobile views</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Advertisement...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Advertisement
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => navigate("/admin/advertisements")}
              className="px-8 py-3 border border-gray-200 rounded-lg font-medium text-charcoal hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}