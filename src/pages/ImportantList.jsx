import AddItemForm from "../components/addItemForm/AddItemForm";

import { ListItem } from "../components";
import { RxHamburgerMenu } from "react-icons/rx";

const ImportantList = ({
  openSidebar,
  activeMenu,
  icon,
  title,
  todoItems,
  removeTodoItem,
  toggleCheckedItem,
  toggleImportantItem,
  toggleEditingItem,
  changeItemText,
  closeEditingMode,
  addTodoItem,
  changeItemDueDate,
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

      <AddItemForm addTodoItem={addTodoItem} isImportant={true} />

      <ul className="tasks__list">
        {todoItems.map((item) => {
          return !item.checked && item.completedInTime && item.important ? (
            <ListItem
              {...item}
              key={item.id}
              removeTodoItem={removeTodoItem}
              toggleCheckedItem={toggleCheckedItem}
              toggleImportantItem={toggleImportantItem}
              toggleEditingItem={toggleEditingItem}
              changeItemText={changeItemText}
              closeEditingMode={closeEditingMode}
              changeItemDueDate={changeItemDueDate}
            />
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default ImportantList;
