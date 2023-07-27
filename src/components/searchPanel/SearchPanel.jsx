import { VscSearch } from "react-icons/vsc";

import "./searchPanel.css";

const SearchPanel = ({ setSearchedItem }) => {
  function onUpdateSearch(e) {
    let newValue = e.target.value;
    setSearchedItem(newValue);
  }

  return (
    <div className="search-box">
      <button className="search__btn">
        <VscSearch className="search__btn-icon" />
      </button>
      <input
        // TODO: should will be controlled component https://stackoverflow.com/questions/42522515/what-are-react-controlled-components-and-uncontrolled-components
        onChange={onUpdateSearch}
        className="search__input"
        type="text"
        placeholder="search..."
      />
    </div>
  );
};

export default SearchPanel;
