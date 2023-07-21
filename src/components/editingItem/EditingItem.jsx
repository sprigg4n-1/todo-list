import { FaRegEdit } from "react-icons/fa";

import CheckBtn from "../listItem/btns/CheckBtn";
import ImportantBtn from "../listItem/btns/ImportantBtn";

import "./editingItem.css";
import { useState } from "react";

const EditingItem = ({
  activeEditing,
  text,
  elemId,
  important,
  removeTodoItem,
  toggleCheckedItem,
  toggleImportantItem,
  changeItemText,
}) => {
  const editingStyle = activeEditing ? "editing" : "editing closed";

  const [newText, setNewText] = useState(text);

  function writeNewTex(e) {
    setNewText(e.target.value);

    changeItemText(elemId, newText);
  }

  return (
    <div className={editingStyle}>
      <div className="editing__title">
        <FaRegEdit />
        <span>Editing task</span>
      </div>
      <div className="editing__inner">
        <div className="editing__info">
          <CheckBtn toggleCheckedItem={toggleCheckedItem} elemId={elemId} />
          <input
            className="editing__info-input"
            type="text"
            value={newText}
            onChange={writeNewTex}
          />
          <div className="editing__info-important">
            <ImportantBtn
              important={important}
              toggleImportantItem={toggleImportantItem}
              elemId={elemId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditingItem;
