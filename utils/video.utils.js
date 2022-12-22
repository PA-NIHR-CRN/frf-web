import { useRef } from 'react';
import styles from '../pages/providers/providers.module.scss';

export default function YouTubeVideoIframe(
  video,
  width = '560px',
  height = '315px',
  thumbnailQuality = 'maxresdefault' // 'hqdefault'
) {
  const divRef = useRef();

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
      `https://www.youtube.com/embed/${video}?rel=0&showinfo=1&autoplay=1`
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
        src={`https://img.youtube.com/vi/${video}/${thumbnailQuality}.jpg`}
        alt="YouTube Video Thumbnail"
        width={width}
        height={height}
      />
    </div>
  );
}
