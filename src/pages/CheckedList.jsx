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
  changeItemText,
}) => {
  return (
    <div className="tasks-box">
      <div className="tasks__top blue">
        {activeMenu ? (
          icon
        ) : (
          <button onClick={openSidebar}>
            <RxHamburgerMenu className="tasks__top-icon" />
          </button>
        )}
        <h2>{title}</h2>
      </div>
      <ul className="tasks__list tasks__list--bigger">
        {todoItems.map((item) => {
          return item.checked ? (
            <ListItem
              {...item}
              key={item.id}
              removeTodoItem={removeTodoItem}
              toggleCheckedItem={toggleCheckedItem}
              toggleImportantItem={toggleImportantItem}
              changeItemText={changeItemText}
            />
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default CheckedList;
