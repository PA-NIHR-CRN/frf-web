import { useRef } from 'react';
import styles from '../pages/providers/providers.module.scss';

export default function YouTubeVideoIframe(
  videoUrl,
  width = '560px',
  height = '315px',
  thumbnailQuality = 'maxresdefault' // 'hqdefault'
) {
  const divRef = useRef();

  const getVideoID = (videoURL) => {
    const url = videoURL.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
  };

  const onClick = () => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '1');
    iframe.setAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    );
    iframe.style.width = width;
    iframe.style.height = height;
    iframe.setAttribute(
      'src',
      `https://www.youtube.com/embed/${getVideoID(
        videoUrl
      )}?rel=0&showinfo=1&autoplay=1`
    );
    if (divRef.current) {
      divRef.current.innerHTML = '';
      divRef.current.appendChild(iframe);
    }
  };

  return (
    <div ref={divRef} className={styles.youTubeVideoThumbnail}>
      <span onClick={onClick} />
      <img
        onClick={onClick}
        loading="lazy"
        src={`https://img.youtube.com/vi/${getVideoID(
          videoUrl
        )}/${thumbnailQuality}.jpg`}
        alt="YouTube Video Thumbnail"
        width={width}
        height={height}
      />
    </div>
  );
}
