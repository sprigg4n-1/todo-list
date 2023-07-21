import AddItemForm from "../components/addItemForm/AddItemForm";

import { ListItem } from "../components";
import { RxHamburgerMenu } from "react-icons/rx";

const MydayList = ({
  openSidebar,
  activeMenu,
  icon,
  title,
  addTodoItem,
  todoItems,
  removeTodoItem,
  toggleCheckedItem,
  toggleImportantItem,
  toggleEditingItem,
  changeItemText,
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

      <AddItemForm addTodoItem={addTodoItem} />

      <ul className="tasks__list">
        {todoItems.map((item) => {
          return !item.checked && item.completedInTime ? (
            <ListItem
              {...item}
              removeTodoItem={removeTodoItem}
              toggleCheckedItem={toggleCheckedItem}
              toggleImportantItem={toggleImportantItem}
              toggleEditingItem={toggleEditingItem}
              changeItemText={changeItemText}
            />
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default MydayList;
