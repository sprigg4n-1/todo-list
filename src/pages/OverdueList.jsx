import { ListItem } from "../components";
import { RxHamburgerMenu } from "react-icons/rx";

const OverdueList = ({
  openSidebar,
  activeMenu,
  icon,
  title,
  todoItems,
  removeTodoItem,
  toggleCheckedItem,
  toggleImportantItem,
  toggleEditingMode,
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
          return !item.completedInTime ? (
            <ListItem
              {...item}
              removeTodoItem={removeTodoItem}
              toggleCheckedItem={toggleCheckedItem}
              toggleImportantItem={toggleImportantItem}
              toggleEditingMode={toggleEditingMode}
            />
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default OverdueList;
