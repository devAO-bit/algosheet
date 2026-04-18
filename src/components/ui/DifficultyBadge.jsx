const MAP = {
  easy:   { label: 'Easy',   cls: 'badge-easy' },
  medium: { label: 'Med',    cls: 'badge-medium' },
  hard:   { label: 'Hard',   cls: 'badge-hard' },
}

export default function DifficultyBadge({ difficulty }) {
  const { label, cls } = MAP[difficulty] || MAP.easy
  return <span className={cls}>{label}</span>
}
