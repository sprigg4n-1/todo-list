import { VscSearch } from "react-icons/vsc";

import "./searchPanel.css";

const SearchPanel = () => {
  return (
    <div className="search-box">
      <button className="search__btn">
        <VscSearch className="search__btn-icon" />
      </button>
      <input className="search__input" type="text" placeholder="search..." />
    </div>
  );
};

export default SearchPanel;
