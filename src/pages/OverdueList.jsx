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
  toggleEditingItem,
  changeItemText,
  closeEditingMode,
  changeItemDueDate,
  changeOnTrueItemCompletedInTime,
  changeOnFalseItemCompletedInTime,
}) => {
  return (
    <div className="tasks-box">
      <div className="tasks__top red">
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
          return !item.completedInTime ? (
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
              changeOnTrueItemCompletedInTime={changeOnTrueItemCompletedInTime}
              changeOnFalseItemCompletedInTime={
                changeOnFalseItemCompletedInTime
              }
            />
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default OverdueList;
