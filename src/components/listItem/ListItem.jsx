import { useState } from "react";

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
  toggleCheckedItem,
  toggleImportantItem,
  toggleEditingItem,
  changeItemText,
}) => {
  const itemStyle = checked ? "list-item checked" : "list-item";

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
        changeItemText={changeItemText}
      />
    </>
  );
};

export default ListItem;
