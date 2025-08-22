import CatDrop from "./CatDrop";
import Logo from "./Logo";
import Nav1 from "./Nav1";
import SocialLinks from "./SocialLinks";
import style from "../../css/Header.module.css";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HamburgerMenu from "./HamBurger";
export default function Header() {
  const { cart } = useCart();
  const totalItems = Object.keys(cart).length;
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <>
      <div className={style.header1}>
        <div className={style.help}>
          <Link to="#">FAQs</Link>
          <span>|</span>
          <Link to="#">Help</Link>
          <span>|</span>
          <Link to="#">Support</Link>
        </div>
        <SocialLinks />
      </div>
      <div className={style.header2}>
        <Logo />
        <form onSubmit={handleSearch} className={style.search}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={style.searchInput}
          />
          <button type="submit" className={style.searchBtn}>
            <i className="fa fa-search"></i>
          </button>
        </form>

        <div className={style.likeCart}>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            {totalItems}
          </Link>
        </div>
      </div>
      <div className={style.header3}>
        <CatDrop />
        <div className={style.logo1}>
          <Logo />
        </div>
        <div className={style.navbarsuper}>
          <Nav1 />
        </div>
        <div className={style.ham}>
          <i
            className="fa-solid fa-bars"
            id="hamburger-menu"
            onClick={toggleMenu}
          ></i>
        </div>
      </div>
      <HamburgerMenu open={open} />
    </>
  );
}
