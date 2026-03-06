import { useEffect, useState } from "react"
import API from "../../api/axios"
import { useNavigate, useParams } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"

export default function EditEvent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [titleEn, setTitleEn] = useState("")
  const [titleKn, setTitleKn] = useState("")
  const [descEn, setDescEn] = useState("")
  const [descKn, setDescKn] = useState("")
  const [locEn, setLocEn] = useState("")
  const [locKn, setLocKn] = useState("")
  const [date, setDate] = useState("")
  const [image, setImage] = useState(null)
  const [currentImage, setCurrentImage] = useState("")
  const [imagePreview, setImagePreview] = useState(null)

  const token = localStorage.getItem("token")

  // Load event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(
          `/events/${id}`
        )
        const event = res.data

        setTitleEn(event.title.en)
        setTitleKn(event.title.kn)
        setDescEn(event.description.en)
        setDescKn(event.description.kn)
        setLocEn(event.location.en)
        setLocKn(event.location.kn)
        setDate(event.date.split("T")[0])
        setCurrentImage(event.image || "")
      } catch (error) {
        console.error(error)
        alert("Error loading event")
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
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

  const deleteEvent = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event? This action cannot be undone."
    )

    if (!confirmDelete) return

    setDeleting(true)
    try {
      await API.delete(
        `/events/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      alert("Event deleted successfully")
      navigate("/admin/events")
    } catch (error) {
      console.error(error)
      alert("Error deleting event")
    } finally {
      setDeleting(false)
    }
  }

  const updateEvent = async (e) => {
    e.preventDefault()
    setUpdating(true)

    try {
      let imageUrl = currentImage

      if (image) {
        const formData = new FormData()
        formData.append("image", image)

        const uploadRes = await API.post(
          "/upload",
          formData
        )
        imageUrl = uploadRes.data.imageUrl
      }

      await API.put(
        `/events/${id}`,
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
      alert("Error updating event")
    } finally {
      setUpdating(false)
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
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-charcoal tracking-tight">
            Edit Event
          </h2>
          <p className="text-gray-500 mt-2">
            Update the event details below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={updateEvent} className="space-y-8">
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
                <div className="space-y-3">
                  {currentImage && !imagePreview && (
                    <div className="relative">
                      <p className="text-xs text-gray-500 mb-2">Current image:</p>
                      <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-200">
                        <img 
                          src={currentImage} 
                          alt="Current" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
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
                          <p className="text-sm text-gray-500 mt-1">
                            {imagePreview ? 'Change image' : 'Click to upload new image'}
                          </p>
                        </div>
                      </div>
                    </label>
                    {imagePreview && (
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={updating}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {updating ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Update Event
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

            <button
              type="button"
              onClick={deleteEvent}
              disabled={deleting}
              className="ml-auto bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 rounded-lg font-medium transition-all duration-200 border border-red-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {deleting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Event
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}