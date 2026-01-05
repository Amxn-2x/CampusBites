const cartItemsContainer = document.getElementById("cartItems");
const cartEmptyState = document.getElementById("cartEmpty");
// Load cart on page load
document.addEventListener("DOMContentLoaded", loadCart);
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("campusbites_cart")) || [];
  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartEmptyState.style.display = "block";
    cartItemsContainer.style.display = "none";
    return;
  }
  cartEmptyState.style.display = "none";
  cartItemsContainer.style.display = "flex";

  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <span>₹${item.price} each</span>
      </div>
      <div class="quantity-controls">
        <button class="qty-btn decrease" data-id="${item.id}">−</button>
        <span class="qty">${item.quantity}</span>
        <button class="qty-btn increase" data-id="${item.id}">+</button>
      </div>
      <div class="cart-item-price">
        ₹${item.price * item.quantity}
        <button class="remove-btn" data-id="${item.id}">✕</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
  attachCartEvents();
}
// Handle + − Remove
function attachCartEvents() {
  let cart = JSON.parse(localStorage.getItem("campusbites_cart")) || [];

  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      cart.find(item => item.id === id).quantity += 1;
      updateCart(cart);
    });
  });
  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const item = cart.find(item => item.id === id);
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
      updateCart(cart);
    });
  });
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      cart = cart.filter(item => item.id !== id);
      updateCart(cart);
    });
  });
}
// Save + re-render
function updateCart(cart) {
  localStorage.setItem("campusbites_cart", JSON.stringify(cart));
  loadCart();
}
const PLATFORM_FEE = 10;
// Load cart on page load
document.addEventListener("DOMContentLoaded", loadCart);
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("campusbites_cart")) || [];
  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartEmptyState.style.display = "block";
    cartItemsContainer.style.display = "none";
    updateBillSummary([]);
    return;
  }
  cartEmptyState.style.display = "none";
  cartItemsContainer.style.display = "flex";
  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <span>₹${item.price} each</span>
      </div>

      <div class="quantity-controls">
        <button class="qty-btn decrease" data-id="${item.id}">−</button>
        <span class="qty">${item.quantity}</span>
        <button class="qty-btn increase" data-id="${item.id}">+</button>
      </div>
      <div class="cart-item-price">
        ₹${item.price * item.quantity}
        <button class="remove-btn" data-id="${item.id}">✕</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
  attachCartEvents();
  updateBillSummary(cart);
}
// Handle + − Remove
function attachCartEvents() {
  let cart = JSON.parse(localStorage.getItem("campusbites_cart")) || [];

  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", () => {
      cart.find(i => i.id === btn.dataset.id).quantity++;
      updateCart(cart);
    });
  });

  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = cart.find(i => i.id === btn.dataset.id);
      if (item.quantity > 1) item.quantity--;
      updateCart(cart);
    });
  });

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      cart = cart.filter(i => i.id !== btn.dataset.id);
      updateCart(cart);
    });
  });
}

// Save + re-render
function updateCart(cart) {
  localStorage.setItem("campusbites_cart", JSON.stringify(cart));
  loadCart();
}

function updateBillSummary(cart) {
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst + PLATFORM_FEE;

  document.getElementById("billSubtotal").innerText = `₹${subtotal}`;
  document.getElementById("billPlatform").innerText = `₹${PLATFORM_FEE}`;
  document.getElementById("billGST").innerText = `₹${gst}`;
  document.getElementById("billTotal").innerText = `₹${total}`;
}
// ================= PAYMENT LOGIC =================
const payBtn = document.getElementById("payBtn");
// Enable / Disable pay button based on cart
function togglePayButton(cart) {
  if (cart.length === 0) {
    payBtn.disabled = true;
  } else {
    payBtn.disabled = false;
  }
}
// Modify updateBillSummary slightly
function updateBillSummary(cart) {
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst + PLATFORM_FEE;
  document.getElementById("billSubtotal").innerText = `₹${subtotal}`;
  document.getElementById("billPlatform").innerText = `₹${PLATFORM_FEE}`;
  document.getElementById("billGST").innerText = `₹${gst}`;
  document.getElementById("billTotal").innerText = `₹${total}`;
  togglePayButton(cart);
}
// Handle payment click
payBtn.addEventListener("click", () => {
  let cart = JSON.parse(localStorage.getItem("campusbites_cart")) || [];
  if (cart.length === 0) return;

  const selectedPayment = document.querySelector(
    'input[name="payment"]:checked'
  ).nextElementSibling.innerText;
  const totalAmount = document
    .getElementById("billTotal")
    .innerText.replace("₹", "");
  alert(
    `₹${totalAmount} paid successfully via ${selectedPayment}.\nYour order is being prepared 🍽️`
  );
  // Clear cart after payment
  localStorage.removeItem("campusbites_cart");
  // Reset UI
  loadCart();
});
