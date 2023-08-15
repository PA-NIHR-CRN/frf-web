import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { FRF_GDPR_COOKIE_ACCEPT_VALUE, FRF_GDPR_COOKIE_NAME } from '@/constants/cookies'
import { getVideoID } from '@/utils'

export type VideoProps = {
  url: string
  title: string
}

const YOUTUBE_DOMAIN = 'youtube.com'
const YOUTUBE_NOCOOKIE_DOMAIN = 'www.youtube-nocookie.com'

export const Video = ({ url, title }: VideoProps) => {
  const [youTubeDomain, setYouTubeDomain] = useState(YOUTUBE_NOCOOKIE_DOMAIN)

  const router = useRouter()

  // Set correct domain on first render
  useEffect(() => {
    const hasAcceptedCookies = getCookie(FRF_GDPR_COOKIE_NAME) === FRF_GDPR_COOKIE_ACCEPT_VALUE
    if (hasAcceptedCookies) {
      setYouTubeDomain(YOUTUBE_DOMAIN)
    }
  }, [])

  // Handle user accepting/rejecting cookies
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const match = url.match(/\?cookies-accepted=([0|1])/)
      if (match) {
        setYouTubeDomain(match[1] === '1' ? YOUTUBE_DOMAIN : YOUTUBE_NOCOOKIE_DOMAIN)
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router])

  const videoID = getVideoID(url)
  const videoURL = `https://${youTubeDomain}/embed/${videoID}`

  return (
    <iframe
      className="aspect-video w-full max-w-[700px] lg:w-[450px]"
      src={videoURL}
      title={title}
      allow="accelerometer; autoplay; encrypted-media; gyroscope;"
      srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${videoURL}?autoplay=1><img src=https://img.youtube.com/vi/${videoID}/hqdefault.jpg alt='${title}'><span>▶</span></a>`}
      allowFullScreen
    ></iframe>
  )
}
