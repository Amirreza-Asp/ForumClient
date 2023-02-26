export default function HomeMainFilter() {
  return (
  <ul className="filter">
    <li className="filter-item">
      <a href="#">All</a>
    </li>
    <li className="filter-item active">
      <a href="#">Popular</a>
    </li>
    <li className="filter-item">
      <a href="#">Recent</a>
    </li>
    <li className="filter-item">
      <a href="#">Unanswered</a>
    </li>
  </ul>
  )
}
