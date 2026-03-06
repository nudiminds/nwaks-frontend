import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"
import API from "../../api/axios"

export default function CreateEvent() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [titleEn, setTitleEn] = useState("")
  const [titleKn, setTitleKn] = useState("")
  const [descEn, setDescEn] = useState("")
  const [descKn, setDescKn] = useState("")
  const [locEn, setLocEn] = useState("")
  const [locKn, setLocKn] = useState("")
  const [date, setDate] = useState("")
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

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

  const createEvent = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = ""

      if (image) {
        const formData = new FormData()
        formData.append("image", image)

        const uploadRes = await API.post(
          "/upload",
          formData
        )
        imageUrl = uploadRes.data.imageUrl
      }

      await API.post(
        "/events",
        {
          title: { en: titleEn, kn: titleKn },
          description: { en: descEn, kn: descKn },
          location: { en: locEn, kn: locKn },
          date,
          image: imageUrl
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      navigate("/admin/events")
    } catch (error) {
      console.error(error)
      alert("Error creating event")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-charcoal tracking-tight">
            Create New Event
          </h2>
          <p className="text-gray-500 mt-2">
            Fill in the details below to create a new event
          </p>
        </div>

        {/* Form */}
        <form onSubmit={createEvent} className="space-y-8">
          {/* Basic Information Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Basic Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* English Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title (English) <span className="text-primary">*</span>
                  </label>
                  <input
                    placeholder="Enter event title in English"
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
                    placeholder="Enter event description in English"
                    rows="4"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    value={descEn}
                    onChange={(e) => setDescEn(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location (English) <span className="text-primary">*</span>
                  </label>
                  <input
                    placeholder="Enter location in English"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={locEn}
                    onChange={(e) => setLocEn(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Kannada Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title (Kannada)
                  </label>
                  <input
                    placeholder="ಕನ್ನಡದಲ್ಲಿ ಶೀರ್ಷಿಕೆ"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={titleKn}
                    onChange={(e) => setTitleKn(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Kannada)
                  </label>
                  <textarea
                    placeholder="ಕನ್ನಡದಲ್ಲಿ ವಿವರಣೆ"
                    rows="4"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    value={descKn}
                    onChange={(e) => setDescKn(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location (Kannada)
                  </label>
                  <input
                    placeholder="ಕನ್ನಡದಲ್ಲಿ ಸ್ಥಳ"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={locKn}
                    onChange={(e) => setLocKn(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Event Details Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-secondary rounded-full"></span>
              Event Details
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Date <span className="text-primary">*</span>
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Image
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <div className="text-center">
                        <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-500 mt-1">Click to upload image</p>
                      </div>
                    </div>
                  </label>
                  {imagePreview && (
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Event
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => navigate("/admin/events")}
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