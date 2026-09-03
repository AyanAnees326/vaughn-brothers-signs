import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

const QuoteContext = createContext(null)

export const DEFAULT_SIGN_TEXT = 'YOUR NAME'

const EMPTY_FORM = {
  // Step 1 — what are we building
  signTypes: [],
  illumination: '',
  widthFt: 12,
  heightFt: 3,
  // Step 2 — where is it going
  businessName: '',
  location: '',
  propertyType: '',
  permitting: 'handle',
  timeline: '',
  budget: '',
  // Step 3 — how do we reach you
  fullName: '',
  phone: '',
  email: '',
  preferredContact: 'call',
  notes: '',
  consent: false,
}

/** (555) 555-5555 — formats progressively as the user types. */
export function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

/**
 * Per-step validation. Returns a field->message map; empty means the step
 * may advance. Kept here rather than in the form so the step components stay
 * presentational.
 */
export function validateStep(step, data) {
  const errors = {}
  if (step === 0) {
    if (data.signTypes.length === 0)
      errors.signTypes = 'Pick at least one sign type.'
    if (!data.illumination) errors.illumination = 'Choose an illumination option.'
  }
  if (step === 1) {
    if (!data.businessName.trim())
      errors.businessName = 'We need a name for the sign.'
    if (!data.location.trim())
      errors.location = 'An address or ZIP helps us check permitting.'
    if (!data.propertyType) errors.propertyType = 'Choose a property type.'
    if (!data.timeline) errors.timeline = 'Roughly when do you need it?'
  }
  if (step === 2) {
    if (!data.fullName.trim()) errors.fullName = 'Who are we talking to?'
    const digits = data.phone.replace(/\D/g, '')
    if (!digits) errors.phone = 'A phone number, please.'
    else if (digits.length !== 10) errors.phone = 'That needs to be 10 digits.'
    if (!data.email.trim()) errors.email = 'An email, please.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim()))
      errors.email = "That email doesn't look right."
    if (!data.consent) errors.consent = 'We need your okay to get back to you.'
  }
  return errors
}

function makeTicketNumber() {
  const year = new Date().getFullYear()
  const seq = String(Math.floor(1000 + Math.random() * 9000))
  return `VB-${year}-${seq}`
}

export function QuoteProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [data, setData] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [ticket, setTicket] = useState(null)

  // The hero's neon sign text. Lives here so the sign and the form are one
  // product rather than two disconnected demos.
  const [signText, setSignText] = useState(DEFAULT_SIGN_TEXT)
  const businessNameDirty = useRef(false)

  // Which trigger opened the panel. The modal borrows that trigger's layoutId
  // so the morph starts from the button the visitor actually pressed —
  // every trigger keeps a distinct id, which is what makes three entry
  // points share one shared-layout animation without colliding.
  const [sourceId, setSourceId] = useState('quote-fab')

  const setField = useCallback((name, value) => {
    if (name === 'businessName') businessNameDirty.current = true
    setData((d) => ({ ...d, [name]: value }))
    // Clear a field's error the moment the user starts fixing it.
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e))
  }, [])

  const toggleSignType = useCallback((value) => {
    setData((d) => ({
      ...d,
      signTypes: d.signTypes.includes(value)
        ? d.signTypes.filter((v) => v !== value)
        : [...d.signTypes, value],
    }))
    setErrors((e) => (e.signTypes ? { ...e, signTypes: undefined } : e))
  }, [])

  const open = useCallback(
    (triggerId = 'quote-fab') => {
      // Carry the hero sign text across unless the visitor already edited the
      // field themselves.
      setData((d) => {
        if (businessNameDirty.current) return d
        const carried = signText.trim()
        if (!carried || carried === DEFAULT_SIGN_TEXT) return d
        return { ...d, businessName: carried }
      })
      setSourceId(triggerId)
      setIsOpen(true)
    },
    [signText],
  )

  const close = useCallback(() => setIsOpen(false), [])

  const next = useCallback(() => {
    const found = validateStep(step, data)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return false
    }
    setErrors({})
    setStep((s) => Math.min(s + 1, 2))
    return true
  }, [step, data])

  const back = useCallback(() => {
    setErrors({})
    setStep((s) => Math.max(s - 1, 0))
  }, [])

  const submit = useCallback(() => {
    const found = validateStep(2, data)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return false
    }
    setErrors({})
    // No backend by design — the mockup resolves straight to the job ticket.
    setTicket(makeTicketNumber())
    return true
  }, [data])

  const reset = useCallback(() => {
    setTicket(null)
    setStep(0)
    setErrors({})
    setData(EMPTY_FORM)
    businessNameDirty.current = false
  }, [])

  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
      step,
      next,
      back,
      data,
      setField,
      toggleSignType,
      errors,
      submit,
      ticket,
      reset,
      signText,
      setSignText,
      sourceId,
    }),
    [
      isOpen,
      open,
      close,
      step,
      next,
      back,
      data,
      setField,
      toggleSignType,
      errors,
      submit,
      ticket,
      reset,
      signText,
      sourceId,
    ],
  )

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
}

export function useQuote() {
  const ctx = useContext(QuoteContext)
  if (!ctx) throw new Error('useQuote must be used inside <QuoteProvider>')
  return ctx
}
