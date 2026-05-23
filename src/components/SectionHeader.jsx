export default function SectionHeader({ title, badge, inverse }) {
  return (
    <div className={`section-header ${inverse ? "inverse" : ""}`}>
      <h2>{title}</h2>
      {badge && <span>{badge}</span>}
    </div>
  );
}
