import { useEffect, useState } from 'react'
import { waLink, WA, PHONE } from '../constants'
import { useLang } from '../i18n'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { initAnalytics, trackPageView, trackLead } from '../analytics'
import { WaIcon } from '../components/icons'
import emsIcon from '../ems-icon.svg'

// Standalone ad landing page (/offer). Arabic-only, RTL, conversion-focused:
// one goal — book the first session via WhatsApp. No site nav/footer.
// Hard rules: no prices, no medical/guaranteed claims, WhatsApp only.

const BOOK = 'مرحباً EMS ElRiyadh، أودّ حجز جلستي الأولى.'

// Small helper: isolate Latin/number runs so RTL doesn't scramble them.
const L = ({ children }) => <bdi dir="ltr">{children}</bdi>

const BENEFITS = [
  {
    title: 'الاستوديو يجيكِ',
    text: 'لا مواصلات ولا زحام — نحضر لكِ بالبدلة والنظام الكامل ونجهّز كل شيء في مكانكِ.',
    icon: (
      <>
        <path d="M3 11l9-8 9 8" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
  },
  {
    title: '20 دقيقة فقط',
    text: 'جلسة قصيرة ومكثّفة، مرتين أسبوعياً — تناسب أكثر الجداول ازدحاماً.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: 'تدريب خاص لكِ وحدكِ',
    text: 'تدريب فردي واحد لواحد، كل حركة موجّهة، والشدّة مضبوطة على مستواكِ تماماً.',
    icon: (
      <>
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M17 11l2 2 4-4" />
      </>
    ),
  },
  {
    title: 'خصوصية تامة',
    text: 'في بيتكِ أو فندقكِ أو مجمّعكِ — هدوء وتركيز وراحة، بدون زحام ولا جمهور.',
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z" />
        <path d="M9.5 12l1.8 1.8L15 10" />
      </>
    ),
  },
]

const STEPS = [
  { img: '/images/cut3.jpg', alt: 'وصول فريق EMS ElRiyadh بالبدلة والنظام', title: 'نحضر لكِ', text: 'نصل إليكِ بالبدلة والنظام الألماني كاملاً. تكونين جاهزة خلال دقائق — دون نادٍ ودون معدّات.' },
  { img: '/images/final-hero.jpg', alt: 'جلسة تدريب موجّهة', title: 'تتدرّبين', text: 'عشرون دقيقة موجّهة، ونبضات مضبوطة تتزامن مع كل حركة — بتوجيه كامل في كل ثانية.' },
  { img: '/images/cut2.jpg', alt: 'الاسترخاء بعد الجلسة', title: 'نغادر وأنتِ مرتاحة', text: 'نجمع كل شيء ونغادر — تبقين مفعمة بالنشاط، وبقيّة يومكِ لكِ بالكامل.' },
]

// PLACEHOLDER TESTIMONIALS — experiential only, no outcome/medical claims.
const REVIEWS = [
  { quote: 'وصلوا في الموعد تماماً وجهّزوا كل شيء، وبدأتُ التدريب خلال دقائق. دون نادٍ ودون تنقّل.', initials: 'أ.م', area: 'الرياض' }, // TODO: replace with real testimonial
  { quote: 'عشرون دقيقة تناسب جدولي فعلاً، والاهتمام الفردي هو أفضل جزء — كل جلسة مضبوطة عليّ.', initials: 'ن.س', area: 'الرياض' }, // TODO: replace with real testimonial
  { quote: 'ممارستها في البيت أحدثت كل الفرق — خصوصية وسهولة، والحجز عبر واتساب أبسط ما يكون.', initials: 'ل.ه', area: 'الرياض' }, // TODO: replace with real testimonial
]

const FAQ = [
  ['هل هو مناسب لي؟', 'يدعم EMS اللياقة العامة والشدّ والقوة لكثير من البالغات النشيطات. وكما هو الحال عند بدء أي تدريب جديد، ننصحكِ بمراجعة طبيبكِ أولاً إن كانت لديكِ حالة صحية أو كنتِ حاملاً أو تستخدمين جهازاً إلكترونياً مزروعاً مثل منظّم ضربات القلب. ونُجري معكِ حديثاً قصيراً للجاهزية قبل جلستكِ الأولى. EMS ElRiyadh خدمة تدريب لياقة، وليست جهازاً أو علاجاً طبياً.'],
  ['هل أحتاج معدّات أو مساحة؟', 'لا شيء. نحضر كل شيء — النظام الألماني وبدلة النبضات وكل التجهيزات. أمتار قليلة من الأرضية تكفي، في البيت أو الفندق أو المجمّع.'],
  ['هل منطقتي مغطّاة؟', 'كل الرياض. لا أحياء محدّدة — إن كنتِ في المدينة، نصل إليكِ أينما كنتِ.'],
  ['كيف أحجز؟', 'برسالة واحدة على واتساب. نحدّد موعداً يناسبكِ، نؤكّد موقعكِ، ونصل جاهزين. بدون أي التزام.'],
]

function Faq({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="fr">
      <button className="fq" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {q}
        <span className="pm" aria-hidden="true" />
      </button>
      <div className="fa" style={{ maxHeight: open ? 400 : 0 }}>
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function Landing() {
  const [go, setGo] = useState(false)
  const { setLang } = useLang()
  useScrollReveal('/offer', 'ar')

  // Force Arabic + RTL via the provider (setting html attrs directly would race
  // the provider's own effect). Standalone Arabic ad page.
  useEffect(() => {
    setLang('ar')
    document.title = 'احجز جلستك الأولى · EMS ElRiyadh — تدريب EMS في الرياض'
    // Ad landing page — keep it out of organic search (don't dilute the home
    // page). Remove on unmount so noindex never leaks to the rest of the site.
    const robots = document.createElement('meta')
    robots.setAttribute('name', 'robots')
    robots.setAttribute('content', 'noindex, follow')
    document.head.appendChild(robots)
    const raf = requestAnimationFrame(() => setGo(true))
    return () => {
      cancelAnimationFrame(raf)
      robots.remove()
    }
  }, [setLang])

  // Analytics + Meta Pixel Lead on every WhatsApp tap (ad conversion signal).
  useEffect(() => {
    initAnalytics()
    trackPageView('/offer')
    const onClick = (e) => {
      const a = e.target.closest('a[href*="wa.me"]')
      if (a) trackLead({ page_path: '/offer' })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const bookHref = waLink(BOOK)

  return (
    <div className="lp">
      {/* Minimal header — logo + single WhatsApp CTA, no nav */}
      <header className="lp-nav">
        <span className="brand">
          <img className="brand-mark" src={emsIcon} alt="" />
          <span className="wm">
            <b>EMS</b>
            <span>ElRiyadh</span>
          </span>
        </span>
        <a className="lp-cta-mini" href={bookHref} target="_blank" rel="noopener noreferrer">
          <WaIcon />
          احجزي الآن
        </a>
      </header>

      {/* HERO */}
      <section className={`hero${go ? ' go' : ''}`}>
        <div className="hero-l">
          <span className="lp-urgency">الأماكن محدودة أسبوعياً — احجزي موعدكِ</span>
          <span className="eyebrow">تدريب <L>EMS</L> الشخصي · الرياض</span>
          <h1>
            <span className="ln l1"><span>احجزي جلستكِ</span></span>
            <span className="ln l2"><span className="r">الأولى.</span></span>
          </h1>
          <p className="sub">
            تدريب <L>EMS</L> فردي فاخر بهندسة ألمانية — نحضر لكِ البدلة والنظام لباب بيتكِ أو فندقكِ أو
            مجمّعكِ في الرياض. <b><L>20</L> دقيقة، مرتين أسبوعياً، بخصوصية تامة.</b>
          </p>
          <div className="hero-cta">
            <a className="btn-lg" href={bookHref} target="_blank" rel="noopener noreferrer">
              <WaIcon />
              احجزي جلستكِ الأولى عبر واتساب
            </a>
          </div>
          <p className="lp-micro">
            <span><span className="dot" /> ردّ سريع</span>
            <span><span className="dot" /> بدون التزام</span>
            <span><span className="dot" /> اختاري الوقت المناسب لكِ</span>
          </p>
          <div className="trust">
            <span className="t"><span className="dot" /> <b>بهندسة ألمانية</b></span>
            <span className="t"><span className="dot" /> <b>خصوصية تامة</b></span>
            <span className="t"><span className="dot" /> في كل <b>الرياض</b></span>
          </div>
        </div>

        <div className="hero-media">
          <svg className="arc" viewBox="0 0 600 600" aria-hidden="true" preserveAspectRatio="none">
            <path d="M70,540 C40,300 180,70 470,60 C300,120 150,300 220,560" />
          </svg>
          <div className="frame">
            <img src="/images/final-hero.jpg" alt="جلسة تدريب EMS ElRiyadh" decoding="async" />
          </div>
          <div className="fbadge b1">
            <span className="v"><L>20</L><small style={{ fontSize: '.6em' }}>′</small></span>
            <span className="k">دقيقة<br />مركّزة</span>
          </div>
          <div className="fbadge b2 float">
            <span className="v"><L>2×</L></span>
            <span className="k">جلستان<br />أسبوعياً</span>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="pad">
        <div className="wrap">
          <div className="shead rv">
            <div>
              <span className="eyebrow">ليه تختارينا</span>
              <h2>تدريب يجيكِ، <span className="r">وقت ما تحبّي.</span></h2>
            </div>
          </div>
          <div className="benefits">
            {BENEFITS.map((b, i) => (
              <div className={`bcard rv${i ? ` d${i}` : ''}`} key={b.title}>
                <div className="ic"><svg viewBox="0 0 24 24">{b.icon}</svg></div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="how pad">
        <div className="wrap">
          <div className="shead rv">
            <div>
              <span className="eyebrow">كيف تتم الجلسة</span>
              <h2>ثلاث خطوات. <span className="r">وبس.</span></h2>
            </div>
          </div>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div className={`step rv${i ? ` d${i}` : ''}`} key={s.title}>
                <div className="pic">
                  <span className="no">{i + 1}</span>
                  <img src={s.img} alt={s.alt} loading={i === 0 ? undefined : 'lazy'} decoding="async" />
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MID CTA */}
      <section className="pad" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="ctastrip" style={{ borderRadius: 24, border: '1px solid var(--line)' }}>
            <div className="wrap cta-in rv" style={{ padding: 'clamp(1.8rem,4vw,2.6rem) clamp(1.2rem,3vw,2rem)' }}>
              <p className="ct">جاهزة للبدء؟ <span className="r">جلستكِ الأولى بانتظاركِ.</span></p>
              <div className="cta-act">
                <a className="btn-lg" href={bookHref} target="_blank" rel="noopener noreferrer">
                  <WaIcon />
                  احجزي الآن
                </a>
                <span className="ph">أو اتّصلي على <a href={WA} target="_blank" rel="noopener noreferrer"><bdi dir="ltr">{PHONE}</bdi></a></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="how pad" style={{ background: 'transparent', border: 0 }}>
        <div className="wrap">
          <div className="shead rv">
            <div>
              <span className="eyebrow">آراء عميلاتنا</span>
              <h2>تجربة <span className="r">تتحدّث عنها كل من جرّبتها.</span></h2>
            </div>
          </div>
          <div className="quotes">
            {REVIEWS.map((r, i) => (
              <div className={`qcard rv${i % 3 ? ` d${i % 3}` : ''}`} key={i}>
                <span className="qmark" aria-hidden="true">&ldquo;</span>
                <blockquote>{r.quote}</blockquote>
                <div className="who">
                  <span className="avatar" aria-hidden="true">{r.initials}</span>
                  <div>
                    <div className="area">{r.area}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* TODO: replace placeholder testimonials with real, consented client reviews */}
        </div>
      </section>

      {/* FAQ */}
      <section className="pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shead rv" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div>
              <span className="eyebrow">أسئلة شائعة</span>
              <h2>كل ما تريدين <span className="r">معرفته.</span></h2>
            </div>
          </div>
          <div className="faq rv">
            {FAQ.map(([q, a]) => (
              <Faq key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final">
        <img className="bg" loading="lazy" decoding="async" src="/images/cut2.jpg" alt="" aria-hidden="true" />
        <div className="in rv">
          <h2>جاهزة <span className="r">للبدء؟</span></h2>
          <p>رسالة واحدة، جلسة واحدة، ولا تنقّل. دَعي الاستوديو يجيكِ.</p>
          <a className="btn-lg" href={bookHref} target="_blank" rel="noopener noreferrer">
            <WaIcon />
            احجزي جلستكِ الأولى الآن
          </a>
          <div className="ph">أو راسلينا على <a href={WA} target="_blank" rel="noopener noreferrer"><bdi dir="ltr">{PHONE}</bdi></a></div>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="lp-foot">
        <span className="wm"><b>EMS ElRiyadh</b></span>
        <span>خدمة لياقة وعافية فاخرة بهندسة ألمانية — ليست جهازاً أو علاجاً طبياً.</span>
        <span>© {new Date().getFullYear()} EMS ElRiyadh · مدعوم بـ <b>MyoStyle®</b> · <bdi dir="ltr">{PHONE}</bdi></span>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="mbook">
        <a href={bookHref} target="_blank" rel="noopener noreferrer">
          <WaIcon />
          احجزي جلستكِ الأولى
        </a>
      </div>
    </div>
  )
}
