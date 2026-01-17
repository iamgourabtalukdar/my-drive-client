import z from "zod";

export function buildErrorObject(node) {
  const result = {};

  for (const key of Object.keys(node)) {
    const current = node[key];

    // Nested object
    if (current?.properties) {
      const nested = buildErrorObject(current.properties);
      if (Object.keys(nested).length > 0) {
        result[key] = nested;
      }
      continue;
    }

    if (current?.items && Array.isArray(current.items)) {
      result[key] = current.items.map((item) => {
        return item.errors.join(",");
      });
      continue;
    }
    // Leaf error
    const message = current?.errors?.[0];
    if (message) {
      result[key] = message;
    }
  }

  return result;
}

export default function formatError(zodError) {
  const tree = z.treeifyError(zodError);

  let fields = {};

  if (tree.properties) {
    const errors = buildErrorObject(tree.properties);
    if (Object.keys(errors).length > 0) {
      fields = errors;
    }
  }

  return fields;
}
