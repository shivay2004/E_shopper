import { useEffect, useState } from "react";
import styles from "../css/ReviewSection.module.css";

export default function ReviewSection({ productName }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [form, setForm] = useState({
    review: "",
    name: "",
    email: "",
  });

  const defaultReview = {
    name: "John Doe",
    date: "2025-01-01",
    review:
      "Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.",
    rating: 3.5,
    image: "/src/img/user.jpg",
  };

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reviews")) || {};
    const key = productName || "default";
    const productReviews = stored[key] || [];

    if (productReviews.length === 0) {
      stored[key] = [defaultReview];
      localStorage.setItem("reviews", JSON.stringify(stored));
    }

    setReviews(stored[key]);
  }, [productName]);

  const handleInputChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      ...form,
      rating,
      date: new Date().toLocaleDateString(),
      image: "/src/img/user.jpg",
    };

    const updated = [...reviews, newReview];
    setReviews(updated);

    const stored = JSON.parse(localStorage.getItem("reviews")) || {};
    stored[productName || "default"] = updated;
    localStorage.setItem("reviews", JSON.stringify(stored));

    setForm({ review: "", name: "", email: "" });
    setRating(0);
    setHoverRating(0);
  };

  return (
    <div className={styles.reviewSection}>
      <div className={styles.reviewList}>
        <h2>
          {reviews.length} review{reviews.length !== 1 ? "s" : ""} for "
          <span>{productName}</span>"
        </h2>

        {reviews.map((rev, i) => (
          <div key={i} className={styles.singleReview}>
            <img src={rev.image} alt="user" />
            <div>
              <p>
                <strong>{rev.name}</strong> – <em>{rev.date}</em>
              </p>
              <p className={styles.starRating}>
                {[1, 2, 3, 4, 5].map((star) => {
                  if (rev.rating >= star)
                    return <i key={star} className="fa-solid fa-star" />;
                  if (rev.rating >= star - 0.5)
                    return (
                      <i key={star} className="fa-solid fa-star-half-stroke" />
                    );
                  return <i key={star} className="fa-regular fa-star" />;
                })}
              </p>
              <p style={{ color: "gray" }}>{rev.review}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.reviewForm}>
        <h2>Leave a review</h2>
        <p>
          Your email address will not be published. Required fields are marked *
        </p>

        <div>
          <div>Your Rating * :</div>
          <p className={styles.starRating} id="ratingStars">
            {[1, 2, 3, 4, 5].map((i) => (
              <i
                key={i}
                className={`fa-star ${
                  i <= (hoverRating || rating) ? "fa-solid" : "fa-regular"
                }`}
                data-rating={i}
                onClick={() => setRating(i)}
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="reviewBox">Your Review *</label>
          <textarea
            id="reviewBox"
            name="review"
            required
            value={form.review}
            onChange={handleInputChange}
          />

          <label htmlFor="reviewName">Your Name *</label>
          <input
            type="text"
            name="name"
            id="reviewName"
            required
            value={form.name}
            onChange={handleInputChange}
          />

          <label htmlFor="reviewEmail">Your Email *</label>
          <input
            type="email"
            name="email"
            id="reviewEmail"
            required
            value={form.email}
            onChange={handleInputChange}
          />

          <input type="submit" value="Submit Review" />
        </form>
      </div>
    </div>
  );
}
