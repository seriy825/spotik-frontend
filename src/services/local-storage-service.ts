class _LocalStorageService {
  get(itemName: string) {
    const item =
      typeof window !== 'undefined' &&
      window.localStorage &&
      localStorage.getItem(itemName)
    const numPatt = new RegExp(/^\d+$/)
    const jsonPatt = new RegExp(/[[{].*[}\]]/)

    if (item) {
      if (jsonPatt.test(item)) {
        return JSON.parse(item)
      } else if (numPatt.test(item)) {
        return parseFloat(item)
      } else {
        return item
      }
    } else {
      return null
    }
  }

  set(itemName: string, item: any) {
    if (typeof item === 'object') {
      typeof window !== 'undefined' &&
        window.localStorage &&
        localStorage.setItem(itemName, JSON.stringify(item))
    } else {
      typeof window !== 'undefined' &&
        window.localStorage &&
        localStorage.setItem(itemName, item)
    }
  }

  remove(itemName: string) {
    typeof window !== 'undefined' &&
      window.localStorage &&
      localStorage.removeItem(itemName)
  }
}

export const LocalStorageService = new _LocalStorageService()
