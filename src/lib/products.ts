import type { Product } from '../types/product'
import productsJson from '../data/products.json'

const API = import.meta.env.PUBLIC_API_URL

function mapApiProduct(p: any): Product {
  const rawImages: any[] = p.images ?? []
  const colors: string[] = p.variants?.map((v: any) => v.color).filter(Boolean).filter((v: any, i: any, a: any) => a.indexOf(v) === i) ?? []

  // Build color→urls map using image alt field convention (alt = color name)
  const colorImages: Record<string, string[]> = {}
  for (const color of colors) {
    const matched = rawImages.filter(img => img.alt?.toLowerCase().includes(color.toLowerCase())).map((img: any) => img.url)
    if (matched.length) colorImages[color] = matched
  }

  return {
    id:          p.id,
    name:        p.name,
    slug:        p.slug,
    price:       Number(p.price),
    category:    p.category?.slug ?? p.category ?? '',
    drop:        !!p.dropId,
    dropSlug:    p.drop?.slug ?? undefined,
    limited:     p.limited ?? false,
    bestseller:  p.bestseller ?? false,
    visible:     p.visible ?? true,
    sizes:       p.variants?.map((v: any) => v.size).filter((v: any, i: any, a: any) => a.indexOf(v) === i) ?? [],
    colors,
    images:      rawImages.map((img: any) => img.url),
    colorImages,
    description: p.description ?? '',
  }
}

async function fetchApi<T>(path: string): Promise<T | null> {
  if (!API) return null
  try {
    const res = await fetch(`${API}${path}`)
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function getProducts(): Promise<Product[]> {
  const data = await fetchApi<{ data: any[] }>('/api/v1/products?limit=100')
  if (data?.data?.length) return data.data.map(mapApiProduct)
  return productsJson as unknown as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const data = await fetchApi<any>(`/api/v1/products/${slug}`)
  if (data && !data.error) return mapApiProduct(data)
  return (productsJson as unknown as Product[]).find(p => p.slug === slug)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const all = await getProducts()
  return all.filter(p => p.category === category)
}

export async function getDropProducts(dropSlug: string): Promise<Product[]> {
  const all = await getProducts()
  return all.filter(p => p.dropSlug === dropSlug)
}
