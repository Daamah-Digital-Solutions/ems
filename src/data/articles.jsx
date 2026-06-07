// Article registry — language-neutral metadata only (slug + cover image).
// The localized fields (title, excerpt, tag, read, body) live in the i18n
// dictionaries under `art.<slug>` so posts are bilingual.
// Structured so a CMS / markdown source can drop in later.

export const ARTICLES = [
  { slug: 'why-twenty-minutes', cover: '/images/cut3.jpg' },
  { slug: 'ems-at-home', cover: '/images/hero.jpg' },
  { slug: 'a-weekly-rhythm', cover: '/images/cut2.jpg' },
]

export const hasArticle = (slug) => ARTICLES.some((a) => a.slug === slug)
export const getCover = (slug) => (ARTICLES.find((a) => a.slug === slug) || {}).cover
