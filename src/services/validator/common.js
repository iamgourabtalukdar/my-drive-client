export function required(val) {
  if (val === undefined) {
    return false;
  }
  if (val === "") {
    return false;
  }
  return true;
}

export function minLength(val, length) {
  return String(val).length >= length;
}

export function maxLength(val, length) {
  return String(val).length <= length;
}
export function min(val, minVal) {
  return parseInt(val) >= parseInt(minVal);
}
export function max(val, maxVal) {
  return parseInt(val) <= parseInt(maxVal);
}

export function matchOptions(val, options = []) {
  return options.includes(val);
}

export function accept(val, acceptValue) {
  return val === acceptValue;
}

export function isValidDate(val) {
  if (!val) return false;
  if (val instanceof Date) {
    return !isNaN(val.getTime());
  }
  if (typeof val !== "string") {
    return false;
  }
  const date = new Date(val);
  return !isNaN(date.getTime());
}
