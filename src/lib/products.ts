import products from "../data/products.json"
import type { Product } from "../types/product"

export function getProducts(): Product[] {
  return products as Product[]
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find(p => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return getProducts().filter(p => p.category === category)
}

export function getDropProducts(dropSlug: string): Product[] {
  return getProducts().filter(p => p.dropSlug === dropSlug)
}
