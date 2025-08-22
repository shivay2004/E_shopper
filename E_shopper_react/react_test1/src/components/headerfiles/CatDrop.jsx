import { useEffect, useState } from "react";
import style from "../../css/CatDrop.module.css";
import { useLocation } from "react-router-dom";
export default function CatDrop() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(location.pathname === "/");

  useEffect(() => {
    setIsOpen(location.pathname === "/");
  }, [location.pathname]);
  const [isOpen1, setIsOpen1] = useState(false);

  return (
    <div className={style.catdrop}>
      <div>
        Categories
        <i
          className="fa-solid fa-chevron-down"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {isOpen && (
        <ul className={style.dropdown1}>
          <li>
            Dresses
            <i
              className="fa-solid fa-chevron-down"
              onClick={() => setIsOpen1(!isOpen1)}
            />
            {isOpen1 && (
              <ul className={style.dressdrop}>
                <li>Men's Dresses</li>
                <li>Women's Dresses</li>
                <li>Baby's Dresses</li>
              </ul>
            )}
          </li>
          <li>Shirts</li>
          <li>Jeans</li>
          <li>Swimwear</li>
          <li>Sleepwear</li>
          <li>Sportswear</li>
          <li>Jumpsuits</li>
          <li>Blazers</li>
          <li>Jackets</li>
          <li>Shoes</li>
        </ul>
      )}
    </div>
  );
}
