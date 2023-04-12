import { observer } from "mobx-react-lite";

const filters = [
  { title: "All", value: "All" },
  { title: "Popular", value: "Popular" },
  { title: "Recent", value: "Recent" },
  { title: "View", value: "View" },
];

interface Props {
  handleSort: (sortBy: string) => void;
  query: { filter: string; page: number };
}

export default observer(function HomeMainFilter({ handleSort, query }: Props) {
  return (
    <ul className="filter">
      {filters.map((item) => (
        <li
          key={item.title}
          className={`filter-item ${
            item.value === query.filter ? "active" : ""
          }`}
          onClick={() => handleSort(item.value)}
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
});
