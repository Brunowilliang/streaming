import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://cineflix.app/',
      lastModified: new Date(),
    },
  ]
}