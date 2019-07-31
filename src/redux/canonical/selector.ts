export const getCanonical = state => (position, key) =>
  state[position][key] || {}
