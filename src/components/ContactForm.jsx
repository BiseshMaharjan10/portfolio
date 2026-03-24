import { useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'

const initialForm = {
  name: '',
  email: '',
  message: '',
}

export default function ContactForm() {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const isDisabled = useMemo(() => {
    return isSubmitting || !formData.name || !formData.email || !formData.message
  }, [formData, isSubmitting])

  const validate = () => {
    const nextErrors = {}

    if (!formData.name.trim()) {
      nextErrors.name = 'Name is required.'
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (formData.message.trim().length < 10) {
      nextErrors.message = 'Message should be at least 10 characters.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    setIsSubmitted(false)
    setSubmitError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    if (!serviceId || !templateId || !publicKey) {
      setSubmitError('Email service is not configured yet. Please add EmailJS keys.')
      return
    }

    setIsSubmitting(true)

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        {
          publicKey,
        },
      )

      setIsSubmitted(true)
      setSubmitError('')
      setFormData(initialForm)
      setErrors({})
    } catch (error) {
      const status = error?.status ? ` (${error.status})` : ''
      const detail = error?.text ? ` ${error.text}` : ''

      setIsSubmitted(false)
      setSubmitError(`Could not send message${status}.${detail}`.trim())
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fade-in space-y-4 rounded-3xl border border-white/10 bg-transparent p-6 md:p-8"
      noValidate
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm text-zinc-200">
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-zinc-100 outline-none transition-colors duration-300 placeholder:text-zinc-500 focus:border-cyan-300"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <span className="text-xs text-rose-300">{errors.name}</span>}
        </label>

        <label className="block space-y-2 text-sm text-zinc-200">
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-zinc-100 outline-none transition-colors duration-300 placeholder:text-zinc-500 focus:border-cyan-300"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <span className="text-xs text-rose-300">{errors.email}</span>}
        </label>
      </div>

      <label className="block space-y-2 text-sm text-zinc-200">
        <span>Message</span>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-zinc-100 outline-none transition-colors duration-300 placeholder:text-zinc-500 focus:border-cyan-300"
          placeholder="Tell me about your project"
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <span className="text-xs text-rose-300">{errors.message}</span>}
      </label>

      <button
        type="submit"
        disabled={isDisabled}
        className="inline-flex min-w-36 items-center justify-center rounded-xl border border-cyan-300/40 bg-cyan-400/20 px-5 py-2.5 font-medium text-cyan-100 transition-all duration-300 hover:bg-cyan-300/25 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 animate-ping rounded-full bg-cyan-200" />
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>

      <p
        className={`text-sm text-emerald-300 transition-all duration-300 ${
          isSubmitted ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
        }`}
        aria-live="polite"
      >
        Message sent successfully. I will get back to you soon.
      </p>

      {submitError && (
        <p className="text-sm text-rose-300" role="alert" aria-live="polite">
          {submitError}
        </p>
      )}
    </form>
  )
}
