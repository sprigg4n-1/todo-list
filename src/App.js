import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Header, Sidebar } from './components';

import { FaRegStar } from 'react-icons/fa';
import { GoSun } from 'react-icons/go';
import { BsCheck2All } from 'react-icons/bs';
import { MdRemoveDone } from 'react-icons/md';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './App.css';
import TodoList from './components/todoList/TodoList';

function App() {
  // ------------------ use states ------------------------ //

  /**
   * array of sidebar items
   * */
  const [sidebarItems, setSidebarItems] = useState([
    {
      icon: <GoSun />,
      text: 'My Day',
      active: true,
      id: crypto.randomUUID(),
      path: '/',
      name: 'todolist',
    },
    {
      icon: <FaRegStar />,
      text: 'Important',
      active: false,
      id: crypto.randomUUID(),
      path: '/important',
      name: 'important',
    },
    {
      icon: <BsCheck2All />,
      text: 'Completed',
      active: false,
      id: crypto.randomUUID(),
      path: '/checked',
      name: 'completed',
    },
    {
      icon: <MdRemoveDone />,
      text: 'Overdue',
      active: false,
      id: crypto.randomUUID(),
      path: '/overdue',
      name: 'overdue',
    },
  ]);

  /**
   * sidebar menu state
   * */
  const [activeMenu, setActiveMenu] = useState(true);

  /**
   * searched item
   * */
  const [searchedItem, setSearchedItem] = useState('');

  /**
   * use state and function for reserved place to editing
   */
  const [activeReservedPlace, setActiveReservedPlace] = useState(false);

  /**
   * set arr of active side bar item
   * */
  const activeSidebarItem = sidebarItems.filter((item) => item.active);

  // ------------------ functions ------------------------ //

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

          <TodoList
            activeListOfTasks={activeSidebarItem[0]}
            activeMenu={activeMenu}
            openSidebar={openSidebar}
            searchedItem={searchedItem}
            setActiveReservedPlace={setActiveReservedPlace}
          />

          {activeReservedPlace ? (
            <div className="reserved-space-for-editing"></div>
          ) : null}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
