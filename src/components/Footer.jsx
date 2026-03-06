import { Facebook, Instagram, Mail, Phone, MapPin, Youtube } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      
      <div className="container mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">

        {/* Column 1 - About */}
        <div>
          <h3 className="font-heading text-xl mb-3 text-secondary">
            {t.footer.about.title}<sup>®</sup>
          </h3>
          <p className="text-xs leading-relaxed text-gray-200">
            {t.footer.about.description}
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h4 className="font-heading text-lg mb-3 text-secondary">
            {t.footer.quickLinks.title}
          </h4>
          <ul className="space-y-1.5 text-sm">
            {t.footer.quickLinks.links.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href} 
                  className="text-gray-200 hover:text-secondary transition inline-block py-0.5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Contact Info */}
        <div>
          <h4 className="font-heading text-lg mb-3 text-secondary">
            {t.footer.contact.title}
          </h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-secondary flex-shrink-0" />
              <span>{t.footer.contact.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-secondary flex-shrink-0" />
              <span>{t.footer.contact.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-secondary flex-shrink-0" />
              <span>{t.footer.contact.email}</span>
            </li>
          </ul>
        </div>

        {/* Column 4 - Social */}
        <div>
          <h4 className="font-heading text-lg mb-3 text-secondary">
            {t.footer.social.title}
          </h4>
          <div className="flex gap-3">
            <a 
              href="#" 
              className="bg-white/10 text-white p-2.5 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300"
              aria-label={t.footer.social.facebookLabel}
            >
              <Facebook size={16} />
            </a>
            <a 
              href="#" 
              className="bg-white/10 text-white p-2.5 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300"
              aria-label={t.footer.social.instagramLabel}
            >
              <Instagram size={16} />
            </a>
            <a 
              href="#" 
              className="bg-white/10 text-white p-2.5 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300"
              aria-label={t.footer.social.youtubeLabel}
            >
              <Youtube size={16} />
            </a>
          </div>
          <p className="text-xs text-gray-300 mt-4">
            {t.footer.social.stayConnected}
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-300">
        <div className="container mx-auto px-6">
          {t.footer.copyright.replace("{year}", currentYear)}
        </div>
      </div>

    </footer>
  )
}