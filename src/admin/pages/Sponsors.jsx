import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../../api/axios"
import AdminLayout from "../layout/AdminLayout"

export default function AdminSponsors() {
  const [sponsors, setSponsors] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSponsors = async () => {
    try {
      const res = await API.get(
        "/sponsors"
      )
      setSponsors(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSponsors()
  }, [])

  // Category colors mapping
  const categoryColors = {
    platinum: "bg-purple-100 text-purple-700 border-purple-200",
    gold: "bg-secondary/20 text-secondary/80 border-secondary/30",
    silver: "bg-gray-100 text-gray-700 border-gray-200",
    bronze: "bg-amber-100 text-amber-700 border-amber-200",
    partner: "bg-blue-100 text-blue-700 border-blue-200"
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-charcoal tracking-tight">
              Sponsors
            </h2>
            <p className="text-gray-500 mt-1">
              Manage your event sponsors and partners
            </p>
          </div>
          <Link
            to="/admin/sponsors/create"
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Sponsor
          </Link>
        </div>

        {loading ? (
          // Loading Skeleton
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
                <div className="h-20 w-32 bg-gray-200 rounded-lg mx-auto mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {sponsors.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sponsors.map((sponsor) => (
                  <div
                    key={sponsor._id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="p-6">
                      {/* Logo Section */}
                      <div className="flex justify-center mb-4">
                        {sponsor.logo ? (
                          <div className="h-24 w-32 bg-background rounded-lg p-3 flex items-center justify-center border border-gray-100">
                            <img
                              src={sponsor.logo}
                              alt={sponsor.name?.en}
                              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                        ) : (
                          <div className="h-24 w-32 bg-background rounded-lg flex items-center justify-center border border-gray-100">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Sponsor Info */}
                      <div className="text-center">
                        <h3 className="font-semibold text-lg text-charcoal mb-1">
                          {sponsor.name?.en}
                        </h3>
                        
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <span className={`text-xs font-medium px-3 py-1 rounded-full border ${categoryColors[sponsor.category?.toLowerCase()] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                            {sponsor.category}
                          </span>
                        </div>

                        {/* Contact Info (if available) */}
                        {sponsor.contactPerson && (
                          <p className="text-sm text-gray-500 mb-2">
                            {sponsor.contactPerson}
                          </p>
                        )}

                        {sponsor.email && (
                          <a 
                            href={`mailto:${sponsor.email}`}
                            className="text-sm text-primary/70 hover:text-primary flex items-center justify-center gap-1 mb-4"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {sponsor.email}
                          </a>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="border-t border-gray-100 pt-4 mt-2">
                        <Link
                          to={`/admin/sponsors/edit/${sponsor._id}`}
                          className="w-full bg-primary/5 hover:bg-primary/10 text-primary font-medium py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 border border-primary/10"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit Sponsor
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="bg-background rounded-xl p-12 text-center border border-gray-100">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-2">No sponsors yet</h3>
                <p className="text-gray-500 mb-6">Get started by adding your first sponsor</p>
                <Link
                  to="/admin/sponsors/create"
                  className="inline-flex bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Your First Sponsor
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  )
}