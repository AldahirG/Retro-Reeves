export interface Product {
  id: string
  name: string
  slug: string
  price: number
  category: string
  drop?: boolean
  dropSlug?: string
  limited?: boolean
  sizes: string[]
  colors: string[]
  images: string[]
  description: string
}
