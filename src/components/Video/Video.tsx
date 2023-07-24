import { getVideoID } from '@/utils'

export type VideoProps = {
  url: string
  title: string
}

export const Video = ({ url, title }: VideoProps) => {
  const videoID = getVideoID(url)
  const videoURL = `https://www.youtube.com/embed/${videoID}`
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
