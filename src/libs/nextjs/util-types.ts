export type PageProps<T extends string> = {
  params: {
    [key in T]: string
  }
}
