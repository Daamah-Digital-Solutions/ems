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

// Parse [[accent]] and {{bold}} markers into an array of strings + elements.
export function rich(input) {
  if (input == null) return null
  if (typeof input !== 'string') return input
  const re = /\[\[(.+?)\]\]|\{\{(.+?)\}\}/g
  const out = []
  let last = 0
  let m
  let i = 0
  while ((m = re.exec(input)) !== null) {
    if (m.index > last) out.push(input.slice(last, m.index))
    if (m[1] != null) out.push(<span className="r" key={i++}>{m[1]}</span>)
    else out.push(<b key={i++}>{m[2]}</b>)
    last = re.lastIndex
  }
  if (last < input.length) out.push(input.slice(last))
  return out.length === 1 ? out[0] : out
}

// Convenience component: <T k="hero.titleLine1" />
export function T({ k }) {
  const { t } = useLang()
  return <>{rich(t(k))}</>
}
