const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {

    const id = button.getAttribute("data-id");
    const name = button.getAttribute("data-name");
    const price = Number(button.getAttribute("data-price"));

    let cart = JSON.parse(localStorage.getItem("campusbites_cart")) || [];

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: id,
        name: name,
        price: price,
        quantity: 1
      });
    }

    localStorage.setItem("campusbites_cart", JSON.stringify(cart));

    // UX feedback (smooth, no popup)
    const originalText = button.innerText;
    button.innerText = "Added ✓";
    button.disabled = true;

    setTimeout(() => {
      button.innerText = originalText;
      button.disabled = false;
    }, 700);
  });
});
