const dd1 = document.getElementById("dropdown-1");
const dd2 = document.getElementById("dresses-dropdown");
const dd3 = document.getElementById("hamburger-dropdown");
var flag1 = 0;
var flag2 = 0;
var flag3 = 0;

function openDropdown() {
  if (flag1 == 0) {
    dd1.classList.add("show");
    flag1 = 1;
  } else {
    dd1.classList.remove("show");
    flag1 = 0;
  }
}

function openDropdown1() {
  if (flag2 == 0) {
    dd2.classList.add("show2");
    flag2 = 1;
  } else {
    dd2.classList.remove("show2");
    flag2 = 0;
  }
}

function openham() {
  if (flag3 == 0) {
    dd3.classList.add("show3");
    flag3 = 1;
  } else {
    dd3.classList.remove("show3");
    flag3 = 0;
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

document
  .getElementById("newsletterSubmitBtn")
  .addEventListener("click", function () {
    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("newsletterEmailInput").value.trim();
    const statusDiv = document.getElementById("newsletterStatus");

    if (name === "") {
      statusDiv.textContent = "Please enter your name.";
      statusDiv.style.color = "red";
      return;
    }

    if (!validateEmail(email)) {
      statusDiv.textContent = "Please enter a valid email address.";
      statusDiv.style.color = "red";
      return;
    }

    statusDiv.textContent = "Thank you for subscribing to our newsletter!";
    statusDiv.style.color = "green";
    console.log("Newsletter - Name:", name, "Email:", email);
  });

var backToTop = document.querySelector(".back-to-top");

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  if (scrollY > 1) {
    backToTop.classList.add("appear");
  } else {
    backToTop.classList.remove("appear");
  }
});
///
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  const carouselTrack = document.querySelector(".single-carousel-track");
  const productName = document.querySelector(".product-information h1");
  const productPrice = document.querySelector(".product-information h2");
  const sizeForm = document.querySelector(".size-options form");
  const colorForm = document.querySelector(".color-options form");
  let currentImageIndex = 0;
  let product = null;

  fetch("http://localhost:3000/prod-card")
    .then((res) => res.json())
    .then((products) => {
      product = products.find((p) => p.id == productId);
      if (!product) {
        alert("Product not found!");
        return;
      }

      carouselTrack.innerHTML = product.extraimages
        .map(
          (img) => `
        <img src="${img}" class="detail-product-img" style="width:100%">
      `
        )
        .join("");
      carouselTrack.offsetHeight;
      initCarousel();

      productName.textContent = product.name;
      productPrice.textContent = `$${product.price.toFixed(2)}`;
      sizeForm.innerHTML = product.sizes
        .map(
          (size) =>
            `<input type="radio" name="size" value="${size}" id="size${size}"><label for="size${size}">${size}</label>`
        )
        .join("");
      colorForm.innerHTML = product.colors
        .map(
          (color) =>
            `<input type="radio" name="color" value="${color}" id="color${color}"><label for="color${color}">${color}</label>`
        )
        .join("");
    });

  function initCarousel() {
    const images = document.querySelectorAll(".detail-product-img");
    if (images.length === 0) return;

    currentImageIndex = 0;
    updateCarousel();

    document.getElementById("next").addEventListener("click", () => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      updateCarousel();
    });

    document.getElementById("prev").addEventListener("click", () => {
      currentImageIndex =
        (currentImageIndex - 1 + images.length) % images.length;
      updateCarousel();
    });

    // Handle window resize
    window.addEventListener("resize", updateCarousel);
  }
  function updateCarousel() {
    const images = document.querySelectorAll(".detail-product-img");
    if (images.length === 0) return;

    const imageWidth = images[0].offsetWidth;
    carouselTrack.style.transform = `translateX(-${
      currentImageIndex * imageWidth
    }px)`;
    carouselTrack.style.transition = "transform 0.5s ease-in-out";
  }

  document.getElementById("plus").onclick = () => {
    const counter = document.getElementById("quantityCounter");
    counter.value = parseInt(counter.value) + 1;
  };
  document.getElementById("minus").onclick = () => {
    const counter = document.getElementById("quantityCounter");
    if (parseInt(counter.value) > 1)
      counter.value = parseInt(counter.value) - 1;
  };

  document.querySelector(".add_to").onclick = () => {
    const selectedSize = document.querySelector(
      'input[name="size"]:checked'
    )?.value;
    const selectedColor = document.querySelector(
      'input[name="color"]:checked'
    )?.value;
    const quantity = parseInt(
      document.getElementById("quantityCounter").value,
      10
    );
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color!");
      return;
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(
      (item) =>
        item.id == productId &&
        item.size == selectedSize &&
        item.color == selectedColor
    );
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        ...product,
        size: selectedSize,
        color: selectedColor,
        quantity,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
    alert("Added to cart!");
  };
});
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"));
const defaultReview = {
  name: "John Doe",
  date: "2025-01-01",
  text: "Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.",
  stars: 3.5, // Static star rating
};

if (!localStorage.getItem("reviews")) {
  localStorage.setItem("reviews", JSON.stringify({}));
}
const reviews = JSON.parse(localStorage.getItem("reviews"));
if (!reviews[productId]) {
  reviews[productId] = [];
}

function renderReviews(productName) {
  const reviewsContainer = document.getElementById("reviews-container");
  const reviewCount = 1 + (reviews[productId]?.length || 0);
  document.getElementById("review-count").innerHTML = `${reviewCount} review${
    reviewCount !== 1 ? "s" : ""
  } for "<span id="product-name">${productName}</span>"`;

  reviewsContainer.innerHTML = `
    <div class="review-card">
      <img src="img/user.jpg" alt="user review">
      <div class="user-review">
        <div>
          <h3>${defaultReview.name}</h3> <i>- ${new Date(
    defaultReview.date
  ).toLocaleDateString()}</i>
        </div>
        <p class="star-rating rating-prod-info">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star-half-stroke"></i>
          <i class="fa-regular fa-star"></i>
        </p>
        <p>${defaultReview.text}</p>
      </div>
    </div>
  `;

  reviews[productId]?.forEach((review) => {
    reviewsContainer.innerHTML += `
      <div class="review-card">
        <img src="img/user.jpg" alt="user review">
        <div class="user-review">
          <div>
            <h3>${review.name}</h3> <i>- ${new Date(
      review.date
    ).toLocaleDateString()}</i>
          </div>
          <p class="star-rating rating-prod-info">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star-half-stroke"></i>
          <i class="fa-regular fa-star"></i>
        </p>
          <p>${review.text}</p>
        </div>
      </div>
    `;
  });
}

document.getElementById("review-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const review = {
    name: document.getElementById("reviewName").value,
    email: document.getElementById("reviewEmail").value,
    text: document.getElementById("reviewBox").value,
    date: new Date().toISOString(),
  };
  reviews[productId].push(review);
  localStorage.setItem("reviews", JSON.stringify(reviews));

  renderReviews(
    document.getElementById("product-name").textContent || "Product"
  );
  this.reset();
});

renderReviews(document.getElementById("product-name").textContent || "Product");

const containers = document.querySelectorAll(".img-belt");

const rendercards = async () => {
  let uri = "http://localhost:3000/prod-card";
  const res = await fetch(uri);
  const cards = await res.json();
  console.log(cards);

  let template = "";
  cards.forEach((card) => {
    template += ` <div class="img-card4">
                <div class="img-box"><img src=${card.image} alt=""></div>
                <div>
                    <h6>${card.name}</h6>
                    <div class="price">
                        <span> $${card.price}.00</span> <span><del>$${card.original_price}.00</del></span>
                    </div>
                </div>
                <div class="add-cart">
                    <a href="detail.html?id=${card.id}"><i class="fas fa-eye"></i> View Detail</a>
                <button class="add-to-cart-btn" data-id="${card.id}"><i class="fas fa-shopping-cart"></i> Add To Cart</button>
                </div>
            </div>`;
  });
  containers.forEach((container) => {
    container.innerHTML = template;
  });
  const cardsEls = document.querySelectorAll(".img-card4");
  cardsEls.forEach((imgcard4, index) => {
    imgcard4.style.left = `${index * 300}px`;
  });

  let currentIndex2 = 0;
  setInterval(() => {
    currentIndex2++;
    if (currentIndex2 >= 22) {
      currentIndex2 = 0;
    }
    cardsEls.forEach((imgcard4, index) => {
      imgcard4.style.transform = `translateX(-${currentIndex2 * 300}px)`;
    });
  }, 1000);
};

window.addEventListener("DOMContentLoaded", () => rendercards());

// var productContainer = document.querySelector('.shop-detail-carousel')
// var productTrack = document.querySelector('.shop-detail-carousel .single-carousel-track')
// var productImages = document.querySelectorAll('.detail-product-img')

// var imageWidth = Math.floor(parseFloat(getComputedStyle(productImages[0]).width))
// const totalImages = productImages.length

// var prodIndex = 0

// function singleSlideNext(){
//     prodIndex++
//     productTrack.style.transition = 'transform 0.5s'
//     productTrack.style.transform = `translateX(-${prodIndex*imageWidth}px)`

//     for (let i = 0; i < totalImages; i++)
//         productTrack.appendChild(productImages[i].cloneNode(true))

//     if (prodIndex === totalImages){
//         setTimeout(() => {
//             productTrack.style.transition = 'none'
//             productTrack.style.transform = `translateX(0)`
//             prodIndex = 0
//         }, 500);
//     }
// }

// setInterval(singleSlideNext, 5000)

// function singleSlidePrev(){
//     prodIndex--
//     productTrack.style.transition = 'transform 1s'
//     productTrack.style.transform = `translateX(-${prodIndex*imageWidth}px)`

//     for (let i = 0; i < totalImages; i++)
//         productTrack.appendChild(productImages[i].cloneNode(true))

//     if (prodIndex < 0){
//         setTimeout(() => {
//             productTrack.style.transition = 'none'
//             productTrack.style.transform = `translateX(-${(totalImages-1)*imageWidth}px)`
//             prodIndex = totalImages - 1
//         }, 500);
//     }
// }

var infoCard = document.querySelectorAll(".add-info-card");
const addInfoRE = /\d$/;

infoCard[0].classList.add("current");

var openInfoCard = (clicked_id) => {
  var cardId = clicked_id.match(addInfoRE) - 1;
  console.log(cardId);
  infoCard.forEach((card) => {
    card.classList.remove("current");
  });

  infoCard[cardId].classList.add("current");
};

//  const plusBtn = document.getElementById('plus');
//   const minusBtn = document.getElementById('minus');
//   const quantityInput = document.getElementById('quantityCounter');

//   plusBtn.addEventListener('click', () => {
//     let currentValue = parseInt(quantityInput.value) || 1;
//     quantityInput.value = currentValue + 1;
//   });

//   minusBtn.addEventListener('click', () => {
//     let currentValue = parseInt(quantityInput.value) || 1;
//     if (currentValue > 1) {
//       quantityInput.value = currentValue - 1;
//     }
//   });
