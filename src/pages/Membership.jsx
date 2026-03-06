import { CheckCircle } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"

export default function Membership() {
  const { t } = useLanguage()
  
  const benefits = t.membership.benefits.list
  const plans = t.membership.plans

  return (
    <div className="bg-background">

      {/* PAGE HERO */}
      <section className="bg-primary/90 text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            {t.membership.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200">
            {t.membership.subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24 space-y-28">

        {/* MEMBERSHIP BENEFITS */}
        <section className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl text-primary text-center mb-8">
            {t.membership.benefits.title}
          </h2>
          
          <p className="text-center text-xl text-charcoal mb-12">
            {t.membership.benefits.subtitle}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300"
              >
                <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={22} />
                <p className="text-charcoal text-base">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MEMBERSHIP PLANS */}
        <section>
          <h2 className="font-heading text-3xl text-primary text-center mb-16">
            {plans.title}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* SINGLE MEMBERSHIP */}
            <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-300 text-center relative">
              <h3 className="font-heading text-2xl text-accent mb-4">
                {plans.single.name}
              </h3>

              <p className="text-4xl font-heading text-primary mb-6">
                {plans.single.price}
                <span className="text-lg text-charcoal font-body">
                  {plans.single.period}
                </span>
              </p>

              <ul className="space-y-3 text-charcoal mb-8 text-left">
                {plans.single.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="bg-secondary text-charcoal px-8 py-3 rounded-lg font-semibold hover:bg-support transition w-full">
                {plans.single.button}
              </button>
            </div>

            {/* ANNUAL FAMILY MEMBERSHIP */}
            <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-300 text-center relative">
              <h3 className="font-heading text-2xl text-accent mb-4">
                {plans.family.name}
              </h3>

              <p className="text-4xl font-heading text-primary mb-6">
                {plans.family.price}
                <span className="text-lg text-charcoal font-body">
                  {plans.family.period}
                </span>
              </p>

              <ul className="space-y-3 text-charcoal mb-8 text-left">
                {plans.family.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="bg-secondary text-charcoal px-8 py-3 rounded-lg font-semibold hover:bg-support transition w-full">
                {plans.family.button}
              </button>
            </div>

            {/* LIFETIME MEMBERSHIP */}
            <div className="bg-primary text-white p-8 rounded-3xl shadow-xl text-center relative transform hover:scale-105 transition duration-300">
              
              {/* Highlight Badge */}
              <div className="absolute top-0 right-0 bg-secondary text-charcoal px-4 py-1 rounded-bl-2xl font-semibold text-sm">
                {plans.lifetime.badge}
              </div>

              <h3 className="font-heading text-2xl mb-4">
                {plans.lifetime.name}
              </h3>

              <p className="text-4xl font-heading mb-6">
                {plans.lifetime.price}
                <span className="text-lg font-body text-gray-200">
                  {plans.lifetime.period}
                </span>
              </p>

              <ul className="space-y-3 mb-8 text-left">
                {plans.lifetime.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="bg-secondary text-charcoal px-8 py-3 rounded-lg font-semibold hover:bg-support transition w-full">
                {plans.lifetime.button}
              </button>
            </div>

          </div>

          {/* CONTACT TREASURER */}
          <div className="text-center mt-16">
            <p className="text-xl text-charcoal">
              {plans.contactMessage}
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}