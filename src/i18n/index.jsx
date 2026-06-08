import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import en from './en'
import ar from './ar'

// Lightweight bilingual layer (EN default + AR). No external deps.
// - t(key) returns the raw value at a dot-path (string | array | object),
//   falling back to English, then to the key itself.
// - rich(str) turns inline markers into React nodes:
//     [[text]] -> <span className="r">text</span>   (brand red accent)
//     {{text}} -> <b>text</b>                        (bold)
// - <T k="..." /> is sugar for rich(t(k)).

const DICTS = { en, ar }
const LS_KEY = 'ems-lang'

const LangCtx = createContext(null)

function getInitial() {
  try {
    const v = localStorage.getItem(LS_KEY)
    if (v === 'en' || v === 'ar') return v
  } catch (e) {
    /* ignore */
  }
  return 'en'
}

function lookup(dict, key) {
  return key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dict)
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(getInitial)
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const el = document.documentElement
    el.setAttribute('lang', lang)
    el.setAttribute('dir', dir)
    try {
      localStorage.setItem(LS_KEY, lang)
    } catch (e) {
      /* ignore */
    }
  }, [lang, dir])

  const setLang = useCallback((l) => setLangState(l === 'ar' ? 'ar' : 'en'), [])
  const toggle = useCallback(() => setLangState((l) => (l === 'ar' ? 'en' : 'ar')), [])

  const t = useCallback(
    (key) => {
      const v = lookup(DICTS[lang], key)
      if (v !== undefined) return v
      const fb = lookup(en, key)
      return fb !== undefined ? fb : key
    },
    [lang]
  )

  const value = useMemo(() => ({ lang, dir, setLang, toggle, t }), [lang, dir, setLang, toggle, t])
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>
}

export function useLang() {
  const ctx = useContext(LangCtx)
  if (!ctx) throw new Error('useLang must be used within <LangProvider>')
  return ctx
}

// A run of Latin letters / digits / common symbols (brand names, MyoStyle®,
// 2×20, 1:1, phone numbers, GA4...). Spaces are kept inside a run only when
// they sit between two Latin/number tokens, so "EMS ElRiyadh" stays one run
// but "MyoStyle® الألماني" stops at the Arabic word.
const LTR_RUN = /[A-Za-z0-9][A-Za-z0-9®™×:+.\-/]*(?:\s+[A-Za-z0-9®™×:+.\-/]+)*/g

// Wrap every embedded Latin/number run in <bdi> (unicode-bidi: isolate) so the
// browser doesn't reorder the surrounding Arabic — the fix for scrambled
// mixed-direction lines. Pure-Arabic strings pass through untouched; in LTR
// English the wrapping is a visual no-op.
export function bidi(text, kp = 'b') {
  if (typeof text !== 'string' || !text) return text
  if (!/[A-Za-z0-9]/.test(text)) return text // nothing Latin/numeric to isolate
  const out = []
  let last = 0
  let m
  let i = 0
  LTR_RUN.lastIndex = 0
  while ((m = LTR_RUN.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index))
    out.push(
      <bdi key={`${kp}${i++}`}>{m[0]}</bdi>
    )
    last = LTR_RUN.lastIndex
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

// Parse [[accent]] and {{bold}} markers into nodes, and bidi-isolate any
// Latin/number runs (including inside the accent/bold spans).
export function rich(input) {
  if (input == null) return null
  if (typeof input !== 'string') return input
  const re = /\[\[(.+?)\]\]|\{\{(.+?)\}\}/g
  const out = []
  let last = 0
  let m
  let i = 0
  const push = (chunk, kp) => {
    const b = bidi(chunk, kp)
    if (Array.isArray(b)) out.push(...b)
    else out.push(b)
  }
  while ((m = re.exec(input)) !== null) {
    if (m.index > last) push(input.slice(last, m.index), `t${i}_`)
    if (m[1] != null) out.push(<span className="r" key={`r${i}`}>{bidi(m[1], `r${i}_`)}</span>)
    else out.push(<b key={`b${i}`}>{bidi(m[2], `b${i}_`)}</b>)
    i++
    last = re.lastIndex
  }
  if (last < input.length) push(input.slice(last), `t${i}_`)
  return out.length === 1 ? out[0] : out
}

// Convenience component: <T k="hero.titleLine1" />
export function T({ k }) {
  const { t } = useLang()
  return <>{rich(t(k))}</>
}
