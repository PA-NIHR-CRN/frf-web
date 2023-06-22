import { useRouter } from 'next/router'
import { ParsedUrlQueryInput } from 'querystring'
import { useEffect, useState } from 'react'

export const useProviders = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleRouteChangeStart = (newUrl: string) => {
    const url = new URL(`${window.location.origin}${newUrl}`)
    if (url.pathname.endsWith('/providers')) setIsLoading(true)
  }

  const handleRouteChangeComplete = () => setIsLoading(false)

  const handleFilterChange = (formValues: Record<string, unknown>) => {
    router.push(
      {
        pathname: '/providers',
        query: formValues as ParsedUrlQueryInput,
      },
      undefined,
      { scroll: false }
    )
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router])

  return { isLoading, handleFilterChange }
}
