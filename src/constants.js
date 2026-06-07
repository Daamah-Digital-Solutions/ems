// Central place for contact + brand constants.
// One source of truth — never hardcode these anywhere else.
export const WA = 'https://wa.me/966540899508'
export const PHONE = '+966 54 089 9508'

export const EMAIL = 'info@emselriyadh.com'
export const IG_HANDLE = '@emselriyadh'
export const INSTAGRAM = 'https://www.instagram.com/emselriyadh/'
export const SITE = 'https://emselriyadh.com'

// Build a WhatsApp link with a pre-filled message.
export const waLink = (text) =>
  text ? `${WA}?text=${encodeURIComponent(text)}` : WA

export const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
