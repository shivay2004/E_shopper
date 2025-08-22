import CategoryGrid from "./CategoryGrid";

import OfferBanners from "./OfferBanners";
import ProductSection from "../../ProductSection";
import QualityCards from "./QualityCards";
import Slider from "./Slider";
import SubscribeSection from "./SubscribeSection";
import VendorCarousel from "./VendorCarousel";

export default function HomePage() {
  return (
    <>
      <Slider />
      <QualityCards />
      <CategoryGrid />
      <OfferBanners />
      <ProductSection title="Trendy Products" />
      <SubscribeSection />
      <ProductSection title="Just Arrived" />
      <VendorCarousel />
    </>
  );
}
