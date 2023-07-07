import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Header, Sidebar, EditingItem } from "./components";

import { FaRegStar } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { BsCheck2All } from "react-icons/bs";
import { MdRemoveDone } from "react-icons/md";

import MydayList from "./pages/MydayList";
import CheckedList from "./pages/CheckedList";
import ImportantList from "./pages/ImportantList";
import OverdueList from "./pages/OverdueList";

import "./App.css";

function App() {
  // sidebar items
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

  // sidebar menu
  const [activeMenu, setActiveMenu] = useState(true);

  // todo list item
  const [todoItems, setTodoItems] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");

    if (localValue === null) return [];

    return JSON.parse(localValue);
  });

  // searched item
  const [searchedItem, setSearchedItem] = useState("");

  // filtered data in todoItems
  const filteredData = todoItems.filter((item) => {
    if (searchedItem === "") {
      return item;
    } else {
      return item.text.includes(searchedItem);
    }
  });

  // set todoItems to local storage
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todoItems));
  }, [todoItems]);

  // add to todoItems some item
  function addTodoItem(text) {
    setTodoItems((currentTodoItems) => {
      return [
        ...currentTodoItems,
        {
          id: crypto.randomUUID(),
          text: text,
          checked: false,
          important: false,
          dueDate: "",
          completedInTime: true,
        },
      ];
    });
  }

  // remove item from todo list
  function removeTodoItem(id) {
    setTodoItems(todoItems.filter((item) => item.id !== id));
  }

  // toggle check item status
  function toggleCheckedItem(id) {
    const updatedItems = todoItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
        };
      }

      return item;
    });

    setTodoItems(updatedItems);
  }

  // toggle important item status
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

  // function for toggle sidebar item and change page
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
  }

  // open sidebar menu
  function openSidebar() {
    setActiveMenu(true);
  }

  // close sidebar menu
  function closeSidebar() {
    setActiveMenu(false);
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
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
                />
              }
            />
          </Routes>
          <EditingItem />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
