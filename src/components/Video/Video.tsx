import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'

import { COOKIE_SETTINGS_CHANGE_EVENT, FRF_GDPR_COOKIE_ACCEPT_VALUE, FRF_GDPR_COOKIE_NAME } from '@/constants/cookies'
import { getVideoID } from '@/utils'

export type VideoProps = {
  url: string
  title: string
}

const YOUTUBE_DOMAIN = 'youtube.com'
const YOUTUBE_NOCOOKIE_DOMAIN = 'www.youtube-nocookie.com'

export const Video = ({ url, title }: VideoProps) => {
  const [youTubeDomain, setYouTubeDomain] = useState(YOUTUBE_NOCOOKIE_DOMAIN)

  // Set correct domain on first render
  useEffect(() => {
    const hasAcceptedCookies = getCookie(FRF_GDPR_COOKIE_NAME) === FRF_GDPR_COOKIE_ACCEPT_VALUE
    if (hasAcceptedCookies) {
      setYouTubeDomain(YOUTUBE_DOMAIN)
    }
  }, [])

  // Handle user accepting/rejecting cookies
  useEffect(() => {
    const handleCookiesChange = (event: CustomEventInit) => {
      setYouTubeDomain(event.detail === 1 ? YOUTUBE_DOMAIN : YOUTUBE_NOCOOKIE_DOMAIN)
    }
    document.addEventListener(COOKIE_SETTINGS_CHANGE_EVENT, handleCookiesChange)
    return () => document.removeEventListener(COOKIE_SETTINGS_CHANGE_EVENT, handleCookiesChange)
  }, [])

  const videoID = getVideoID(url)
  const videoURL = `https://${youTubeDomain}/embed/${videoID}`

  return (
    <iframe
      className="aspect-video w-full max-w-[700px] lg:w-[450px]"
      src={videoURL}
      title={title}
      allow="accelerometer; autoplay; encrypted-media; gyroscope;"
      allowFullScreen
    ></iframe>
  )
}
