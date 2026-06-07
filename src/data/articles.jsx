// PLACEHOLDER ARTICLES — sample posts for layout only. Compliant copy:
// fitness, time and lifestyle only, no medical or guaranteed-result claims.
// Structured as block arrays so real posts / markdown can drop in later.
// TODO: replace with real articles (titles, covers, dates and body).

export const ARTICLES = [
  {
    slug: 'why-twenty-minutes',
    title: 'Why twenty minutes can be enough',
    excerpt:
      'How a short, focused EMS session fits a busy week — and why consistency matters more than length.',
    tag: 'Training',
    read: '4 min read',
    cover: '/images/cut3.jpg',
    body: [
      { type: 'lead', text: 'The hardest part of training is rarely the workout itself — it is finding the time, getting there, and doing it often enough to feel the difference. A shorter session, done consistently, can solve a lot of that.' },
      { type: 'p', text: 'EMS pairs simple, low-impact movements with light electrical impulses, so many muscle groups engage together. That is the idea behind keeping a session focused and short rather than long and occasional.' },
      { type: 'h2', text: 'Consistency over length' },
      { type: 'p', text: 'Two short sessions a week are easier to protect in a full calendar than a long block you keep rescheduling. When the studio comes to you, there is no commute to talk yourself out of, either.' },
      { type: 'ul', items: ['No travel time on either side of the session', 'A predictable, repeatable slot in your week', 'A trainer who keeps the pace and guidance consistent'] },
      { type: 'h2', text: 'Make it easy to keep' },
      { type: 'p', text: 'Pick a time that genuinely suits you, keep the same trainer where you can, and let the routine become a habit rather than a decision you make each week.' },
    ],
  },
  {
    slug: 'ems-at-home',
    title: 'Making the most of EMS at home',
    excerpt:
      'Training in your own space is private and convenient. A few small things help every session feel effortless.',
    tag: 'Lifestyle',
    read: '3 min read',
    cover: '/images/hero.jpg',
    body: [
      { type: 'lead', text: 'One of the quiet advantages of mobile EMS is that your own space becomes the studio. It is private, comfortable and entirely yours — and a little preparation makes it even better.' },
      { type: 'h2', text: 'A clear few square metres' },
      { type: 'p', text: 'You do not need a gym or any equipment — just a small area of clear floor where you can move comfortably. Your trainer brings the MyoStyle® system and the suit, and sets everything up.' },
      { type: 'h2', text: 'Settle in first' },
      { type: 'ul', items: ['Wear light, comfortable clothing you can move in', 'Have water within reach', 'Pick a calm corner away from interruptions'] },
      { type: 'p', text: 'Beyond that, there is nothing to organise. The session is guided from start to finish, and we pack up and leave you with the rest of your day free.' },
    ],
  },
  {
    slug: 'a-weekly-rhythm',
    title: 'Building a simple weekly rhythm',
    excerpt:
      'A steady, repeatable routine is easier to keep than a perfect one. Here is a simple way to think about it.',
    tag: 'Routine',
    read: '3 min read',
    cover: '/images/cut2.jpg',
    body: [
      { type: 'lead', text: 'Routines that last tend to be simple. Rather than chasing the perfect plan, it helps to build a rhythm you can repeat without much thought.' },
      { type: 'h2', text: 'Anchor it to your week' },
      { type: 'p', text: 'Two sessions, spaced across the week, leave room to recover between them. Anchoring each one to a fixed point — a morning before work, an evening after it — makes it easy to remember and easy to keep.' },
      { type: 'h2', text: 'Keep the friction low' },
      { type: 'ul', items: ['Same days and times where possible', 'The same trainer, so nothing needs re-explaining', 'Booking and rescheduling in one WhatsApp message'] },
      { type: 'p', text: 'The goal is not intensity for its own sake — it is a routine that quietly fits your life and that you actually look forward to.' },
    ],
  },
]

export const getArticle = (slug) => ARTICLES.find((a) => a.slug === slug)
