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
    const email = document.getElementById("newsletterEmailInput").value.trim(); // <-- Changed here
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

document.addEventListener("DOMContentLoaded", function () {
  const shipCheckbox = document.getElementById("shipAddress");
  const shippingSection = document.querySelector(".shipping-address");

  shipCheckbox.addEventListener("change", function () {
    if (this.checked) {
      shippingSection.style.display = "block";
    } else {
      shippingSection.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const orderItemsContainer = document.getElementById("order-items");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const shipping = 10;
  let subtotal = 0;

  // Clear existing items
  orderItemsContainer.innerHTML = "";

  // Render each cart item
  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;
    orderItemsContainer.innerHTML += `
      <div>${item.name} (${item.size}, ${item.color}) x${
      item.quantity
    } <span>$${item.price * item.quantity}</span></div>
    `;
  });

  // Update subtotal and total
  subtotalEl.textContent = `$${subtotal}`;
  totalEl.textContent = `$${subtotal + shipping}`;

  // Place Order button
  document.getElementById("place-order").addEventListener("click", function () {
    alert("Order placed successfully!");
    // Optional: Clear cart after order
    // localStorage.removeItem("cart");
    // Optional: Redirect to home or thank you page
    // window.location.href = "thankyou.html";
  });
});
