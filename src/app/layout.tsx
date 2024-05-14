import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.scss'
import { AppProviders } from 'providers/app-provider'
import { SITE_NAME } from 'shared/constants/constants'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'A platform for listening music.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
