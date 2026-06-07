import { EMAIL, PHONE, WA, SITE } from '../constants'
import LegalDoc from '../components/LegalDoc'

// Real, plain-language boilerplate for a KSA fitness service that books via
// WhatsApp and runs ads. // TODO: have a lawyer review before launch.
const UPDATED = '7 June 2026'

const sections = [
  {
    h: 'Who we are',
    body: [
      `EMS ElRiyadh ("we", "us", "our") provides premium, mobile Electrical Muscle Stimulation (EMS) personal training across Riyadh, Kingdom of Saudi Arabia. This policy explains what information we collect when you contact us or use our website (${SITE}), and how we handle it.`,
    ],
  },
  {
    h: 'Information we collect',
    body: [
      'We only collect what we need to respond to you and arrange sessions:',
      {
        ul: [
          'Details you provide — your name, phone number, area in Riyadh, preferred plan and times, and anything you include in a message to us (via the website form, WhatsApp, phone, email or Instagram).',
          'Usage data — basic technical and analytics information collected automatically when you visit the website, such as device and browser type, pages viewed and how you arrived, gathered through cookies and similar technologies.',
        ],
      },
      'We do not ask for medical records, and we do not take payments through this website.',
    ],
  },
  {
    h: 'How we use your information',
    body: [
      {
        ul: [
          'To reply to enquiries and arrange, confirm and schedule sessions.',
          'To run a short readiness check before your first session.',
          'To improve the website and understand which content and adverts are useful.',
          'To measure and improve our advertising on platforms such as Meta (Facebook/Instagram) and Google.',
        ],
      },
    ],
  },
  {
    h: 'Messaging via WhatsApp',
    body: [
      'Most bookings happen over WhatsApp. When you message us, your conversation is handled within WhatsApp and is also subject to WhatsApp’s own privacy policy. We use the details you share only to assist with your enquiry and sessions.',
    ],
  },
  {
    h: 'Cookies, analytics and advertising',
    body: [
      'We use analytics and advertising tools — including Google Analytics (GA4) and the Meta Pixel — to understand website traffic and measure advert performance. These tools may set cookies and collect usage data, and may be used to show you relevant adverts on other platforms.',
      'You can control or block cookies through your browser settings, and you can manage ad personalisation through your Google and Meta account settings.',
    ],
  },
  {
    h: 'Sharing your information',
    body: [
      'We do not sell your personal information. We may share limited data with trusted service providers who help us operate — for example analytics and advertising platforms — and where required by law. These providers process data on our behalf under their own terms.',
    ],
  },
  {
    h: 'Keeping your information',
    body: [
      'We keep enquiry and booking details only for as long as needed to provide our service and to meet legal or operational requirements, after which we delete or anonymise them.',
    ],
  },
  {
    h: 'Your choices',
    body: [
      'You can ask us to access, correct or delete the personal information you have shared with us, or ask us to stop contacting you, at any time. To do so, get in touch using the details below.',
    ],
  },
  {
    h: 'Children',
    body: [
      'Our service and website are intended for adults and are not directed at children. We do not knowingly collect information from anyone under 18.',
    ],
  },
  {
    h: 'Changes to this policy',
    body: [
      'We may update this policy from time to time. When we do, we will revise the “last updated” date above.',
    ],
  },
  {
    h: 'Contact us',
    body: [
      <p key="c">
        Questions about this policy or your information? Email us at{' '}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or message us on{' '}
        <a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp ({PHONE})</a>.
      </p>,
    ],
  },
]

export default function Privacy() {
  return (
    <LegalDoc
      title="Privacy"
      accent="Policy"
      updated={UPDATED}
      intro="Your privacy matters to us. This policy sets out, in plain language, what we collect and how we use it."
      sections={sections}
    />
  )
}
