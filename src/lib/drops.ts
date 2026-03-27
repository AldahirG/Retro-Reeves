import drops from "../data/drops.json"

export interface Drop {
  slug: string
  name: string
  subtitle: string
  heroImage: string
  accentColor: string
  endDate: string
}

export function getDrops(): Drop[] {
  return drops as Drop[]
}

export function getDropBySlug(slug: string): Drop | undefined {
  return getDrops().find(d => d.slug === slug)
}
