import { CiSquareRemove } from "react-icons/ci";

const DeleteBtn = ({ removeTodoItem, elemId }) => {
  return (
    <button className="delete-btn" onClick={() => removeTodoItem(elemId)}>
      <CiSquareRemove className="delete-btn-icon" />
    </button>
  );
};

export default DeleteBtn;
