import Hero from "../sections/Hero"
import AboutPreview from "../sections/AboutPreview"
import UpcomingEvents from "../sections/UpcomingEvents"
import Advertisement from "../sections/Advertisement"
import Mission from "../sections/Mission"
import SponsorsPreview from "../sections/SponsorsPreview"

export default function Home() {
  return (
    <>
      <Hero />

      {/* Content + Sidebar Layout */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT MAIN CONTENT */}
          <div className="lg:w-5/6 space-y-8">
            <AboutPreview />
            <Mission />
            <UpcomingEvents />
            <SponsorsPreview />
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:w-1/6">
            <Advertisement />
          </div>

        </div>
      </div>
    </>
  )
}