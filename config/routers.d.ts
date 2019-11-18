export interface Routers {
  [key: string]: {
    page: string
    query: {
      [queryKey: string]: any
    }
  }
}

const routers: Routers

export default routers
