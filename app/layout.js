
export const metadata = {
  title: {
    default: 'Glass by Tal Hayut',
    template: '%s | talhayut'
  },
  metadataBase: new URL('https://glassm.vercel.app'),
  description: `glass`,
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png'
    }
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'glass',
    creator: 'Tal Hayut',
    siteId: 'glass'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
