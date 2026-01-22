import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://3dmlab.it',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://3dmlab.it/servizi/stampa-3d',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://3dmlab.it/servizi/lavorazioni-cnc',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://3dmlab.it/servizi/lavorazioni-laser',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://3dmlab.it/servizi/cad',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://3dmlab.it/#chi-siamo',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://3dmlab.it/#contacts',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://3dmlab.it/quote',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://3dmlab.it/cookie-policy',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://3dmlab.it/privacy-policy',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://3dmlab.it/terms-of-use',
      lastModified: new Date(),
      priority: 0.8,
    },
  ]
}
