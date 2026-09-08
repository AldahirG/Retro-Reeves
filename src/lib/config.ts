// Slugs de colección que aún no están disponibles.
// Cuando una categoría esté lista, quitar el slug de aquí
// y cambiar disabled:true → false en NAV_LINKS de navbar.tsx.
export const DISABLED_SLUGS = ["gorras", "zapatos"] as const;

export type DisabledSlug = (typeof DISABLED_SLUGS)[number];

export function isDisabledSlug(slug: string): boolean {
  return (DISABLED_SLUGS as readonly string[]).includes(slug);
}
