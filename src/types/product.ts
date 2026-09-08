export interface Product {
  id: string
  name: string
  slug: string
  price: number
  category: string
  drop?: boolean
  dropSlug?: string
  limited?: boolean
  bestseller?: boolean
  visible?: boolean
  sizes: string[]
  colors: string[]
  images: string[]
  colorImages?: Record<string, string[]>
  description: string
}
