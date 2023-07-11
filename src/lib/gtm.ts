declare const window: Window & { dataLayer: Record<string, unknown>[] }

export type DataLayerEvent = {
  pageTypeName: string | null
  url: string
}

export const gtmVirtualPageView = (rest: DataLayerEvent) => {
  window.dataLayer?.push({
    event: 'VirtualPageView',
    ...rest,
  })
}
