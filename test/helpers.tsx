import React from 'react'
import { render } from '@testing-library/react'
import { LanguageProvider } from '../components/LanguageContext'

export function withProvider(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}
