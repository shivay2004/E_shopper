import styles from "../../../css/CategoryGrid.module.css";

const categories = [
  {
    img: "src/img/cat-1.jpg",
    title: "Men's Dresses",
    count: "15 Products",
  },
  {
    img: "src/img/cat-2.jpg",
    title: "Women's Dresses",
    count: "15 Products",
  },
  {
    img: "src/img/cat-3.jpg",
    title: "Baby's Dresses",
    count: "15 Products",
  },
  {
    img: "src/img/cat-4.jpg",
    title: "Accerssories",
    count: "15 Products",
  },
  {
    img: "src/img/cat-5.jpg",
    title: "Bags",
    count: "15 Products",
  },
  {
    img: "src/img/cat-6.jpg",
    title: "Shoes",
    count: "15 Products",
  },
];

function CategoryGrid() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {categories.map((cat, idx) => (
          <div key={idx} className={styles.card}>
            <p>{cat.count}</p>
            <div className={styles.imageBox}>
              <img src={cat.img} alt={cat.title} />
            </div>
            <h5>{cat.title}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryGrid;
