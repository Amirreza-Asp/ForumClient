import { useEffect, useRef, useState } from "react";

interface Props {
  size?: number;
  handleChangeSize: (size: number) => void;
}

export default function PageSize({ size = 10, handleChangeSize }: Props) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(size);
  const pager = useRef<HTMLDivElement>(null);

  const options = [5, 10, 25, 50];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        pager.current &&
        e.target instanceof Element &&
        !pager.current.contains(e.target)
      )
        setOpen(false);
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div
      className="page-size"
      ref={pager}
      onBlur={() => console.log("blur")}
      onClick={() => setOpen(!open)}
    >
      <p>{current}</p>
      <i className="fas fa-angle-down" />
      <ul className={open ? "open" : ""}>
        {options.map((item) => (
          <li
            onClick={() => handleChangeSize(item)}
            key={item}
            className={item == current ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
