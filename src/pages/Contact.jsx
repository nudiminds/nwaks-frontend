import { Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"
import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import toast from "react-hot-toast"

export default function Contact() {
  const { t } = useLanguage()

  const formRef = useRef()
  const [loading, setLoading] = useState(false)

  const sendEmail = (e) => {
    e.preventDefault()

    setLoading(true)

    emailjs
      .sendForm(
        "service_nwaks",
        "template_nwaks",
        formRef.current,
        "fa3t53Mh41jRrYsZ_"
      )
      .then(
        () => {
          toast.success("Message sent successfully 🎉")
          formRef.current.reset()
          setLoading(false)
        },
        (error) => {
          console.error(error)
          toast.error("Failed to send message ❌")
          setLoading(false)
        }
      )
  }

  return (
    <div className="bg-background">

      {/* PAGE HERO */}
      <section className="bg-primary/90 text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            {t.contact.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-16">

          {/* CONTACT INFO */}
          <div className="bg-white p-10 rounded-3xl shadow-md h-full flex flex-col">
            <h2 className="font-heading text-3xl text-primary mb-8">
              {t.contact.information.title}
            </h2>

            <div className="space-y-6 flex-1">

              <div className="flex items-start gap-5 bg-background p-6 rounded-xl">
                <MapPin className="text-secondary" size={28} />
                <div>
                  <h3 className="font-heading text-xl text-accent">
                    {t.contact.information.location.title}
                  </h3>
                  <p className="text-charcoal">
                    {t.contact.information.location.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 bg-background p-6 rounded-xl">
                <Phone className="text-secondary" size={28} />
                <div>
                  <h3 className="font-heading text-xl text-accent">
                    {t.contact.information.phone.title}
                  </h3>
                  <p className="text-charcoal">
                    {t.contact.information.phone.number}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 bg-background p-6 rounded-xl">
                <Mail className="text-secondary" size={28} />
                <div>
                  <h3 className="font-heading text-xl text-accent">
                    {t.contact.information.email.title}
                  </h3>
                  <p className="text-charcoal">
                    {t.contact.information.email.address}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-white p-10 rounded-3xl shadow-md h-full flex flex-col">

            <h2 className="font-heading text-3xl text-primary mb-8 text-center">
              {t.contact.form.title}
            </h2>

            <form ref={formRef} onSubmit={sendEmail} className="space-y-6 flex-1 flex flex-col">

              <div className="flex-1 space-y-6">

                <div>
                  <label className="block text-charcoal mb-2">
                    {t.contact.form.fields.name.label}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder={t.contact.form.fields.name.placeholder}
                  />
                </div>

                <div>
                  <label className="block text-charcoal mb-2">
                    {t.contact.form.fields.email.label}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder={t.contact.form.fields.email.placeholder}
                  />
                </div>

                <div>
                  <label className="block text-charcoal mb-2">
                    {t.contact.form.fields.message.label}
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder={t.contact.form.fields.message.placeholder}
                  ></textarea>
                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-secondary text-charcoal px-6 py-3 rounded-lg font-semibold hover:bg-support transition duration-300 mt-auto"
              >
                {loading ? "Sending..." : t.contact.form.button}
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  )
}