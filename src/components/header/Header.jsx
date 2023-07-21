import SearchPanel from "../searchPanel/SearchPanel";

import { LuSliders } from "react-icons/lu";

import "./header.css";

const Header = ({ setSearchedItem }) => {
  return (
    <div className="header">
      <div className="header__logo">To Do</div>
      <SearchPanel setSearchedItem={setSearchedItem} />
      <button>
        <LuSliders className="header__settings" />
      </button>
    </div>
  );
};

export default Header;
