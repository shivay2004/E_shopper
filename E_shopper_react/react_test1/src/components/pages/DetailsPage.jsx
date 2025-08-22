import ImageSlider from "../DetailsSlider";
import HeroSection from "../HeroSection";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "../ProductInfo";
import { useCart } from "../../context/CartContext";
import AdditionalInfoTabs from "../AdditionalInfoTabs";
import styles from "../../css/DetailsPage.module.css";
import YouMayAlsoLike from "../YouMayAlsoLike";

export default function DetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const { addToCart } = useCart(); // already defined

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(
      product.id,
      selectedSize,
      selectedColor,
      quantity,
      product.price,
      product.image,
      product.name
    );
  };

  useEffect(() => {
    fetch("http://localhost:3000/prod-card")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id == id);
        if (found) {
          console.log("Loaded product:", found);
          setProduct(found);
          setSelectedSize(found.sizes?.[0] || "");
          setSelectedColor(found.colors?.[0] || "");
        }
      });
  }, [id]);

  if (!product) return <p>Loading...</p>;
  return (
    <>
      <HeroSection heading="SHOP DETAILS" page="Shop Details" />
      <main className={styles.detailMain}>
        <div className={styles.productDetails}>
          <ImageSlider images={product.extraimages} />

          <ProductInfo
            name={product.name}
            price={product.price}
            originalPrice={product.original_price}
            sizes={product.sizes}
            colors={product.colors}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            handleAddToCart={handleAddToCart}
          />
        </div>

        <AdditionalInfoTabs name={product.name} />
      </main>
      <YouMayAlsoLike />
    </>
  );
}
