import { ListItem } from "../components";
import { RxHamburgerMenu } from "react-icons/rx";

const CheckedList = ({
  openSidebar,
  activeMenu,
  icon,
  title,
  todoItems,
  removeTodoItem,
  toggleCheckedItem,
  toggleImportantItem,
}) => {
  return (
    <div className="tasks-box">
      <div className="tasks__top">
        {activeMenu ? (
          icon
        ) : (
          <button onClick={openSidebar}>
            <RxHamburgerMenu className="tasks__top-icon" />
          </button>
        )}
        <h2>{title}</h2>
      </div>
      <ul className="tasks__list">
        {todoItems.map((item) => {
          return item.checked ? (
            <ListItem
              {...item}
              removeTodoItem={removeTodoItem}
              toggleCheckedItem={toggleCheckedItem}
              toggleImportantItem={toggleImportantItem}
            />
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default CheckedList;
