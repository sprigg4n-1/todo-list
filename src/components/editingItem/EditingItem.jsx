import { FaRegEdit } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BsCalendar3 } from "react-icons/bs";
import { TbCalendarShare } from "react-icons/tb";
import { TbCalendarDown } from "react-icons/tb";
import { TbCalendarPlus } from "react-icons/tb";

import CheckBtn from "../listItem/btns/CheckBtn";
import ImportantBtn from "../listItem/btns/ImportantBtn";
import DeleteBtn from "../listItem/btns/DeleteBtn";

import "./editingItem.css";
import { format } from "date-fns";

const EditingItem = ({
  activeEditing,
  elemId,
  important,
  createdDate,
  removeTodoItem,
  toggleCheckedItem,
  toggleImportantItem,
  closeEditingMode,
  writeNewText,
  newText
}) => {
  const editingStyle = activeEditing ? "editing" : "editing closed";

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
            onChange={writeNewText}
          />
          <div className="editing__info-important">
            <ImportantBtn
              important={important}
              toggleImportantItem={toggleImportantItem}
              elemId={elemId}
            />
          </div>
        </div>
        <div className="editing__date">
          <div className="editing__date-pick">
            <BsCalendar3 />
            <p>Add due date</p>
          </div>

          <div className="editing__date-element">
            <h3>Due</h3>
            <ul>
              <li><TbCalendarDown /> <span>Today</span></li>
              <li><TbCalendarShare /> <span>Tomorrow</span></li>
              <li><TbCalendarPlus /> <span>Pick a date</span></li>
            </ul>
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
    </div >
  );
};

export default EditingItem;
