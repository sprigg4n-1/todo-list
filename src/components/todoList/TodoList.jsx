import { useState, useEffect } from 'react';

import AddItemForm from '../addItemForm/AddItemForm';
import ListItem from '../listItem/ListItem';

import { RxHamburgerMenu } from 'react-icons/rx';
import format from 'date-fns/format';

const TodoList = ({
  activeListOfTasks,
  activeMenu,
  openSidebar,
  searchedItem,
  setActiveReservedPlace,
}) => {
  /**
   * array of todo items
   * */
  const [todoItems, setTodoItems] = useState(() => {
    const localValue = localStorage.getItem('ITEMS');

    if (localValue === null) return [];

    return JSON.parse(localValue);
  });

  // important filtered list
  const todoFilteredList = todoItems.filter(
    (item) =>
      !item.checked &&
      (!item.dueDate ||
        format(new Date(item.dueDate), 'MM/dd/yyyy') >=
          format(new Date(), 'MM/dd/yyyy'))
  );

  // important filtered list
  const importantFilteredList = todoItems.filter(
    (item) =>
      item.important &&
      !item.checked &&
      (!item.dueDate ||
        format(new Date(item.dueDate), 'MM/dd/yyyy') >=
          format(new Date(), 'MM/dd/yyyy'))
  );

  // important completed list
  const completedFilteredList = todoItems.filter((item) => item.checked);

  // important overdue list
  const overdueFilteredList = todoItems.filter(
    (item) =>
      !item.checked &&
      format(new Date(item.dueDate), 'MM/dd/yyyy') <
        format(new Date(), 'MM/dd/yyyy') &&
      item.dueDate !== null
  );

  // searched data
  const searchedFilteredData = todoItems.filter(
    (item) => searchedItem === '' || item.text.includes(searchedItem)
  );

  /**
   * final data to show user
   */
  const finalTasksToShow =
    searchedItem !== ''
      ? searchedFilteredData
      : activeListOfTasks.name === 'todolist'
      ? todoFilteredList
      : activeListOfTasks.name === 'important'
      ? importantFilteredList
      : activeListOfTasks.name === 'completed'
      ? completedFilteredList
      : activeListOfTasks.name === 'overdue'
      ? overdueFilteredList
      : null;

  /**
   * add to todoItems some item
   * */
  function addTodoItem(text, isImportant) {
    setTodoItems((currentTodoItems) => {
      return [
        ...currentTodoItems,
        {
          id: crypto.randomUUID(),
          text: text,
          checked: false,
          important: isImportant,
          createdDate: Date.now(),
          dueDate: null,
          overdue: false,
          editing: false,
        },
      ];
    });
  }

  /**
   * remove item from todo list
   * */
  function removeTodoItem(id) {
    setTodoItems(todoItems.filter((item) => item.id !== id));
  }

  /**
   * toggle check item status
   * */
  function toggleCheckedItem(id) {
    const updatedItems = todoItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
          editing: false,
        };
      }

      return { ...item };
    });

    setTodoItems(updatedItems);
  }

  /**
   * toggle important item status
   * */
  function toggleImportantItem(id) {
    const updatedItems = todoItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          important: !item.important,
        };
      }

      return item;
    });

    setTodoItems(updatedItems);
  }

  /**
   * change item text
   * */
  function changeItemText(id, newValue) {
    const updatedItems = todoItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          text: newValue,
        };
      }

      return item;
    });

    setTodoItems(updatedItems);
  }

  /**
   * function for set due date
   */
  function changeItemDueDate(id, newDate) {
    const updatedItems = todoItems.map((item) => {
      if (item.id === id) {
        // watch if new date is not overdue
        if (
          format(new Date(newDate), 'MM/dd/yyyy') <
          format(new Date(), 'MM/dd/yyyy')
        ) {
          return {
            ...item,
            editing: false,
            dueDate: newDate,
          };
        }

        // watch for changes in overdue list
        if (
          format(new Date(item.dueDate), 'MM/dd/yyyy') <
            format(new Date(), 'MM/dd/yyyy') &&
          format(new Date(newDate), 'MM/dd/yyyy') >=
            format(new Date(), 'MM/dd/yyyy')
        ) {
          return {
            ...item,
            editing: false,
            dueDate: newDate,
          };
        }

        return {
          ...item,
          dueDate: newDate,
        };
      }

      return item;
    });

    setTodoItems(updatedItems);
  }

  /**
   * check if editing item id same
   * */
  function toggleEditingItem(id) {
    const updatedItems = todoItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          editing: !item.editing,
        };
      }

      return {
        ...item,
        editing: false,
      };
    });

    setTodoItems(updatedItems);
  }

  /**
   * close editing mode
   */
  function closeEditingMode() {
    const updatedItems = todoItems.map((item) => {
      return {
        ...item,
        editing: false,
      };
    });

    setTodoItems(updatedItems);
  }

  /**
   *function for reserved place to editing
   */
  function checkActiveEditng() {
    let isAllNotActive = true;

    todoItems.forEach((item) => {
      if (item.editing === true) {
        isAllNotActive = false;
      }
    });

    isAllNotActive
      ? setActiveReservedPlace(false)
      : setActiveReservedPlace(true);
  }

  /**
   * set todoItems to local storage
   * */
  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todoItems));
    checkActiveEditng();
  }, [todoItems]);

  /**
   * watch for searched item and close edit mode
   */
  useEffect(() => {
    if (searchedItem !== '') {
      setTodoItems((todoItems) =>
        todoItems.map((item) => {
          return {
            ...item,
            editing: false,
          };
        })
      );
    }
  }, [searchedItem]);

  /**
   * watch for sidebar menu and close edit mode
   */
  useEffect(() => {
    const updatedList = todoItems.map((item) => {
      return {
        ...item,
        editing: false,
      };
    });
    setTodoItems(updatedList);
    setActiveReservedPlace(false);
  }, [activeListOfTasks]);

  /**
   * return TodoList component
   */
  return (
    <div className="tasks-box">
      <div className="tasks__top">
        {activeMenu ? (
          activeListOfTasks.icon
        ) : (
          <button onClick={openSidebar}>
            <RxHamburgerMenu className="tasks__top-icon" />
          </button>
        )}
        <h2>{activeListOfTasks.text}</h2>
      </div>

      {activeListOfTasks.name === 'todolist' ? (
        <AddItemForm addTodoItem={addTodoItem} isImportant={false} />
      ) : activeListOfTasks.name === 'important' ? (
        <AddItemForm addTodoItem={addTodoItem} isImportant={true} />
      ) : null}

      <ul className="tasks__list">
        {finalTasksToShow.map((item) => {
          return (
            <ListItem
              {...item}
              key={item.id}
              removeTodoItem={removeTodoItem}
              toggleCheckedItem={toggleCheckedItem}
              toggleImportantItem={toggleImportantItem}
              toggleEditingItem={toggleEditingItem}
              changeItemText={changeItemText}
              closeEditingMode={closeEditingMode}
              changeItemDueDate={changeItemDueDate}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
