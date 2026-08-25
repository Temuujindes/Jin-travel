import { LanguageProvider } from '../../components/LanguageContext'

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <LanguageProvider defaultLanguage="mn">{children}</LanguageProvider> }