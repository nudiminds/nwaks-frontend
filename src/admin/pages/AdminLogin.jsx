/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../../assets/logo.png"

import { loginAdmin } from "../../api/auth"

export default function AdminLogin() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)


  const handleLogin = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      const res = await loginAdmin({
        email,
        password
      })

      localStorage.setItem("token", res.data.token)

      navigate("/admin/dashboard")

    } catch (error) {

      alert("Invalid login credentials")

    } finally {

      setLoading(false)

    }

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-background">

      <div className="w-full max-w-md">

        {/* Logo */}

        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-16 h-16 bg-transperent rounded-xl mb-4">

            <img src={logo} alt="logo" />

          </div>

          <h2 className="text-2xl font-bold text-charcoal">
            Admin Login
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Welcome back! Please sign in
          </p>

        </div>


        {/* Form */}

        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
        >

          <div className="space-y-4">

            <div>

              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Email
              </label>

              <input
                type="email"
                placeholder="admin@nwaks.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>


            <div>

              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >

              {loading ? "Signing in..." : "Sign In"}

            </button>

          </div>

        </form>

      </div>

    </div>
  )
}