import { useState } from "react"
import API from "../../api/axios"
import { useNavigate } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"

export default function CreateSponsor() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [nameEn, setNameEn] = useState("")
  const [nameKn, setNameKn] = useState("")
  const [category, setCategory] = useState("silver")
  const [website, setWebsite] = useState("")
  const [logo, setLogo] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)

  const token = localStorage.getItem("token")

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

  const createSponsor = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let logoUrl = ""

      if (logo) {
        const formData = new FormData()
        formData.append("image", logo)

        const uploadRes = await API.post(
          "/upload",
          formData
        )
        logoUrl = uploadRes.data.imageUrl
      }

      await API.post(
        "/sponsors",
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
      alert("Error creating sponsor")
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
            Add New Sponsor
          </h2>
          <p className="text-gray-500 mt-2">
            Create a new sponsor or partner for your events
          </p>
        </div>

        {/* Form */}
        <form onSubmit={createSponsor} className="space-y-8">
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
                  
                  {/* Category Preview */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm text-gray-500">Selected tier:</span>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${
                      category === 'platinum' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                      category === 'gold' ? 'bg-secondary/20 text-secondary/80 border-secondary/30' :
                      'bg-gray-100 text-gray-700 border-gray-200'
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
                        Click to upload sponsor logo
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </label>

                {logoPreview && (
                  <div className="flex-shrink-0">
                    <p className="text-sm text-gray-500 mb-2">Preview:</p>
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
                  Remove logo
                </button>
              )}
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
            <h4 className="text-sm font-semibold text-primary flex items-center gap-2 mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Quick Tips
            </h4>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Use a high-quality logo with transparent background for best results</li>
              <li>The logo will be displayed prominently on event pages</li>
              <li>You can update sponsor details anytime from the sponsors list</li>
            </ul>
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
                  Creating Sponsor...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Sponsor
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
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}