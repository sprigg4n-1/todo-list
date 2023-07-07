import SidebarItem from "./sidebarItem/SidebarItem";

import { RxHamburgerMenu } from "react-icons/rx";

import "./sidebar.css";

const Sidebar = ({
  items,
  toggleActiveSidebarItem,
  activeMenu,
  closeSidebar,
}) => {
  const styleMenu = activeMenu ? "sidebar" : "sidebar closed";

  // open edit mode

  return (
    <div className={styleMenu}>
      <button onClick={closeSidebar} className="sidebar__burger-btn">
        <RxHamburgerMenu className="sidebar__burger-btn-icon" />
      </button>
      <ul className="sidebar__list">
        {items.map((item) => {
          return (
            <SidebarItem
              {...item}
              key={item.id}
              toggleActiveSidebarItem={toggleActiveSidebarItem}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
