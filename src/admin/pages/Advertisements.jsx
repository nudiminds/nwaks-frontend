/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../../api/axios"
import AdminLayout from "../layout/AdminLayout"

export default function AdminAdvertisements() {
  const [advertisements, setAdvertisements] = useState([])
  const [loading, setLoading] = useState(true)
  const [togglingId, setTogglingId] = useState(null)

  const fetchAdvertisements = async () => {
    try {
      const res = await API.get(
        "/advertisements"
      )
      setAdvertisements(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdvertisements()
  }, [])

  const deleteAdvertisement = async (id) => {
    if (window.confirm("Are you sure you want to delete this advertisement?")) {
      try {
        const token = localStorage.getItem("token")
        await API.delete(
          `/advertisements/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        fetchAdvertisements()
      } catch (error) {
        console.error(error)
        alert("Error deleting advertisement")
      }
    }
  }


  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-charcoal tracking-tight">
              Advertisements
            </h2>
            <p className="text-gray-500 mt-1">
              Manage your promotional ads and campaigns
            </p>
          </div>

          <Link
            to="/admin/advertisements/create"
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Advertisement
          </Link>
        </div>

        {advertisements.length === 0 ? (
          <div className="bg-background rounded-xl p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">No advertisements yet</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first advertisement</p>
            <Link
              to="/admin/advertisements/create"
              className="inline-flex bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Ad
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advertisements.map((ad) => (
              <div
                key={ad._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 group flex flex-col h-full"
              >
                {/* Advertisement Image or Placeholder */}
                <div className="relative">
                  {ad.image ? (
                    <div className="h-48 overflow-hidden bg-gray-100">
                      <img
                        src={ad.image}
                        alt={ad.title?.en}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-16 h-16 mx-auto text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs text-gray-400 mt-2">No image uploaded</p>
                      </div>
                    </div>
                  )}

                  {/* Status Badge - Always visible, positioned absolutely */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full border shadow-sm flex items-center gap-1.5 ${
                      ad.active 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${ad.active ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                      {ad.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  {/* Title Section */}
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg text-charcoal mb-1 line-clamp-1">
                      {ad.title?.en || "Untitled"}
                    </h3>
                    {ad.title?.kn && (
                      <p className="text-sm text-gray-600 line-clamp-1 font-medium">
                        {ad.title.kn}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  {ad.description?.en ? (
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2 border-l-2 border-primary/20 pl-3 italic">
                      {ad.description.en}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2 border-l-2 border-gray-200 pl-3 italic">
                      No description provided
                    </p>
                  )}

                  {/* Link if exists */}
                  {ad.link ? (
                    <a 
                      href={ad.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 mb-3 bg-primary/5 p-2 rounded-lg truncate"
                    >
                      <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span className="truncate">{ad.link}</span>
                    </a>
                  ) : (
                    <div className="text-xs text-gray-400 flex items-center gap-1 mb-3 bg-gray-50 p-2 rounded-lg">
                      <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <span className="truncate">No link attached</span>
                    </div>
                  )}

                  {/* Metadata and Actions - Push to bottom */}
                  <div className="mt-auto">
                    {/* Metadata */}
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4 pt-2 border-t border-gray-100">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(ad.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      
                      {/* Quick status indicator for mobile */}
                      <span className={`text-xs ${ad.active ? 'text-green-600' : 'text-red-600'} font-medium md:hidden`}>
                        {ad.active ? '● Live' : '○ Off'}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      <Link
                        to={`/admin/advertisements/edit/${ad._id}`}
                        className="flex items-center justify-center gap-1 text-primary hover:text-primary/80 text-sm font-medium py-2 px-2 rounded-lg hover:bg-primary/5 transition-colors border border-primary/10"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span className="hidden sm:inline">Edit</span>
                      </Link>

                      <button
                        onClick={() => deleteAdvertisement(ad._id)}
                        className="flex items-center justify-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium py-2 px-2 rounded-lg hover:bg-red-50 transition-colors border border-red-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}