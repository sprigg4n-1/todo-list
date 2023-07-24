import { useState } from "react";

import "./addItemForm.css";

const AddItemFrom = ({ addTodoItem, isImportant }) => {
  const [newItem, setNewItem] = useState("");

  // add new item
  function handleSubmit(e) {
    e.preventDefault();

    if (newItem === "" || newItem.length < 4) return;

    addTodoItem(newItem, isImportant);

    setNewItem("");
  }

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <input
        placeholder="Write your task for today..."
        type="text"
        onChange={(e) => setNewItem(e.target.value)}
        value={newItem}
      />
      <button>Add</button>
    </form>
  );
};

export default AddItemFrom;
