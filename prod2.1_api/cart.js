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
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const shipping = 10;
  let subtotal = 0;

  cartItemsContainer.innerHTML = "";

  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;
    cartItemsContainer.innerHTML += `
      <tr data-index="${index}">
        <td>
          <div class="product-cell">
            <img src="${item.image}" alt="img">
            ${item.name} (${item.size}, ${item.color})
          </div>
        </td>
        <td>$${item.price}</td>
        <td>
          <div class="quantity-counter counter-cart">
            <button class="minus"><i class="fa-solid fa-minus"></i></button>
            <input type="text" value="${
              item.quantity
            }" name="quantity" class="quantityCounter">
            <button class="plus"><i class="fa-solid fa-plus"></i></button>
          </div>
        </td>
        <td class="row-total" data-index="${index}">$${
      item.price * item.quantity
    }</td>
        <td><button class="remove-button"><i class="fa fa-times"></i></button></td>
      </tr>
    `;
  });

  updateCartSummary();

  document.querySelectorAll(".quantity-counter").forEach((counter) => {
    const plusBtn = counter.querySelector(".plus");
    const minusBtn = counter.querySelector(".minus");
    const input = counter.querySelector(".quantityCounter");

    plusBtn.addEventListener("click", function () {
      let value = parseInt(input.value) || 1;
      input.value = value + 1;
      updateCartFromUI(counter.closest("tr"));
    });

    minusBtn.addEventListener("click", function () {
      let value = parseInt(input.value) || 1;
      if (value > 1) input.value = value - 1;
      updateCartFromUI(counter.closest("tr"));
    });

    input.addEventListener("input", function () {
      input.value = input.value.replace(/[^0-9]/g, "");
      if (input.value === "" || parseInt(input.value) < 1) {
        input.value = 1;
      }
      updateCartFromUI(counter.closest("tr"));
    });
  });

  document.querySelectorAll(".remove-button").forEach((btn) => {
    btn.addEventListener("click", function () {
      const row = btn.closest("tr");
      const index = parseInt(row.dataset.index);
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      row.remove();
      updateCartSummary();
    });
  });

  function updateCartFromUI(row) {
    const index = parseInt(row.dataset.index);
    const input = row.querySelector(".quantityCounter");
    const quantity = parseInt(input.value) || 1;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    const rowTotalCell = row.querySelector(".row-total");
    if (rowTotalCell) {
      rowTotalCell.textContent = `$${cart[index].price * cart[index].quantity}`;
    }
    updateCartSummary();
  }

  function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const shipping = 10;
    let subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    document.querySelector(
      ".cart-summary div > div:first-child span"
    ).textContent = `$${subtotal}`;
    document.getElementById("total").querySelector("span").textContent = `$${
      subtotal + shipping
    }`;
  }

  document
    .querySelector(".pink-background")
    .addEventListener("click", function () {
      alert("Proceeding to checkout!");
    });
});
