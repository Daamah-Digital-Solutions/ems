import { EMAIL, PHONE, WA } from '../constants'
import LegalDoc from '../components/LegalDoc'

// Plain-language terms for a KSA mobile EMS fitness service.
// // TODO: have a lawyer review before launch.
const UPDATED = '7 June 2026'

const sections = [
  {
    h: 'About these terms',
    body: [
      'These terms apply to your use of the EMS ElRiyadh website and to the training sessions we provide across Riyadh, Kingdom of Saudi Arabia. By contacting us or booking a session, you agree to them.',
    ],
  },
  {
    h: 'Our service',
    body: [
      'EMS ElRiyadh provides premium, one-on-one mobile EMS personal training, delivered to your home, hotel or compound using the German MyoStyle® system. It is a fitness and wellbeing service intended to support general fitness, toning, strength and time-efficient training.',
      'EMS ElRiyadh is not a medical device, treatment or healthcare service, and nothing on this website is medical advice or a promise of specific results.',
    ],
  },
  {
    h: 'Health and readiness',
    body: [
      'Before your first session, your trainer will run a short readiness chat. As with starting any new training, we recommend you speak with your doctor first if you have a health condition, are pregnant, or use an implanted electronic device such as a pacemaker.',
      'By taking part, you confirm that you are taking part voluntarily and believe you are fit to do so, and you agree to tell your trainer about anything that may affect your ability to train safely.',
    ],
  },
  {
    h: 'Booking and scheduling',
    body: [
      'Bookings and scheduling are arranged directly with us, usually over WhatsApp. We keep scheduling flexible across Riyadh rather than fixing set opening hours. A session is confirmed once we have agreed a time and location with you.',
    ],
  },
  {
    h: 'Changes and cancellations',
    body: [
      'If you need to reschedule or cancel, please let us know as far in advance as you can so we can offer the slot to someone else. We will always do our best to find you an alternative time. Any specific arrangements for your plan will be confirmed with you directly.',
    ],
  },
  {
    h: 'Pricing and payment',
    body: [
      'Because plans are tailored to your frequency, location and goals, pricing is shared with you on enquiry rather than published on this website. Any pricing and payment terms are agreed directly between you and us before sessions begin.',
    ],
  },
  {
    h: 'During your sessions',
    body: [
      'For your safety and the best results, please follow your trainer’s guidance, provide a small, clear and safe space to train in, and use the equipment only as directed by your trainer.',
    ],
  },
  {
    h: 'Intellectual property',
    body: [
      'The content on this website — text, design, graphics and logos — belongs to EMS ElRiyadh or its licensors and may not be copied or reused without permission. MyoStyle® is a trademark of its respective owner and is referenced here to describe the system we use.',
    ],
  },
  {
    h: 'Liability',
    body: [
      'We take reasonable care in providing our service. To the fullest extent permitted by law, EMS ElRiyadh is not liable for outcomes arising from training undertaken against medical advice or contrary to your trainer’s guidance. Nothing in these terms limits any liability that cannot be limited under applicable law.',
    ],
  },
  {
    h: 'Governing law',
    body: [
      'These terms are governed by the laws of the Kingdom of Saudi Arabia, and any disputes are subject to the jurisdiction of its competent courts.',
    ],
  },
  {
    h: 'Changes to these terms',
    body: [
      'We may update these terms from time to time. When we do, we will revise the “last updated” date above.',
    ],
  },
  {
    h: 'Contact us',
    body: [
      <p key="c">
        Questions about these terms? Email{' '}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or message us on{' '}
        <a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp ({PHONE})</a>.
      </p>,
    ],
  },
]

export default function Terms() {
  return (
    <LegalDoc
      title="Terms of"
      accent="Service"
      updated={UPDATED}
      intro="The essentials of using our website and training with us, in plain language."
      sections={sections}
    />
  )
}
