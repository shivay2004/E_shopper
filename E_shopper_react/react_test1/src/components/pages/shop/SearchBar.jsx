import styles from "../../../css/SearchBar.module.css";

function SearchBar({ value, onSearchChange }) {
  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search by product name"
        value={value}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
}

export default SearchBar;
