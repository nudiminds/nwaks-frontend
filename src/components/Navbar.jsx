import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, Globe } from "lucide-react"
import Logo from "../assets/logo.png"
import { useLanguage } from "../context/LanguageContext"

export default function Navbar() {

  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdown, setDropdown] = useState(null)
  const [mobileDropdowns, setMobileDropdowns] = useState({})

  const { language, toggleLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileDropdown = (index) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const navLinks = [
    { name: t.navbar.home, href: "/" },

    {
      name: t.navbar.about.title,
      dropdown: [
        { name: t.navbar.about.about, href: "/about" },
        { name: t.navbar.about.directors, href: "/board-of-directors" },
        { name: t.navbar.about.executives, href: "/board-of-executives" },
        { name: t.navbar.about.core, href: "/core-committee" },
        { name: t.navbar.about.membership, href: "/membership" },
        { name: t.navbar.about.media, href: "/media" },
        { name: t.navbar.about.contact, href: "/contact" },
      ]
    },

    {
      name: t.navbar.shaale.title,
      dropdown: [
        { name: t.navbar.shaale.history, href: "/kannada-shaale/about" },
        { name: t.navbar.shaale.teachers, href: "/kannada-shaale/team" },
        { name: t.navbar.shaale.classes, href: "/kannada-shaale/classes" },
      ]
    },

    { name: t.navbar.awards, href: "/community-awards" },
    { name: t.navbar.rajyothsava, href: "/rajyothsava" },

    {
      name: t.navbar.contribution.title,
      dropdown: [
        { name: t.navbar.contribution.support, href: "/community-support" },
        { name: t.navbar.contribution.initiatives, href: "/community-initiatives" },
      ]
    },

    {
      name: t.navbar.events.title,
      dropdown: [
        { name: t.navbar.events.upcoming, href: "/upcoming-events" },
        { name: t.navbar.events.past, href: "/past-events" }
      ]
    },

    { name: t.navbar.sponsors, href: "/sponsors" },
  ]


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled ? "bg-secondary/95 backdrop-blur-md shadow-md py-2" : "py-4"}`}
    >

      <div className="w-full px-6">

        <div className="flex items-center justify-between w-full min-h-[64px]">

          {/* LOGO */}
          <a href="/" className="flex items-center gap-1 shrink-0">
            <img src={Logo} className="w-10 md:w-12" />

            <div className="leading-tight">
              <p className={`text-xs font-bold ${scrolled ? "text-primary" : "text-secondary"}`}>
                NORTHWEST
              </p>

              <p className={`text-xs font-bold ${scrolled ? "text-primary" : "text-secondary"}`}>
                ARKANSAS
              </p>

              <p className="text-xs text-white/90">
                KANNADA SANGHA
              </p>
            </div>
          </a>


          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1">

            {navLinks.map((link, i) => (

              <div
                key={i}
                className="relative"
                onMouseEnter={() => setDropdown(i)}
                onMouseLeave={() => setDropdown(null)}
              >

                {!link.dropdown && (
                  <a
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                    ${scrolled
                        ? "text-primary hover:bg-primary/10"
                        : "text-white hover:bg-white/10"}`}
                  >
                    {link.name}
                  </a>
                )}

                {link.dropdown && (
                  <>
                    <button
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium
                      ${scrolled
                          ? "text-primary hover:bg-primary/10"
                          : "text-white hover:bg-white/10"}`}
                    >
                      {link.name}
                      <ChevronDown size={16} />
                    </button>

                    <div
                      className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl
                      transition-all duration-200
                      ${dropdown === i
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"}`}
                    >
                      {link.dropdown.map((item, j) => (
                        <a
                          key={j}
                          href={item.href}
                          className="block px-4 py-3 text-primary hover:bg-secondary/10"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </>
                )}

              </div>
            ))}

            {/* LANGUAGE BUTTON */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm
              ${scrolled
                  ? "text-primary border-primary/30 hover:bg-primary/10"
                  : "text-secondary border-white/30 hover:bg-white/10"}`}
            >
              <Globe size={16} />
              {language === "EN" ? "ಕನ್ನಡ" : "English"}
            </button>

          </div>


          {/* MOBILE RIGHT SIDE */}
          <div className="flex items-center gap-3 lg:hidden">

            {/* LANGUAGE BUTTON */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1 px-2 py-1 rounded-md border text-xs
              ${scrolled
                  ? "text-primary border-primary/30"
                  : "text-secondary border-white/30"}`}
            >
              <Globe size={16} />
              {language === "EN" ? "KN" : "EN"}
            </button>

            {/* HAMBURGER */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

          </div>

        </div>
      </div>


      {/* MOBILE MENU */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden
        ${mobileOpen ? "max-h-[80vh] mt-4 px-6" : "max-h-0"}`}>

        <div className="bg-secondary/95 backdrop-blur-md rounded-xl p-4">

          {navLinks.map((link, i) => (

            <div key={i} className="mb-2">

              {!link.dropdown && (
                <a
                  href={link.href}
                  className="block py-2 text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </a>
              )}

              {link.dropdown && (
                <>
                  <button
                    onClick={() => toggleMobileDropdown(i)}
                    className="flex items-center justify-between w-full py-2 text-white font-medium"
                  >
                    {link.name}

                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300
                      ${mobileDropdowns[i] ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div className={`overflow-hidden transition-all duration-300
                    ${mobileDropdowns[i] ? "max-h-96" : "max-h-0"}`}>

                    <div className="ml-4 border-l border-white/20 pl-3 space-y-1">

                      {link.dropdown.map((item, j) => (
                        <a
                          key={j}
                          href={item.href}
                          className="block py-1 text-white/70"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}

                    </div>
                  </div>
                </>
              )}

            </div>
          ))}

        </div>

      </div>

    </nav>
  )
}