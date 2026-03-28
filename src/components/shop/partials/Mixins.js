export const subTotal = (id, price) => {
  let subTotalCost = 0;
  let carts = JSON.parse(localStorage.getItem("cart") || "[]");
  carts.forEach((item) => {
    if (item.id === id) {
      subTotalCost = item.quantitiy * price;
    }
  });
  return subTotalCost;
};

export const quantity = (id) => {
  let product = 0;
  let carts = JSON.parse(localStorage.getItem("cart") || "[]");
  carts.forEach((item) => {
    if (item.id === id) {
      product = item.quantitiy;
    }
  });
  return product;
};

export const totalCost = () => {
  let total = 0;
  let carts = JSON.parse(localStorage.getItem("cart") || "[]");
  carts.forEach((item) => {
    total += item.quantitiy * item.price;
  });
  return total;
};
