export default function Loader({ done }) {
  return (
    <div id="loader" className={done ? 'done' : ''} role="status" aria-label="Loading">
      <svg className="lring" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r="27" />
      </svg>
      <div className="lt">
        EMS <b>ElRiyadh</b>
      </div>
    </div>
  )
}
