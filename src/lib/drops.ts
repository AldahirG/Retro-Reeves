import dropsJson from '../data/drops.json'

const API = import.meta.env.PUBLIC_API_URL

export interface Drop {
  slug: string
  name: string
  subtitle: string
  heroImage: string
  accentColor: string
  endDate: string
  active?: boolean
}

function mapApiDrop(d: any): Drop {
  return {
    slug:        d.slug,
    name:        d.name,
    subtitle:    d.subtitle ?? '',
    heroImage:   d.heroImageUrl ?? '',
    accentColor: d.accentColor ?? '#e63946',
    endDate:     d.endDate ?? '',
    active:      d.active ?? true,
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

export async function getDrops(): Promise<Drop[]> {
  const data = await fetchApi<any[]>('/api/v1/drops')
  if (data?.length) return data.map(mapApiDrop)
  return dropsJson as Drop[]
}

export async function getDropBySlug(slug: string): Promise<Drop | undefined> {
  const data = await fetchApi<any>(`/api/v1/drops/${slug}`)
  if (data && !data.error) return mapApiDrop(data)
  return (dropsJson as Drop[]).find(d => d.slug === slug)
}
