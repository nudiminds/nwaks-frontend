/* eslint-disable no-unused-vars */
import { Users, BookOpen, Heart, Star, Mail, Calendar, Award, ChevronRight, Quote } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import Natarah from "../assets/directors/nataraj.jpeg"

export default function ShaaleTeam() {
  const { t } = useLanguage()
  const [hoveredTeacher, setHoveredTeacher] = useState(null)
  const sectionRefs = useRef([])

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

  const teachers = t.shaaleTeam.teachers.list

  const stats = [
    { label: t.shaaleTeam.stats.totalTeachers, value: 8, icon: Users },
    { label: t.shaaleTeam.stats.yearsCombined, value: 22, icon: Calendar },
    { label: t.shaaleTeam.stats.studentsTaught, value: 50, icon: BookOpen },
    { label: t.shaaleTeam.stats.volunteerHours, value: "1000+", icon: Heart },
  ]

  return (
    <div className="bg-background overflow-hidden">

      {/* HERO SECTION with enhanced animation */}
      <section className="bg-primary/90 text-white py-24 text-center relative">
        
        <div className="container mx-auto px-6 relative">
          <h1 className="font-heading text-4xl md:text-5xl mb-4 animate-fade-in">
            {t.shaaleTeam.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 animate-fade-in-up delay-200">
            {t.shaaleTeam.subtitle}
          </p>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="container mx-auto px-6 -mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 reveal group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                <stat.icon className="mx-auto text-secondary mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" size={28} />
                <div className="absolute inset-0 bg-secondary/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 -z-10"></div>
              </div>
              <div className="font-heading text-2xl text-primary">
                {stat.value}
              </div>
              <p className="text-sm text-charcoal">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-6 py-24 space-y-24">

        {/* FEATURED TEACHER with enhanced design */}
        <section className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-12 reveal group/featured">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-secondary/10 rounded-2xl group-hover/featured:rotate-12 transition-transform duration-500">
              <Users className="text-secondary" size={32} />
            </div>
            <h2 className="font-heading text-3xl text-primary relative">
              {t.shaaleTeam.featured.title}
              <span className="absolute -bottom-2 left-0 w-0 h-1 bg-secondary group-hover/featured:w-full transition-all duration-500"></span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Teacher profile with image placeholder */}
            <div className="md:col-span-1">
              <div className="relative">
                <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-secondary to-primary p-1 animate-float">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <img src={Natarah} alt={t.shaaleTeam.featured.name} className="w-full h-full rounded-full object-cover" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-secondary text-white p-3 rounded-full shadow-lg animate-pulse">
                  <Heart size={20} />
                </div>
              </div>
            </div>

            {/* Teacher details */}
            <div className="md:col-span-2">
              <h3 className="font-heading text-3xl text-accent mb-4 flex items-center gap-2">
                {t.shaaleTeam.featured.name}
                <Award className="text-secondary" size={24} />
              </h3>

              <div className="space-y-4">
                <p className="text-charcoal leading-relaxed text-lg relative pl-6 border-l-4 border-secondary">
                  <Quote className="absolute -left-2 -top-2 text-secondary/20" size={40} />
                  {t.shaaleTeam.featured.description1}
                </p>

                <p className="text-charcoal leading-relaxed text-lg pl-6">
                  {t.shaaleTeam.featured.description2}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-6">
                {t.shaaleTeam.featured.tags.map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-secondary/10 text-primary rounded-full text-sm font-medium hover:bg-secondary hover:text-white transition-all duration-300 cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TEACHERS GRID with enhanced cards */}
        <section className="reveal">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl text-primary relative inline-block">
              {t.shaaleTeam.teachers.title}
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-secondary rounded-full"></span>
            </h2>
            <p className="text-charcoal mt-6 max-w-2xl mx-auto">
              {t.shaaleTeam.teachers.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map((teacher, index) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredTeacher(index)}
                onMouseLeave={() => setHoveredTeacher(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card with hover effects */}
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 text-center relative overflow-hidden">
                  
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Animated border */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                  {/* Avatar with animation */}
                  <div className="relative mb-6">
                    <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-secondary to-primary p-1 transition-all duration-500 ${hoveredTeacher === index ? 'rotate-12 scale-110' : ''}`}>
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <span className="font-heading text-2xl text-primary">
                          {teacher.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Floating badge on hover */}
                    <div className={`absolute -top-2 -right-2 bg-secondary text-white p-2 rounded-full shadow-lg transition-all duration-500 ${hoveredTeacher === index ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                      <Star size={16} />
                    </div>
                  </div>

                  {/* Teacher info */}
                  <h3 className="font-heading text-lg text-primary group-hover:text-secondary transition-colors duration-300">
                    {teacher.name}
                  </h3>

                  <p className="text-sm text-accent mt-2 font-medium">
                    {teacher.role}
                  </p>

                  {/* Additional info that appears on hover */}
                  <div className={`mt-4 space-y-2 transition-all duration-500 overflow-hidden ${hoveredTeacher === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-xs text-charcoal flex items-center justify-center gap-1">
                      <BookOpen size={12} /> {teacher.expertise}
                    </p>
                    <p className="text-xs text-charcoal flex items-center justify-center gap-1">
                      <Calendar size={12} /> {teacher.experience}
                    </p>
                    <p className="text-xs text-primary flex items-center justify-center gap-1 hover:underline cursor-pointer">
                      <Mail size={12} /> {t.shaaleTeam.teachers.contact}
                    </p>
                  </div>

                  {/* Expand indicator */}
                  <ChevronRight className={`mx-auto mt-4 text-secondary transition-all duration-300 ${hoveredTeacher === index ? 'rotate-90' : ''}`} size={20} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* JOIN US SECTION */}
        <section className="bg-gradient-to-r from-primary to-primary/90 rounded-3xl p-12 text-white text-center reveal">
          <h2 className="font-heading text-3xl mb-4 animate-pulse">
            {t.shaaleTeam.join.title}
          </h2>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            {t.shaaleTeam.join.subtitle}
          </p>
          <button className="bg-secondary text-primary px-8 py-3 rounded-full font-heading text-lg hover:bg-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            {t.shaaleTeam.join.button}
          </button>
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
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg); }
          50% { transform: translate(-5px, 20px) rotate(-5deg); }
          75% { transform: translate(-15px, -5px) rotate(3deg); }
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
      `}</style>
    </div>
  )
}