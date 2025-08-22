import { useSearchParams } from "react-router-dom";
import HeroSection from "../../HeroSection";
import FilterSidebar from "./FilterSidebar";
import SearchBar from "./SearchBar";
import ProductGrid from "./ProductGrid";
import { useEffect, useState } from "react";
import style from "../../../css/ShopPage.module.css";
export default function ShopPage() {
  const [filters, setFilters] = useState({
    price: [],
    color: [],
    size: [],
  });

  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  // Fetch product data
  useEffect(() => {
    fetch("http://localhost:3000/prod-card")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const handleSearchChange = (value) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set("search", value);
      } else {
        newParams.delete("search");
      }
      return newParams;
    });
  };

  return (
    <>
      <HeroSection heading="OUR SHOP" page="Shop" />
      <div className={style.shopMain}>
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          products={products}
        />
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <SearchBar value={search} onSearchChange={handleSearchChange} />
          </div>
          <ProductGrid filters={filters} search={search} products={products} />
        </div>
      </div>
    </>
  );
}
