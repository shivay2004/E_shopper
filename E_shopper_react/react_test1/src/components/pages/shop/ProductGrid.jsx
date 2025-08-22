import React, { useEffect, useState } from "react";
import QuantityCounter from "../../QuantityCounter";
import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import styles from "../../../css/ProductSection.module.css";
import Pagination from "./Pagination";

function ShopProductSection({ filters, search }) {
  const [allProducts, setAllProducts] = useState([]);
  const { cart, addToCart, increment, decrement } = useCart();

  useEffect(() => {
    fetch("http://localhost:3000/prod-card")
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const filterProducts = () => {
    return allProducts.filter((prod) => {
      // Filter by price
      if (
        filters.price.length &&
        !filters.price.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return prod.price >= min && prod.price <= max;
        })
      )
        return false;

      // Filter by color
      if (
        filters.color.length &&
        !prod.colors.some((color) =>
          filters.color.includes(color.toLowerCase())
        )
      )
        return false;

      // Filter by size
      if (
        filters.size.length &&
        !prod.sizes.some((size) => filters.size.includes(size))
      )
        return false;

      // Search
      if (search && !prod.name.toLowerCase().includes(search.toLowerCase()))
        return false;

      return true;
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 9;

  const filteredProducts = filterProducts();
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <div>
      <div className={styles.grid}>
        {visibleProducts.map((prod) => (
          <div className={styles.card2} key={prod.id}>
            <div className={styles.imgBox}>
              <img src={prod.image} alt={prod.name} />
            </div>
            <div>
              <h6>{prod.name}</h6>
              <div className={styles.price}>
                <span>${prod.price}.00</span>{" "}
                <span>
                  <del>${prod.original_price}.00</del>
                </span>
              </div>
            </div>

            {cart.some(
              (item) =>
                item.id === prod.id &&
                item.size === prod.sizes?.[0] &&
                item.color === prod.colors?.[0]
            ) ? (
              <>
                <div className={styles.cartActions}>
                  <Link to={`/details/${prod.id}`}>
                    <i className="fas fa-eye"></i> View Detail
                  </Link>

                  <QuantityCounter
                    quantity={
                      cart.find(
                        (item) =>
                          item.id === prod.id &&
                          item.size === prod.sizes?.[0] &&
                          item.color === prod.colors?.[0]
                      )?.quantity || 1
                    }
                    onIncrement={() =>
                      increment(prod.id, prod.sizes?.[0], prod.colors?.[0])
                    }
                    onDecrement={() =>
                      decrement(prod.id, prod.sizes?.[0], prod.colors?.[0])
                    }
                  />
                </div>
              </>
            ) : (
              <div className={styles.cartActions}>
                <Link to={`/details/${prod.id}`}>
                  <i className="fas fa-eye"></i> View Detail
                </Link>
                <button
                  onClick={() =>
                    addToCart(
                      prod.id,
                      prod.sizes?.[0] || "Default",
                      prod.colors?.[0] || "Default",
                      1,
                      prod.price,
                      prod.image,
                      prod.name
                    )
                  }
                  className={styles.addCartBtn}
                >
                  <i className="fas fa-shopping-cart"></i> Add To Cart
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default ShopProductSection;
