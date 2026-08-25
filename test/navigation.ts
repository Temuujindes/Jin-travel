let pathname = '/'

export function setMockPathname(value: string) {
  pathname = value
}

export function getMockPathname() {
  return pathname
}
