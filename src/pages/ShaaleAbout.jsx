import { BookOpen, Target, History, Calendar, Users, Award, ChevronRight, GraduationCap, BookText } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "../context/LanguageContext"

export default function ShaaleAbout() {
  const { t } = useLanguage()
  const [animatedStats, setAnimatedStats] = useState(false)
  const statsRef = useRef(null)

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimatedStats(true)
        }
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const stats = [
    { label: t.shaaleAbout.stats.students, value: 50, icon: Users, suffix: "+" },
    { label: t.shaaleAbout.stats.established, value: 2020, icon: Calendar },
    { label: t.shaaleAbout.stats.batches, value: 5, icon: BookOpen },
    { label: t.shaaleAbout.stats.teachers, value: 8, icon: Award },
  ]

  const goals = t.shaaleAbout.goals.list
  const timeline = t.shaaleAbout.journey.timeline

  return (
    <div className="bg-background overflow-hidden">
      {/* HERO SECTION with enhanced animation */}
      <section className="bg-primary/90 text-white py-24 text-center relative">

        <div className="container mx-auto px-6 relative">
          <h1 className="font-heading text-4xl md:text-5xl mb-4 animate-fade-in">
            {t.shaaleAbout.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 animate-fade-in-up delay-200">
            {t.shaaleAbout.subtitle}
          </p>
        </div>
      </section>

      {/* STATS SECTION with counter animation */}
      <section ref={statsRef} className="container mx-auto px-6 -mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:-translate-y-2 transition-all duration-300 reveal"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className="mx-auto text-secondary mb-3" size={28} />
              <div className="font-heading text-2xl text-primary">
                {animatedStats ? (
                  <Counter end={stat.value} suffix={stat.suffix || ''} />
                ) : (
                  '0'
                )}
              </div>
              <p className="text-sm text-charcoal">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-6 py-24 space-y-28">

        {/* ABOUT SECTION with hover effects */}
        <section className="max-w-4xl mx-auto text-center reveal group">
          <div className="transform transition-all duration-500 group-hover:scale-105">
            <BookOpen className="mx-auto text-secondary mb-6 animate-float" size={40} />
          </div>

          <h2 className="font-heading text-3xl text-primary mb-6 relative inline-block">
            {t.shaaleAbout.about.title}
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-secondary transition-all duration-500 group-hover:w-full"></span>
          </h2>

          <p className="text-charcoal leading-relaxed text-lg animate-fade-in-up">
            {t.shaaleAbout.about.description}
          </p>
        </section>

        {/* GOALS SECTION with card animations */}
        <section className="bg-white rounded-3xl shadow-lg p-12 reveal">
          <div className="text-center mb-12">
            <Target className="mx-auto text-secondary mb-4 animate-spin-slow" size={40} />
            <h2 className="font-heading text-3xl text-primary">
              {t.shaaleAbout.goals.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {goals.map((goal, index) => (
              <div
                key={index}
                className="bg-background p-8 rounded-2xl shadow-sm transform transition-all duration-500 hover:scale-105 hover:shadow-xl group"
                style={{ animationDelay: `${index === 0 ? 0 : 200}ms` }}
              >
                <h3 className="font-heading text-xl text-accent mb-4 flex items-center">
                  {goal.title}
                  <ChevronRight className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2" size={20} />
                </h3>
                <p className="text-charcoal leading-relaxed">
                  {goal.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* HISTORY SECTION with timeline effect */}
        <section className="reveal">
          <div className="text-center mb-12">
            <History className="mx-auto text-secondary mb-4 animate-pulse" size={40} />
            <h2 className="font-heading text-3xl text-primary">
              {t.shaaleAbout.journey.title}
            </h2>
          </div>

          <div className="space-y-8 text-charcoal leading-relaxed text-lg max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-secondary/30"></div>
            
            {timeline.map((item, index) => (
              <div
                key={index}
                className="flex gap-6 animate-slide-in-left"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center font-heading text-secondary text-sm transform transition-all duration-500 hover:scale-110 hover:bg-secondary hover:text-white">
                    {item.year}
                  </div>
                </div>
                <div className="flex-1 pb-8">
                  <p className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    {item.text}
                    {item.highlight && (
                      <span className="font-semibold text-primary hover:underline cursor-pointer transition-all">
                        {item.highlight}
                      </span>
                    )}
                    {item.suffix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* REGISTRATION SECTION */}
        <section className="reveal">
          <div className="bg-gradient-to-br from-primary/5 via-white to-secondary/5 rounded-3xl shadow-xl p-12 border border-secondary/10">
            <div className="text-center mb-10">
              <GraduationCap className="mx-auto text-secondary mb-4 animate-bounce" size={48} />
              <h2 className="font-heading text-3xl md:text-4xl text-primary mb-4">
                {t.shaaleAbout.registration.title}
              </h2>
              <p className="text-charcoal text-lg max-w-2xl mx-auto">
                {t.shaaleAbout.registration.subtitle}
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
              <a 
                href="https://sites.google.com/kannadaacademy.com/nwakannadashale/register"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-secondary text-white px-8 py-4 rounded-full font-heading text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden inline-block"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t.shaaleAbout.registration.registerButton}
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
              
              <a 
                href="https://www.kannadaacademy.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-primary hover:text-secondary transition-colors duration-300"
              >
                <BookText size={24} />
                <span className="font-heading text-lg">{t.shaaleAbout.registration.textbookLink}</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.5; }
          100% { transform: translateY(0); opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-up {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          opacity: 0;
          animation: slide-in-left 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }

        .reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  )
}

// Counter component for stats animation
function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime
    let animationFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <span>{count}{suffix}</span>
}