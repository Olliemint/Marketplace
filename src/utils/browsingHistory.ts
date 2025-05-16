const STORAGE_KEY = "viewed_products";

export function saveViewedProduct(id: number) {
  let viewed: number[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  viewed.unshift(id);

  if (viewed.length > 3) viewed = viewed.slice(0, 3);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(viewed));
}

export function getViewedProducts(): number[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}
export function clearViewedProducts() {
  localStorage.removeItem(STORAGE_KEY);
}
