import { Link } from "react-router-dom";

import "./sidebarItem.css";

const SidebarItem = ({
  id,
  path,
  text,
  icon,
  active,
  toggleActiveSidebarItem,
}) => {
  const activeClass = active ? "sidebar__item active" : "sidebar__item";

  return (
    <Link
      to={path}
      onClick={() => toggleActiveSidebarItem(id)}
      className={activeClass}
    >
      {icon}
      <p>{text}</p>
    </Link>
  );
};

export default SidebarItem;
