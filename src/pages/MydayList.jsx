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
  closeEditingMode
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

      <AddItemForm addTodoItem={addTodoItem} isImportant={false} />

      <ul className="tasks__list">
        {todoItems.map((item) => {
          return !item.checked && item.completedInTime ? (
            <ListItem
              {...item}
              key={item.id}
              removeTodoItem={removeTodoItem}
              toggleCheckedItem={toggleCheckedItem}
              toggleImportantItem={toggleImportantItem}
              toggleEditingItem={toggleEditingItem}
              changeItemText={changeItemText}
              closeEditingMode={closeEditingMode}
            />
          ) : null;
        })}
      </ul>

    </div>
  );
};

export default MydayList;
