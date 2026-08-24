import './globals.css'
import type { Metadata } from 'next'
import { LanguageProvider } from '../components/LanguageContext'

export const metadata: Metadata = { title: 'JIN Travel | Mongolia, considered', description: 'Premium private journeys through Mongolia.' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ko"><body><LanguageProvider>{children}</LanguageProvider></body></html> }