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
  toggleCheckedItem,
  toggleImportantItem,
  toggleEditingMode,
}) => {
  const itemStyle = checked ? "list-item checked" : "list-item";

  return (
    <li className={itemStyle}>
      <div>
        <CheckBtn toggleCheckedItem={toggleCheckedItem} elemId={id} />
      </div>
      <p onClick={() => toggleEditingMode(id)}>{text}</p>
      <div className="list-item__right">
        <ImportantBtn
          important={important}
          toggleImportantItem={toggleImportantItem}
          elemId={id}
        />
        <DeleteBtn removeTodoItem={removeTodoItem} elemId={id} />
      </div>
    </li>
  );
};

export default ListItem;
