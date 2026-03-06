/* eslint-disable no-unused-vars */
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import hero from "../assets/hero.jpg"
import { useLanguage } from "../context/LanguageContext"

export default function Hero() {
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Split text for character animation
  const titleText = t.hero.title
  const subtitleText = "NorthWest Arkansas Kannada Sangha"
  const descriptionText = "Where tradition meets community — preserving Kannada culture and building lasting connections in the Natural State."

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          scale: scrolled ? 1.1 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent/90 via-accent/50 to-transparent z-10" />
        <img
          src={hero}
          alt="Karnataka Culture"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 w-full">
        <div className="container mx-auto px-6 lg:px-12 ">
          <div className="max-w-4xl">
            {/* Animated Text Reveal */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3
                  }
                }
              }}
            >
              {/* Pre-title */}
              <motion.p
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                className="text-secondary uppercase tracking-[0.2em] text-sm mb-4"
              >
                {t.hero.preTitle}
              </motion.p>

              {/* Title with character animation and trademark symbol */}
              <div className="relative inline-block mb-4">
                <motion.h1
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.2
                      }
                    }
                  }}
                  className="font-heading text-6xl md:text-8xl font-bold text-white flex items-start"
                >
                  {titleText.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: { y: 50, opacity: 0, rotateX: -90 },
                        visible: { 
                          y: 0, 
                          opacity: 1, 
                          rotateX: 0,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 15
                          }
                        }
                      }}
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                  {/* Registered trademark symbol in circle */}
                  <motion.sup
                    variants={{
                      hidden: { y: 50, opacity: 0, rotateX: -90 },
                      visible: { 
                        y: 0, 
                        opacity: 1, 
                        rotateX: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.3
                        }
                      }
                    }}
                    className="text-xl md:text-3xl ml-1 text-white inline-block"
                  >
                    ®
                  </motion.sup>
                </motion.h1>
                
                {/* Animated underline - now properly positioned under the title */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="absolute -bottom-2 left-0 h-1 bg-secondary"
                />
              </div>

              {/* Subtitle with fade and slide */}
              <motion.p
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: { 
                    y: 0, 
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.8
                    }
                  }
                }}
                className="text-2xl md:text-3xl text-white/90 max-w-2xl"
              >
                {t.hero.subtitle}
              </motion.p>

              {/* Non-Profit Organization text - NEW */}
              <motion.p
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { 
                    y: 0, 
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.9
                    }
                  }
                }}
                className="text-sm text-white/70 mb-10 max-w-xl left--10 relative"
              >
                {t.hero.nonprofit}
              </motion.p>

              {/* Description with scale animation */}
              <motion.p
                variants={{
                  hidden: { scale: 0.8, opacity: 0 },
                  visible: { 
                    scale: 1, 
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 1
                    }
                  }
                }}
                className="text-lg text-white/70 mb-10 max-w-xl"
              >
                {t.hero.description}
              </motion.p>

              {/* CTA Buttons with bounce animation */}
              <motion.div
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: { 
                    y: 0, 
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 1.2
                    }
                  }
                }}
                className="flex gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-secondary text-primary px-8 py-4 rounded-lg font-semibold overflow-hidden"
                >
                  <span className="relative z-10">
                    <a href="/about">{t.hero.cta}</a>
                  </span>
                  <div className="absolute inset-0 bg-support transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.button>
                
                {/* <button className="group relative px-8 py-4 rounded-lg font-semibold text-white overflow-hidden">
                  <span className="relative z-10">Learn More →</span>
                  <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </button> */}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Progress */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-secondary/30 z-20"
        style={{
          scaleX: scrolled ? 0.1 : 1,
          transformOrigin: "left"
        }}
      />
    </section>
  )
}