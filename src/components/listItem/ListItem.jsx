import { useState, useEffect } from "react";

import EditingItem from "../editingItem/EditingItem";
import CheckBtn from "./btns/CheckBtn";
import DeleteBtn from "./btns/DeleteBtn";
import ImportantBtn from "./btns/ImportantBtn";

import "./listItem.css";
import { format } from "date-fns";

const ListItem = ({
  text,
  id,
  removeTodoItem,
  important,
  checked,
  editing,
  createdDate,
  dueDate,
  toggleCheckedItem,
  toggleImportantItem,
  toggleEditingItem,
  changeItemText,
  closeEditingMode,
  changeItemDueDate,
  completedInTime,
  changeOnTrueItemCompletedInTime,
  changeOnFalseItemCompletedInTime,
}) => {
  /**
   * Style for list item
   */
  const itemStyle = checked ? "list-item checked" : "list-item";

  const dueDateStyle = completedInTime
    ? "list-item__text"
    : "list-item__text overdue";

  /**
   * state for change text in item
   */
  const [newText, setNewText] = useState(text);

  /**
   * state for make date pick active
   */
  const [activeDatePick, setActiveDatePick] = useState(false);

  /**
   * funtion for rewrite text
   */
  function writeNewText(e) {
    setNewText(e.target.value);
  }

  /**
   * function for toggle active date picker
   */
  function toggleDatePick() {
    setActiveDatePick((activeDatePick) => !activeDatePick);
  }

  /**
   * use effect watching for text changes
   */
  useEffect(() => {
    changeItemText(id, newText);
  }, [newText]);

  /**
   * use effect watching for editing mode
   * and make date picker false for not make it true next time
   * when open editing mode
   */
  useEffect(() => {
    setActiveDatePick(false);
  }, [editing]);

  /**
   * use effect watch for due date to know
   * task overdue or not
   */
  useEffect(() => {
    if (dueDate === "") {
      console.log("true");
      changeOnTrueItemCompletedInTime(id);
    } else if (dueDate >= format(new Date(), "MM/dd/yyy")) {
      console.log("true");
      changeOnTrueItemCompletedInTime(id);
    } else if (dueDate < format(new Date(), "MM/dd/yyy")) {
      console.log(dueDate);
      changeOnFalseItemCompletedInTime(id);
    }
  }, [dueDate, format(new Date(), "MM/dd/yyy")]);

  return (
    <>
      <li className={itemStyle}>
        <div>
          <CheckBtn toggleCheckedItem={toggleCheckedItem} elemId={id} />
        </div>
        <div className={dueDateStyle} onClick={() => toggleEditingItem(id)}>
          <p>{text}</p>
          <span>
            {dueDate === ""
              ? null
              : dueDate === format(new Date(), "MM/dd/yyyy")
                ? "Due: Today"
                : dueDate ===
                  format(
                    new Date().setDate(new Date().getDate() + 1),
                    "MM/dd/yyyy"
                  )
                  ? "Due: Tomorrow"
                  : `Due: ${dueDate}`}
          </span>
        </div>

        <div className="list-item__right">
          <ImportantBtn
            important={important}
            toggleImportantItem={toggleImportantItem}
            elemId={id}
          />
          <DeleteBtn removeTodoItem={removeTodoItem} elemId={id} />
        </div>
      </li>
      <EditingItem
        activeEditing={editing}
        text={text}
        toggleCheckedItem={toggleCheckedItem}
        toggleImportantItem={toggleImportantItem}
        important={important}
        elemId={id}
        createdDate={createdDate}
        changeItemText={changeItemText}
        closeEditingMode={closeEditingMode}
        removeTodoItem={removeTodoItem}
        newText={newText}
        writeNewText={writeNewText}
        toggleDatePick={toggleDatePick}
        activeDatePick={activeDatePick}
        setActiveDatePick={setActiveDatePick}
        changeItemDueDate={changeItemDueDate}
        completedInTime={completedInTime}
      />
    </>
  );
};

export default ListItem;
