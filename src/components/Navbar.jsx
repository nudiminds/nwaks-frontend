import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, Globe } from "lucide-react"
import Logo from "../assets/logo.png"
import { useLanguage } from "../context/LanguageContext"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileDropdowns, setMobileDropdowns] = useState({})
  const { language, toggleLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on resize if screen becomes larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
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
    href: "#",
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
    href: "#",
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
    href: "#",
    dropdown: [
      { name: t.navbar.contribution.support, href: "/community-support" },
      { name: t.navbar.contribution.initiatives, href: "/community-initiatives" },
    ]
  },

  {
    name: t.navbar.events.title,
    href: "#",
    dropdown: [
      { name: t.navbar.events.upcoming, href: "/upcoming-events" },
      { name: t.navbar.events.past, href: "/past-events" }
    ]
  },

  { name: t.navbar.sponsors, href: "/sponsors" },
]

  return (
    <>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        scrolled 
          ? "bg-secondary/95 backdrop-blur-md py-2 shadow-lg" 
          : "bg-transparent py-4"
      }`}>
        <div className="container mx-auto px-6 w-full">
          <div className="flex items-center justify-between min-h-[64px]">
            {/* Logo with text like reference image - smaller text */}
            <a href="/" className="flex items-center gap-2 group">
              <img src={Logo} alt="NWAKS Logo" className="h-auto w-10 md:w-12 transition-transform group-hover:scale-105" />
              <div className="flex flex-col justify-center leading-tight">
                <span className={`font-heading text-xs md:text-sm font-bold leading-[1.1] ${
                  scrolled ? "text-primary" : "text-secondary"
                }`}>
                  NORTHWEST
                </span>
                <span className={`font-heading text-xs md:text-sm font-bold leading-tight transition-colors ${
                  scrolled ? "text-primary" : "text-secondary"
                }`}>
                  ARKANSAS
                </span>
                <span className={`font-heading text-xs md:text-sm font-medium leading-tight transition-colors ${
                  scrolled ? "text-white" : "text-white/90"
                }`}>
                  KANNADA SANGHA
                </span>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {link.dropdown ? (
                    <>
                      <button
                        className={`px-3 h-[36px] flex items-center rounded-lg font-medium text-sm transition-colors flex items-center gap-1 whitespace-nowrap ${
                          scrolled 
                            ? "text-primary hover:bg-primary/10" 
                            : "text-white hover:bg-white/10"
                        }`}
                      >
                        {link.name}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === index ? "rotate-180" : ""
                        }`} />
                      </button>

                      {/* Dropdown Menu */}
                      <div className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 transform ${
                        activeDropdown === index 
                          ? "opacity-100 visible translate-y-0" 
                          : "opacity-0 invisible -translate-y-2"
                      }`}>
                        {link.dropdown.map((item, itemIndex) => (
                          <a
                            key={itemIndex}
                            href={item.href}
                            className="block px-4 py-3 text-primary hover:bg-secondary/10 transition-colors border-b border-gray-100 last:border-0"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </>
                  ) : (
                    <a
                      href={link.href}
                      className={`px-3 h-[36px] flex items-center rounded-lg font-medium text-sm transition-colors inline-block whitespace-nowrap ${
                        scrolled 
                          ? "text-primary hover:bg-primary/10" 
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              ))}

              {/* Language Toggle Button - Toggles between EN and KN */}
              <button
                onClick={toggleLanguage}
                className={`flex items-center gap-2 px-3 h-[36px] flex items-center rounded-lg font-medium text-sm transition-colors border ml-2 ${
                  scrolled 
                    ? "text-primary border-primary/30 hover:bg-primary/10" 
                    : "text-secondary border-white/30 hover:bg-white/10"
                }`}
              >
                <Globe size={16} />
                <span>
                  {language === "EN" ? "ಕನ್ನಡ" : "English"}
                </span>
              </button>
            </div>

            {/* Mobile Menu Button and Language Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile Language Toggle Button - Always visible */}
              <button
                onClick={toggleLanguage}
                className={`p-2 rounded-lg transition-colors flex items-center gap-1 border ${
                  scrolled 
                    ? "text-primary border-primary/30 hover:bg-primary/10" 
                    : "text-secondary border-secondary/30 hover:bg-white/10"
                }`}
                aria-label="Toggle language"
              >
                <Globe size={18} />
                <span className="text-xs font-medium">{language === "EN" ? "KN" : "EN"}</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`rounded-lg transition-colors focus:outline-none ${
                  scrolled 
                    ? "text-primary hover:bg-primary/10" 
                    : "text-secondary hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-[80vh] mt-3" : "max-h-0"
          }`}>
            <div className={`rounded-xl p-3 overflow-y-auto max-h-[70vh] ${
              scrolled ? "bg-white shadow-xl" : "bg-secondary/95 backdrop-blur-md"
            }`}>
              <div className="space-y-1">
                {navLinks.map((link, index) => (
                  <div key={index}>
                    {link.dropdown ? (
                      <>
                        <button
                          onClick={() => toggleMobileDropdown(index)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                            scrolled 
                              ? "text-primary hover:bg-primary/10" 
                              : "text-white hover:bg-white/10"
                          }`}
                        >
                          <span className="font-medium">
                            {link.mobileName || link.name}
                          </span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                            mobileDropdowns[index] ? "rotate-180" : ""
                          }`} />
                        </button>
                        
                        {/* Mobile Dropdown */}
                        <div className={`overflow-hidden transition-all duration-300 ${
                          mobileDropdowns[index] ? "max-h-96" : "max-h-0"
                        }`}>
                          <div className="ml-4 pl-2 border-l-2 border-secondary/30 mt-1 mb-2">
                            {link.dropdown.map((item, itemIndex) => (
                              <a
                                key={itemIndex}
                                href={item.href}
                                className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${
                                  scrolled 
                                    ? "text-primary/70 hover:bg-primary/10 hover:text-primary" 
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                                }`}
                                onClick={() => setIsOpen(false)}
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <a
                        href={link.href}
                        className={`block px-4 py-3 rounded-lg transition-colors ${
                          scrolled 
                            ? "text-primary hover:bg-primary/10" 
                            : "text-white hover:bg-white/10"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.mobileName || link.name}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for mobile when menu is open */}
      {isOpen && <div className="h-[500px] lg:hidden" />}
    </>
  )
}