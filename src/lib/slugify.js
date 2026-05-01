export function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function findBySlug(products, slug) {
  return products.find((p) => slugify(p.itemname) === slug) || null;
}
