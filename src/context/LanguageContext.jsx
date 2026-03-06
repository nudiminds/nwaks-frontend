/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react"
import { translations } from "../translations"

const LanguageContext = createContext()

export function LanguageProvider({ children }) {

  // 🔥 Initialize from localStorage
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("nwaks-language")
    return savedLanguage ? savedLanguage : "EN"
  })

  // 🔥 Persist to localStorage whenever language changes
  useEffect(() => {
    localStorage.setItem("nwaks-language", language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "EN" ? "KN" : "EN"))
  }

  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}