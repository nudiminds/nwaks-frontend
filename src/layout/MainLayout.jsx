import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function MainLayout({ children }) {
  return (
    <div className="bg-background text-charcoal font-body min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}