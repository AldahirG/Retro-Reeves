import { createClient } from '@sanity/client'
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset:   import.meta.env.PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// Construye URL de imagen desde un asset de Sanity
export function urlFor(source: any): string {
  if (!source?.asset?._ref) return ''
  const ref: string = source.asset._ref
  // ref format: image-<hash>-<width>x<height>-<ext>
  const [, id, dimensions, ext] = ref.split('-')
  return `https://cdn.sanity.io/images/${import.meta.env.PUBLIC_SANITY_PROJECT_ID}/production/${id}-${dimensions}.${ext}`
}
