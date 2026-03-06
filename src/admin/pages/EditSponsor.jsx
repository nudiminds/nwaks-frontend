import { useEffect, useState } from "react"
import API from "../../api/axios"
import { useNavigate, useParams } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"

export default function EditSponsor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [nameEn, setNameEn] = useState("")
  const [nameKn, setNameKn] = useState("")
  const [category, setCategory] = useState("silver")
  const [website, setWebsite] = useState("")
  const [logo, setLogo] = useState(null)
  const [currentLogo, setCurrentLogo] = useState("")
  const [logoPreview, setLogoPreview] = useState(null)

  const token = localStorage.getItem("token")

  // Category colors for display
  const categoryColors = {
    platinum: "bg-purple-100 text-purple-700 border-purple-200",
    gold: "bg-secondary/20 text-secondary/80 border-secondary/30",
    silver: "bg-gray-100 text-gray-700 border-gray-200"
  }

  useEffect(() => {
    const fetchSponsor = async () => {
      try {
        const res = await API.get(
          `/sponsors/${id}`
        )
        const sponsor = res.data

        setNameEn(sponsor.name.en)
        setNameKn(sponsor.name.kn)
        setCategory(sponsor.category)
        setWebsite(sponsor.website || "")
        setCurrentLogo(sponsor.logo || "")
      } catch (error) {
        console.error(error)
        alert("Error loading sponsor")
      } finally {
        setLoading(false)
      }
    }

    fetchSponsor()
  }, [id])

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    setLogo(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setLogoPreview(null)
    }
  }

  const updateSponsor = async (e) => {
    e.preventDefault()
    setUpdating(true)

    try {
      let logoUrl = currentLogo

      if (logo) {
        const formData = new FormData()
        formData.append("image", logo)

        const uploadRes = await API.post(
          "/upload",
          formData
        )
        logoUrl = uploadRes.data.imageUrl
      }

      await API.put(
        `/sponsors/${id}`,
        {
          name: {
            en: nameEn,
            kn: nameKn
          },
          category,
          website,
          logo: logoUrl
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate("/admin/sponsors")
    } catch (error) {
      console.error(error)
      alert("Error updating sponsor")
    } finally {
      setUpdating(false)
    }
  }

  const deleteSponsor = async () => {
    if (!window.confirm("Are you sure you want to delete this sponsor? This action cannot be undone.")) return

    setDeleting(true)
    try {
      await API.delete(
        `/sponsors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      navigate("/admin/sponsors")
    } catch (error) {
      console.error(error)
      alert("Error deleting sponsor")
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
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="h-32 bg-gray-200 rounded"></div>
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
            Edit Sponsor
          </h2>
          <p className="text-gray-500 mt-2">
            Update sponsor information below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={updateSponsor} className="space-y-8">
          {/* Basic Information Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Sponsor Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* English Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sponsor Name (English) <span className="text-primary">*</span>
                  </label>
                  <input
                    placeholder="e.g., Microsoft, Google, etc."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website URL
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </span>
                    <input
                      placeholder="https://example.com"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Kannada Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sponsor Name (Kannada)
                  </label>
                  <input
                    placeholder="ಕನ್ನಡದಲ್ಲಿ ಹೆಸರು"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={nameKn}
                    onChange={(e) => setNameKn(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sponsor Category <span className="text-primary">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none bg-white"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="platinum" className="py-2">🥇 Platinum</option>
                    <option value="gold" className="py-2">🥈 Gold</option>
                    <option value="silver" className="py-2">🥉 Silver</option>
                  </select>
                  
                  {/* Current Category Display */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm text-gray-500">Current tier:</span>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${
                      categoryColors[category]
                    }`}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logo Upload Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-secondary rounded-full"></span>
              Sponsor Logo
            </h3>

            <div className="space-y-4">
              {/* Current Logo Display */}
              {currentLogo && !logoPreview && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Current logo:</p>
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 bg-background p-3">
                    <img 
                      src={currentLogo} 
                      alt="Current logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Upload New Logo */}
              <div className="flex items-center gap-6">
                <label className="flex-1 cursor-pointer">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 hover:border-primary transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm font-medium text-gray-700 mt-2">
                        {logoPreview ? 'Change logo' : 'Click to upload new logo'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </label>

                {logoPreview && (
                  <div className="flex-shrink-0">
                    <p className="text-sm text-gray-500 mb-2">New logo preview:</p>
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 bg-background p-3">
                      <img 
                        src={logoPreview} 
                        alt="Logo preview" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>

              {logoPreview && (
                <button
                  type="button"
                  onClick={() => {
                    setLogo(null)
                    setLogoPreview(null)
                  }}
                  className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove new logo
                </button>
              )}
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
                  Update Sponsor
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => navigate("/admin/sponsors")}
              className="px-8 py-3 border border-gray-200 rounded-lg font-medium text-charcoal hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={deleteSponsor}
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
                  Delete Sponsor
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}