import { GraduationCap, Users, BookOpen, Calendar, Clock, Star, ChevronRight, Sparkles, ArrowRight, Download } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "../context/LanguageContext"

export default function ShaaleClasses() {
  const { t } = useLanguage()
  const [activeBatch, setActiveBatch] = useState(null)
  const [hoveredStat, setHoveredStat] = useState(null)

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

  const batches = t.shaaleClasses.structure.batches.map((batch, index) => ({
    ...batch,
    color: ["from-pink-500 to-rose-500", "from-blue-500 to-cyan-500", "from-purple-500 to-indigo-500", "from-amber-500 to-orange-500"][index]
  }))

  const stats = [
    { label: t.shaaleClasses.stats.totalStudents, value: 32, icon: Users, trend: "+5 this year" },
    { label: t.shaaleClasses.stats.activeClasses, value: 4, icon: GraduationCap, trend: "Weekly sessions" },
    { label: t.shaaleClasses.stats.learningHours, value: "192", icon: Clock, trend: "Per year" },
    { label: t.shaaleClasses.stats.graduates, value: 18, icon: Star, trend: "Since 2020" },
  ]

  const features = t.shaaleClasses.overview.features.map((feature, index) => ({
    icon: [BookOpen, Calendar, Users][index],
    ...feature
  }))

  const placementGuide = t.shaaleClasses.enrollment.placementGuide

  return (
    <div className="bg-background overflow-hidden">

      {/* HERO SECTION with animated background */}
      <section className="bg-primary/90 text-white py-24 text-center relative">
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated gradient orbs */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full mix-blend-overlay"
              style={{
                background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)`,
                width: `${400 + i * 100}px`,
                height: `${400 + i * 100}px`,
                left: `${-100 + i * 30}%`,
                top: `${-50 + i * 20}%`,
                animation: `float ${15 + i * 3}s ease-in-out infinite`,
                animationDelay: `${i * 0.7}s`,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="inline-block p-3 bg-white/10 rounded-full mb-6 animate-float">
            <GraduationCap className="text-white" size={32} />
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl mb-4 animate-fade-in">
            {t.shaaleClasses.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 animate-fade-in-up delay-200">
            {t.shaaleClasses.subtitle}
          </p>
        </div>
      </section>

      {/* QUICK STATS with hover effects */}
      <section className="container mx-auto px-6 -mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 reveal group"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="relative">
                <div className={`absolute inset-0 bg-secondary/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 -z-10`}></div>
                <stat.icon className="mx-auto text-secondary mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" size={28} />
              </div>
              <div className="font-heading text-2xl text-primary">
                {stat.value}
              </div>
              <p className="text-sm text-charcoal">{stat.label}</p>
              <p className={`text-xs text-secondary mt-1 transition-all duration-300 ${hoveredStat === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                {stat.trend}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-6 py-24 space-y-28">

        {/* OVERVIEW SECTION with animated cards */}
        <section className="max-w-4xl mx-auto text-center reveal">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
            <GraduationCap className="mx-auto text-secondary mb-6 relative animate-float" size={48} />
          </div>
          
          <h2 className="font-heading text-3xl text-primary mb-6 relative inline-block">
            {t.shaaleClasses.overview.title}
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full h-1 bg-secondary transition-all duration-500"></span>
          </h2>

          <div className="space-y-6">
            <p className="text-charcoal text-lg leading-relaxed animate-fade-in-up">
              {t.shaaleClasses.overview.description1}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <feature.icon className="mx-auto text-secondary mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" size={24} />
                  <h3 className="font-heading text-sm text-primary mb-2">{feature.title}</h3>
                  <p className="text-xs text-charcoal">{feature.description}</p>
                </div>
              ))}
            </div>

            <p className="text-charcoal text-lg leading-relaxed mt-6 p-6 bg-white rounded-2xl shadow-md border-l-4 border-secondary">
              {t.shaaleClasses.overview.description2}
            </p>
          </div>
        </section>

        {/* BATCH STRUCTURE with interactive cards */}
        <section className="reveal">
          <div className="text-center mb-16">
            <div className="inline-block p-4 bg-secondary/10 rounded-full mb-4 animate-pulse">
              <Users className="text-secondary" size={32} />
            </div>
            <h2 className="font-heading text-3xl text-primary">
              {t.shaaleClasses.structure.title}
            </h2>
            <p className="text-charcoal mt-4">
              {t.shaaleClasses.structure.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {batches.map((batch, index) => (
              <div
                key={index}
                className="group relative perspective-1000"
                onMouseEnter={() => setActiveBatch(index)}
                onMouseLeave={() => setActiveBatch(null)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Card front */}
                <div className={`bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-4 text-center relative overflow-hidden cursor-pointer ${activeBatch === index ? 'rotate-y-180' : ''}`}>
                  
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${batch.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Animated border */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${batch.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>

                  {/* Batch icon/avatar */}
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-heading text-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    {batch.name.charAt(0)}
                  </div>

                  <h3 className="font-heading text-2xl text-accent mb-2 group-hover:text-primary transition-colors duration-300">
                    {batch.name}
                  </h3>
                  
                  <p className="text-charcoal text-lg font-medium">
                    {batch.age}
                  </p>

                  {/* Additional info that appears on hover */}
                  <div className={`mt-4 space-y-2 overflow-hidden transition-all duration-500 ${activeBatch === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm text-charcoal flex items-center justify-center gap-1">
                      <Users size={14} /> {batch.students} students
                    </p>
                    <p className="text-sm text-charcoal flex items-center justify-center gap-1">
                      <Clock size={14} /> {batch.schedule}
                    </p>
                    <p className="text-sm text-charcoal flex items-center justify-center gap-1">
                      <Star size={14} /> {batch.level}
                    </p>
                  </div>

                  {/* Expand indicator */}
                  <ChevronRight className={`mx-auto mt-4 text-secondary transition-all duration-300 ${activeBatch === index ? 'rotate-90' : ''}`} size={20} />
                </div>

                {/* Tooltip with description */}
                <div className={`absolute -top-16 left-1/2 transform -translate-x-1/2 bg-primary text-white text-sm py-2 px-4 rounded-lg whitespace-nowrap transition-all duration-300 ${activeBatch === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                  {batch.description}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rotate-45"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Schedule note */}
          <p className="text-center text-charcoal mt-8 text-sm animate-pulse">
            {t.shaaleClasses.structure.hoverHint}
          </p>
        </section>

        {/* ENROLLMENT INFO with enhanced design */}
        <section className="bg-gradient-to-br from-white to-secondary/5 rounded-3xl shadow-lg p-12 text-center reveal overflow-hidden relative">
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mt-32 animate-float"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full -ml-24 -mb-24 animate-float delay-1000"></div>
          
          <div className="relative">
            <div className="inline-block p-4 bg-secondary/10 rounded-full mb-6 group">
              <BookOpen className="text-secondary transition-all duration-500 group-hover:rotate-12 group-hover:scale-110" size={40} />
              <Sparkles className="absolute -top-2 -right-2 text-secondary animate-pulse" size={20} />
            </div>

            <h2 className="font-heading text-3xl text-primary mb-6">
              {t.shaaleClasses.enrollment.title}
            </h2>

            <p className="text-charcoal text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
              {t.shaaleClasses.enrollment.description}
            </p>

            {/* Quick placement guide */}
            <div className="grid md:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
              {placementGuide.map((guide, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow-sm text-sm">
                  <span className="font-heading text-primary">{guide.age}</span>
                  <div className="flex items-center justify-center gap-1 text-accent">
                    {guide.batch} <ArrowRight size={12} /> {guide.level}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6 flex flex-col items-center">

              <a
                href="https://www.kannadaacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-secondary font-semibold text-lg hover:text-primary transition-colors duration-300"
              >
                <BookOpen size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                {t.shaaleClasses.enrollment.textbookLink}
                <Download size={16} className="opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </a>

              <div className="relative">
                <div className="absolute inset-0 bg-secondary/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <a
                  href="https://sites.google.com/kannadaacademy.com/nwakannadashale/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-2 bg-secondary text-charcoal px-8 py-3 rounded-lg font-semibold hover:bg-support hover:scale-105 hover:shadow-xl transition-all duration-300 group"
                >
                  {t.shaaleClasses.enrollment.registerButton}
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              </div>

              <p className="text-sm text-charcoal mt-4">
                {t.shaaleClasses.enrollment.limitedSeats}
              </p>
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

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(10px, -10px) scale(1.05); }
          50% { transform: translate(-5px, 20px) scale(0.95); }
          75% { transform: translate(-15px, -5px) scale(1.02); }
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

        .animate-float {
          animation: float 10s ease-in-out infinite;
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

        .perspective-1000 {
          perspective: 1000px;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}