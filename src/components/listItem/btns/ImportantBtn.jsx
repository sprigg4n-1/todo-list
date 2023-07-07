import { FiStar } from "react-icons/fi";

const ImportantBtn = ({ important, toggleImportantItem, elemId }) => {
  const style = important ? "important-btn-icon active" : "important-btn-icon";

  return (
    <button
      className="important-btn"
      onClick={() => toggleImportantItem(elemId)}
    >
      <FiStar className={style} />
    </button>
  );
};

export default ImportantBtn;
