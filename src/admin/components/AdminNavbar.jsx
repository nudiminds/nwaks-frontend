import { useNavigate } from "react-router-dom"

export default function AdminNavbar() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/admin/login")
  }

  return (
    <div className="bg-gradient-to-r from-primary to-primary/90 border-b border-primary/20 px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-white tracking-tight">
          Admin Dashboard
        </h1>
      </div>

      <button
        onClick={logout}
        className="px-5 py-2.5 text-sm font-medium text-white bg-secondary hover:bg-secondary/80 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 group"
      >
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </div>
  )
}