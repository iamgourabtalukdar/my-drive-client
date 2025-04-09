export function capitalize(str) {
  if (!str) return str; // handle empty string
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeEach(str) {
  if (!str) return str;
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
