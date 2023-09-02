import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cineflix',
    short_name: 'Cineflix',
    description: 'Mergulhe no CineFlix, onde paixão e cinema se encontram. Assista aos lançamentos mais recentes, a qualquer hora, em qualquer lugar.',
    categories: ['entertainment', 'movies', 'series', 'cinema', 'streaming', 'tv', 'shows', 'videos', 'trailers' ],
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#f1f5f9',
    theme_color: '#f1f5f9',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}