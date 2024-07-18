export class item {
  constructor(name, price, units) {
    this.name = name;
    this.price = parseInt(price);
    this.units = parseInt(units);
  }
}

// Exercise 1. (2p)
export function queryDOM() {
  const list = [];

  if (document.body.children.length === 0) return [];

  list.push(document.getElementById("totalPrice"));
  list.push(document.querySelectorAll("h2"));
  list.push(document.querySelectorAll(".product"));
  list.push(document.querySelectorAll("p.price"));
  list.push(document.querySelector(".products>[data-name=Peach]>button"));

  return list;
}

// Exercise 2. (2p)
export function createCartElement(item) {
  const div = document.createElement("div");
  div.classList.add("panel");

  const h3 = document.createElement("h3");
  h3.textContent = item.name;

  const span = document.createElement("span");
  span.classList.add("label");
  span.textContent = `${item.units} piece${item.units > 0 ? "s" : ""} for ${
    item.price
  } €`;

  div.append(h3);
  div.append(span);

  return div;
}

// Exercise 3 (1p)
export function emptyCart() {
  const toDel = document.querySelectorAll("#cartItems .panel");
  toDel.forEach((node) => node.remove());
}

const regex = /^(\d+)\s+\w+\s\w+\s+(\d+)\s+€$/;
// Exercise 4 (1p)
export function updateCartTotal() {
  const total = document.getElementById("totalPrice");
  let totalPrice = 0;

  const cartItems = document.querySelectorAll("#cartItems .panel");
  if (cartItems.length > 0) {
    cartItems.forEach((item) => {
      const label = item.querySelector(".label");
      const match = regex.exec(label.textContent);
      const cost = parseInt(match[2]);
      totalPrice += cost;
    });
  }

  total.textContent = `${totalPrice} €`;
}

// Exercise 5. (2p)
export function addToCart(itemAdded) {
  const cart = document.querySelector(`#cartItems`);

  const cartProducts = document.querySelectorAll(`#cartItems .panel h3`);
  const exists = Array.from(cartProducts)
    .map((p) => p.textContent)
    .includes(itemAdded.name);

  if (!exists) {
    cart.append(createCartElement(itemAdded));
  }

  const cartItems = document.querySelectorAll("#cartItems .panel");

  if (exists && cartItems.length > 0) {
    cartItems.forEach((item) => {
      const articulo = item.querySelector("h3");

      if (articulo.textContent === itemAdded.name) {
        const label = item.querySelector(".label");
        const match = regex.exec(label.textContent);
        const num = parseInt(match[1]);
        const cost = parseInt(match[2]);
        const updLabel = label.textContent.replace(
          regex,
          (match, group1, group2) => {
            return match
              .replace(group1, num + itemAdded.units)
              .replace(group2, cost + itemAdded.price);
          }
        );

        label.textContent = updLabel;
        return;
      }
    });
  }
}

// Exercise 6. (2p)
export function addListeners() {
  const clear = document.getElementById("clear");
  clear.addEventListener("click", emptyCart);

  const update = document.getElementById("update");
  update.addEventListener("click", updateCartTotal);

  const btns = document.querySelectorAll(".product button.tiny");

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product");
      const name = product.getAttribute("data-name");

      const price = parseInt(product.getAttribute("data-price"));
      const units = parseInt(product.querySelector(".count").value);
      const newItem = new item(name, price * units, units);

      addToCart(newItem);
    });
  });
}
