export function getYouTubeVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

export function getYouTubeEmbedUrl(url: string, autoplay: boolean = false): string | null {
  const videoId = getYouTubeVideoId(url)
  if (!videoId) return null
  
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    showinfo: '0',
    ...(autoplay && { autoplay: '1', mute: '1' })
  })
  
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}