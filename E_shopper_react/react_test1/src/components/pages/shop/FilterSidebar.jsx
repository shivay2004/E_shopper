import styles from "../../../css/FilterSidebar.module.css";

function FilterSidebar({ filters, onFilterChange, products = [] }) {
  const priceOptions = [
    { label: "$0 - $100", value: "0-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "$200 - $300", value: "200-300" },
    { label: "$300 - $400", value: "300-400" },
    { label: "$400 - $500", value: "400-500" },
  ];
  const colorOptions = ["black", "white", "red", "blue", "green"];
  const sizeOptions = ["XS", "S", "M", "L", "XL"];

  const isAllSelected = (category) => filters[category].length === 0;

  const handleCheckboxChange = (category, value) => {
    if (value === "ALL") {
      onFilterChange({ ...filters, [category]: [] });
    } else {
      const newValues = filters[category].includes(value)
        ? filters[category].filter((v) => v !== value)
        : [...filters[category], value];

      onFilterChange({ ...filters, [category]: newValues });
    }
  };

  const getCount = (category, value) => {
    if (category === "price") {
      const [min, max] = value.split("-").map(Number);
      return products.filter((p) => p.price >= min && p.price <= max).length;
    }

    if (category === "color") {
      return products.filter((p) => p.colors?.includes(value)).length;
    }

    if (category === "size") {
      return products.filter((p) => p.sizes?.includes(value)).length;
    }

    return 0;
  };

  const getTotalCount = (category) => products.length || 0;

  const renderCheckbox = (category, labelText, value, isAll = false) => (
    <label key={value || "ALL"}>
      <span>
        <input
          type="checkbox"
          checked={
            isAll ? isAllSelected(category) : filters[category].includes(value)
          }
          onChange={() => handleCheckboxChange(category, isAll ? "ALL" : value)}
        />
        {labelText}
      </span>
      <span>{isAll ? getTotalCount(category) : getCount(category, value)}</span>
    </label>
  );

  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>
        <h5>Filter by Price</h5>
        {renderCheckbox("price", "All Price", "", true)}
        {priceOptions.map((opt) =>
          renderCheckbox("price", opt.label, opt.value)
        )}
      </div>

      <div className={styles.section}>
        <h5>Filter by Color</h5>
        {renderCheckbox("color", "All Color", "", true)}
        {colorOptions.map((color) =>
          renderCheckbox("color", capitalize(color), color)
        )}
      </div>

      <div className={styles.section}>
        <h5>Filter by Size</h5>
        {renderCheckbox("size", "All Size", "", true)}
        {sizeOptions.map((size) => renderCheckbox("size", size, size))}
      </div>
    </div>
  );
}

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default FilterSidebar;
