/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"

export default function AboutPreview() {
  const { t } = useLanguage()

  const images = [
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    "https://images.unsplash.com/photo-1515169067868-5387ec356754",
    "https://images.unsplash.com/photo-1503428593586-e225b39bddfe",
    "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  ]

  // Duplicate images for infinite loop effect
  const extendedImages = [...images, ...images, ...images]
  const [index, setIndex] = useState(images.length)
  const [isHovering, setIsHovering] = useState(false)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setIndex((prev) => {
          const next = prev + 1
          if (next >= images.length * 2) {
            setTimeout(() => {
              setIndex(images.length)
            }, 50)
            return images.length * 2 - 1
          }
          return next
        })
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isHovering, images.length])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  const getTranslateX = () => {
    const slideWidth = 100 / 3
    return -((index - 1) * slideWidth)
  }

  // Split description text for word animation
  const descriptionText = t.aboutPreview.description
  const words = descriptionText.split(" ")

  return (
    <section className="bg-background py-12 relative overflow-hidden" ref={ref}>
      <motion.div 
        className="absolute top-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Title with flip animation */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, rotateX: -90 },
              visible: { 
                opacity: 1, 
                rotateX: 0,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  duration: 0.8
                }
              }
            }}
            className="relative inline-block mb-4"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary">
              <h2>{t.aboutPreview.title}</h2>
            </h2>
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-secondary rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: "60px", opacity: 1 } : { width: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
          </motion.div>

          {/* Description with word-by-word fade and scale */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.03,
                  delayChildren: 0.4
                }
              }
            }}
            className="font-body max-w-3xl mx-auto text-base text-charcoal leading-relaxed"
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    scale: 0.8,
                    filter: "blur(4px)"
                  },
                  visible: { 
                    opacity: 1, 
                    scale: 1,
                    filter: "blur(0px)",
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      duration: 0.5
                    }
                  }
                }}
                className="inline-block mr-1"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          
        </motion.div>
      </div>
    </section>
  )
}