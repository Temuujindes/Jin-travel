import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import HomeError from '../app/error'
import HomeLoading from '../app/loading'
import ToursError from '../app/tours/error'
import ToursLoading from '../app/tours/loading'
import DetailError from '../app/tours/[slug]/error'
import DetailLoading from '../app/tours/[slug]/loading'
import NotFound from '../app/not-found'
import { LanguageProvider } from '../components/LanguageContext'

describe('public route loading and error states', () => {
  it('uses existing layout classes for each loading state', () => {
    for (const Loading of [HomeLoading, ToursLoading, DetailLoading]) {
      const { container, unmount } = render(<Loading />)
      expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument()
      expect(container.querySelector('.app')).toBeInTheDocument()
      unmount()
    }
  })

  it('renders inline recovery actions for each error state', () => {
    for (const ErrorState of [HomeError, ToursError, DetailError]) {
      const reset = vi.fn()
      const { unmount } = render(<LanguageProvider><ErrorState error={new Error('failure')} reset={reset} /></LanguageProvider>)
      expect(screen.getByRole('button', { name: '다시 시도' })).toBeInTheDocument()
      expect(document.querySelector('.error')).toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: '다시 시도' }))
      expect(reset).toHaveBeenCalledOnce()
      unmount()
    }
  })

  it('renders the localized application not-found state', () => {
    render(<LanguageProvider><NotFound /></LanguageProvider>)
    expect(screen.getByText('이 여행을 찾을 수 없습니다.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '홈' })).toHaveAttribute('href', '/')
  })
})
