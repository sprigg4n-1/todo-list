import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Header, Sidebar } from "./components";

import { FaRegStar } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { BsCheck2All } from "react-icons/bs";
import { MdRemoveDone } from "react-icons/md";

import MydayList from "./pages/MydayList";
import CheckedList from "./pages/CheckedList";
import ImportantList from "./pages/ImportantList";
import OverdueList from "./pages/OverdueList";

import format from "date-fns/format";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "./App.css";


function App() {
  // ------------------ use states ------------------------ //

  /**
   * array of sidebar items
   * */
  const [sidebarItems, setSidebarItems] = useState([
    {
      icon: <GoSun />,
      text: "My Day",
      active: true,
      id: crypto.randomUUID(),
      path: "/",
    },
    {
      icon: <FaRegStar />,
      text: "Important",
      active: false,
      id: crypto.randomUUID(),
      path: "/important",
    },
    {
      icon: <BsCheck2All />,
      text: "Checked",
      active: false,
      id: crypto.randomUUID(),
      path: "/checked",
    },
    {
      icon: <MdRemoveDone />,
      text: "Overdue",
      active: false,
      id: crypto.randomUUID(),
      path: "/overdue",
    },
  ]);

  /**
   * sidebar menu state
   * */
  const [activeMenu, setActiveMenu] = useState(true);

  /**
   * array of todo items
   * */
  const [todoItems, setTodoItems] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");

    if (localValue === null) return [];

    return JSON.parse(localValue);
  });

  /**
   * searched item
   * */
  const [searchedItem, setSearchedItem] = useState("");

  /**
   * filtered data in todoItems
   * */
  const filteredData = todoItems.filter((item) => {
    if (searchedItem === "") {
      return item;
    } else {
      return item.text.includes(searchedItem);
    }
  });

  /**
   * use state and function for reserved place to editing
   */
  const [activeReservedPlace, setActiveReservedPlace] = useState(false);

  // ------------------ functions ------------------------ //

  /**
   * add to todoItems some item
   * */
  function addTodoItem(text, isImportant) {
    isImportant
      ? setTodoItems((currentTodoItems) => {
        return [
          ...currentTodoItems,
          {
            id: crypto.randomUUID(),
            text: text,
            checked: false,
            important: true,
            createdDate: format(new Date(), "MM/dd/yyyy"),
            dueDate: "",
            completedInTime: true,
            editing: false,
          },
        ];
      })
      : setTodoItems((currentTodoItems) => {
        return [
          ...currentTodoItems,
          {
            id: crypto.randomUUID(),
            text: text,
            checked: false,
            important: false,
            createdDate: format(new Date(), "MM/dd/yyyy"),
            dueDate: "",
            completedInTime: true,
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
   * function watch if overdue el
   */
  function changeOnTrueItemCompletedInTime(id) {
    const updatedItems = todoItems.map((item) => {
      if (item.id === id) {
        if (!item.completedInTime) {
          return {
            ...item,
            completedInTime: true,
            editing: false
          };
        }
        return {
          ...item,
          completedInTime: true,
        };
      }

      return item;
    });

    setTodoItems(updatedItems);
  }

  function changeOnFalseItemCompletedInTime(id) {
    const updatedItems = todoItems.map((item) => {
      if (item.id === id) {
        if (!item.completedInTime) {
          return {
            ...item,
            completedInTime: false,
          };
        }
        return {
          ...item,
          completedInTime: false,
          editing: false,
        };
      }

      return item;
    });

    setTodoItems(updatedItems);
  }

  /**
   * function for toggle sidebar item and change page
   * */
  function toggleActiveSidebarItem(id) {
    setSidebarItems((currentSidebarItem) => {
      return currentSidebarItem.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            active: true,
          };
        }

        return {
          ...item,
          active: false,
        };
      });
    });

    const updatedItems = todoItems.map((item) => {
      return {
        ...item,
        editing: false,
      };
    });

    setTodoItems(updatedItems);
  }

  /**
   * open sidebar menu
   * */
  function openSidebar() {
    setActiveMenu(true);
  }

  /**
   * close sidebar menu
   * */
  function closeSidebar() {
    setActiveMenu(false);
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

  // ------------------ use effects ------------------------ //

  /**
   * set todoItems to local storage
   * */
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todoItems));
  }, [todoItems]);

  /**
   * looking for todo
   * */
  useEffect(() => {
    checkActiveEditng();
  }, [todoItems]);

  return (
    <BrowserRouter>
      <div className="app">
        <Header setSearchedItem={setSearchedItem} />
        <div className="content">
          <Sidebar
            items={sidebarItems}
            toggleActiveSidebarItem={toggleActiveSidebarItem}
            activeMenu={activeMenu}
            closeSidebar={closeSidebar}
          />
          <Routes>
            <Route
              path="/"
              element={
                <MydayList
                  openSidebar={openSidebar}
                  activeMenu={activeMenu}
                  icon={sidebarItems[0].icon}
                  title={sidebarItems[0].text}
                  todoItems={filteredData}
                  addTodoItem={addTodoItem}
                  removeTodoItem={removeTodoItem}
                  toggleCheckedItem={toggleCheckedItem}
                  toggleImportantItem={toggleImportantItem}
                  toggleEditingItem={toggleEditingItem}
                  changeItemText={changeItemText}
                  closeEditingMode={closeEditingMode}
                  changeItemDueDate={changeItemDueDate}
                  changeOnTrueItemCompletedInTime={
                    changeOnTrueItemCompletedInTime
                  }
                  changeOnFalseItemCompletedInTime={
                    changeOnFalseItemCompletedInTime
                  }
                />
              }
            />
            <Route
              path="/important"
              element={
                <ImportantList
                  openSidebar={openSidebar}
                  activeMenu={activeMenu}
                  icon={sidebarItems[1].icon}
                  title={sidebarItems[1].text}
                  todoItems={filteredData}
                  removeTodoItem={removeTodoItem}
                  toggleCheckedItem={toggleCheckedItem}
                  toggleImportantItem={toggleImportantItem}
                  toggleEditingItem={toggleEditingItem}
                  changeItemText={changeItemText}
                  closeEditingMode={closeEditingMode}
                  addTodoItem={addTodoItem}
                  changeItemDueDate={changeItemDueDate}
                  changeOnTrueItemCompletedInTime={
                    changeOnTrueItemCompletedInTime
                  }
                  changeOnFalseItemCompletedInTime={
                    changeOnFalseItemCompletedInTime
                  }
                />
              }
            />
            <Route
              path="/checked"
              element={
                <CheckedList
                  openSidebar={openSidebar}
                  activeMenu={activeMenu}
                  icon={sidebarItems[2].icon}
                  title={sidebarItems[2].text}
                  todoItems={filteredData}
                  removeTodoItem={removeTodoItem}
                  toggleCheckedItem={toggleCheckedItem}
                  toggleImportantItem={toggleImportantItem}
                  changeItemText={changeItemText}
                />
              }
            />
            <Route
              path="/overdue"
              element={
                <OverdueList
                  openSidebar={openSidebar}
                  activeMenu={activeMenu}
                  icon={sidebarItems[3].icon}
                  title={sidebarItems[3].text}
                  todoItems={filteredData}
                  removeTodoItem={removeTodoItem}
                  toggleCheckedItem={toggleCheckedItem}
                  toggleImportantItem={toggleImportantItem}
                  toggleEditingItem={toggleEditingItem}
                  changeItemText={changeItemText}
                  closeEditingMode={closeEditingMode}
                  changeItemDueDate={changeItemDueDate}
                  changeOnTrueItemCompletedInTime={
                    changeOnTrueItemCompletedInTime
                  }
                  changeOnFalseItemCompletedInTime={
                    changeOnFalseItemCompletedInTime
                  }
                />
              }
            />
          </Routes>
          {activeReservedPlace ? (
            <div className="reserved-space-for-editing"></div>
          ) : null}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
