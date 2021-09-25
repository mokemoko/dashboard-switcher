export function getQueryParams<T extends string>(): Record<T, string> {
  const paramsPair = location.search.substr(1).split('&').map(p => p.split('='))
  return Object.fromEntries(paramsPair)
}
