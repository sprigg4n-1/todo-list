import SearchPanel from "../searchPanel/SearchPanel";

import { LuSliders } from "react-icons/lu";

import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">To Do</div>
      <SearchPanel />
      <button>
        <LuSliders className="header__settings" />
      </button>
    </div>
  );
};

export default Header;
