import '../styles/globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Providers } from './providers'
import Script from 'next/script'

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  generator: 'CineFlix',
  applicationName: 'CineFlix',
  creator: 'Bruno Garcia',
  publisher: 'CineFlix',
  title: 'CineFlix | Onde o Cinema Ganha Vida',
  description: 'Mergulhe no CineFlix, onde paixão e cinema se encontram. Assista aos lançamentos mais recentes, a qualquer hora, em qualquer lugar.',
  authors: [{ name: 'Bruno Garcia', url: 'https://brunowillian.com' }],
  keywords: ['CineFlix', 'Netflix', 'Filmes', 'Séries', 'Cinema', 'Entretenimento', 'Streaming', 'Assistir', 'Online', 'Grátis', 'HD', '4K', 'Dolby', 'Dolby Atmos', 'Dolby Vision', 'Dolby Digital', 'Dolby Digital Plus', 'Dolby Digital 5.1', 'Dolby Digital 7.1', 'Dolby Digital 7.1.2', 'Dolby Digital 7.1.4', 'Dolby Digital 7.1.6', 'Dolby Digital 7.1.8', 'Dolby Digital 7.1.10', 'Dolby Digital 7.1.12', 'Dolby Digital 7.1.14', 'Dolby Digital 7.1.16', 'Dolby Digital 7.1.18', 'Dolby Digital 7.1.20', 'Dolby Digital 7.1.22', 'Dolby Digital 7.1.24', 'Dolby Digital 7.1.26', 'Dolby Digital 7.1.28', 'Dolby Digital 7.1.30', 'Dolby Digital 7.1.32', 'Dolby Digital 7.1.34', 'Dolby Digital 7.1.36', 'Dolby Digital 7.1.38', 'Dolby Digital 7.1.40', 'Dolby Digital 7.1.42', 'Dolby Digital 7.1.44', 'Dolby Digital 7.1.46', 'Dolby Digital 7.1.48', 'Dolby Digital 7.1.50', 'Dolby Digital 7.1.52', 'Dolby Digital 7.1.54', 'Dolby Digital 7.1.56', 'Dolby Digital 7.1.58', 'Dolby Digital 7.1.60', 'Dolby Digital 7.1.62', 'Dolby Digital 7.1.64', 'Dolby Digital 7.1.66', 'Dolby Digital 7.1.68', 'Dolby Digital 7.1.70', 'Dolby Digital 7.1.72' ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${montserrat.variable} font-montserrat`}>
        <Providers>
          {children}
        </Providers>
      </body>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9513215669385884"
        crossOrigin='anonymous'
      />
    </html>
  )
}
