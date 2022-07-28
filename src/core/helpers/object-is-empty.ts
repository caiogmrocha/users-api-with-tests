export function objectIsEmpty (object: Object) {
  if (Object.keys(object).length > 0) {
    return false;
  }

  return true;
}
