import { FaRegEdit } from "react-icons/fa";

import "./editingItem.css";

const EditingItem = ({
  activeEditing,
  text,
  elemId,
  important,
  removeTodoItem,
}) => {
  const editingStyle = activeEditing ? "editing" : "editing closed";

  console.log(important);
  return (
    <div className={editingStyle}>
      <div className="editing__title">
        <FaRegEdit />
        <span>Editing task</span>
      </div>
      <div className="editing__inner">
        <input type="text" value={text} />
      </div>
    </div>
  );
};

export default EditingItem;
