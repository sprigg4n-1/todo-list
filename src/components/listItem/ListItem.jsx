import { useState, useEffect } from "react";

import EditingItem from "../editingItem/EditingItem";
import CheckBtn from "./btns/CheckBtn";
import DeleteBtn from "./btns/DeleteBtn";
import ImportantBtn from "./btns/ImportantBtn";

import "./listItem.css";

const ListItem = ({
  text,
  id,
  removeTodoItem,
  important,
  checked,
  editing,
  createdDate,
  toggleCheckedItem,
  toggleImportantItem,
  toggleEditingItem,
  changeItemText,
  closeEditingMode
}) => {
  const itemStyle = checked ? "list-item checked" : "list-item";

  const [newText, setNewText] = useState(text);

  function writeNewText(e) {
    setNewText(e.target.value);
  }

  useEffect(() => {
    changeItemText(id, newText);
  }, [newText])

  return (
    <>
      <li className={itemStyle}>
        <div>
          <CheckBtn toggleCheckedItem={toggleCheckedItem} elemId={id} />
        </div>
        <p onClick={() => toggleEditingItem(id)}>{text}</p>
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
      />
    </>
  );
};

export default ListItem;
