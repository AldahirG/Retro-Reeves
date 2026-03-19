export function getCart() {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem("cart") || "[]")
}

export function saveCart(cart: any[]) {
  localStorage.setItem("cart", JSON.stringify(cart))
}

export function addToCart(item: any) {
  const cart = getCart()
  cart.push(item)
  saveCart(cart)
}
