/* =====================
JEJAK SHOES - SCRIPT.JS
Handles Add to Cart functionality
===================== */


// Get existing cart data from localStorage or create empty cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Function to add item to cart
function addToCart(productName, productPrice) {
const product = {
name: productName,
price: productPrice
};


cart.push(product);
localStorage.setItem("cart", JSON.stringify(cart));


alert(productName + " has been added to your cart!");
}


// Function to display cart items (for cart.html)
function displayCart() {
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");


if (!cartItems || !cartTotal) return;


cartItems.innerHTML = "";
let total = 0;


cart.forEach((item, index) => {
const row = document.createElement("div");
row.classList.add("cart-row");


row.innerHTML = `
<p>${item.name}</p>
<p>RM ${item.price}</p>
<button onclick="removeItem(${index})">Remove</button>
`;


cartItems.appendChild(row);
total += item.price;
});


cartTotal.textContent = "RM " + total;
}


// Remove item from cart
function removeItem(index) {
cart.splice(index, 1);
localStorage.setItem("cart", JSON.stringify(cart));
displayCart();
}


// Clear entire cart
function clearCart() {
localStorage.removeItem("cart");
cart = [];
displayCart();
}


// Load cart when page opens
document.addEventListener("DOMContentLoaded", displayCart);

function processPayment() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    localStorage.setItem("order", JSON.stringify(cart));
    localStorage.removeItem("cart");

    window.location.href = "order-summary.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const orderItems = document.getElementById("order-items");
    const orderTotal = document.getElementById("order-total");

    if (!orderItems) return;

    const order = JSON.parse(localStorage.getItem("order")) || [];
    let total = 0;

    orderItems.innerHTML = "";

    order.forEach(item => {
        total += item.price;

        orderItems.innerHTML += `
            <div style="display:flex; justify-content:space-between; margin-bottom:1rem;">
                <span>${item.name}</span>
                <span>RM ${item.price}</span>
            </div>
        `;
    });

    orderTotal.textContent = `RM ${total}`;
});

function finishOrder() {
    localStorage.removeItem("order");
    window.location.href = "index.html";

}

document.querySelectorAll(".product-card").forEach(card => {
  const plus = card.querySelector(".plus");
  const minus = card.querySelector(".minus");
  const qtyInput = card.querySelector(".qty-input");
  const addBtn = card.querySelector(".add-to-cart");
  const sizeSelect = card.querySelector(".size-select");

  plus.addEventListener("click", () => {
    qtyInput.value++;
  });

  minus.addEventListener("click", () => {
    if (qtyInput.value > 1) qtyInput.value--;
  });

  addBtn.addEventListener("click", () => {
    const name = addBtn.dataset.name;
    const price = parseInt(addBtn.dataset.price);
    const size = sizeSelect.value;
    const quantity = parseInt(qtyInput.value);

    if (size === "") {
      alert("Please select a shoe size!");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(
      item => item.name === name && item.size === size
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ name, price, size, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  });
});
