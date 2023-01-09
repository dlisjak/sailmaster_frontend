function generateSlug(value) {
  return value
    .toLowerCase()
    .replace(/-+/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function getOfferLink(id, model) {
  return `/${generateSlug(model)}/${id}`;
}
