import { MdDoneOutline } from "react-icons/md";

const CheckBtn = ({ toggleCheckedItem, elemId }) => {
  return (
    <button className="check-btn" onClick={() => toggleCheckedItem(elemId)}>
      <MdDoneOutline className="check-btn-checked-icon" />
    </button>
  );
};

export default CheckBtn;
