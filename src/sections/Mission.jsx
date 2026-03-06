/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Heart, Users, Sparkles, Calendar, Award, School } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"
import React from "react"

export default function Mission() {
  const { t } = useLanguage()

  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const icons = [Users, School, Award, Calendar]

  const values = t.mission.values.map((value, index) => ({
    icon: React.createElement(icons[index], { size: 36 }),
    title: value.title,
    desc: value.desc
  }))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  // Enhanced card variants with multiple animation properties
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.8,
      rotateX: -15,
      rotateY: 10
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: index * 0.1,
        duration: 0.8
      }
    })
  }

  const iconHoverVariants = {
    hover: { 
      scale: 1.1,
      rotate: [0, -5, 5, -5, 0],
      transition: {
        rotate: { duration: 0.4 }
      }
    }
  }

  // Individual card refs for staggered in-view detection
  const cardRefs = useRef([])
  // eslint-disable-next-line react-hooks/refs
  const cardsInView = useInView(cardRefs.current, { 
    once: true, 
    amount: 0.3,
    margin: "0px 0px -50px 0px"
  })

  return (
    <section className="py-12 bg-white relative overflow-hidden" ref={ref}>
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 bg-primary/5 rounded-full blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/5 rounded-full blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="font-heading text-3xl md:text-4xl text-primary mb-3">
            {t.mission.title}
          </h2>

          <motion.div
            className="w-16 h-1 bg-secondary mx-auto rounded-full mb-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: 60 } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          <motion.p 
            className="font-body max-w-2xl mx-auto text-charcoal text-base mb-8"
            variants={headerVariants}
          >
            {t.mission.description}
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-6 perspective-1000"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              ref={el => cardRefs.current[index] = el}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className="bg-primary/5 p-6 rounded-xl shadow-sm cursor-pointer relative group"
              style={{
                transformStyle: "preserve-3d",
                transformPerspective: "1000px"
              }}
            >
              {/* Background shine effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle at 50% 0%, rgba(225,173,1,0.1), transparent 70%)",
                  transition: "opacity 0.3s"
                }}
              />

              <div className="relative z-10">
                <motion.div 
                  className="text-secondary mb-3 flex justify-center"
                  variants={iconHoverVariants}
                >
                  <motion.div
                    animate={{
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.2
                    }}
                  >
                    {value.icon}
                  </motion.div>
                </motion.div>

                <motion.h3 
                  className="font-heading text-xl text-accent mb-2"
                  whileHover={{ 
                    scale: 1.03,
                    color: "#800000"
                  }}
                >
                  {value.title}
                </motion.h3>

                <p className="text-charcoal text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>

              {/* Corner accent that appears on hover */}
              <motion.div
                className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-secondary"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              />

              {/* Bottom line that animates on hover */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              top: `${15 + i * 25}%`,
              left: `${5 + i * 20}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </section>
  )
}