import { FaRegEdit } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import CheckBtn from "../listItem/btns/CheckBtn";
import ImportantBtn from "../listItem/btns/ImportantBtn";
import DeleteBtn from "../listItem/btns/DeleteBtn";

import "./editingItem.css";
import { useState } from "react";
import { format } from "date-fns";

const EditingItem = ({
  activeEditing,
  text,
  elemId,
  important,
  createdDate,
  removeTodoItem,
  toggleCheckedItem,
  toggleImportantItem,
  changeItemText,
  closeEditingMode
}) => {
  const editingStyle = activeEditing ? "editing" : "editing closed";

  const [newText, setNewText] = useState(text);

  function writeNewTex(e) {
    setNewText(e.target.value);

    changeItemText(elemId, newText);
  }

  return (
    <div className={editingStyle}>
      <div className="editing__top">
        <div className="editing__title">
          <FaRegEdit />
          <span>Editing task</span>
        </div>
        <div className="editing__close" onClick={closeEditingMode}>
          <AiOutlineClose />
        </div>
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

      <div className="editing__bottom">
        <p>
          Created {createdDate === format(new Date(), "MM/dd/yyyy") ? "today" : createdDate}
        </p>
        <div className="editing__delete">
          <DeleteBtn removeTodoItem={removeTodoItem} elemId={elemId} />
        </div>
      </div>
    </div>
  );
};

export default EditingItem;
